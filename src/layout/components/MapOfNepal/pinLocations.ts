export type MapPin = {
  id: string;
  type: 'booking' | 'delivery';
  label: string;
  address: string;
  x: number;
  y: number;
};

type MapPinSource = {
  id: string;
  type: MapPin['type'];
  label: string;
  address: string;
  latitude: number;
  longitude: number;
  offsetX?: number;
  offsetY?: number;
};

type RegionInfo = {
  title: string;
  items: string[];
};

const NEPAL_GEO_BOUNDS = {
  north: 30.447,
  south: 26.347,
  west: 80.0586,
  east: 88.2015,
} as const;

const SVG_MAP_BOUNDS = {
  left: 4,
  right: 994,
  top: 68,
  bottom: 535,
} as const;

function projectGeoPointToSvg(
  latitude: number,
  longitude: number
): Pick<MapPin, 'x' | 'y'> {
  const x =
    SVG_MAP_BOUNDS.left +
    ((longitude - NEPAL_GEO_BOUNDS.west) /
      (NEPAL_GEO_BOUNDS.east - NEPAL_GEO_BOUNDS.west)) *
      (SVG_MAP_BOUNDS.right - SVG_MAP_BOUNDS.left);

  const y =
    SVG_MAP_BOUNDS.top +
    ((NEPAL_GEO_BOUNDS.north - latitude) /
      (NEPAL_GEO_BOUNDS.north - NEPAL_GEO_BOUNDS.south)) *
      (SVG_MAP_BOUNDS.bottom - SVG_MAP_BOUNDS.top);

  return { x, y };
}

// Small display offsets keep nearby service points readable when they share
// the same city footprint on a compact SVG map.
const MAP_PIN_SOURCES: readonly MapPinSource[] = [
  {
    id: 'b1',
    type: 'booking',
    label: 'Head Office',
    address: 'Rani Pauwa, Pokhara',
    latitude: 28.2216775,
    longitude: 83.9949088,
    offsetX: -8,
    offsetY: -8,
  },
  {
    id: 'b2',
    type: 'booking',
    label: 'Branch Office',
    address: 'Transport Nagar, Ring Road, Kathmandu',
    latitude: 27.7198431,
    longitude: 85.2882238,
    offsetX: -8,
    offsetY: -8,
  },
  {
    id: 'b3',
    type: 'booking',
    label: 'Branch Office',
    address: 'Dhawaha, Butwal',
    latitude: 27.7003986,
    longitude: 83.4657667,
  },
  {
    id: 'b4',
    type: 'booking',
    label: 'Branch Office',
    address: 'Yantra Sala Margha, Narayanghat',
    latitude: 27.8201272,
    longitude: 84.4828922,
  },
  {
    id: 'b5',
    type: 'booking',
    label: 'Branch Office',
    address: 'Adarsh Nagar, Birgunj',
    latitude: 27.0146942,
    longitude: 84.8719559,
  },
  {
    id: 'd1',
    type: 'delivery',
    label: 'Delivery',
    address: 'Pokhara',
    latitude: 28.209538,
    longitude: 83.991402,
    offsetX: 8,
    offsetY: 8,
  },
  {
    id: 'd2',
    type: 'delivery',
    label: 'Delivery',
    address: 'Kathmandu',
    latitude: 27.708317,
    longitude: 85.3205817,
    offsetX: 8,
    offsetY: 8,
  },
  {
    id: 'd3',
    type: 'delivery',
    label: 'Delivery',
    address: 'Kushma',
    latitude: 28.2339253,
    longitude: 83.6860455,
  },
  {
    id: 'd4',
    type: 'delivery',
    label: 'Delivery',
    address: 'Beni',
    latitude: 28.3550258,
    longitude: 83.523725,
  },
  {
    id: 'd5',
    type: 'delivery',
    label: 'Delivery',
    address: 'Baglung',
    latitude: 28.3562467,
    longitude: 83.1426241,
  },
  {
    id: 'd6',
    type: 'delivery',
    label: 'Delivery',
    address: 'Damauli',
    latitude: 27.9828293,
    longitude: 84.2655773,
  },
  {
    id: 'd7',
    type: 'delivery',
    label: 'Delivery',
    address: 'Aabukhaireni',
    latitude: 27.9762031,
    longitude: 84.5815031,
  },
  {
    id: 'd8',
    type: 'delivery',
    label: 'Delivery',
    address: 'Lamjung',
    latitude: 28.231316,
    longitude: 84.376144,
  },
  {
    id: 'd9',
    type: 'delivery',
    label: 'Delivery',
    address: 'Gorkha',
    latitude: 28.2708368,
    longitude: 84.8407583,
  },
  {
    id: 'd10',
    type: 'delivery',
    label: 'Delivery',
    address: 'Syangja',
    latitude: 28.0445533,
    longitude: 83.82767,
  },
  {
    id: 'd11',
    type: 'delivery',
    label: 'Delivery',
    address: 'Waling',
    latitude: 27.9843444,
    longitude: 83.7685296,
  },
  {
    id: 'd12',
    type: 'delivery',
    label: 'Delivery',
    address: 'Galyang',
    latitude: 27.9583901,
    longitude: 83.6566467,
  },
] as const;

export const MAP_PINS: readonly MapPin[] = MAP_PIN_SOURCES.map((pinSource) => {
  const projected = projectGeoPointToSvg(
    pinSource.latitude,
    pinSource.longitude
  );

  return {
    id: pinSource.id,
    type: pinSource.type,
    label: pinSource.label,
    address: pinSource.address,
    x: projected.x + (pinSource.offsetX ?? 0),
    y: projected.y + (pinSource.offsetY ?? 0),
  };
});

export const REGION_INFO: Record<string, RegionInfo> = {
  NPBA: {
    title: 'Kathmandu Info:',
    items: ['Transport Nagar, Ring Road, Kathmandu', 'Kathmandu'],
  },
  NPKA: {
    title: 'Karnali Info:',
    items: ['None'],
  },
  NPMA: {
    title: 'Mahakali Info:',
    items: ['None'],
  },
  NPSE: {
    title: 'Seti Info:',
    items: ['None'],
  },
  NPDH: {
    title: 'Dhawalagiri Info:',
    items: ['Kushma', 'Beni', 'Baglung'],
  },
  NPGA: {
    title: 'Gandaki Info:',
    items: [
      'Rani Pauwa, Pokhara',
      'Damauli',
      'Aabukhaireni',
      'Lamjung',
      'Gorkha',
      'Syangja',
      'Waling',
      'Galyang',
    ],
  },
  NPJA: {
    title: 'Janakpur Info:',
    items: ['None'],
  },
  NPSA: {
    title: 'Sagarmatha Info:',
    items: ['None'],
  },
  NPKO: {
    title: 'Bhojpur Info:',
    items: ['None'],
  },
  NPME: {
    title: 'Mechi Info:',
    items: ['None'],
  },
  NPNA: {
    title: 'Narayani Info:',
    items: ['Yantra Sala Margha, Narayanghat', 'Adarsh Nagar, Birgunj'],
  },
  NPLU: {
    title: 'Lumbini Info:',
    items: ['Dhawaha, Butwal'],
  },
};
