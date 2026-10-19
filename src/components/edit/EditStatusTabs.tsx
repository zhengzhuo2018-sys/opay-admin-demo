import { Tabs } from '@arco-design/web-react';

const { TabPane } = Tabs;

export type EditStatusTab = {
  key: string;
  title: string;
};

type EditStatusTabsProps = {
  items: readonly EditStatusTab[];
  defaultActiveKey: string;
};

export default function EditStatusTabs({ items, defaultActiveKey }: EditStatusTabsProps) {
  return (
    <Tabs
      className="edit-status-tabs"
      defaultActiveTab={defaultActiveKey}
      data-edit-component="status-tabs"
    >
      {items.map(({ key, title }) => <TabPane key={key} title={title} />)}
    </Tabs>
  );
}
