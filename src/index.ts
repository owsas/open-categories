import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import * as Fuse from 'fuse.js';

const categoriesArray = require('../categories-array');
const categoriesTree = require('../categories-tree');

export class OpenCategories {

  static fuse = new Fuse(
    categoriesArray, { keys: ['name', 'synonyms', 'translationsArray'] },
  );

  static search(text: string) {
    return OpenCategories.fuse.search(text);
  }

  static setFuseOptions(opts: Fuse.FuseOptions) {
    OpenCategories.fuse = new Fuse(categoriesArray, opts);
  }

  static getCategory(slug: string): any {
    return categoriesTree[slug];
  }

  static getTopMostCategory(slug: string): any {
    const array = slug.split('_');
    return categoriesTree[array[0]];
  }

  static getParentCategory(slug: string): any {
    const array = slug.split('_');
    array.pop();
    return categoriesTree[array.join('_')];
  }
}
