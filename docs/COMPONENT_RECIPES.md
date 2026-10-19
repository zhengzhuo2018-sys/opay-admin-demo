# OPay 组件配方

本文档定义经过视觉校准后允许在业务页面中复用的组件。页面负责提供真实业务数据和排列模块，不得复制组件内部结构或覆盖内部字号、间距、颜色与图标。

## 使用边界

- 页面级文件只负责：路由、业务数据、筛选状态、模块顺序和响应式网格。
- `src/components/patterns` 负责五类页面模式的整体结构。
- `src/components/dashboard` 负责看板模块的稳定视觉结构。
- `src/styles/tokens.css` 是颜色、字号、间距、圆角和组件尺寸的唯一数值来源。
- 所有中性内容分割线统一使用 `--color-divider`；彩色数据线、控件边框与卡片轮廓不属于分割线。
- 所有页面模式、卡片、标题栏、筛选栏、标签栏和弹窗中的结构性分割线，必须使用 `--component-divider-inset`（桌面端 24px）对齐内容页边距；移动端使用 `--component-divider-inset-compact`。底部分割线使用 `.opay-inset-divider`，顶部分割线使用 `.opay-inset-divider-top`。表格行线、控件边框和卡片外轮廓不使用该规则。
- 新需求先判断能否通过组件属性和数据结构实现；不能实现时先扩展组件，再由页面使用，禁止在页面 CSS 中穿透覆盖组件内部类名。

## 全局导航

侧栏按 OPay 原稿拆分为两个语义表面：品牌区使用 `--color-surface-brand`，必须与主页面底色一致；导航目录区使用 `--color-surface-navigation`，必须与顶部横栏底色一致。不得在页面或单个菜单项中使用近似灰色模拟这两个表面。

全局顶栏与品牌区统一使用 `--layout-header-height`，当前基准高度为 52px。缺少正式品牌素材时，临时 OPay 字标由 `--brand-mark-*` Token 和品牌文字共同构成，必须保留绿色开口圆环、水平切口和紫色 `Pay` 的基本比例；获得品牌手册与正式 SVG 后只替换字标内部素材，不改动侧栏结构和占位尺寸。

一级导航图标必须按业务语义一对一映射，同一导航层级不得重复使用同一个图标。图标统一从 Arco 线性图标库选择，并继承 `app-nav-icon` 的尺寸、颜色和描边粗细；新增目录时，应先检查现有 `navigationItems`，再选择尚未使用且与业务动作或对象最接近的图标。

侧栏末尾的独立工具入口使用 `NavigationItem.separated` 建立新分组。组件会在入口上方统一增加 8px 分组留白和内缩分割线；`Replicate` 固定使用该模式，不得依赖菜单序号或页面选择状态单独覆盖样式。

普通一级与二级导航项采用连续目录布局，纵向间距固定为 2px；普通目录项及展开容器必须使用透明背景，直接露出统一的侧栏底色，禁止继承 Arco 的白色按钮面形成卡片缝隙。所有目录按钮、悬停背景和选中背景均为直角，禁止单独添加圆角。选中态依靠浅绿色背景、品牌色文字和左侧无圆角矩形指示条表达，不通过明显卡片间隔建立层级。

## 看板组件

看板页面使用 `DashboardPage` 统一承载顶部筛选栏、交易周期和模块内容。顶部筛选栏必须紧贴全局顶栏，并横向延伸至内容区域两端；交易周期和业务模块继续遵循页面内容留白，禁止把筛选栏制作成悬浮卡片。

### `DashboardSection`

统一模块容器，固化左侧绿色标题标记、18px/600 标题层级、标题与内容间距及右侧操作区。

- 可变：`title`、`help`、`extra`、业务内容、用于模块高度的页面级 `className`。
- 不可变：标题字号/字重、绿色标记、卡片内边距、帮助图标颜色。

### `MetricCard`

统一账户指标卡。`tone` 仅允许 `green | blue | purple | yellow`，并同时决定渐变背景和辅助图标，避免页面自行组合不一致的颜色与图标。

- 可变：`label`、`value`、`tone`、`help`。
- 不可变：圆角、内边距、数值层级、装饰图形位置。

