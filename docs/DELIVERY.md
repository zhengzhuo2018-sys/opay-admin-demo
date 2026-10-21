# OPay 商家后台前端交付说明

交付日期：2026-10-21  
版本方向：保留已确认页面，基于 Arco Pro 原生组件与规则完成 10 页；Page 3 经营工作台按用户后续批注保留原稿分栏布局。

## 1. 在线入口

- [数据概览](https://zhengzhuo2018-sys.github.io/opay-admin-demo/#/overview)
- [经营工作台](https://zhengzhuo2018-sys.github.io/opay-admin-demo/#/dashboard)
- [退款弹窗](https://zhengzhuo2018-sys.github.io/opay-admin-demo/#/dashboard/refund)
- [源码仓库](https://github.com/zhengzhuo2018-sys/opay-admin-demo)

GitHub Pages 为静态站点，使用 Hash 路由。分享页面时应保留地址中的 `/#/` 与后续路径。

## 2. 最终 10 页清单

| 序号 | 页面 | 路径 | 完成状态与边界 |
| --- | --- | --- | --- |
| 1 | 数据概览 Overview | `/overview` | 已完成；保留已确认的交易汇总与成功率分析样式 |
| 2 | 交易记录 Transaction History | `/transactions/history` | 已完成；筛选、分页与详情入口 |
| 3 | 交易详情 Transaction Details | `/transactions/260131020200004331952768` | 已完成；该参考交易有完整示例，其他记录仅展示已知字段 |
| 4 | POS 列表 POS List | `/pos` | 已完成；筛选、分页与申请入口；次级 POS 流程未全部接通 |
| 5 | 团队成员 Team Members | `/team/members` | 已完成；搜索、成员记录与关联操作 |
| 6 | 添加成员 Add Team Member | `/team/members/new` | 已完成；账户、密码、角色步骤与本地列表联动 |
| 7 | 权限配置 Permissions | `/team/permissions` | 已完成；用户批准的演示范围，权限矩阵不是已核实的 OPay 生产策略 |
| 8 | 经营工作台 Business Dashboard | `/dashboard` | 已完成；新增 Page 3 页面，原稿左右分栏、广告插图、指标、快捷入口、趋势及交易列表 |
| 9 | 结算总览 Settlement | `/settlement/list` | 已完成；新增 Page 3 页面，结算信息、金额、原稿列表及完整分页 |
| 10 | POS 小票配置 POS Receipt Configuration | `/settings/pos/receipt` | 已完成；新增 Page 3 页面，分支信息、设置、字段排序/选择与预览 |

以上为完整页面计数。关联弹窗不重复计页：

- POS 申请：`/pos/apply`。
- 备用 OTP 设置：由团队成员列表内对应操作打开。
- Page 3 退款：`/dashboard/refund`，保留原稿标题 `Settlement Amount` 与原稿表单。

旧版 Overview 与 Page 3 经营工作台并列保留，分别承担概览与经营工作台角色；导航沿用统一目录，不复制不同源稿中互相矛盾的侧栏。其余导航项目不计入本次完整交付范围。

## 3. 技术与设计资产

- React 18、TypeScript、Vite，当前入口为 `src/arco-pro/AppV2.tsx`。
- Arco Design React 与官方 Arco Pro 主题；优先使用 Layout、Menu、Card、Statistic、Avatar、Table、Form、Tabs、Descriptions、Pagination、Modal 等原生组件。
- 趋势图使用 G2 4.2.12 的平滑 Line / Area，采用 Arco Pro 色彩 Token。图形依据原稿绘图几何，不新增未经证实的每日金融数据提示。
- OPay 商标与经营工作台广告插图均由已提供的 Figma 原稿提取并保存到本地，不使用截图代替业务页面。
- Figma 文件：`mlRDG9hIrpSETYdxa1ICbu`。Page 3 对应节点：经营工作台 `92:2023`、结算 `92:1654`、小票配置 `92:1871`、退款 `92:3477`。资源来源记录保存在 `src/assets/figma/*.source.json`。

## 4. 数据及交互边界

当前交付为前端演示，不包含服务端、生产登录、真实账户创建、邀请发送、OTP 投递、身份认证、生产权限执行、支付、退款、结算或终端配置下发。界面不会把本地校验描述成真实资金操作成功。

- 成员创建、备用 OTP、权限及小票设置在当前会话内存中联动；刷新后恢复示例状态，不持久化为生产业务数据。
- 密码不写入成员记录、浏览器存储或发送到服务端。
- 团队权限细项用于用户已批准的本地验收流程；未默认推定任何角色拥有真实生产权限。
- 结算分页按原稿总数 6210、默认每页 7 条展示完整分页控件。本地使用已提供的 8 条示例重复演示翻页，不宣称拥有 6210 条独立真实记录；下载范围为当前显示记录。
- 退款示例不关联现有交易，不推断退款资格、可退额度或真实资金结果。
- 原稿未提供的小票字段与载荷映射未擅自补全；保留原稿标签和完整预览字符串。
- 未提供完整业务流程的入口保持现有受限状态，不擅自新增业务模块或结果页。

## 5. 源稿疑点（仅列入提交文档）

| 项目 | 原稿事实 | 本次处理 |
| --- | --- | --- |
| POS 数量使用金额格式 | “Number of POS units” 的值为 `₦3,829.00`，与数量语义不一致 | 保留字面值；正确单位与数量待业务确认 |
| 结算原因与金额不符 | 结算金额为 ₦40,000.00、费用为 ₦0.00，原因却称金额小于费用 | 保留原稿金额及原因，不编造解释 |
| 退款金额与交易的关系 | 退款示例为 ₦10.00，与邻近交易示例是否关联未经证实 | 不把“超过交易金额”写成既定事实，不关联现有交易 |
| 日期、分支与小票字段 | 结算摘要/列表日期不同，分支信息/选项代码不同，小票字段重复标注 Terminal ID | 保留原稿内容，不推断关联或重命名字段 |

这些疑点、来源、模拟范围及开发说明只存在于交付文档中，绝不加入业务界面的标题、描述、提示条、工具提示、弹窗、空状态或临时反馈。原稿中真正的业务提示保持不变。

## 6. 本地运行与发布

建议使用 Node.js 22 和 pnpm 9，保留锁文件：

```bash
pnpm install --frozen-lockfile
pnpm dev
```

```bash
pnpm build
pnpm preview
```

仓库已包含 `.github/workflows/deploy-pages.yml`。推送到 `main` 后，通过 GitHub Actions 构建并部署到 GitHub Pages；线上构建为仓库子路径配置资源基础路径。静态构建产物应通过 HTTP 服务访问，而非直接双击 `index.html`。

## 7. 稳定更新与检查

本次交付使用源码内容/结构基线约束已确认页面，规则记录在 `AGENTS.md`。Arco 允许调整组件呈现，不代表允许新增业务内容。新增字段、标题、筛选、指标、警告或流程必须有原稿依据或用户明确批准；不能为填充通用页面模板而添加内容。

本次发布前已通过生产构建、13 文件内容合同、127 文件 Token 检查，以及团队 9 项、Page 3 13 项、源内容 6 项测试（合计 28 项）。

提交前检查命令：

```bash
pnpm check:cleanroom
pnpm check:tokens
pnpm check:source-content
pnpm test:team
pnpm test:page3
pnpm test:source-content
pnpm build
```

测试命令及规则不等同于生产接口验收。最终上线结果以实际部署状态与在线访问核验为准；内容基线失败时必须检查授权范围，不能自动重录基线以绕过校验。

详细核对记录见 [Page 3 内容审计](./PAGE3_CONTENT_AUDIT.md) 与 [Arco 迁移记录](./ARCO_PRO_CLEANROOM.md)。
