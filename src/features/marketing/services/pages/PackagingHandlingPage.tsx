import { ServiceDetailPage } from '../components/ServiceDetailPage';
import { packagingHandlingData } from '../data/servicePages/packagingHandlingData';

export const PackagingHandlingPage: React.FC = () => (
  <ServiceDetailPage data={packagingHandlingData} />
);
