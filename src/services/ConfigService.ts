import configJson from '../config.json';

export const ConfigService = {
  ...configJson,
  get: function (path: string) {
    const pathArr = path.split('.');
    if (!pathArr.length) return null;
    if (pathArr.length === 1) return this[pathArr[0]];

    let current: any = this;

    for (const path of pathArr) {
      current = current[path]
    }

    return current;
  }
}