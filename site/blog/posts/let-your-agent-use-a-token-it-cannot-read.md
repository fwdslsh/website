---
title: "Let your agent use a token it can't read"
description: "Use AKM tasks and Linux permissions to keep credentials outside an agent's reach, with fhold providing a practical implementation."
date: 2026-11-23T21:01:35Z
author: fwdslsh
tags: akm, fhold, security, agents
---

# Let your agent use a token it can't read

An AI assistant may need a token to check a service, publish a package, or run a deployment. Giving it the token also gives it the ability to print that value, save it in a conversation, or send it somewhere you didn't intend.

AKM provides the pieces to separate those permissions. A trusted task can use a credential while the agent receives the result. File system permissions can then prevent the agent from reading the credential directly. We've implemented this approach in fhold using native AKM tasks and sudo.

## Keep the value out of the conversation

Store the credential as an AKM secret and refer to it by name. Bind it to the script step that needs it:

```yaml
version: 5-beta.1
steps:
  - name: check
    run: scripts/check-service.sh
    secret:
      - secrets/service-token:API_TOKEN
```

AKM supplies `API_TOKEN` to that script and redacts the injected value from captured task output. The task definition contains a reference, so you can review it without including the token.

Have scripts return results without printing credentials. Redaction helps with accidental disclosure, but a script can still encode a token or send it elsewhere. Always review the code that receives it. [AKM's secrets reference explains these limits.](https://akm.fwdslsh.dev/docs/reference/env-and-secrets/)

## Give the credential a different owner

A secret file is still readable by its owner. If the agent runs under that same account, it can bypass the task and open the file itself.

Use a separate user account to own the private AKM bundle, including its secrets, tasks, and scripts. Grant the agent permission to invoke an exact task command through sudo. Keep the executable and policy outside the agent's write access, reset the environment, and fix the working directory to a private location.

Those details prevent the agent from replacing approved code or loading its own startup configuration under the private account. Avoid wildcard arguments: permission to run one task should not also permit another command or a caller-supplied `--cwd`.

The agent can continue using its normal shell. Filesystem permissions enforce the separation when it tries to read the private files.

## How fhold implements it

Fhold's optional credential-custody feature uses a private `fhold-credentials` account alongside the normal Assistant account. That account owns the AKM bundle, while root-owned sudo rules authorize individual task commands. Named volumes preserve the private home and grants when the container is replaced.

Admin makes that arrangement manageable:

1. **Enter the credential** outside the agent conversation. Admin passes it to native `akm secret set` through the management connection, using stdin rather than command arguments.
2. **Create and review the task.** Admin saves a script and its credential binding. Saving a draft does not grant execution access.
3. **Approve or revoke access.** Approval installs the exact sudo rule for the reviewed task. Revocation removes permission for future invocations.

Approved tasks can run repeatedly. Changed code requires a new task name and review, so Admin doesn't replace a script beneath an existing grant.

The implementation is experimental and off by default. Its Docker overlay permits the identity change required by sudo, which changes the default container hardening. AKM handles execution and redaction; fhold supplies setup and administration. [The implementation guide includes configuration and verification commands.](https://fhold.fwdslsh.dev/guides/credential-custody/)

## Verify the boundary

Use a synthetic credential first. Confirm that the approved task succeeds, the agent cannot read or modify its private files, and unapproved commands or extra arguments are refused. Revoke the grant and check that the next invocation fails.

Fhold's container tests exercise those cases through real OpenCode shell execution and scheduled jobs. They also check credential rotation and persistence across container replacement.

This solution does not address encryption and recovery automatically. The current private AKM store uses permission-protected plaintext files; fhold's separate OS keyring does not encrypt them. The private volumes need their own protected backups. Provider sign-ins remain in their native stores; this feature doesn't move them automatically.

This approach still trusts the approved script and the host administrator. Its useful promise is specific: the agent can request an approved operation without receiving direct access to the credential behind it.
