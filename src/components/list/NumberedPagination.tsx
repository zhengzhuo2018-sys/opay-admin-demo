import { Pagination, Select } from '@arco-design/web-react';

type NumberedPaginationProps = {
  currentPage: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number, pageSize: number) => void;
};

export default function NumberedPagination({
  currentPage,
  pageSize,
  total,
  onPageChange,
}: NumberedPaginationProps) {
  return (
    <div className="list-numbered-pagination" data-list-component="numbered-pagination">
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={total}
        size="small"
        onChange={(page) => onPageChange(page, pageSize)}
      />
      <div className="list-numbered-pagination-meta">
        <Select
          value={pageSize}
          size="small"
          options={[
            { label: '10/page', value: 10 },
            { label: '20/page', value: 20 },
            { label: '50/page', value: 50 },
          ]}
          onChange={(size) => onPageChange(1, size)}
          aria-label="Rows per page"
        />
        <span>Total {total}</span>
      </div>
    </div>
  );
}
