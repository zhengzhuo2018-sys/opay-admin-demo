import { Button, Select, Space } from '@arco-design/web-react';
import { IconLeft, IconRight } from '@arco-design/web-react/icon';

type ListPaginationProps = {
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export default function ListPagination({
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: ListPaginationProps) {
  return (
    <div className="list-pagination" data-list-component="pagination">
      <Space size="medium">
        <Button
          className="list-page-button"
          icon={<IconLeft />}
          disabled={currentPage === 1}
          aria-label="Previous page"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        />
        <Button
          className="list-page-button"
          type="primary"
          icon={<IconRight />}
          aria-label="Next page"
          onClick={() => onPageChange(currentPage + 1)}
        />
      </Space>
      <Select
        className="list-page-size"
        value={pageSize}
        options={[
          { label: '10/page', value: 10 },
          { label: '20/page', value: 20 },
          { label: '50/page', value: 50 },
        ]}
        onChange={onPageSizeChange}
        aria-label="Rows per page"
      />
    </div>
  );
}
