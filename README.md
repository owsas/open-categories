# Open Categories

An open categorization system for platforms that handle information about food, fashion, technology and others

<!-- TOC -->

- [Open Categories](#open-categories)
  - [Important: We need collaboration with the inclusion of new categories](#important-we-need-collaboration-with-the-inclusion-of-new-categories)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Importing the class](#importing-the-class)
    - [Getting a specific category](#getting-a-specific-category)
    - [Searching](#searching)
    - [Getting the topmost category for any subcategory](#getting-the-topmost-category-for-any-subcategory)
    - [Getting the parent category](#getting-the-parent-category)
  - [Files](#files)
  - [Collaboration](#collaboration)
  - [Dev Features](#dev-features)
  - [Credits](#credits)
  - [License](#license)

<!-- /TOC -->

## Important: We need collaboration with the inclusion of new categories
See categories.yaml to see the different categories we support for now.

This is still a work in progress.

## Installation
With npm: 
`npm install --save open-categories`

With yarn:
`yarn add open-categories`

## Usage

### Importing the class
```js
import { OpenCategories } from 'open-categories';

// or, with require:
const { OpenCategories } = require('open-categories');
```

### Getting a specific category

```js
const category = OpenCategories.getCategory('fashion_shoes_sport');
console.log(category); 
/*
{
  "name":"sport shoes",
  "translationsArray":[
    {"lang":"es","text":"zapatos deportivos"},
    {"lang":"en","text":"sport shoes"}
  ],
  "translations": {"es":"zapatos deportivos","en":"sport shoes"},
  "path":"fashion_shoes_sport"
}
*/
```

### Searching

This library also comes with fuzzy search, backed up by `fuse.js`, so you can easily run:

```js
const results = OpenCategories.search('sport sho');
console.log(results); 
/*
[{
  "name":"sport shoes",
  "translationsArray":[
    {"lang":"es","text":"zapatos deportivos"},
    {"lang":"en","text":"sport shoes"}
  ],
  "translations": {"es":"zapatos deportivos","en":"sport shoes"},
  "path":"fashion_shoes_sport"
}, {...}, {...}]
*/
```

### Getting the topmost category for any subcategory 

At some point you would like to get information about the topmost category for any given subcategory

For example: `food_mexican` -> `food`

You could do this with `getTopMostCategory`

```js
const topMost = OpenCategories.getTopMostCategory('food_mexican');
console.log(topMost);
/*
{
  "name":"food",
  "translationsArray":[{"lang":"es","text":"comida"}],
  "translations":{"es":"comida"},
  "path":"food",
  "topmost":true
}
*/
```

### Getting the parent category

For example: `food_drinks_liquor` -> `food_drinks`

You could do this with `getParentCategory`

```js
const topMost = OpenCategories.getTopMostCategory('food_drinks_liquor');
console.log(topMost);
/*
{
  "path":"food_drinks",
  ...
}
*/
```


## Files
- `categories.yaml`: Main file for the categories
- `src/_postBuild.ts`: Generates the `categories-array` and `categories-tree` JSON files out of `categories.yaml`
- `src/index.ts`: Exposes the Typescript API later compiled to `out/index.js` (main package file)
- `src/Converter.ts`: Handles the conversion from YAML to JSON

## Collaboration

- Clone this repo, and start adding your code in the `index.ts` file, or adding categories / translations in `categories.yaml`
- When you are done, write the tests in the `index.test.ts` file. For testing, this repo works with [Jest](https://facebook.github.io/jest/).

## Dev Features
* Testing with Jest
* Linting out of the box (checks the style of your code), with TSLint
* Build, prepublish and other scripts to help you to develop
* Works with Typescript: Static typing for your JS Applications, reducing amount of runtime errors
* Coverage out of the box, thanks to Jest
* Uses deterministic module resolving, with Yarn

## Credits

Developed by Juan Camilo Guarín Peñaranda,  
Otherwise SAS, Colombia  
2017

## License 

MIT.