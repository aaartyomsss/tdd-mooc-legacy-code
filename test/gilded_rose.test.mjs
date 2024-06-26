import fs from "fs";
import { describe, expect, test } from "vitest";
import { CONJURED, Item, Shop } from "../src/gilded_rose.mjs";

describe("Gilded Rose", () => {
  const data = fs.readFileSync("./test/characteristic-test.json", "utf-8");
  const dataObj = JSON.parse(data);

  for (const entry of dataObj) {
    test(JSON.stringify(entry), () => {
      const { input, output } = entry;
      const gildedRose = new Shop([new Item(input.name, input.sellIn, input.quality)]);
      const items = gildedRose.updateQuality();

      const item = items[0];

      expect(item.quality).to.equal(output.quality);
      expect(item.sellIn).to.equal(output.sellIn);
    });
  }

  test("Empty array", () => {
    const gildedRose = new Shop();
    const items = gildedRose.updateQuality();
    expect(items.length).toBe(0);
  });

  test("ArrayDeclaration", () => {
    const gildedRose = new Shop(["Stryker was here"]);
    expect(() => gildedRose.updateQuality()).toThrowError();
  });
});

describe("Conjured", () => {
  test("Conjured item can be made", () => {
    const gildedRose = new Shop([new Item(CONJURED, 30, 40)]);
    expect(gildedRose.items.length).toBe(1);
  });

  test("Conjured item quality is deducted by 2 if the sellIn > 0", () => {
    const gildedRose = new Shop([new Item(CONJURED, 30, 40)]);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.quality).to.equal(38);
    expect(item.sellIn).to.equal(29);
  });

  test("Conjured item quality is deducted by 4 if the sellIn < 0", () => {
    const gildedRose = new Shop([new Item(CONJURED, 0, 40)]);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.quality).to.equal(36);
    expect(item.sellIn).to.equal(-1);
  });

  test("Conjured item quality is not going below 0 if sellIn > 0 and quality is 0", () => {
    const gildedRose = new Shop([new Item(CONJURED, 1, 0)]);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.quality).to.equal(0);
    expect(item.sellIn).to.equal(0);
  });

  test("Conjured item quality is not going below 0 if sellIn > 0 and quality is 1", () => {
    const gildedRose = new Shop([new Item(CONJURED, 1, 1)]);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.quality).to.equal(0);
    expect(item.sellIn).to.equal(0);
  });

  test("Conjured item quality is not going below 0 if sellIn > 0 and quality is 2", () => {
    const gildedRose = new Shop([new Item(CONJURED, 1, 2)]);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.quality).to.equal(0);
    expect(item.sellIn).to.equal(0);
  });

  test("Conjured item quality is 1 if sellIn > 0 and quality is 3", () => {
    const gildedRose = new Shop([new Item(CONJURED, 1, 3)]);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.quality).to.equal(1);
    expect(item.sellIn).to.equal(0);
  });

  test("Conjured item quality is not going below 0 if sellIn < 0 and quality is 0", () => {
    const gildedRose = new Shop([new Item(CONJURED, 0, 0)]);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.quality).to.equal(0);
    expect(item.sellIn).to.equal(-1);
  });

  test("Conjured item quality is not going below 0 if sellIn < 0 and quality is 1", () => {
    const gildedRose = new Shop([new Item(CONJURED, 0, 1)]);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.quality).to.equal(0);
    expect(item.sellIn).to.equal(-1);
  });

  test("Conjured item quality is not going below 0 if sellIn < 0 and quality is 2", () => {
    const gildedRose = new Shop([new Item(CONJURED, 0, 2)]);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.quality).to.equal(0);
    expect(item.sellIn).to.equal(-1);
  });

  test("Conjured item quality is not going below 0 if sellIn < 0 and quality is 3", () => {
    const gildedRose = new Shop([new Item(CONJURED, 0, 3)]);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.quality).to.equal(0);
    expect(item.sellIn).to.equal(-1);
  });

  test("Conjured item quality is not going below 0 if sellIn < 0 and quality is 4", () => {
    const gildedRose = new Shop([new Item(CONJURED, 0, 4)]);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.quality).to.equal(0);
    expect(item.sellIn).to.equal(-1);
  });

  test("Constant is actually a conjured item ", () => {
    expect(CONJURED).toBe("Conjured potato");
  });
});
