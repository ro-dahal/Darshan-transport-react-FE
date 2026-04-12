import { ServiceDetailPage } from '../components/ServiceDetailPage';
import { serviceCoverageData } from '../data/servicePages/serviceCoverageData';

export const ServiceCoveragePage: React.FC = () => (
  <ServiceDetailPage data={serviceCoverageData} />
);
