interface IItem {
  key: string;
  name: string;
  cost_base: number;
  cost_increment: number;
}

const items = {
  fish: {
    key: 'fish',
    name: "Fish",
    cost_base: 10,
    cost_increment: 1.2,
  },
  boat: {
    key: 'boat',
    name: "Fish",
    cost_base: 10,
    cost_increment: 1.2
  },
  whale: {
    key: 'whale',
    name: "Fish",
    cost_base: 10,
    cost_increment: 1.2
  }
} as const satisfies Record<string, IItem>;

export type ItemsResource = typeof items;
export type Item = ItemsResource[keyof ItemsResource];

export default items;