import { Tag } from '@arco-design/web-react';
import type { PosProduct } from '../../data/pos';
import PosTerminalIllustration from './PosTerminalIllustration';
import QuantityStepper from './QuantityStepper';

type PosProductCardProps = {
  product: PosProduct;
  quantity: number;
  onQuantityChange: (value: number) => void;
};

export default function PosProductCard({
  product,
  quantity,
  onQuantityChange,
}: PosProductCardProps) {
  const isPartnerPrice = product.priceType === 'Partner Price';

  return (
    <article className="pos-product-card" data-pos-component="product-card">
      <Tag className={`pos-price-tag ${isPartnerPrice ? 'pos-price-tag-partner' : 'pos-price-tag-oneoff'}`}>
        {product.priceType}
      </Tag>
      <PosTerminalIllustration variant={product.terminal} />
      <div className="pos-product-info">
        <span>{product.name}</span>
        <strong>{product.price}</strong>
        <QuantityStepper value={quantity} onChange={onQuantityChange} />
      </div>
    </article>
  );
}
