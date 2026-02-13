import React from 'react';
import type { DeliveryRecord } from '../types/DeliveryRecord';
import type { OrderStatusStep } from '../data/statusSteps';
import { OrderTimeline } from './OrderTimeline';

export interface DeliveryInfoCardProps {
  record: DeliveryRecord;
  steps: OrderStatusStep[];
}

export const DeliveryInfoCard: React.FC<DeliveryInfoCardProps> = ({ record, steps }) => (
  <section className="mb-5">
    <div className="border border-primary rounded-md p-[22px_10px_18px_10px] bg-white mb-[18px]">
      <OrderTimeline status={record.status} steps={steps} />
    </div>
    <div className="border border-primary rounded-md p-[18px_16px] bg-white text-[1.08rem]">
      <span className="text-primary text-xl font-bold mb-2 block">Delivery Information:</span>
      {record.message && (
        <div>
          <b>Message:</b> {record.message}
        </div>
      )}
      {record.consigner && (
        <div>
          <b>Consigner:</b> {record.consigner}
        </div>
      )}
      {record.consignee && (
        <div>
          <b>Consignee:</b> {record.consignee}
        </div>
      )}
      {record.from && (
        <div>
          <b>From:</b> {record.from}
        </div>
      )}
      {record.to && (
        <div>
          <b>To:</b> {record.to}
        </div>
      )}
      {record.error && (
        <div>
          <b>Notes:</b> {record.error}
        </div>
      )}
    </div>
  </section>
);
