# Arco Pro clean-room rebuild

The previous implementation is frozen on branch `archive/arco-wrapper-attempt` at commit `9e2eff0`.

The active rebuild lives under `src/arco-pro`. It may read business-only sources such as navigation labels, routes, types, and mock data. It must not import legacy pages, legacy layout components, OPay theme overrides, or the old global stylesheet.

The shell follows the official Arco Design Pro structure: a full-width 60px header, native Layout and Sider, native Menu nesting, native Breadcrumb, a capsule Search input, circular secondary icon buttons, and a content area on Arco background tokens.

The header uses the official `@arco-themes/react-arco-pro` package as the visual baseline. The product identity uses the existing OPay logo asset, while wider OPay color mapping across Arco components is intentionally deferred.

The only intentional internal selector override in the shell is the search input wrapper radius. It matches the official Arco Pro navbar implementation and is isolated to the search component.

## Delivery gates

1. Shell at desktop, laptop, tablet, and mobile widths.
2. Overview rebuilt as an Arco Dashboard page.
3. Transaction History rebuilt as an Arco Search Table page.
4. Remaining eight representative pages migrated only after the first-stage review.

Run `pnpm check:cleanroom`, `pnpm check:tokens`, and `pnpm build` before each review.

## Migration status — 2026-10-21

- Overview and Transaction History retain the accepted presentation.
- Transaction Details now uses native Card, Descriptions, Tag and Empty components. The history ID and eye actions open the selected transaction; Cancel returns to history. Only the reference transaction has a complete detail fixture; other rows use their own known list fields and show missing values as a dash.
- POS List now uses the shared clean-room list pattern, native Form, Table and Pagination. Installation date, POS type and POS SN can be searched and reset. The merchant selector preserves the single merchant supplied by the POS fixture.
- Apply for POS is available at `/pos/apply`: native Form validation, four supplied product prices, InputNumber quantities, pickup city, insurance choice, fee summary, cancellation and a local validation result. The preview does not submit a payment. An insurance quote is not present in the source, so selecting insurance leaves the premium unspecified and prevents payment confirmation.
- POS transfer history, applications, office information and row-level actions retain information panels with empty states where source data or complete flows have not been supplied.

Clean-room list screens reuse `src/arco-pro/patterns/ListPage.tsx`. The frozen `src/components/patterns/ListPage.tsx` imports the old OPay stylesheet, so it is not consumed by the rebuild. The new pattern retains the title/actions/filters/results composition slots and imports native Arco components only.

## Team batch — 2026-10-21

- `/team/members` uses the native search-table pattern: account/branch filters, Search/Reset, seven supplied assignments, real pagination totals, source roles, BAPP login, BVN/NIN and alternate OTP. The original roles are normalized without treating the wrapped `Payout Authorizer` label as two separate roles.
- `/team/members/new` uses native Steps and Form: Account Info → Password → Role. It validates email/phone fields, password confirmation, required branch/roles and duplicate account/branch pairs. BAPP-off skips password entry. Success returns to the list or opens the assigned role's permission configuration.
- `/team/permissions` is an explicitly identified acceptance-preview addition. Role names come from the source records, but the fine-grained OPay permission matrix has not been supplied. The example module/action catalogue is not represented as verified OPay policy. No role, including Super Admin, receives inferred default grants. Checkboxes support per-action, per-module, all/clear, reset, save and discard prompts on the page's back/role-switch controls. Assigned members are listed and source roles remain unchanged.
- Member creation, OTP choices and permission saves affect the current in-memory preview only, survive internal navigation and reset on reload. Password inputs are cleared before the role step and never stored in member records, browser storage or sent to a server. No live account is created, invitation sent, authorization enforced or OTP delivery changed.
- Alternate OTP follows the original warning and email validation; it updates matching account assignments together and is no longer editable after saving within the preview. Bulk import is explicitly unavailable. BVN/NIN opens a known-information panel explaining that real verification is not connected; no identity data is collected or verification fabricated.
- The shared clean-room EditPage pattern and optional list-page class allow team-only responsive typography without restyling accepted Overview, Transaction History, Transaction Details or POS pages. Only the Team navigation gains a Permissions item.

Validation: `pnpm test:team` covers nine business-data cases. Browser checks cover required fields, mismatched passwords, BAPP-off, creation/list linkage, role save/list linkage, unsaved-page-back warning, duplicate account/branch rejection, OTP validation and 390px page-level overflow. Run the delivery gates above after changes.

## Approved final ten-page scope

Counts are full pages; associated modals are acceptance states, not extra pages. “Delivered” means the Arco presentation and documented local-preview interactions, not production API integration.

