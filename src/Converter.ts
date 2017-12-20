import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

export class Converter {
  static convertCategories(): any[] {
    const doc = yaml.safeLoad(
      fs.readFileSync(path.resolve(__dirname, '..', 'categories.yaml'), 'utf8'),
    );

    const arr = [];

    Object.keys(doc).forEach((k) => {
      const path = k;
      const split = k.split('_');
      let name = split.pop();
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

      arr.push({ name, translationsArray, ...doc[k], path: k });
    });

    return arr;
  }

  static writeToFile(path: string) {
    const arr = Converter.convertCategories();
    fs.writeFileSync(path, JSON.stringify(arr), { encoding: 'utf8' });
  }
}



