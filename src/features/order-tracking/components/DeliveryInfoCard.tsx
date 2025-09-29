import React from 'react';
import type { DeliveryRecord } from '../types/DeliveryRecord';
import type { OrderStatusStep } from '../data/statusSteps';
import { OrderTimeline } from './OrderTimeline';

export interface DeliveryInfoCardProps {
  record: DeliveryRecord;
  steps: OrderStatusStep[];
}

export const DeliveryInfoCard: React.FC<DeliveryInfoCardProps> = ({ record, steps }) => (
  <section style={{ marginBottom: 20 }}>
    <div className="timeline-box">
      <OrderTimeline status={record.status} steps={steps} />
    </div>
    <div className="delivery-info-box">
      <span className="delivery-title">Delivery Information:</span>
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
