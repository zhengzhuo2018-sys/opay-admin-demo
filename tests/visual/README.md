# 视觉回归测试

## 首次准备

```bash
pnpm test:visual:install
pnpm test:visual:update
```

这会安装 Playwright 使用的 Chromium，并生成视觉基准图。确认图片正确后，将基准图一并提交。

当前基准分为两层：

- `app-shell.spec.ts`：覆盖全局壳层、关键组件契约、桌面与移动端 Transaction History。
- `completed-pages.spec.ts`：覆盖 10 个已完成主页面的 1440px 桌面端完整页面截图。

## 日常检查

```bash
pnpm test:visual
```

测试失败时先打开 `playwright-report` 查看差异图。只有经过人工确认的设计变化，才执行：

```bash
pnpm test:visual:update
```

新增页面时，必须同时补充结构/交互断言和视觉基准。主页面至少覆盖 1440px 桌面视口；响应式页面还应增加移动视口。弹窗、抽屉等叠加状态通过独立用例覆盖，不与底层页面基准混用。