`variant="compact"` 用于列表页中的紧凑数量指标。该变体固定为白色面板、细描边、居中文案和紧凑数值层级，不使用看板插图或彩色渐变；页面只传 `label` 与 `value`。

### `SummaryCard`

统一 Inflow / Outflow 汇总卡。组件固化以下规则：

- 上深下浅的方向渐变；
- 分割线与卡片边框同色；
- 总额、方向标题、明细金额和笔数的层级；
- 金额紧跟业务名称，不使用两列拉伸对齐；
- 第二组产品数据底部对齐；
- 产品图标由语义键选择，页面不直接传图标节点。

业务数据使用 `SummaryRow`：

```ts
{
  label: 'Loan Repayment',
  amount: '₦ 0.00',
  count: '0 Txns',
  icon: 'repayment',
  iconTone: 'loan'
}
```

`icon` 只允许组件导出的语义类型。若 OPay 提供了新的正式素材，先在组件内部补充语义映射，再更新数据。

### `SuccessMetricCard`

统一成功率指标卡。数值必须使用 `--color-text-primary` 和加粗层级，避免退回浅色数据结果。

### `EmptyDashboardModule`

统一暂无数据状态；`withAxis` 用于趋势图空态，并附带坐标基线和图例。页面不得自行拼装另一个空状态。

### `DashboardToggle`

统一 IN / OUT 维度切换的静态呈现。当前测试范围不包含动态交互，`active` 仅控制展示状态。

### `DashboardHelp`

统一帮助入口的尺寸、品牌色和提示内容。业务页面不得直接使用另一套问号图标样式。

## 列表页组件

列表页先使用 `ListPage` 固定标题、通知、操作区、筛选区、表格区和分页区，再从 `src/components/list` 组合下列组件。

### `ListFilterField`

统一筛选项的标签层级、控件宽度、字段间距与帮助提示。页面只传标签、提示文案和 Arco 表单控件。

筛选控件按输入意图保留明确的视觉差异：文本输入框使用浅灰填充、无可见描边；下拉框和日期选择器使用白色表面、浅灰描边。悬停与聚焦状态只能增强各自既有层级，不得通过页面 CSS 将两类控件改成相同外观。该规则由公共 Control Token 和 `ListFilterField` 维护，并覆盖 Transaction History、Card Management、POS List、Team Members 等所有列表筛选区。

### `ListDataTable`

统一无边框数据表格、表头和行高、左右留白、固定操作列及横向滚动条。只有 Action / Actions / Operations 等真正的操作列可以固定在右侧；Status、Bound to、Transfer Number 等业务数据列必须随表格滚动。普通数据单元格裁切越界内容，固定操作列左侧只允许组件伪元素绘制的一层 `--shadow-table-fixed` 内阴影，效果与表格左侧固定边界一致；不得再叠加实体边框或单元格阴影，避免形成双线。固定操作列使用不透明面板背景和公共层级 Token，在横向滚动状态下必须完整遮住后方数据列，禁止文字穿透或只露出单个字符。列表只保留表格自身的一个滚动条；侧栏、页面、列表与复杂弹窗全部继承 `global.css` 的同一套浅灰滚动条 Token，组件内部不得再定义独立色值、宽度或悬停颜色。页面可定义真实业务列、列宽和数据，不得覆盖表格内部行高、分割线、固定列层级或滚动条。

### `MultiLineCell`

统一日期时间、姓名、机构名等多行单元格的垂直排列和行间距。

### `ListStatus`

状态色只允许 `neutral | success | warning | danger` 四种语义。业务状态必须显式映射到语义色，禁止根据状态字符串动态拼接颜色。

### `ListPagination`

统一上一页、下一页与每页条数选择。业务页面只维护 `currentPage` 和 `pageSize` 状态。

`Transaction History` 是以上列表组件的基准实现；页面 CSS 仅保留四列筛选网格和交易号特有样式。

`Card Management` 是跨业务复用验证页，路由为 `/expense-account/cards`。它直接复用 `ListPage`、`ListFilterField`、`ListDataTable` 和 `ListPagination`，并组合 `MetricCard compact` 展示五项卡片数量。页面层只保留三列筛选网格、指标与操作区排列、卡号眼睛图标和业务操作列。

## 编辑页组件

