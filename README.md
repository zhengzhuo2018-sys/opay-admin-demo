# OPay Merchant Admin

基于 React、TypeScript、Vite 和 Arco Design React 实现的 OPay 商家后台还原工程。项目以 OPay Figma 原稿为视觉与业务依据，通过语义 Token、页面模式和跨页组件控制一致性，避免在单个页面中堆叠一次性样式。

## 快速开始

```bash
pnpm install
pnpm dev
```

生产构建：

```bash
pnpm build
pnpm preview
```

## 在线部署

项目支持通过 GitHub Pages 发布。线上版本使用 Hash 路由，因此可以直接打开或刷新任意页面，例如：

```text
https://zhengzhuo2018-sys.github.io/opay-admin-demo/#/overview
```

[打开在线预览](https://zhengzhuo2018-sys.github.io/opay-admin-demo/#/overview)

仓库启用 GitHub Pages 并将发布来源设置为 GitHub Actions 后，每次推送到 `main` 都会自动构建和发布。部署版本会显示用途声明，本地开发版本不显示。

## 已完成页面

| 页面 | 路由 | 页面模式 |
| --- | --- | --- |
| Overview | `/overview` | Dashboard |
| Transaction History | `/transactions/history` | List |
| Transaction Detail | `/transactions/:transactionId` | Detail |
| Branch Create | `/branches/new` | Edit |
| POS List | `/pos` | List |
| Card Management | `/expense-account/cards` | List |
| Team Members | `/team/members` | List |
| Add Team Member | `/team/members/new` | Centered Edit |
| Savings Summary | `/savings/summary` | Savings Dashboard |
| Savings OWealth | `/savings/owealth` | Savings Detail |

以下叠加状态也已实现：

- POS Apply：`/pos/apply`
- Alternate OTP Receiving Method：`/team/members/alternate-otp`

导航中其余尚未还原的路由会显示带真实目录名称的占位页面，不会错误回退到其他业务页面。

## 设计系统与组件

- [设计系统与 Token](./docs/DESIGN_SYSTEM.md)
- [组件配方与更新规则](./docs/COMPONENT_RECIPES.md)
- [视觉回归说明](./tests/visual/README.md)

主要分层：

- `src/styles/tokens.css`：所有原始设计数值与语义 Token。
- `src/styles/arco-theme.css`：OPay Token 到 Arco 的全局映射。
- `src/components/patterns`：列表、详情、编辑和看板页面骨架。
- `src/components/*`：列表、看板、弹窗、POS、储蓄等跨页组件。
- `src/pages`：路由页面、真实字段、业务数据和组件组合。
- `src/assets/figma`：已经本地化并实际使用的 Figma 正式资源。

## 质量检查

提交前运行完整门禁：

```bash
pnpm check
```

也可以分别运行：

```bash
pnpm check:tokens
pnpm build
pnpm test:visual
```

首次运行视觉回归需要安装 Chromium 并生成基准图：

```bash
pnpm test:visual:install
pnpm test:visual:update
```

基准图必须经过人工确认后与代码一同提交。日常改动不得为了通过测试而直接更新截图；应先确认差异符合 OPay 原稿和组件规则。

## 稳定更新原则

1. 全局颜色、尺寸、间距或层级变化优先修改语义 Token。
2. 多个页面共用的结构或行为在公共组件中修正，并回看全部消费页面。
3. 单页业务差异只修改页面数据、列定义、模块顺序或组件插槽。
4. 新 Figma 资源先本地化到 `src/assets/figma`，再通过稳定的组件资源槽位使用。
5. 组件级调整必须同步实现、Token、规范文档和视觉回归基准。

更具体的变更决策和禁止项见 [组件配方与更新规则](./docs/COMPONENT_RECIPES.md)。
