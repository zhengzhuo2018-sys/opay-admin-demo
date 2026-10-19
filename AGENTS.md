# OPay Admin Coding Rules

- Use React, TypeScript, Vite and `@arco-design/web-react`.
- Reuse Arco primitives before creating custom controls.
- Use semantic variables from `src/styles/tokens.css`; do not place raw brand hex values or arbitrary spacing in page CSS.
- Keep brand state and business status distinct. Primary actions use OPay green; success, warning and danger communicate business outcomes.
- Build reusable list, detail, edit, dashboard and modal patterns before duplicating page structures.
- Use `src/components/patterns/ListPage.tsx` for list screens; pass business filters, actions, table content and pagination through its slots instead of recreating the panel shell.
- Treat the OPay screenshots as business and visual references, not as runtime image assets.
- Build every regular page from a verified node in the OPay Figma file. Do not invent modules, fields, states, data relationships, copy, or actions that are absent from the referenced design.
- The only exception is an explicitly identified acceptance-test addition or wholly new test case; those may introduce new content according to the supplied test requirements while preserving the established OPay design system.
- Correct obvious screenshot artifacts such as duplicated navigation, repeated support widgets and cropped columns.
- Keep mock data separate from visual components.
- Run the TypeScript production build after every material implementation step.
- Run `pnpm check:tokens` after styling changes. Raw colors and raw scale values outside the token source are policy violations.
- Update Playwright screenshots only after reviewing an intentional visual change; never update snapshots merely to make a failing test pass.
