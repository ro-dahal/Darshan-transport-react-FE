export interface OfficeRow {
  sn: number;
  office: string;
  address: string;
  contact: string;
  location: string;
  search: string;
}

export const BOOKING_OFFICES: OfficeRow[] = [
  {
    sn: 1,
    office: 'Head Office',
    address: 'Rani Pauwa, Pokhara',
    contact: '+977 9801914226 (229)',
    location: 'Pokhara, Nepal',
    search: 'Darshan Transport - Pokhara Branch',
  },
  {
    sn: 2,
    office: 'Branch Office',
    address: 'Transport Nagar, Ring Road, Kathmandu',
    contact: '+977 9801914208 (222)',
    location: 'Kathmandu, Nepal',
    search: 'Darshan Transport - Kathmandu Branch',
  },
  {
    sn: 3,
    office: 'Branch Office',
    address: 'Dhawaha, Butwal',
    contact: '+977 9801914212',
    location: 'Butwal, Nepal',
    search: 'Darshan Transport - Butwal Branch',
  },
  {
    sn: 4,
    office: 'Branch Office',
    address: 'Yantra Sala Margha, Narayanghat',
    contact: '+977 9801914218 (211)',
    location: 'Yantra Sala Margha, Narayanghat, Nepal',
    search: 'Darshan Transport - Chitwan Branch',
  },
  {
    sn: 5,
    office: 'Branch Office',
    address: 'Adarsh Nagar, Birgunj',
    contact: '+977 9801914221',
    location: 'Birgunj, Nepal',
    search: 'Darshan Transport - Birgunj Branch',
  },
];

export const DELIVERY_OFFICES: OfficeRow[] = [
  {
    sn: 1,
    office: 'Delivery Office',
    address: 'Pokhara',
    contact: '+977 9801914226 (229) / 9802855478',
    location: 'Pokhara, Nepal',
    search: 'Darshan Transport - Pokhara Branch',
  },
  {
    sn: 2,
    office: 'Delivery Office',
    address: 'Kathmandu',
    contact: '+977 9801914224 (230)',
    location: 'Kathmandu, Nepal',
    search: 'Darshan Transport - Return Warehouse',
  },
  {
    sn: 3,
    office: 'Delivery Office',
    address: 'Dumre / Damauli / Dulegauda / Tal Chowk',
    contact: '+977 9801914225',
    location: 'Damauli, Nepal',
    search: 'Darshan Transport - Damauli Branch',
  },
  {
    sn: 4,
    office: 'Delivery Office',
    address: 'Kushma / Beni / Baglung',
    contact: '+977 9801914215',
    location: 'Kushma, Nepal',
    search: 'Darshan Transport - Baglung Branch',
  },
  {
    sn: 5,
    office: 'Delivery Office',
    address: 'Anbukhaireni / Lamjung / Gorkha',
    contact: '+977 9801914220',
    location: 'Damauli, Nepal',
    search: 'Darshan Transport - Anbukhaireni Branch',
  },
  {
    sn: 6,
    office: 'Delivery Office',
    address: 'Syangja / Waling / Galyang',
    contact: '+977 9801914223',
    location: 'Syangja, Nepal',
    search: 'Darshan Transport - Walling Branch',
  },
];
