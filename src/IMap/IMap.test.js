import IMap, { MapStr } from  './';


test('create a new IMap from the plain obj', () => {
  const map = new IMap({
    some: 'thing',
    foo: 'bar',
  });

  expect(map.getStore()).toEqual({
    some: 'thing',
    foo: 'bar',
  });
});


test('create a new IMap from the array', () => {
  const map = new IMap([
    ['this', 'that'],
    ['foo', 'bar'],
    ['fee', 'baz'],
  ]);

  expect(map.getStore()).toEqual({
    this: "that",
    foo: "bar",
    fee: "baz"
  });
});


test('IMap.get() check', () => {
  const map = new IMap({
    some: 'thing',
    foo: 'bar',
  });

  expect(map.get('foo')).toBe('bar');
});


test('IMap.set() check', () => {
  const map = new IMap({
    some: 'thing',
    foo: 'bar',
  });

  const newMap = map.set('goo', 'baz');

  expect(newMap.get('goo')).toBe('baz');
});


test('IMap.delete() check', () => {
  const map = new IMap({
    some: 'thing',
    foo: 'bar',
  });

  const newMap = map.delete('foo');

  expect(newMap.get('foo')).toBe(undefined);
});


test('IMap.map() check', () => {
  const map = new IMap({
    some: 'thing',
    foo: 'bar',
  });

  const mapped = map.map((value, key) => `${key}_${value}`);

  expect(mapped.getStore()).toEqual({
    some: 'some_thing',
    foo: 'foo_bar',
  });
});


test('Immutability: IMap.set() shouldn\'t mutate the old IMap', () => {
  const map = new IMap({
    some: 'thing',
    foo: 'bar',
  });

  map.set('goo', 'baz');

  expect(map.get('goo')).toBe(undefined);
});


test('Immutability: IMap.delete() shouldn\'t mutate the old IMap', () => {
  const map = new IMap({
    some: 'thing',
    foo: 'bar',
  });

  map.delete('foo');

  expect(map.get('foo')).toBe('bar');
});


test('Immutability: IMap.map() shouldn\'t mutate the old IMap', () => {
  const map = new IMap({
    some: 'thing',
    foo: 'bar',
  });

  map.map((value, key) => `${key}_${value}`);

  expect(map.getStore()).toEqual({
    some: 'thing',
    foo: 'bar',
  });
});


test('Immutability: delete a property', () => {
  const map = new IMap({
    some: 'thing',
    foo: 'bar',
  });

  delete map['some'];

  expect(map.get('some')).toBe('thing');
});


test('Immutability: try to override a property', () => {
  const map = new IMap({
    some: 'thing',
    foo: 'bar',
  });

  let some = map.get('some');
  some = 'body';

  expect(map.get('some')).toBe('thing');
});


test('Immutability: try to override a store', () => {
  const map = new IMap({
    some: 'thing',
    foo: 'bar',
  });

  let b = map.getStore();

  b = 'this is not a store';

  expect(map.getStore()).toEqual({
    some: 'thing',
    foo: 'bar',
  });
});


test('Try to extends from IMap', () => {
  class newIMap extends IMap {}

  const map = new newIMap({
    some: 'thing',
    foo: 'bar',
  });

  expect(map.getStore()).toEqual({
    some: 'thing',
    foo: 'bar',
  });
});


test('Check MapStr .toString() conversion', () => {
  const map = new MapStr([
    ['tra', 1],
    ['foo', 2],
    ['fee', 3],
  ]);

  expect(map.getStore()).toEqual({
    tra: "1",
    foo: "2",
    fee: "3"
  });
});
