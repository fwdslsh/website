---
title: "A model leaderboard wasn't enough. We kept the ledger."
description: "129 recorded runs across five hardware configurations, with an interactive table for comparing quality, speed, and what actually finished."
author: fwdslsh
date: 2026-10-03T17:00:00Z
class: model-ledger-post
---

# A model leaderboard wasn't enough. We kept the ledger.

Picking a local model sounds like a leaderboard problem: find the best score your hardware can afford. In our lab, it turned out to be a bookkeeping problem first. Which run finished? Which GPU did it use? Was that a quality evaluation, a short probe, or a service smoke test?

We put the recovered results into a ledger rather than choosing one winning number. This post includes a public snapshot: **129 rows, five hardware configurations, and 45 unique completed evaluations**. Two exact duplicate artifacts remain labelled instead of being silently counted twice. The other rows include incomplete runs, diagnostics, reported-only results, and service tests.

## What the ledger changed

One useful comparison is a Qwen3.8-27B Q2_K_XL run on each of our dual-4060-Ti systems. Both completed the same 123-case suite with **91.837% quality**. The Xeon run recorded **40.23 tokens/second median decode**; the Ryzen run recorded **47.31**. That is about 17.6% faster decode in those two artifacts, with the same recorded quality.

The machines differed in much more than CPU: the older workstation had 256 GB DDR4 and HDD-backed working storage; the Ryzen build had 32 GB DDR5 and NVMe storage. Runtime settings and per-run GPU allocation also matter.

On the Ryzen system, the completed Qwen3.5-9B Q4_K_M run recorded **84.626% quality**, **46.62 tokens/second median decode**, and **2,054.72 tokens/second median prefill**. Its decode rate was close to the 27B run's 47.31, but its quality and prefill behaviour were different. “Almost the same tokens per second” was not the same result.

That is the point of retaining the ledger: you can inspect the trade-off instead of flattening it into one rank.

## Explore the ledger

Open the [full-width interactive ledger](/model-ledger.html) to filter, sort, inspect run details, and export the results. Start with one evaluation suite and completed runs, then narrow the system, model family, or GPU allocation.

## What a score does—and doesn't—mean

- **public123** is the pinned 123-case AKM evaluation suite. **frozen24** is a separate 24-item structure and source-quote grounding suite. Their quality percentages are not interchangeable.
- **Success** counts successful recorded cases. It is not a synonym for semantic accuracy. **Quality** is earned checks divided by possible checks. **Strict** counts cases passing every public-suite check; structure is tracked separately.
- **Decode and prefill rates are request-level medians**, taken from server-reported measurements. They are not aggregate throughput or estimates of concurrent-user capacity.
- **Latency and time to first token are different measurements.** Most rows have no recorded TTFT. An em dash means unrecorded, not zero.
- **A probe is not a completed evaluation.** Service smoke tests establish a narrow behaviour under their recorded conditions, not broad model quality or sustained concurrency.
- **Installed GPUs are not necessarily GPUs used.** The row-level allocation describes the run; the machine inventory describes what was installed.

The details view keeps sample counts and missing telemetry visible. If a run has no retry measurement, it does not establish that the run had zero retries. And a reported-only row is a useful lead, not the same evidence as a recovered result artifact.

## The five configurations

These are the captured benchmark configurations, not today's deployment plan. Memory figures below describe installed capacity; OS-visible figures are retained in the downloadable data where recorded.

| Configuration | CPU | Installed memory | Installed accelerators |
| --- | --- | --- | --- |
| Xeon workstation | Xeon Gold 6242R | 256 GB DDR4 | 2 × RTX 4060 Ti, 16 GB each |
| Ryzen workstation | Ryzen 5 9600X | 32 GB DDR5 | 2 × RTX 4060 Ti, 16 GB each |
| B70 workstation | Core i5-11600K | 128 GB DDR4 | Arc Pro B70, 32 GB |
| A770 workstation | Core i5-12600K | 32 GB DDR4-3200 | Arc A770, 16 GB |
| 5090 workstation | Core Ultra 9 285K | 64 GB; memory type unrecorded | RTX 5090, 32 GB |

## A snapshot you can take away

The table runs entirely in your browser with the JSON file shipped alongside the ledger. No account, model endpoint, analytics service, or lab network access is required. If JavaScript is unavailable, the snapshot is still downloadable.

We copied the recorded metrics without rescoring them. The public snapshot keeps all 129 row IDs, duplicate relationships, numeric results, per-group summaries, and recorded performance distributions. It omits private filesystem paths, service addresses, raw prompts and responses, and raw per-case records. System labels describe hardware instead of private hostnames. The JSON records the original ledger's SHA-256 and compilation time so this snapshot has a fixed provenance.

The reproducible benchmark is [AKM Model Eval](https://github.com/itlackey/akm-model-eval), with a [public test corpus](https://github.com/itlackey/akm-model-eval/tree/main/corpus), [runner and scoring logic](https://github.com/itlackey/akm-model-eval/blob/main/bench.py), and [instructions for running it yourself](https://github.com/itlackey/akm-model-eval#quick-start). The post and its dataset live in the [fwdslsh website repository](https://github.com/fwdslsh/website). The publishing setup is described in [How this site is built](/blog/posts/how-this-site-is-built.html).

We still care about finding a good model. We just want the answer to survive “which run was that?”
