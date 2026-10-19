import { useState } from 'react';
import {
  EditFooterActions,
  EditSelectSection,
  EditStatusTabs,
  EditToolbarSelect,
  EditTreePanel,
} from '../components/edit';
import EditPage from '../components/patterns/EditPage';
import {
  branchFilterOptions,
  branchTree,
  parentBranchOptions,
} from '../data/branches';

const branchStatuses = [
  { key: 'approved', title: 'Approved' },
  { key: 'pending', title: 'Pending' },
  { key: 'rejected', title: 'Rejected' },
  { key: 'draft', title: 'Draft' },
];

type BranchCreateProps = {
  onCancel: () => void;
};

export default function BranchCreate({ onCancel }: BranchCreateProps) {
  const [parentBranch, setParentBranch] = useState('mayaks-prestige');

  return (
    <EditPage
      title="Branch List"
      testId="branch-create-page"
      actions={(
        <EditToolbarSelect
          ariaLabel="Select branch"
          placeholder="Select Branch"
          options={branchFilterOptions}
        />
      )}
      navigation={<EditStatusTabs items={branchStatuses} defaultActiveKey="approved" />}
      aside={(
        <EditTreePanel
          title="Organization"
          headingId="organization-heading"
          treeData={branchTree}
          expandedKeys={['mayaks-prestige', 'test-branch-22222']}
          selectedKeys={['mayaks-prestige']}
        />
      )}
      footer={(
        <EditFooterActions
          secondaryLabel="Cancel"
          primaryLabel="Next"
          onSecondary={onCancel}
        />
      )}
    >
      <EditSelectSection
        title="Select a parent branch for this new branch"
        headingId="parent-branch-heading"
        fieldLabel="Parent Branch"
        required
        value={parentBranch}
        options={parentBranchOptions}
        onChange={setParentBranch}
      />
    </EditPage>
  );
}
