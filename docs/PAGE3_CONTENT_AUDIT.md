# Page 3 content correction — 2026-10-21

User authorization: audit all three new pages and the refund modal, not just annotated nodes; remove unauthorized additions, retain native Arco presentation, preserve the accepted seven pages, and prevent recurrence. This document is an implementation record, not business UI.

Later user-requested logo alignment correction: the original 90×26 SVG artwork occupies approximately y=0.20–22.10, placing its visible center about 1.85px above its canvas center. The original file and rendered dimensions remain unchanged; a 2px shell-only optical offset centers the visible logo within the existing header. No page content or header geometry changed.

## Root cause

1. Implementation uncertainty was incorrectly treated as permission to add permanent subtitles, alerts, source labels and explanatory cards.
2. Reusable list/dashboard patterns were populated with optional headers, filters, derived metrics and flows even when those had no source evidence. Arco determines component presentation, not business content.
3. Unexpected source copy was silently rewritten, including the refund modal title. Ambiguous data was substituted or interpreted instead of preserved as provided.
4. Existing delivery checks tested compilation, tokens, imports and business helpers, but had no source-content or confirmed-page change gate. Passing these checks did not prove source fidelity.

## Full audit (including unannotated content)

Figma file: `mlRDG9hIrpSETYdxa1ICbu`. High-fidelity child context and renders were checked; layer names alone are not reliable text content.

| Surface | Verified source | Unauthorized additions removed / corrected |
| --- | --- | --- |
| Dashboard banners | `92:2136`, `92:2312` | Removed source prefixes; restored actual rating and message text. Removed invented rating/comment modal. The existing source action reports an unavailable integration only when invoked. |
| Dashboard metrics | `92:2414` | Removed source-snapshot footnotes and invented unknown-POS warning; preserved the literal source POS-unit currency string without asserting it is a corrected device count. |
| Dashboard quick actions | `92:2318` | Kept six source actions and existing verified route links; removed explanatory tooltips and added receipt/refund header links. Unbuilt branch actions stay disabled. Refund remains directly reviewable at its established URL. |
| Dashboard chart | `92:2079`, source marker geometry `92:2116–2129` | Removed invented 0–100 relative-index data, Chart/Data toggle, index table, illustration badge and reconciliation explanation. Plot uses original marker geometry and axis/day labels; no daily measurement tooltip is invented. Only source period “This week” is supplied. |
| Deal carousel | `92:2369` within `92:2318` | Kept source columns and four rows. Removed added example count, derived sum and explanatory footer. Do not fill space by inventing metrics. |
| Settlement header | `92:1810` | Restored `[Michael Test] Settlement`, Download and original information labels; removed dataset subtitle. |
| Settlement amounts | `92:1844` | Kept four values and literal source reason/View action. Removed editorial conflict alert and explanation drawer; contradictory wording is recorded here, not rewritten as product copy. |
| Settlement list | `92:1695` | The original contains the two settlement tabs and table, NOT an extra “Settlement details” heading, date/branch filter form, reset/search row or source-count summary. Removed these additions and the invented row/settings drawers. |
| Settlement pagination | `92:1697–1738` | User explicitly requested complete pagination. Uses native Arco numbered/ellipsis/previous/next/jump/page-size controls, source total 6210 and source default 7 per page. Local rows repeat the eight supplied fixtures to exercise navigation; they are not 6210 independently sourced records. Last page at 7/page has one row; no live financial data is fetched. Branch-tab data is absent and uses native Empty. Download exports displayed rows only. |
| Receipt header/branch metadata | `92:1884`, `92:1941–1960` | Removed added page subtitle, reference-snapshot title, source-selection suffix, branch-association explanation and Back-to-dashboard control. Branch code/name/search value are preserved literally; their relationship is not invented. |
| Receipt settings group | `92:1962–1996` | Restored the actual business scope warning and setting descriptions without Source scope/local-preview additions. Settings, field selection, previews and actions share one native Card group. |
| Receipt fields | `92:1908–1938`, `92:1997` | Retained eight Purchase fields and five Transfer fields, all labelled Terminal ID, with the last Transfer field unchecked. Removed Source slot/Source sample columns, repeated-label badge and schema explanation. Native up/down and checkbox controls adapt the source movement/selection affordance without inventing semantic field names. |
| Receipt previews | `92:1894–1907` | Removed content-preview/integration disclaimer, saved/unsaved tags and Reset changes action. Source radio labels, headings, full literal preview strings, Cancel and Submit are retained. Crucially, removed the unverified split-string-to-Terminal-ID mapping. Both provided preview strings are opaque identical source text; changing field order/format does not fabricate a QR payload or undocumented terminal schema. Choices save in memory only. |
| Refund modal | `92:3477`, title `92:3498`, action `92:3487` | Restored exact “Settlement Amount” title and source “Refoud” button spelling. Removed permanent standalone/source-example alert, invented source suffix, sample/optional placeholders, reason counter, invented length limits and extra validation-result/edit/done screen. Original form labels/required fields remain. Basic validation is local; invoking the action reports missing refund service, never success or money moved. |

