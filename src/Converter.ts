import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

export class Converter {
  static getTreeRaw() {
    return yaml.safeLoad(
    fs.readFileSync(path.resolve(__dirname, '..', 'categories.yaml'), 'utf8'));
  }

  static convertCategories() {
    const doc = Converter.getTreeRaw();

    const arr = [];

    Object.keys(doc).forEach((k) => {
      const path = k;
      const split = k.split('_');
      let name = split.pop();
      let topmost = false;
      const translationsArray = [];

      if (doc[k]['translations'] && doc[k]['translations']['en']) {
        name = doc[k]['translations']['en'];
      }

      if (doc[k]['translations']) {
        Object.keys(doc[k]['translations']).forEach((key) => {
          translationsArray.push({
            lang: key,
            text: doc[k]['translations'][key],
          });
        });
      }

      if (path.split('_').length === 1) { // topmost category
        topmost = true;
      }

      arr.push({ topmost, name, translationsArray, ...doc[k], path: k });
    });

    return arr;
  }

  static getTree() {
    const arr = Converter.convertCategories();
    const obj = {};

    arr.forEach((category) => {
      obj[category.path] = category;
    });

    return obj;
  }

  static writeToPath(destination: string) {
    const arr = Converter.convertCategories();
    const doc = Converter.getTree();
    
    fs.writeFileSync(
      path.resolve(destination, 'categories-array.json'), 
      JSON.stringify(arr), 
      { encoding: 'utf8' },
    );

    // write tree
    fs.writeFileSync(
      path.resolve(destination, 'categories-tree.json'), 
      JSON.stringify(doc), 
      { encoding: 'utf8' },
    );
  }
}



