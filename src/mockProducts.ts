// product mock data
export default [
  {
    id: 0,
    name: 'Mushroom soup',
    description: 'A rich mushroom soup.',
    ingredients: [
      { name: 'mushrooms' },
      { name: 'onion' },
      { name: 'garlic' },
      { name: 'chili' },
    ],
    vegan: true,
    priceSEK: 119,
    imageURL: '/images/products/0.jpg',
  },
  {
    id: 1,
    name: 'Some soup',
    description: 'Some description of some soup to read here.',
    ingredients: [
      { name: 'tofu' },
      { name: 'bell pepper' },
      { name: 'garlic' },
      { name: 'chili' },
      { name: 'sugar peas' },
    ],
    vegan: true,
    priceSEK: 99,
    imageURL: '/images/products/1.jpg',
  },
  {
    id: 2,
    name: 'Pumpkin soup',
    description: 'Some description of pumpkin soup to read here.',
    ingredients: [
      { name: 'pumpkin' },
      { name: 'garlic' },
      { name: 'pumpkin seeds' },
    ],
    vegan: true,
    priceSEK: 129,
    imageURL: `/images/products/2.jpg`,
  },
  {
    id: 3,
    name: 'Ramen',
    description: 'Some description about ramen to read here.',
    ingredients: [
      { name: 'noodles' },
      { name: 'corn' },
      { name: 'egg' },
      { name: 'sallad' },
    ],
    vegan: false,
    priceSEK: 139,
    imageURL: `/images/products/3.jpg`,
  },
  {
    id: 4,
    name: 'Curry soup',
    description:
      'Some description about seafood soup here covering some details.',
    ingredients: [
      { name: 'curry' },
      { name: 'salmon' },
      { name: 'bell pepper' },
    ],
    vegan: false,
    priceSEK: 119,
    imageURL: `/images/products/4.jpg`,
  },
  {
    id: 5,
    name: 'Shrimp soup',
    description:
      'Some description about shrimp soup here covering some details.',
    ingredients: [{ name: 'shrimps' }, { name: 'mushrooms' }, { name: 'lime' }],
    vegan: false,
    priceSEK: 129,
    imageURL: `/images/products/5.jpg`,
  },
];
