import { Card, Empty, Typography } from '@arco-design/web-react';
import './placeholder-page.css';

const { Text } = Typography;

type PlaceholderPageProps = {
  title: string;
  knownPage?: boolean;
};

export default function PlaceholderPage({
  title,
  knownPage = true,
}: PlaceholderPageProps) {
  return (
    <main className="placeholder-page" data-testid="placeholder-page">
      <Card
        className="placeholder-page-card"
        title={<Text className="placeholder-page-title">{title}</Text>}
      >
        <Empty
          description={
            knownPage
              ? 'This OPay page is ready in navigation and awaiting design reproduction.'
              : 'The requested page does not exist in the current OPay navigation.'
          }
        />
      </Card>
    </main>
  );
}
