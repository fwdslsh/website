---
title: "A model leaderboard wasn't enough. We kept the ledger."
description: "Compare quality and speed across 129 recorded model runs, with filters for hardware, test suites, and completed evaluations."
author: fwdslsh
date: 2026-10-03T17:00:00Z
class: model-ledger-post
tags: ai, llm, machinelearning, opensource
---

# A model leaderboard wasn't enough. We kept the ledger.

Comparing local models gets confusing when the results come from different machines, runtimes, and test suites. A run that completed two cases can show a high quality score, but it doesn't tell you how the model handled the rest of the workload.

The [model ledger](/references/model-ledger.html) brings the lab results into one table: 129 rows across five hardware configurations, including 45 unique completed evaluations. Two exact duplicate artifacts are marked as duplicates. The remaining rows include incomplete runs, diagnostics, reported-only results, and service tests, so you can separate them before making a comparison.

## Compare the same workload

For example, Qwen3.8-27B Q2_K_XL completed the same 123-case suite on both dual-4060-Ti systems with 91.837% quality. The Xeon run recorded a median decode rate of 40.23 tokens per second; the Ryzen run recorded 47.31. For these runs, the Ryzen system decoded about 17.6% faster with the same recorded quality.

The systems also differed in memory and storage. The Xeon workstation had 256 GB of DDR4 and HDD-backed working storage, while the Ryzen build had 32 GB of DDR5 and NVMe storage. The ledger retains runtime settings and per-run GPU allocation so those details can be checked alongside the rates.

On the Ryzen system, Qwen3.5-9B Q4_K_M recorded 84.626% quality, a median decode rate of 46.62 tokens per second, and a median prefill rate of 2,054.72 tokens per second. Its decode rate was close to the 27B run's 47.31, but the quality score and prefill rate differed. Looking only at decode would miss those differences.

## Explore the ledger

Open the [full-width interactive ledger](/references/model-ledger.html) and start by selecting one evaluation suite and completed runs. Then filter by system, model family, or GPU allocation. This keeps the comparison focused on the same workload rather than mixing full evaluations with short probes.

Click a column heading to sort. Open a row's details to check its settings, performance distributions, and per-group results. The CSV and JSON exports contain the filtered rows, so you can take the same comparison into another tool.

## Read the measurements

- **Suite:** `public123` is the pinned 123-case AKM evaluation suite. `frozen24` is a separate 24-item structure and source-quote grounding suite. Compare quality scores within the same suite.
- **Scores:** Success counts successful recorded cases. Quality is earned checks divided by possible checks. Strict counts cases passing every public-suite check; structure is measured separately. Success alone doesn't establish semantic accuracy.
- **Speed:** Prefill processes the input prompt; decode generates the response. The recorded rates are request-level medians from server measurements, not aggregate throughput or concurrent-user capacity.
- **Timing:** Latency and time to first token (TTFT) measure different parts of a request. Most rows have no recorded TTFT. An em dash means unrecorded, not zero.
- **Run status:** A short probe or service smoke test checks a narrower behaviour than a completed evaluation. Use the status filter to keep those results separate.
- **GPU allocation:** The machine inventory shows installed GPUs. The row-level allocation shows which GPUs the run used.

Check sample counts and missing measurements in the details view before drawing a conclusion. A missing retry count doesn't mean zero retries, and a reported-only row doesn't carry the same evidence as a recovered result file.

## The five configurations

These are the hardware configurations recorded for the benchmarks. The table lists installed memory; the downloadable data also retains memory reported by the operating system where available.

| Configuration | CPU | Installed memory | Installed accelerators |
| --- | --- | --- | --- |
| Xeon workstation | Xeon Gold 6242R | 256 GB DDR4 | 2 × RTX 4060 Ti, 16 GB each |
| Ryzen workstation | Ryzen 5 9600X | 32 GB DDR5 | 2 × RTX 4060 Ti, 16 GB each |
| B70 workstation | Core i5-11600K | 128 GB DDR4 | Arc Pro B70, 32 GB |
| A770 workstation | Core i5-12600K | 32 GB DDR4-3200 | Arc A770, 16 GB |
| 5090 workstation | Core Ultra 9 285K | 64 GB; memory type unrecorded | RTX 5090, 32 GB |

## Check your own setup

The ledger runs in your browser using the JSON file shipped with the page. It doesn't need an account, model endpoint, or access to the lab network. You can download the full snapshot even without JavaScript.

The measurements were copied without rescoring. The snapshot keeps all 129 row IDs, duplicate relationships, numeric results, group summaries, and recorded performance distributions.

Private paths, service addresses, raw prompts and responses, and raw per-case records are omitted. System labels describe the hardware rather than private hostnames. The JSON includes the source ledger's SHA-256 hash and compilation time so you can identify the snapshot being compared.

To test another model or serving configuration, use [AKM Model Eval](https://github.com/itlackey/akm-model-eval/tree/8a4f70668ecb0c649fbb402faf19b37a764f06c0). Its [public test corpus](https://github.com/itlackey/akm-model-eval/tree/8a4f70668ecb0c649fbb402faf19b37a764f06c0/corpus), [runner and scoring logic](https://github.com/itlackey/akm-model-eval/blob/8a4f70668ecb0c649fbb402faf19b37a764f06c0/bench.py), and [reproduction instructions](https://github.com/itlackey/akm-model-eval/blob/8a4f70668ecb0c649fbb402faf19b37a764f06c0/README.md#quick-start) are available in the repository. Start by verifying the corpus, then run and score the selected cases with a distinct label for each configuration.

The article and dataset are in the [website repository](https://github.com/fwdslsh/website). [How this site is built](/blog/posts/how-this-site-is-built.html) explains the publishing process.

Use the same suite revision when comparing results, and check that the selected cases finished before treating a score as final. That gives you a repeatable way to compare the quality and speed your own setup delivers.
