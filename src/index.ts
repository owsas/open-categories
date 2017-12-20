import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import * as Fuse from 'fuse.js';

import { Converter } from './Converter';

const doc = yaml.safeLoad(
  fs.readFileSync(path.resolve(__dirname, '..', 'categories.yaml'), 'utf8'),
);

const asArray = Converter.convertCategories();
const fuse = new Fuse(asArray, { keys: ['name', 'translationsArray'] });

export class OpenCategories {
  static Converter = Converter;

  static search(text: string) {
    return fuse.search(text);
  }

  static getCategory(slug: string): any {
    return doc[slug];
  }

  static getTopMostCategory(slug: string): any {
    const array = slug.split('_');
    return doc[array[0]];
  }

  static getParentCategory(slug: string): any {
    const array = slug.split('_');
    array.pop();
    return doc[array.join('_')];
  }
}

// const r = OpenCategories.search('');
// console.log(JSON.stringify(r, null, 2));
