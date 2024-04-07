import fs from "fs";
import { describe, expect, test } from "vitest";
import { Item, Shop } from "../src/gilded_rose.mjs";

describe("Gilded Rose", () => {
  const data = fs.readFileSync("./test/characteristic-test.json", "utf-8");
  const dataObj = JSON.parse(data);

  for (const entry of dataObj) {
    console.log(entry);
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
