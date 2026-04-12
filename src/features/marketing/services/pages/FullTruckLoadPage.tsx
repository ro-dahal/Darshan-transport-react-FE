import { ServiceDetailPage } from '../components/ServiceDetailPage';
import { fullTruckLoadData } from '../data/servicePages/fullTruckLoadData';

export const FullTruckLoadPage: React.FC = () => (
  <ServiceDetailPage data={fullTruckLoadData} />
);
