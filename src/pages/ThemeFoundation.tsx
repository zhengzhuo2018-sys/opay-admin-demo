import {
  Alert,
  Button,
  Card,
  Divider,
  Input,
  Select,
  Space,
  Tag,
  Typography,
} from '@arco-design/web-react';
import './theme-foundation.css';

const { Title, Paragraph, Text } = Typography;

const colors = [
  { name: 'Brand', token: '--color-brand' },
  { name: 'Brand soft', token: '--color-brand-soft' },
  { name: 'Navy', token: '--color-text-primary' },
  { name: 'Page', token: '--color-surface-page' },
  { name: 'Panel', token: '--color-surface-panel' },
  { name: 'Warning', token: '--color-status-warning' },
];

const spacing = [4, 8, 12, 16, 24, 32, 48, 64];

export default function ThemeFoundation() {
  return (
    <main className="foundation-page" data-testid="theme-foundation">
      <header className="foundation-header">
        <div>
          <Text className="foundation-kicker">FOUNDATION / 00</Text>
          <Title heading={2}>OPay × Arco</Title>
          <Paragraph>
            Arco 提供组件骨架，OPay Token 负责品牌、密度与业务层级。
          </Paragraph>
        </div>
        <Tag color="green" bordered>Theme ready</Tag>
      </header>

      <section className="foundation-grid">
        <Card title="Color system" className="foundation-card foundation-card-wide">
          <div className="swatch-grid">
            {colors.map((color) => (
              <div className="swatch" key={color.token}>
                <div className="swatch-color" style={{ background: `var(${color.token})` }} />
                <div>
                  <Text bold>{color.name}</Text>
                  <Text className="token-label">{color.token}</Text>
                  <Text className="token-value">semantic token</Text>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Typography" className="foundation-card">
          <div className="type-stack">
            <div><Text className="type-meta">28 / Bold</Text><span className="type-28">Account overview</span></div>
            <div><Text className="type-meta">20 / Semibold</Text><span className="type-20">Transaction history</span></div>
            <div><Text className="type-meta">14 / Regular</Text><span className="type-14">Operational content and form values</span></div>
            <div><Text className="type-meta">12 / Semibold</Text><span className="type-12">TABLE LABEL / STATUS</span></div>
          </div>
        </Card>

        <Card title="Spacing scale" className="foundation-card">
          <div className="spacing-stack">
            {spacing.map((size) => (
              <div className="spacing-row" key={size}>
                <Text className="spacing-label">{size}px</Text>
                <span className="spacing-bar" style={{ width: size * 3 }} />
              </div>
            ))}
          </div>
        </Card>

        <Card title="Arco components" className="foundation-card foundation-card-wide">
          <Space direction="vertical" size={20} className="component-stack">
            <Space wrap>
              <Button type="primary">Create transaction</Button>
              <Button>Download</Button>
              <Button status="danger">Reject</Button>
              <Button type="text">View details</Button>
            </Space>
            <Space wrap>
              <Tag color="green">Success</Tag>
              <Tag color="orange">Pending</Tag>
              <Tag color="red">Reversed</Tag>
              <Tag>Disabled</Tag>
            </Space>
            <Divider />
            <div className="control-row">
              <Input placeholder="Transaction ID" allowClear />
              <Select
                placeholder="Transaction type"
                options={[
                  { label: 'Transfer', value: 'transfer' },
                  { label: 'Settlement', value: 'settlement' },
                ]}
              />
            </div>
            <Alert
              type="warning"
              content="Operational warnings use orange; brand actions remain OPay green."
            />
          </Space>
        </Card>
      </section>
    </main>
  );
}
