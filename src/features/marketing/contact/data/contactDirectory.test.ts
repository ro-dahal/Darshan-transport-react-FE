import assert from 'node:assert/strict';
import test from 'node:test';

import { BOOKING_OFFICES, DELIVERY_OFFICES } from './contactDirectory.ts';

test('uses the chitwan branch query for the narayanghat booking office', () => {
  const narayanghatOffice = BOOKING_OFFICES.find(
    (office) => office.location === 'Darshan Transport - Narayanghat Branch'
  );

  assert.ok(narayanghatOffice);
  assert.match(narayanghatOffice.search, /Chitwan Branch/i);
  assert.match(narayanghatOffice.search, /Bharatpur\s*44200/i);
});

test('uses the exact baglung branch query for the baglung delivery office', () => {
  const baglungOffice = DELIVERY_OFFICES.find(
    (office) => office.address === 'Kushma / Beni / Baglung'
  );

  assert.ok(baglungOffice);
  assert.equal(baglungOffice.search, 'Darshan Transport - Baglung Branch');
  assert.equal(baglungOffice.mapTarget, '28.2605875,83.605015625');
  assert.equal(baglungOffice.mapZoom, 17);
});

test('centers the anbukhaireni delivery office on the same point as the map pin', () => {
  const anbukhaireniOffice = DELIVERY_OFFICES.find(
    (office) => office.address === 'Anbukhaireni / Lamjung / Gorkha'
  );

  assert.ok(anbukhaireniOffice);
  assert.equal(
    anbukhaireniOffice.search,
    'Darshan Transport - Anbukhaireni Branch'
  );
  assert.equal(anbukhaireniOffice.mapTarget, '7MV6WG3M+WHQ');
  assert.equal(anbukhaireniOffice.mapZoom, 17);
});

test('uses the waling plus code for the waling delivery office', () => {
  const walingOffice = DELIVERY_OFFICES.find(
    (office) => office.address === 'Syangja / Waling / Galyang'
  );

  assert.ok(walingOffice);
  assert.equal(walingOffice.search, 'Darshan Transport - Walling Branch');
  assert.equal(walingOffice.mapTarget, '7MV5XQP8+4GV');
  assert.equal(walingOffice.mapZoom, 17);
});
