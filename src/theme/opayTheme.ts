import type { ConfigProviderProps } from '@arco-design/web-react';

export const opayConfig: Pick<
  ConfigProviderProps,
  'autoInsertSpaceInButton' | 'componentConfig' | 'size'
> = {
  autoInsertSpaceInButton: false,
  size: 'default',
  componentConfig: {
    Button: {
      shape: 'square',
    },
    Card: {
      bordered: true,
    },
    Form: {
      layout: 'vertical',
    },
    Table: {
      border: false,
      stripe: false,
    },
  },
};