| Page | Route | Source | Status |
| --- | --- | --- | --- |
| Overview | `/overview` | Existing approved reference | Delivered, preserved |
| Transaction History | `/transactions/history` | Existing approved reference | Delivered, preserved |
| Transaction Details | `/transactions/:transactionId` | Existing reference | Delivered; non-reference detail data remains partial |
| POS List | `/pos` | Existing reference | Delivered; secondary POS flows remain partial |
| Team Members | `/team/members` | Page 1 `1:74`, OTP `1:78` | Delivered, local preview |
| Add Team Member | `/team/members/new` | Page 1 `1:77`; downstream steps extend the acceptance flow | Delivered, local preview |
| Permissions | `/team/permissions` | User-requested acceptance addition; OPay matrix pending | Delivered, local preview |
| Business Dashboard | `/dashboard` | Page 3 `92:2023` | Delivered, source preview |
| Settlement | `/settlement/list` | Page 3 `92:1654` | Delivered, source preview |
| POS Receipt Configuration | `/settings/pos/receipt` | Page 3 `92:1871` | Delivered, local preview |

Associated modals: Apply for POS (delivered), Alternate OTP (delivered), Page 3 Refund `92:3477` (delivered at `/dashboard/refund`). The current Overview is preserved; the Page 3 Dashboard has a distinct business-workspace role and all new content uses one canonical navigation rather than copying inconsistent sidebars from the source frames. Unmigrated routes continue to display the shell-stage page.

## Page 3 batch — corrected after full source-content audit

The three new pages and refund modal use native Arco presentation with source-defined business content. The previous source/preview disclaimers, extra filters, metrics and invented result flows have been removed. See [PAGE3_CONTENT_AUDIT.md](./PAGE3_CONTENT_AUDIT.md) for the complete node-by-node audit, root cause, preserved source anomalies, local pagination fixture and integration limits.

- Dashboard retains its original notices, metrics, quick actions, source chart geometry and deal rows; no editorial source labels, extra derived metrics or invented Chart/Data/feedback flow.
- Settlement retains its original header, amounts, reason, two list tabs and complete native pagination. The source total is 6210 with 7/page; local pagination repeats only the supplied row fixtures rather than claiming additional sourced records. No extra list heading, filters or editorial drawers.
- Receipt settings, original field selections, opaque source previews and Submit/Cancel form one group. No field/schema relationship is inferred by splitting the sample string. Saved choices are in memory only, not transmitted to terminals.
- Refund retains the exact original title “Settlement Amount” and form. No permanent disclaimer or invented result screen; missing service is reported only upon action, and no money is moved.
- The seven accepted page component files remain untouched. A 12-file source-content/structure contract now runs before every production build, with explicit source mappings and no automatic baseline regeneration.

Validation: Page 3 business checks (13 cases), Team checks (9 cases), source-content contract, clean-room policy, token policy and production build; focused browser checks of all four corrected surfaces. Broad visual snapshots are not blindly regenerated.

## 最终提交说明：源稿疑点与内容边界

以下内容仅用于最终提交文档，不作为业务界面的新增说明。开发说明不得进入标题、描述、提示条、卡片、工具提示、弹窗、空状态或临时反馈；也不得将已删除的说明换个位置重新加入。原稿确实存在的业务提示予以保留。

| 项目 | 核查事实与待确认事项 | 交付处理 |
| --- | --- | --- |
| POS 数量使用金额格式 | Page 3 `92:2458–2459` 的 “Number of POS units” 显示为 `₦3,829.00`，数量与货币单位不一致。 | 保留原稿字面值，不擅自解释为已确认的设备数量；正确单位及数量待业务确认。 |
| 结算原因与金额不符 | `92:1844` 显示结算金额 ₦40,000.00、费用 ₦0.00，但原因文案称结算金额小于费用。 | 保留原稿金额和文案，不编造原因，也不在页面增加开发者解释；真实原因待业务确认。 |
| 退款示例与交易金额的关系 | `92:3477` 退款示例为 ₦10.00。此前“退款金额超过交易金额”的说法依赖其与邻近交易示例的关联，而该关联尚未获得源稿证实。 | 将其列为待核实问题，不写成已证实的超额退款；不关联现有交易，不推断可退额度、资格或真实资金结果。 |

其他源稿日期、分支信息及小票字段对应关系疑点见 [PAGE3_CONTENT_AUDIT.md](./PAGE3_CONTENT_AUDIT.md)，最终交付时随文档保留，不转化为页面上的额外提示。本次仅更新项目规则和提交说明，未修改页面、数据或交互。
