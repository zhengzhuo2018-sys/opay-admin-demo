import { Table, type TableColumnProps } from '@arco-design/web-react';

type ListDataTableProps<T extends object> = {
  columns: TableColumnProps<T>[];
  data: T[];
  rowKey: string;
  scrollX: number;
  density?: 'default' | 'compact';
};

export default function ListDataTable<T extends object>({
  columns,
  data,
  rowKey,
  scrollX,
  density = 'default',
}: ListDataTableProps<T>) {
  return (
    <div data-list-component="data-table" data-list-density={density}>
      <Table<T>
        className={`list-data-table ${density === 'compact' ? 'list-data-table-compact' : ''}`}
        columns={columns}
        data={data}
        pagination={false}
        border={false}
        rowKey={rowKey}
        scroll={{ x: scrollX }}
      />
    </div>
  );
}
