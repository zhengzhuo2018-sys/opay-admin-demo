import { Tooltip } from '@arco-design/web-react';
import { IconQuestionCircle } from '@arco-design/web-react/icon';

export default function DashboardHelp() {
  return (
    <Tooltip content="More information">
      <IconQuestionCircle className="dashboard-help" aria-label="More information" />
    </Tooltip>
  );
}
