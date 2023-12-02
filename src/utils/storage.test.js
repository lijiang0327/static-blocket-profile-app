import storage from './storage';

describe('storage set', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'setItem');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('localStorage.setItem should be invoked', () => {
    storage.set('abc', 'abc');
    expect(localStorage.setItem).toBeCalled();
  });

  it('localStorage.setItem should be invoked with correct value', () => {
    storage.set('a', 'abc');
    expect(localStorage.setItem).toBeCalledWith('profile-app-a', '"abc"');

    storage.set('b', true);
    expect(localStorage.setItem).toBeCalledWith('profile-app-b', 'true');

    storage.set('c', 1);
    expect(localStorage.setItem).toBeCalledWith('profile-app-c', '1');

    const obj = { a: 1, b: true, c: 'c' };
    storage.set('d', obj);
    expect(localStorage.setItem).toBeCalledWith('profile-app-d', JSON.stringify(obj));
  });
});

describe('storage get', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'getItem');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('localStorage.getItem should be invoked', () => {
    storage.get('abc');

    expect(localStorage.getItem).toBeCalled();
  });

  it('storage.get should get correct value', () => {
    storage.set('a', 'abc');
    expect(storage.get('a')).toBe('abc');

    storage.set('b', true);
    expect(storage.get('b')).toBe(true);

    storage.set('c', 1);
    expect(storage.get('c')).toBe(1);

    const obj = { a: 1, b: true, c: 'c' };
    storage.set('d', obj);
    expect(storage.get('d')).toStrictEqual(obj);
  });
});