## Deliberately not inferred

- The source amount reason conflicts with its displayed figures; no new reason is fabricated.
- Source settlement summary dates and table dates differ; both remain as given, without an added reconciliation narrative.
- The original POS-unit value includes currency; no corrected count is asserted.
- Branch metadata and search selection differ; no cross-branch relationship is assumed.
- All receipt labels are repeated Terminal ID; there is no verified field-to-payload mapping.
- The refund amount is not linked to an arbitrary transaction; eligibility and backend action are not simulated as successful.
- Original spelling/grammar anomalies remain pending explicit approval to edit copy.

## Stable update contract

`AGENTS.md` now makes the boundary explicit: source-defined content + user-approved additions only. Arco presentation is not authorization to add content. Source ambiguities belong in this record or the handoff, not persistent business UI.

`tests/contracts/source-content.json` stores reviewed source-node mappings and exact SHA-256 content/structure baselines for all ten full-page components, the refund modal and Page 3 data. The original seven are locked as preserved, not retrospectively claimed to have been re-audited. `pnpm check:source-content` is invoked before every production build. It also rejects common editorial leakage in this batch and new full-page components without a source contract. There is deliberately no “update all snapshots” command. A legitimate change requires reviewing the user-authorized diff, documenting the source, and updating only the affected contract entry. This is a strict regression/change-review gate, not a semantic guarantee that arbitrary source content is correct.

Shared ListPage allows omission of its optional heading without changing any titled accepted-page render. Native validation/Empty/Pagination labels are operational UI, not newly invented business modules. The later user clarification is absolute: implementation/integration explanations belong only in submission documentation, and must not be reintroduced through action-time messages or other UI states. This clarification supersedes the earlier action-time explanation exception. No production API has been added, no real refund/settlement occurs, and no terminal configuration is transmitted.

## Validation completed

### Later authorized visual update — 2026-10-21, eight browser comments

User explicitly requested original Page 3 dashboard layout, a stronger illustrated rating banner with centered content, a loudspeaker notice icon, richer native Arco metric/shortcut cards, a smooth area-line chart matching the supplied Arco examples, and receipt branch-row alignment. This supersedes only the prior presentation of Dashboard and the receipt metadata row, not the content boundary or accepted-page freeze.

- Verified against `92:2414`, `92:2079`, `92:2318` and `92:2136`: left column contains metrics then trend; right column contains the six shortcuts in 3×2 then deal rows. Metric labels, source values and deal records are unchanged. No comparison rates, mini-chart datasets or aggregate example counts are added.
- Original illustration `92:2142` was exported as an unedited SVG, root size 191×86, and used in its original banner slot. Banner text and action are vertically grouped and centered. Native Alert uses Arco IconSound.
- Native Card/Statistic/Avatar/Button components provide the metric and shortcut presentation. Their decorations do not encode invented measurements. Feedback and withdrawal have no supplied workflow and are disabled without implementation-explanation tooltips/messages.
- Arco React core has no Chart component. Official Arco Pro uses BizCharts over G2. This update uses the same underlying G2 4.x directly (`@antv/g2@4.2.12`) to avoid BizCharts' discontinued React reconciler, with smooth Line/Area and native Pro color tokens. Source marker heights are transformed only as drawing geometry; daily financial tooltip values remain disabled. Official recipe: https://github.com/arco-design/arco-design-pro/blob/main/arco-design-pro-next/src/components/Chart/overview-area-line.tsx .
- Receipt metadata retains exactly Branch Code, Branch Name and Branch Search. Native vertical Descriptions and center-aligned Grid place labels and values on consistent baselines with explicit space below the tabs. No setting fields or behavior change.
- The source-content gate correctly rejected the two changed page files before review. Only these explicitly authorized entries and the new source-derived chart component receive reviewed baselines; the other ten prior file baselines remain unchanged.

- `pnpm test:page3`: 13 passing cases, including source plot geometry, original opaque receipt previews, pagination boundaries and local refund guards.
- `pnpm test:team`: all 9 existing cases still pass.
- `pnpm test:source-content`: 6 passing cases, including deliberately changed titles, extra form modules, editorial leakage, missing provenance and unreviewed new pages. These negative cases are rejected without editing accepted files or regenerating baselines.
- `pnpm check:source-content`: all 12 reviewed file baselines match. Token and clean-room checks pass, TypeScript/production build passes, and `git diff --check` passes.
- Browser review: settlement page 2, jump to last page 888 (one fixture row), page-size change; receipt source grouping and session save; refund original title/labels with required-field validation and truthful disconnected-service response (no invented result screen); dashboard source notices/metrics and no added example totals. Console error list is empty.
- Responsive checks at 390×844: all three full pages have no document-level horizontal overflow, refund width is 358px with scrollable body, and receipt fields/actions fit. Temporary viewport override was reset. Existing broad visual snapshots were not regenerated.
