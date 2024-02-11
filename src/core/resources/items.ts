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
    name: "Boat",
    cost_base: 10,
    cost_increment: 1.2
  },
  whale: {
    key: 'whale',
    name: "Whale",
    cost_base: 10,
    cost_increment: 1.2
  },
  kraken: {
    key: 'kraken',
    name: "Kraken",
    cost_base: 10,
    cost_increment: 1.2
  },
  seal: {
    key: 'seal',
    name: "Seal",
    cost_base: 10,
    cost_increment: 1.2
  },
  dog: {
    key: 'dog',
    name: "Dog",
    cost_base: 10,
    cost_increment: 1.2
  }
} as const satisfies Record<string, IItem>;

export type ItemsResource = typeof items;
export type Item = ItemsResource[keyof ItemsResource];

export default items;