import { Tree, Typography } from '@arco-design/web-react';

const { Title } = Typography;

export type EditTreeNode = {
  title: string;
  key: string;
  children?: EditTreeNode[];
};

type EditTreePanelProps = {
  title: string;
  headingId: string;
  treeData: EditTreeNode[];
  expandedKeys?: string[];
  selectedKeys?: string[];
};

export default function EditTreePanel({
  title,
  headingId,
  treeData,
  expandedKeys = [],
  selectedKeys = [],
}: EditTreePanelProps) {
  return (
    <section
      className="edit-tree-panel"
      aria-labelledby={headingId}
      data-edit-component="tree-panel"
    >
      <Title id={headingId} heading={6}>{title}</Title>
      <Tree
        className="edit-tree"
        treeData={treeData}
        defaultExpandedKeys={expandedKeys}
        selectedKeys={selectedKeys}
        blockNode
      />
    </section>
  );
}
