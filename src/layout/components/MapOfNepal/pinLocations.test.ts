import assert from 'node:assert/strict';
import test from 'node:test';

import { MAP_PINS, REGION_INFO } from './pinLocations.ts';

const pinByAddress = new Map(MAP_PINS.map((pin) => [pin.address, pin]));

test('splits grouped delivery areas into separate pins', () => {
  const groupedAddresses = [
    'Kushma',
    'Beni',
    'Baglung',
    'Damauli',
    'Aabukhaireni',
    'Lamjung',
    'Gorkha',
    'Syangja',
    'Waling',
    'Galyang',
  ];

  const groupedPins = groupedAddresses.map((address) => {
    const pin = pinByAddress.get(address);

    assert.ok(pin, `Expected a dedicated map pin for ${address}`);

    return pin;
  });

  const uniqueCoordinates = new Set(
    groupedPins.map((pin) => `${Math.round(pin.x)}:${Math.round(pin.y)}`)
  );

  assert.equal(uniqueCoordinates.size, groupedPins.length);
});

test('keeps Kathmandu booking and delivery markers distinct but nearby', () => {
  const bookingPin = MAP_PINS.find((pin) => pin.id === 'b2');
  const deliveryPin = MAP_PINS.find((pin) => pin.id === 'd2');

  assert.ok(bookingPin);
  assert.ok(deliveryPin);
  assert.notEqual(
    `${Math.round(bookingPin.x)}:${Math.round(bookingPin.y)}`,
    `${Math.round(deliveryPin.x)}:${Math.round(deliveryPin.y)}`
  );
  assert.ok(Math.abs(bookingPin.x - deliveryPin.x) < 20);
  assert.ok(Math.abs(bookingPin.y - deliveryPin.y) < 20);
});

test('projects the western and eastern delivery areas in the right order', () => {
  const baglungPin = pinByAddress.get('Baglung');
  const pokharaPin = pinByAddress.get('Pokhara');
  const damauliPin = pinByAddress.get('Damauli');
  const gorkhaPin = pinByAddress.get('Gorkha');
  const lamjungPin = pinByAddress.get('Lamjung');

  assert.ok(baglungPin);
  assert.ok(pokharaPin);
  assert.ok(damauliPin);
  assert.ok(gorkhaPin);
  assert.ok(lamjungPin);

  assert.ok(baglungPin.x < pokharaPin.x);
  assert.ok(damauliPin.x < lamjungPin.x);
  assert.ok(lamjungPin.x < gorkhaPin.x);
  assert.ok(lamjungPin.y < damauliPin.y);
});

test('assigns region hover info to the correct service areas', () => {
  assert.deepEqual(REGION_INFO.NPDH.items, ['Kushma', 'Beni', 'Baglung']);
  assert.deepEqual(REGION_INFO.NPLU.items, ['Dhawaha, Butwal']);
  assert.deepEqual(REGION_INFO.NPNA.items, [
    'Chitwan',
    'Adarsh Nagar, Birgunj',
  ]);
  assert.ok(REGION_INFO.NPGA.items.includes('Damauli'));
  assert.ok(REGION_INFO.NPGA.items.includes('Aabukhaireni'));
  assert.ok(REGION_INFO.NPGA.items.includes('Lamjung'));
  assert.ok(REGION_INFO.NPGA.items.includes('Gorkha'));
  assert.ok(REGION_INFO.NPGA.items.includes('Syangja'));
  assert.ok(REGION_INFO.NPGA.items.includes('Waling'));
  assert.ok(REGION_INFO.NPGA.items.includes('Galyang'));
});
