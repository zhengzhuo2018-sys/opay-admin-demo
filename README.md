# OPay Merchant Admin · Arco 交付版

基于 React、TypeScript、Vite 与 Arco Design React 的商家后台前端。当前版本以 OPay 原稿提供业务内容，以 Arco Pro 原生规则组织界面；本次交付范围为已确认的 10 个完整页面及关联弹窗。完整范围和源稿疑点见 [提交说明](./docs/DELIVERY.md)。

## 快速开始

```bash
pnpm install --frozen-lockfile
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

仓库使用已有 GitHub Pages 与 GitHub Actions，每次推送到 `main` 自动构建和发布。[经营工作台入口](https://zhengzhuo2018-sys.github.io/opay-admin-demo/#/dashboard)。建议 Node.js 22 与 pnpm 9，依赖以锁文件为准。线上地址需保留 `/#/`。

## 已完成页面

| 页面 | 路由 | 页面模式 |
| --- | --- | --- |
| Overview | `/overview` | Dashboard |
| Transaction History | `/transactions/history` | List |
| Transaction Detail | `/transactions/:transactionId` | Detail |
| POS List | `/pos` | List |
| Team Members | `/team/members` | List |
| Add Team Member | `/team/members/new` | Centered Edit |
| Permissions | `/team/permissions` | Permissions |
| Business Dashboard（Page 3） | `/dashboard` | Dashboard |
| Settlement（Page 3） | `/settlement/list` | Settlement Overview |
| POS Receipt Configuration（Page 3） | `/settings/pos/receipt` | Settings |

以下叠加状态也已实现：

- POS Apply：`/pos/apply`
- Alternate OTP Receiving Method：从团队成员列表对应操作打开。
- Page 3 退款弹窗：`/dashboard/refund`，保留原稿标题 `Settlement Amount`。

“已完成”指前端页面和约定的本地交互，不代表生产接口、真实权限或资金操作已接通。导航中其余路由不属于本次完整页面交付范围。

## 设计系统与组件

- [完整提交说明](./docs/DELIVERY.md)
- [当前 Arco 迁移记录](./docs/ARCO_PRO_CLEANROOM.md)
- [Page 3 内容审计](./docs/PAGE3_CONTENT_AUDIT.md)
- [视觉回归说明](./tests/visual/README.md)

主要分层：

- `src/styles/tokens.css`：所有原始设计数值与语义 Token。
- `src/arco-pro`：当前布局、页面、公共模式与样式，使用官方 Arco Pro 主题。
- `src/data`：与界面分离的业务示例与本地交互数据。
- `tests/contracts/source-content.json`：已审查的内容与结构基线。
- `src/assets/figma`：已经本地化并实际使用的 Figma 正式资源。

## 质量检查

提交前运行完整门禁：

```bash
pnpm check
```

也可以分别运行：

```bash
pnpm check:cleanroom
pnpm check:tokens
pnpm check:source-content
pnpm test:team
pnpm test:page3
pnpm test:source-content
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

业务内容只能来自原稿或用户明确批准，开发说明与源稿疑点绝不进入业务界面。更具体的规则见 `AGENTS.md` 和 [内容审计](./docs/PAGE3_CONTENT_AUDIT.md)。旧版目录保留供追溯，当前入口 `src/main.tsx` 使用 `src/arco-pro/AppV2.tsx`，不加载旧版页面及 OPay 全局样式。
