import assert from 'node:assert/strict';
import test from 'node:test';

import { MAP_PINS } from '../../../../layout/components/MapOfNepal/pinLocations.ts';
import {
  HOME_REACH_LOCATIONS,
  HOME_REACH_LOCATION_ROWS,
} from './reachContent.ts';

test('uses the interactive map pins as the source of truth for home reach locations', () => {
  assert.deepEqual(
    HOME_REACH_LOCATIONS.map((location) => ({
      id: location.id,
      address: location.address,
      type: location.type,
    })),
    MAP_PINS.map((pin) => ({
      id: pin.id,
      address: pin.address,
      type: pin.type,
    }))
  );
});

test('keeps the home reach list aligned with the corrected interactive-map labels', () => {
  const addresses = HOME_REACH_LOCATIONS.map((location) => location.address);

  assert.ok(addresses.includes('Aabukhaireni'));
  assert.ok(addresses.includes('Waling'));
  assert.ok(addresses.includes('Chitwan'));
  assert.ok(!addresses.includes('Abukhaireni'));
  assert.ok(!addresses.includes('Walling'));
});

test('splits the reach buttons into rows without dropping any map locations', () => {
  const rowAddresses = HOME_REACH_LOCATION_ROWS.flatMap((row) =>
    row.map((location) => location.address)
  );

  assert.deepEqual(
    rowAddresses,
    HOME_REACH_LOCATIONS.map((location) => location.address)
  );
  assert.ok(HOME_REACH_LOCATION_ROWS.every((row) => row.length > 0));
});
