import fs from "fs";
import { describe, expect, test } from "vitest";
import { Item, Shop } from "../src/gilded_rose.mjs";

const fileLocation = "./test/characteristic-test.json";

describe("Gilded Rose", () => {
  const testData = fs.readFileSync(fileLocation, "utf-8");

  const dataObject = JSON.parse(testData);
  for (const entry of dataObject) {
    const expectedInput = entry.input;
    test(JSON.stringify(expectedInput), () => {
      const gildedRose = new Shop([new Item(expectedInput.name, expectedInput.sellIn, expectedInput.quality)]);
      const items = gildedRose.updateQuality();

      const updatedItem = items[0];

      const expectedOutput = entry.output;

      expect(updatedItem.name).toBe(expectedOutput.name);

      expect(updatedItem.sellIn).toBe(expectedOutput.sellIn);
      expect(updatedItem.quality).toBe(expectedOutput.quality);
    });
  }
});
