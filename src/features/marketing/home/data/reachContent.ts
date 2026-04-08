import {
  MAP_PINS,
  type MapPin,
} from '../../../../layout/components/MapOfNepal/pinLocations.ts';

export type HomeReachLocation = Pick<MapPin, 'id' | 'address' | 'type'>;

const HOME_REACH_ROW_SIZE = 6;

const chunkLocations = (
  locations: readonly HomeReachLocation[],
  rowSize: number
): HomeReachLocation[][] => {
  const rows: HomeReachLocation[][] = [];

  for (let index = 0; index < locations.length; index += rowSize) {
    rows.push([...locations.slice(index, index + rowSize)]);
  }

  return rows;
};

export const HOME_REACH_LOCATIONS: readonly HomeReachLocation[] = MAP_PINS.map(
  ({ id, address, type }) => ({
    id,
    address,
    type,
  })
);

export const HOME_REACH_LOCATION_ROWS = chunkLocations(
  HOME_REACH_LOCATIONS,
  HOME_REACH_ROW_SIZE
);
