import { ServiceDetailPage } from '../components/ServiceDetailPage';
import { bulkCargoData } from '../data/servicePages/bulkCargoData';

export const BulkCargoPage: React.FC = () => (
  <ServiceDetailPage data={bulkCargoData} />
);
