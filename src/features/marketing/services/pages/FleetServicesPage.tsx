import { ServiceDetailPage } from '../components/ServiceDetailPage';
import { fleetServicesData } from '../data/servicePages/fleetServicesData';

export const FleetServicesPage: React.FC = () => (
  <ServiceDetailPage data={fleetServicesData} />
);