编辑页使用 `EditPage` 固定页面标题、导航、左右工作区和底部操作栏，并从 `src/components/edit` 按需组合：

- `EditToolbarSelect`：标题栏通用筛选器；
- `EditStatusTabs`：由页面传入状态项，统一文字层级与激活态；导航分割线由 `EditPage` 统一绘制，并与页面左右边距对齐；
- `EditTreePanel`：通用层级树分区，统一标题、展开态和品牌色选中态；
- `EditSelectSection`：通用单字段选择表单分区；
- `EditFooterActions`：统一主次操作按钮和宽度。

`Branch List` 只是以上编辑组件的首个基准实现，不是组件能力的边界。后续商户、终端、员工或其他信息编辑页可以传入自己的真实标题、状态项、树数据、字段和操作文案进行组合。

`EditPage variant="centered"` 用于无侧栏的居中表单流程。`Add Team Member` 是该变体的基准实现，复用 `EditStatusTabs` 展示 Account Info、Password、Role 三步；普通字段采用标签在上、控件在下的纵向结构，布尔开关采用描述在左、开关在右的行内结构，并保持组合输入与居中 Next 操作。该多步骤页面保留统一工作区最低高度，避免步骤切换时卡片跳动。

## 复杂弹窗组件

复杂弹窗从 `src/components/complex-modal` 组合，业务内容在独立业务组件中实现，不在页面文件中堆叠弹窗内部结构。

### `ComplexModal`

统一弹窗标题栏、遮罩、宽度、圆角和内部滚动区。标题与关闭按钮固定共用标题栏垂直中心线，标题分隔线左右与内容页边距对齐；桌面端上下保留稳定留白，超长内容只在弹窗内容区滚动，并使用细窄的浅灰滚动条。页面只控制打开与关闭状态；宽度和最大高度只能通过 Complex Modal Token 调整。

### `ComplexModalSection`

统一具有明确对比度的浅灰蓝分区、边框、加粗标题层级和语义图标位置。业务弹窗可传入标题、图标和内容，不得覆盖分区内边距与标题样式。

### `ComplexModalActions`

统一底部主次操作、按钮间距及协议说明。操作区固定在弹窗滚动区域底部，长表单滚动时仍保留关键操作。

`POS-poslist pos支付` 是复杂弹窗的基准实现，路由为 `/pos/apply`，包括商品选择、数量步进、保险选项、支付汇总、余额提示和确认操作。POS 业务组件位于 `src/components/pos`：

- `PosProductCard`：价格类型、终端插图、产品名、价格和数量步进；
- `QuantityStepper`：统一减号、数量和加号状态；
- `PaymentSummary`：统一余额、费用和总额层级；
- `PosApplyModal`：仅负责组合真实 POS 业务模块和计算支付金额。

Figma 当前提供的是扁平截图，终端图暂由 `PosTerminalIllustration` 占据正式素材槽位。拿到原始图片后只替换该组件内部素材，不改变商品卡结构、尺寸和页面代码。

商品卡价格类型 Tag 固定为左侧贴边、右侧完整胶囊圆角，页面不得单独修改其形状。
弹窗内 Merchant 与 Pickup City 等选择器固定使用白色控件面和清晰描边，与商品卡保持同一视觉层级，并保留品牌色聚焦态。

## 简单弹窗组件

简单弹窗统一使用 `src/components/simple-modal/SimpleModal.tsx`。组件固定遮罩、宽度、标题与关闭按钮中线、页边距内分割线以及底部主次操作区；页面只传真实标题、内容、操作和关闭行为。

`Team Members / Alternate OTP Receiving Method` 是基准实现，路由为 `/team/members/alternate-otp`。它验证了警示信息、单字段输入和左右分置操作。页面不得覆盖 `.simple-modal-*` 内部规则；新数值进入 Simple Modal Token。

## 储蓄产品组件

储蓄产品页面从 `src/components/savings` 组合指标、趋势和产品功能模块，并继续复用公共列表体系。

