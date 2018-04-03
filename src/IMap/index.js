export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

const IMap = (function () {
  let storeKey = Symbol();

  return class IMap {
    static getStoreKey() {
      return storeKey;
    }

    static of(source) {
      let ret = {};
      if (Array.isArray(source)) {
        clone(source).map(item => ret[item[0]] = item[1]);
      } else {
        ret = clone(source);
      }

      return ret;
    }

    constructor(source) {
      this[storeKey] = IMap.of(source);
    }

    getStore() {
      return clone(this[storeKey]);
    }

    get(key) {
      return this[storeKey][key] ? this[storeKey][key] : undefined;
    }

    set(key, value) {
      return new IMap({ ...this[storeKey], [key]: value });
    }

    delete(key) {
      let ret = this[storeKey];
      if (ret[key] != null) {
        ret = clone(this[storeKey]);
        delete ret[key];
      }

      return new IMap(ret);
    }

    map(func) {
      let ret = clone(this[storeKey]);
      Object.keys(ret).forEach(key => {
        ret[key] = func.call(this, ret[key], key);
      });

      return new IMap(ret);
    }
  }
})();

export default IMap;

export class MapStr extends IMap {
  static of(source) {
    const ret = clone(source);
    Object.keys(source).forEach(key => {
      ret[key] = ret[key].toString();
    });

    return ret;
  }

  constructor(source) {
    super(source);
    this[MapStr.getStoreKey()] = MapStr.of(this[MapStr.getStoreKey()]);
  }
}

