# Open Categories

An open categorization system for platforms that handle information about food, fashion, technology and others

See ALL the categories in [CATEGORIES.md](./CATEGORIES.md)

<!-- TOC -->

- [Open Categories](#open-categories)
  - [Why Open Categories?](#why-open-categories)
  - [Principles](#principles)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Importing the class](#importing-the-class)
    - [Getting a specific category](#getting-a-specific-category)
    - [Searching](#searching)
    - [Getting the topmost category for any subcategory](#getting-the-topmost-category-for-any-subcategory)
    - [Getting the parent category](#getting-the-parent-category)
    - [Getting all the slugs for one or several given categories](#getting-all-the-slugs-for-one-or-several-given-categories)
  - [Files](#files)
  - [Collaboration](#collaboration)
  - [Dev Features](#dev-features)
  - [Credits](#credits)
  - [License](#license)

<!-- /TOC -->

## Why Open Categories?

Open Categories aim to be an aid for the developers and the companies that need to categorize information.

These are some of the products that may use Open Categories. For example:
  - AI Applications
    - Image recognition
    - Chatbots
  - Online stores
  - Search engines
  - Games (For categorizing in-game items)

We want to build a categorization system that is both semantic, fast and useful for everybody to use, and not to reinvent the wheel on each new application.

At the end, having a common categorization system makes it easier to communicate between different apps and platforms.

## Principles

In Open Categories, whatever can be categorized with a simple slug. A slug is a piece of texts that contains very useful information.

For example, if we had the string `food_fast_pizza`, we could split it in the following way:
- `food_fast_pizza`: The sub sub category (Pizza)
- `food_fast`: The sub category (Fast Food)
- `food`: The topmost category (Food in general)

So, with one simple string we can classify whatever.

Let's take a look at other example: 
- `food_drinks_liquor_tequila`: The sub sub sub category (Tequila)
- `food_drinks_liquor`: The sub sub category (Liquor)
- `food_drinks`: The sub category (Drinks)
- `food`: The topmost category (Food in general)

This categorization is available as a node module, but we provide JSON and YAML files for you to copy and use with other languages :)

This module will help you parse and understand more about the categories, and also perform fuzzy searches

We are also commited to `semver`, so our versions and releases will be semantic 

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

### Getting all the slugs for one or several given categories

This is useful for understanding all the posible categories and subcategories that are present in any given array of slugs

For example: `['food_drinks_liquor']` => `['food','food_drinks','food_drinks_liquor']` 

```js
const slugs = OpenCategories.getAllSlugsForCategories(['food_drinks_liquor', 'fashion_jewelry']);
console.log(slugs);
/*
food
food_drinks
food_drinks_liquor
fashion
fashion_jewelry
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

**Thank you for helping us build a better categorization for the world :)**

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