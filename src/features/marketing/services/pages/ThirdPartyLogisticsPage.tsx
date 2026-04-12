import { ServiceDetailPage } from '../components/ServiceDetailPage';
import { thirdPartyLogisticsData } from '../data/servicePages/thirdPartyLogisticsData';

export const ThirdPartyLogisticsPage: React.FC = () => (
  <ServiceDetailPage data={thirdPartyLogisticsData} />
);
