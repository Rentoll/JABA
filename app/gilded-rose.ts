export const AGED_BRIE = 'Aged Brie';
export const BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert';
export const SULFURAS = 'Sulfuras, Hand of Ragnaros';
export const CONJURED = 'Conjured';

export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

const increaseQuality = ({ sellIn, quality }) => {
  let tempQuality = quality + 1;
  if (sellIn < 5) {
    tempQuality = quality + 3;
  } else if (sellIn < 10) {
    tempQuality = quality + 2;
  }
  return tempQuality > 50 ? 50 : tempQuality;
};

const degradeQuality = ({ quality }, multiplayer = 1) => {
  // item quality never be less than zero
  return (quality - (2 * multiplayer)) > 0 ? (quality - (2 * multiplayer)) : 0;
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        this.items.forEach((item) => {
          const { name } = item;
          
          item.sellIn -= 1;

          // degradeQuantity
          if (name === SULFURAS) {
            item.quality = 80;
            item.sellIn = 1;
          } else 
          if (item.name === BACKSTAGE) {
            item.quality = item.sellIn > 0 ? increaseQuality(item) : 0;
          } else 
          if (item.name === AGED_BRIE) {
            item.quality = (item.quality + 1) > 50 ? 50 : (item.quality + 1);
          } else 
          if (item.name === CONJURED) {
            // degrade twice as fast as normal item
            item.quality = degradeQuality(item, 2);
          } else {
            item.quality = degradeQuality(item, 1);
          }
        });
        return this.items;
      }
}