- `SavingsMetricCard`：统一储蓄资产、收益和利息指标，支持品牌、白色与浅色三种语义表面、紧凑高度，以及 `raised | flat` 层级；OWealth 资产区固定使用 `flat`，三张卡片均不显示阴影；`soft` 浅绿色表面以底色区分层级，不使用描边。
- `SavingsTrendChart`：统一七日利息趋势的标题、周期和柱状基线结构。
- `AutoDepositBanner`：统一自动存入功能说明及 Balance 到 OWealth 的关系表达。流程卡按 OPay 原稿保持底部对齐，OWealth 卡片比 Balance 卡片高 32px，箭头与 Balance 卡片垂直中线对齐。
- `SavingsFooter`：统一储蓄产品页的银行归属说明。
- `ListDataTable density="compact"`：用于资金流水等高密度数据，不改变普通后台列表的标准行高。
- `NumberedPagination`：用于大数据量列表，固定英文 `page` 与 `Total` 业务格式，不受全局语言环境影响。

`Savings Summary` 路由为 `/savings/summary`，负责资产总览和七日利息趋势；`Savings OWealth` 路由为 `/savings/owealth`，负责产品资产、自动存入和资金明细。两页的业务文案、金额和模块顺序均来自 OPay Figma 原稿。

卡片内部用于划分标题、工具栏或内容区的中性横线必须使用公共 `.opay-inset-divider`，左右端点与卡片内容页边距一致；禁止直接在内部区块上使用贯穿容器全宽的 `border-bottom`。表格行线、控件描边和卡片外框不属于此规则。

## 组件适用范围

当前三个基准页面用于校准规则，但组件面向整个后台系统：

| 层级 | 目录 | 适用范围 |
| --- | --- | --- |
| 页面骨架 | `components/patterns` | 所有列表、详情、编辑、看板和弹窗页面 |
| 跨页组件 | `components/list`、`components/edit`、`components/dashboard`、`components/complex-modal` | 同类页面中的筛选、表格、表单分区、指标、空状态与复杂弹窗结构 |
| 业务配置 | `pages`、`data` | 真实字段、文案、状态映射、列定义、模块顺序和路由行为 |

新增页面应先从页面骨架和跨页组件中选择，再补充真实业务配置。只有当现有组件无法表达设计稿中的稳定结构时，才扩展组件能力。

## 规则更新机制

后续调整必须先判断影响范围：

1. **全局视觉变化**：更新语义 Token 或基础组件，同时更新本文档与组件契约测试；所有使用页面自动获得变化。
2. **同类页面的新形态**：为组件增加有名称、类型受限的属性或变体，并记录适用条件；禁止在页面中穿透 CSS。
3. **单页业务差异**：只更新页面数据、列定义、模块顺序或组件插槽，不改变公共规则。
4. **现有规则修正**：在组件层修复并回看全部消费页面，不能只修当前截图。

每次组件级调整都必须同步完成四项内容：组件实现、Token（如涉及数值）、组件规范、契约/视觉回归检查。缺少任一项不视为完成规则更新。

## 页面组装示例

```tsx
<DashboardSection title="Transaction Summary">
  <div className="overview-summary-grid">
    <SummaryCard
      direction="inflow"
      totalAmount="₦ 0.00"
      totalCount="0 Txns"
      summaryAmount="₦ 0.00"
      summaryCount="0 Txns"
      details={inflowDetails}
      products={inflowProducts}
    />
  </div>
</DashboardSection>
```

## 变更流程

1. 在 OPay Figma 中确认真实页面节点和变化范围。
2. 优先更新语义 Token；仅当结构发生变化时扩展组件属性。
3. 页面只更新数据和模块组合，不复制组件 JSX 或内部 CSS。
4. 运行 `pnpm check:tokens`、`pnpm build` 和 `pnpm test:visual`。
5. 视觉差异经过确认后，才允许执行 `pnpm test:visual:update`。

## 禁止项

- 在页面内重新实现 `DashboardSection`、`MetricCard`、`SummaryCard` 等同类结构。
- 在列表页自行拼装筛选标签、表格滚动条或分页结构。
- 在编辑页自行重写状态标签栏、组织树选中态或固定操作栏。
- 在页面内自行拼装复杂弹窗标题栏、分区或底部操作区。
- 根据文案字符串猜测图标；必须使用明确的语义图标键。
- 使用 `nth-child` 改业务含义、色彩或图标。
- 在页面 CSS 中覆盖 `.dashboard-*` 内部规则。
- 为通过单张截图写一次性像素补丁；可复用数值应进入 Token。
