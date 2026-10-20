# OPay Admin Coding Rules

- Use React, TypeScript, Vite and `@arco-design/web-react`.
- Reuse Arco primitives before creating custom controls.
- Use semantic variables from `src/styles/tokens.css`; do not place raw brand hex values or arbitrary spacing in page CSS.
- Keep brand state and business status distinct. During the Arco Pro clean-room phase, use the official Arco Pro theme without OPay brand remapping; success, warning and danger still communicate business outcomes.
- Build reusable list, detail, edit, dashboard and modal patterns before duplicating page structures.
- Use `src/components/patterns/ListPage.tsx` for list screens; pass business filters, actions, table content and pagination through its slots instead of recreating the panel shell.
- Treat the OPay screenshots as business-content references, not as visual targets or runtime image assets.
- Preserve verified business modules, fields, states, data relationships, copy, routes and interaction requirements from the OPay source. Rebuild their presentation with native Arco Pro page patterns instead of reproducing the old visual layout.
- The only exception is an explicitly identified acceptance-test addition or wholly new test case; those may introduce new content according to the supplied test requirements while preserving the established OPay design system.
- Correct obvious screenshot artifacts such as duplicated navigation, repeated support widgets and cropped columns.
- Keep the new presentation layer inside `src/arco-pro`. It may import business-only configuration, types and mock data, but must not import legacy pages, legacy layout components, OPay theme overrides or the old global stylesheet.
- Do not simulate an available Arco control with plain elements. Use native Arco Layout, Menu, Breadcrumb, Form, Table, Pagination, Tag, Card, Tabs, Radio and related controls before adding any custom presentation.
- Keep mock data separate from visual components.
- Run the TypeScript production build after every material implementation step.
- Run `pnpm check:tokens` after styling changes. Raw colors and raw scale values outside the token source are policy violations.
- Update Playwright screenshots only after reviewing an intentional visual change; never update snapshots merely to make a failing test pass.
