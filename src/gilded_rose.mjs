export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const BRIE = "Aged Brie";
const BACKSTAGE = "Backstage passes to a TAFKAL80ETC concert";
const SULFURAS = "Sulfuras, Hand of Ragnaros";
export const CONJURED = "Conjured potato";

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name === SULFURAS) {
        continue;
      }
      this.handleQualityUpdate(i);
      this.handleSellIn(i);
    }

    return this.items;
  }

  handleQualityUpdate(i) {
    if (this.items[i].name === BRIE) {
      this.updateAgedBrieQuality(i);
    } else if (this.items[i].name === BACKSTAGE) {
      this.updateBackstageQuality(i);
    } else if (this.items[i].name === CONJURED) {
      this.updateConjuredQuality(i);
    } else {
      this.updateItem(i);
    }
  }

  handleSellIn(i) {
    this.items[i].sellIn = this.items[i].sellIn - 1;
    if (this.items[i].sellIn < 0) {
      this.updateItemQualityOnBeingExpired(i);
    }
  }

  updateItemQualityOnBeingExpired(i) {
    if (this.items[i].name === BRIE) {
      this.updateBrieQualityIfExpired(i);
    } else if (this.items[i].name === BACKSTAGE) {
      this.updateBackstageQualityIfExpired(i);
    } else if (this.items[i].name === CONJURED) {
      this.updateConjuredQuality(i);
    } else {
      this.updateItemQualityIfExpired(i);
    }
  }

  updateBrieQualityIfExpired(i) {
    if (this.items[i].quality < 50) {
      this.items[i].quality = this.items[i].quality + 1;
    }
  }

  updateBackstageQualityIfExpired(i) {
    this.items[i].quality = this.items[i].quality - this.items[i].quality;
  }

  updateItemQualityIfExpired(i) {
    if (this.items[i].quality > 0) {
      this.items[i].quality = this.items[i].quality - 1;
    }
  }

  updateAgedBrieQuality(i) {
    if (this.items[i].quality < 50) {
      this.items[i].quality = this.items[i].quality + 1;
    }
  }

  updateBackstageQuality(i) {
    if (this.items[i].quality < 50) {
      this.items[i].quality = this.items[i].quality + 1;
      if (this.items[i].sellIn < 11) {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
        }
      }
      if (this.items[i].sellIn < 6) {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
        }
      }
    }
  }

  updateConjuredQuality(i) {
    if (this.items[i].quality - 2 > 0) {
      this.items[i].quality -= 2;
    } else {
      this.items[i].quality = 0;
    }
  }

  updateItem(i) {
    if (this.items[i].quality > 0) {
      this.items[i].quality = this.items[i].quality - 1;
    }
  }
}
