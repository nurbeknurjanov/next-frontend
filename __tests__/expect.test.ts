const can1 = {
  flavor: 'grapefruit',
  ounces: 12,
};
const can2 = {
  ounces: 12,
  flavor: 'grapefruit',
};

describe('toEqual', () => {
  test('have all the same properties', () => {
    expect(can1).toEqual(can2);
  });
  test('are not the exact same can', () => {
    expect(can1).not.toBe(can2);
  });
});
describe('toEqual 2', () => {
  const part = { ounces: 12 };
  test('have all the same properties', () => {
    expect(can1).toEqual(expect.objectContaining(part));
  });
  test('are not the exact same can', () => {
    expect(can1).not.toBe(part);
  });
});

describe('toContainEqual', () => {
  test('toContainEqual', () => {
    const myBeverage = { a: 'A', b: 'B' };
    expect([{ a: 'A', b: 'B' }]).toContainEqual(myBeverage);
  });
});

describe('arrayContaining', () => {
  const expected = ['Alice', 'Bob'];
  it('matches even if received contains additional elements', () => {
    expect(['Alice', 'Bob', 'Eve']).toEqual(expect.arrayContaining(expected));
  });
  it('does not match if received does not contain expected elements', () => {
    expect(['Bob', 'Eve']).not.toEqual(expect.arrayContaining(expected));
  });
});

test('map calls its argument with a non-null argument', () => {
  const mock = jest.fn();
  mock(false); //but not null and undefined
  expect(mock).toBeCalledWith(expect.anything());
  expect(mock).toBeCalledWith(expect.any(Boolean));
  expect(mock).not.toBeCalledWith(expect.any(Number));
});
test('map calls its argument with a non-null argument', () => {
  const mock = jest.fn();
  mock(false, 123); //but not null and undefined
  expect(mock).toBeCalledWith(expect.any(Boolean), expect.any(Number));
});
