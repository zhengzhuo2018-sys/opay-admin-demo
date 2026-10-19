export type PosRecord = {
  key: string;
  installationDate: string;
  storeCode: string;
  businessName: string[];
  posSn: string;
  posType: string;
  terminalId: string;
  transferNumber: string;
};

export type PosProduct = {
  key: string;
  name: string;
  price: string;
  priceType: 'Partner Price' | 'One-off Price';
  terminal: 'smart' | 'traditional';
};

export const posRecords: PosRecord[] = [
  {
    key: '1',
    installationDate: '2026-04-15 03:27:31',
    storeCode: '1200052028',
    businessName: ['new new expense', 'branch-123'],
    posSn: '8350019385',
    posType: 'SmartPOS',
    terminalId: 'FLNNV888',
    transferNumber: '-',
  },
];

export const posProducts: PosProduct[] = [
  { key: 'partner-smart', name: 'OPay Smart', price: '₦ 30001.00', priceType: 'Partner Price', terminal: 'smart' },
  { key: 'partner-traditional', name: 'OPay Traditional', price: '₦ 20001.00', priceType: 'Partner Price', terminal: 'traditional' },
  { key: 'oneoff-smart', name: 'OPay Smart', price: '₦ 60001.00', priceType: 'One-off Price', terminal: 'smart' },
  { key: 'oneoff-traditional', name: 'OPay Traditional', price: '₦ 30001.00', priceType: 'One-off Price', terminal: 'traditional' },
];

export const merchantOptions = [
  { label: 'MAYAKS aaa\'PRESTIGE STITCHES LTD', value: 'mayaks-prestige' },
];

export const pickupCityOptions = [
  { label: 'Lagos', value: 'lagos' },
  { label: 'Abuja', value: 'abuja' },
];
