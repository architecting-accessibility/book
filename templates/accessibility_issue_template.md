# Accessibility issue reporting: recommended fields and guidance

This guide describes the information to capture when reporting an accessibility issue in an issue tracker such as Jira, YouTrack, GitHub Issues, or Azure DevOps. It is **a reference for designing and writing tickets**, not a form that must be filled in here. Teams can adapt the field names and structure to their own workflows.

A useful accessibility issue report explains **what the barrier is, whom it affects, how to reproduce it, and how to verify a fix**. Keep the title understandable without requiring readers to know WCAG terminology. Report one distinct barrier per issue where practical, and link repeated instances or related defects rather than creating unnecessary duplicates.

## 1. Describe the issue

| Field | What to record |
| --- | --- |
| **Summary** | A concise, specific description of the accessibility barrier, ideally identifying the affected element or behaviour. Describe the problem rather than using only a WCAG criterion as the title. **Example:** “Keyboard focus moves behind the open dialog.” |
| **Location(s)** | The pages, URLs, routes, components, templates, journey steps, or code areas where the issue can be found. Include direct links where possible. |
| **Known instances** | Confirmed occurrences of the same issue - listing specific elements affected by the issue. If it affects a shared component (for example, the site header), say so and indicate its likely reach. Distinguish confirmed instances from suspected ones. |
| **Observed outcome** | What actually happens when the affected content or feature is used. Be specific and avoid interpreting the behavior prematurely. |
| **Expected result** | The accessible behavior that should occur instead, phrased so it can be tested. |

## 2. Explain the accessibility impact

| Field | What to record |
| --- | --- |
| **Why it matters** | Explain the practical effect on users. **Example:** “Keyboard users cannot reach the dialog’s controls, preventing them from completing the task.” |
| **People affected** | Identify relevant user needs or interaction methods (for example, keyboard-only users, screen reader users, users with low vision, or people using speech input). Avoid assuming that everyone within a disability group experiences the same barrier. |
| **WCAG success criterion and level** | Record the applicable WCAG version, success criterion number and title, and conformance level where a failure can be substantiated. **Example:** “WCAG 2.2 — 2.4.3 Focus Order (Level A).” Add other applicable standards or organisational requirements if needed. Not every usability concern necessarily constitutes a WCAG failure. |
| **Severity** | Assess the degree of harm or obstruction for affected users using the team's defined scale (for example, Low / Medium / High / Critical). Consider whether the barrier prevents task completion, has a workaround, or affects a critical service. |
| **Priority** | Specify when the organisation intends to address the issue, taking account of severity, frequency, affected journeys, legal or contractual obligations, and release plans. Priority is **not the same as severity**. |

## 3. Make the issue reproducible

| Field | What to record |
| --- | --- |
| **Affected platforms** | The contexts where the issue is confirmed (for example, desktop layout, responsive mobile web, or all tested platforms). Avoid claiming universal impact unless it has been verified. |
| **Test environment** | Application version or build, test/production environment, browser and version, operating system, device or viewport, and assistive technology and version where applicable. **Example:** “Staging build 1.8; Windows 11; Firefox; NVDA.” |
| **Reproduction steps** | Numbered steps starting from a known state, with any prerequisites or test data needed. Include relevant keyboard commands or assistive technology settings. Aim for a result another tester can reliably reproduce. |
| **Additional evidence** | Attach or link annotated screenshots, recordings, accessibility tree details, console output, or screen reader transcripts when useful. Evidence supplements written reproduction steps rather than replacing them. Consider privacy and avoid exposing personal or sensitive information. For annotated screenshots, a tool such as [Flameshot](https://github.com/flameshot-org/flameshot) may help. |
| **Detection scope** | How the issue was found, for example an internal QA review, automated check, external accessibility audit, or user report. Note the testing scope where relevant: automated findings should be checked before being stated as confirmed failures. |

## 4. Guide remediation and closure

| Field | What to record |
| --- | --- |
| **Possible fixes** | Offer practical, non-prescriptive remediation guidance when the cause is understood. Link to official references, such as the [WCAG Understanding documents](https://www.w3.org/WAI/WCAG22/Understanding/), and note when several valid implementations may exist. |
| **Acceptance criteria** | Define observable conditions for closing the issue. Examples: the expected accessible behaviour is confirmed in target environments; all known instances are addressed; relevant manual checks are repeated; and appropriate automated or manual regression coverage is documented or added. Do not demand automated tests for behaviours automation cannot meaningfully verify. |
| **Related issues** | Link duplicates, underlying component defects, blockers, and related tickets to support coordinated remediation. |

## 5. Use the issue tracker's built-in workflow fields

Most trackers already provide **Assignee**, **Reporter/Created by**, and **Status**. Prefer these native fields rather than duplicating them in the description. Teams may also configure custom fields for severity, priority, affected platform, or WCAG criteria if those values need to be filtered, reported on, or used in dashboards.

## Suggested ticket organisation

A practical order within the tracker is:

1. **Overview:** Summary, location(s), known instances.
2. **Impact:** Why it matters, people affected, WCAG references, severity and priority.
3. **Verification:** Observed outcome, expected result, test environment, affected platforms, reproduction steps, and evidence.
4. **Resolution:** Possible fixes, acceptance criteria, related issues.
5. **Workflow metadata:** Assignee, reporter, and status through native tracker controls.

## Reporting tips

- **Use precise, neutral language.** Describe the behaviour and its impact; do not frame the user or assistive technology as the problem.
- **Separate facts from assumptions.** Label unverified locations, root causes, or user impacts as hypotheses.
- **Avoid duplicate tickets for every occurrence of one shared defect.** Record confirmed instances and link related issues, unless separate fixes or ownership require separate tickets.
- **Keep evidence accessible.** Provide text descriptions alongside images or recordings and ensure attachments can be accessed by those responsible for remediation.
- **Verify fixes with the relevant interaction method.** Passing an automated scan alone does not necessarily resolve a keyboard, screen reader, or usability barrier.

> **Illustrative issue title:** “Search suggestions cannot be selected using a keyboard” — preferable to “WCAG 2.1.1 failure,” because it immediately identifies the user-facing problem.