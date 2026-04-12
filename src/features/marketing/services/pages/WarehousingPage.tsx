import { ServiceDetailPage } from '../components/ServiceDetailPage';
import { warehousingData } from '../data/servicePages/warehousingData';

export const WarehousingPage: React.FC = () => (
  <ServiceDetailPage data={warehousingData} />
);
