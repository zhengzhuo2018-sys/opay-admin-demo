# OPay × Arco Design System

## 设计原则

- Arco Design React 负责组件结构、交互语义和可访问性基础。
- OPay Token 负责品牌颜色、后台密度、文字层级、间距与布局。
- 页面和业务组件只使用语义 Token，不直接写品牌色十六进制值。
- 品牌绿与业务成功色分开：品牌绿表示主操作和选中态，成功色只表示业务结果。
- 常规页面必须先在 OPay Figma 文件中确认具体节点，并以该节点的真实模块、字段、状态、文案和操作为实现依据，不自行补造业务内容。
- 明确属于验收阶段的新增模块、字段微调或全新页面测试不受上一条内容限制，但必须沿用既有 OPay Token、布局和组件模式。
- 原始截图中的重复侧栏、重复客服浮层和裁切异常不作为设计规范。

## Token 分层

1. Primitive：`--opay-green-*`、`--opay-navy-*` 等原始色阶。
2. Semantic：`--color-brand`、`--color-text-primary`、`--color-surface-page` 等用途变量。
3. Component：通过 `arco-theme.css` 把语义变量映射到 Arco 的 `--primary-*`、文字、边框、填充与圆角变量。

## 基准值

- Brand：`#1DC997`
- Primary text：`#102137`
- Page surface：`#F4F7FA`
- Panel surface：`#FFFFFF`
- Warning：`#FF8A00`
- Divider：`#E7ECF2`
- Spacing：4px 基准网格
- Control radius：4px
- Panel radius：8px
- Sidebar：224px
- Header：52px（由 `--layout-header-height` 统一控制）

## 使用规则

```css
/* 推荐 */
color: var(--color-text-secondary);
padding: var(--space-4);
background: var(--color-surface-panel);

/* 禁止 */
color: #30465f;
padding: 16px;
background: #fff;
```

例外：数据可视化需要的图表色可以在独立的数据色板中维护，但仍不得散写在页面中。

## 自动化门禁

```bash
pnpm check:tokens
pnpm test:visual
```

- `check:tokens` 扫描 `src` 中的原始十六进制颜色，以及直接写入 CSS/内联样式的间距、字号和圆角像素值。
- `tokens.css` 是唯一允许定义原始设计值的源文件。
- Playwright 保存桌面端和移动端基准图；只有确认视觉变化符合设计意图后才能执行 `pnpm test:visual:update`。

视觉回归首次运行：

```bash
pnpm test:visual:install
pnpm test:visual:update
```

首次生成的基准图需要人工确认后提交。后续日常开发运行 `pnpm test:visual`；出现差异时先查看报告，仅在确认改动符合设计意图后更新基准图。

## 页面模式

组件的可变属性、固定视觉规则、跨页面适用范围和更新机制见 [`COMPONENT_RECIPES.md`](./COMPONENT_RECIPES.md)。三个基准页面用于验证规则，不是组件的使用边界；页面模式负责整体骨架，模块细节必须优先复用对应组件配方。

### 列表页

统一使用 `src/components/patterns/ListPage.tsx` 组织以下区域：

- 页面通知
- 标题与工具栏
- 筛选区
- 数据表格
- 分页区

业务页面只定义筛选字段、表格列、模拟数据和业务状态，不复制列表面板结构。`Transaction History` 是第一张列表模式基准页面。

`Card Management` 进一步验证列表体系可以跨业务复用：六项筛选、卡片数据表、固定操作列与分页均沿用列表组件；页面上方的五项数量统计使用 `MetricCard` 的 `compact` 变体，而非重新制作一套指标卡。

### 详情浏览页

统一使用 `src/components/patterns/DetailPage.tsx` 组织页面标题、信息内容区与底部操作区。具体详情模块必须以对应 OPay 设计稿为准，不为填满通用模式而补造业务信息。

`Transaction Details` 基准页包含 `Order Info`、`Amount Info`、`Merchant Info`、`Sender & Recipient Info` 和 `Refund Info` 五组信息，底部仅保留 `Cancel` 操作。页面路由为 `/transactions/:transactionId`，列表页路由为 `/transactions`。

### 信息编辑页

统一使用 `src/components/patterns/EditPage.tsx` 组织页面标题、状态标签、左右分区与底部固定操作栏。字段宽度、操作栏高度和分区比例只通过 Edit Page Token 调整。

`Add Team Member` 使用 `centered` 变体承载无侧栏的分步编辑流程，路由为 `/team/members/new`。其字段、标签与步骤严格来自 OPay Figma；Next 位于表单内容区中央，与原稿保持一致。

### 数据看板页

统一使用 `src/components/patterns/DashboardPage.tsx` 组织筛选栏、统计周期和模块流；页面中的模块统一从 `src/components/dashboard` 导入。`Overview` 是数据看板基准页。

看板页面允许定义模块网格和模块高度，不允许在页面内重新实现标题容器、指标卡、收支汇总卡、成功率卡、空状态或 IN/OUT 切换器。

### 复杂弹窗

统一使用 `src/components/complex-modal` 中的 `ComplexModal`、`ComplexModalSection` 和 `ComplexModalActions` 组织标题栏、滚动内容、业务分区与底部操作。`POS-poslist pos支付` 是第一张复杂弹窗基准页，路由为 `/pos/apply`；底层 POS List 保持可见，弹窗内容严格来自 OPay Figma 对应截图。

业务弹窗可以定义字段、产品卡、费用计算和提示内容，但不得在页面 CSS 中覆盖 `.complex-modal-*` 规则。若出现新的稳定弹窗结构，先扩展公共组件和 Token，再由页面组合。

### 简单弹窗

统一使用 `src/components/simple-modal` 中的 `SimpleModal` 组织标题栏、遮罩、单区内容与左右分置的底部操作。`Team Members / Alternate OTP Receiving Method` 是简单弹窗基准页，路由为 `/team/members/alternate-otp`，背景页为真实的 Team Members 列表。

简单弹窗适用于确认、单字段补充和轻量提示；多分区、长表单或需要内容区滚动的任务继续使用复杂弹窗。
