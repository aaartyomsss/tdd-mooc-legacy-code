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
});
