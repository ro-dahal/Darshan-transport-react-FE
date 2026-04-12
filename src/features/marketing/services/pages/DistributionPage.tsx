import { ServiceDetailPage } from '../components/ServiceDetailPage';
import { distributionData } from '../data/servicePages/distributionData';

export const DistributionPage: React.FC = () => (
  <ServiceDetailPage data={distributionData} />
);
