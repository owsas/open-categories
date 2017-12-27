import * as is from 'is';
import { OpenCategories } from '../src/index';

describe('#getCategory', () => {
  test('should be able to get a topmost category', () => {
    const c = OpenCategories.getCategory('food');
    expect(is.object(c)).toBe(true);
  });

  test('should be able to get a nested category', () => {
    const c = OpenCategories.getCategory('food_meat_lamb');
    expect(is.object(c)).toBe(true);
  });

  test('should return undefined on not found category', () => {
    const c = OpenCategories.getCategory('food_meat_lambafeajfeiafeioa');
    expect(is.object(c)).toBe(false);
  });
});

describe('#getTopMostCategory', () => {
  test('should be able to get the topmost category for food_meat_lamb', () => {
    const c = OpenCategories.getTopMostCategory('food_meat_lamb');
    expect(is.object(c)).toBe(true);
    expect(c.translations.es).toEqual('comida');
    expect(c.topmost).toBe(true);
  });
});

describe('#getParentCategory', () => {
  test('should be able to get the parent category for food_meat_lamb', () => {
    const c = OpenCategories.getParentCategory('food_meat_lamb');
    expect(c.translations.es).toEqual('carne');
  });
});

describe('#search', () => {
  test('should call fuse.search', () => {
    const spy = jest.spyOn(OpenCategories.fuse, 'search');
    const c = OpenCategories.search('colomb');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe('#setFuseOptions', () => {
  test('should change the fuse instance', () => {
    const instance = OpenCategories.fuse;
    OpenCategories.setFuseOptions({ keys: ['name'] });
    expect(instance).not.toEqual(OpenCategories.fuse);
  });
});

describe('#getAllSlugsForCategories', () => {
  test('should return the correct slugs', () => {
    const categories = OpenCategories.getAllSlugsForCategories(
      ['food_colombian_arepas', 'food_fast', 'food_drinks_liquor'],
    );
    expect(categories).toEqual(
      ['food_colombian_arepas', 'food_colombian', 'food', 'food_fast', 
        'food_drinks_liquor', 'food_drinks'],
      );
  });

  test('should return the correct slugs (second test)', () => {
    const categories = OpenCategories.getAllSlugsForCategories(
      ['fashion_pants','fashion_jewelry', 'cultureEvents_cinema', 'home_bathroom'],
    );
    expect(categories).toEqual(
      ['fashion_pants', 'fashion', 'fashion_jewelry', 'cultureEvents_cinema',
        'cultureEvents', 'home_bathroom', 'home'],
      );
  });
});

