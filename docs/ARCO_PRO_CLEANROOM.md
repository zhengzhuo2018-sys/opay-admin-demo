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
