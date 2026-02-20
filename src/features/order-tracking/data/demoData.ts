import type { DeliveryRecord } from '../types/DeliveryRecord';

export interface DemoScenario {
  key: string;
  label: string;
  series: string;
  invoice: string;
  record: DeliveryRecord;
}

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    key: 'booked',
    label: 'Booked',
    series: 'KTM',
    invoice: 'DEMO-001',
    record: {
      status: 'waiting',
      consigner: 'Demo Supplier Ltd.',
      consignee: 'Demo Client Enterprises',
      from: 'Kathmandu',
      to: 'Pokhara',
      message: 'Your order has been booked and is waiting for dispatch.',
      bookingDate: new Date().toISOString(),
      dispatchDate: null,
      arrivalDate: null,
    },
  },
  {
    key: 'in-transit',
    label: 'In Transit',
    series: 'PKR',
    invoice: 'DEMO-002',
    record: {
      status: 'ongoing',
      consigner: 'Demo Supplier Ltd.',
      consignee: 'Demo Client Enterprises',
      from: 'Kathmandu',
      to: 'Pokhara',
      message: 'Your order is currently in transit to the destination.',
      bookingDate: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
      dispatchDate: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
      arrivalDate: null,
    },
  },
  {
    key: 'delivered',
    label: 'Delivered',
    series: 'BWA',
    invoice: 'DEMO-003',
    record: {
      status: 'delivered',
      consigner: 'Demo Supplier Ltd.',
      consignee: 'Demo Client Enterprises',
      from: 'Kathmandu',
      to: 'Pokhara',
      message: 'Your order has been successfully delivered.',
      bookingDate: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
      dispatchDate: new Date(Date.now() - 86400000 * 4).toISOString(), // 4 days ago
      arrivalDate: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
    },
  },
];
