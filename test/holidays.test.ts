import { describe, it } from "node:test";
import assert from "node:assert";
import publicHolidays, { holidays } from "../src/mm-calendar/holidays";
import { CalendarType } from "../src/mm-calendar/western-to-julian";
//
const _sg = 2361222;
//
describe("Holidays Test", () => {
  it("Western to Julian", async (t) => {
    await t.test("ct - default, y 2000", () => {
      const result = holidays.w2jdn(2024, 10, 17);
      assert.deepEqual(result, 2460601);
    });
    await t.test("ct - Julian, y 2000", () => {
      const result = holidays.w2jdn(2024, 10, 17, _sg, CalendarType.Julian);
      assert.deepEqual(result, 2460614);
    });
    // sg
    await t.test("1752-9-14, ct default", () => {
      const result = holidays.w2jdn(1752, 9, 14);
      assert.deepEqual(result, _sg);
    });
    await t.test("1752-9-14, ct julian", () => {
      const result = holidays.w2jdn(1752, 9, 14, _sg, CalendarType.Julian);
      assert.deepEqual(result, 2361233);
    });
    await t.test("1752-9-14, ct Gregorian", () => {
      const result = holidays.w2jdn(1752, 9, 14, _sg, CalendarType.Gregorian);
      assert.deepEqual(result, _sg);
    });
    // before sg
    await t.test("before sg, ct default", () => {
      const result = holidays.w2jdn(1752, 9, 1);
      assert.deepEqual(result, 2361220);
    });
    await t.test("before sg, ct julian", () => {
      const result = holidays.w2jdn(1752, 9, 1, _sg, CalendarType.Julian);
      assert.deepEqual(result, 2361220);
    });
    await t.test("before sg, ct Gregorian", () => {
      const result = holidays.w2jdn(1752, 9, 1, _sg, CalendarType.Gregorian);
      assert.deepEqual(result, 2361209);
    });
    // Oct 15, 1582,
    await t.test("Oct 15, 1582, ct default", () => {
      const result = holidays.w2jdn(1528, 10, 15);
      assert.deepEqual(result, 2279448);
    });
    await t.test("Oct 15, 1582, ct julian", () => {
      const result = holidays.w2jdn(1528, 10, 15, _sg, CalendarType.Julian);
      assert.deepEqual(result, 2279448);
    });
    await t.test("Oct 15, 1582, ct Gregorian", () => {
      const result = holidays.w2jdn(1528, 10, 15, _sg, CalendarType.Gregorian);
      assert.deepEqual(result, 2279438);
    });
    // Before Oct 15, 1582,
    await t.test("Oct 15, 1582, ct default", () => {
      const result = holidays.w2jdn(1528, 10, 1);
      assert.deepEqual(result, 2279434);
    });
    await t.test("Oct 15, 1582, ct julian", () => {
      const result = holidays.w2jdn(1528, 10, 1, _sg, CalendarType.Julian);
      assert.deepEqual(result, 2279434);
    });
    await t.test("Oct 15, 1582, ct Gregorian", () => {
      const result = holidays.w2jdn(1528, 10, 1, _sg, CalendarType.Gregorian);
      assert.deepEqual(result, 2279424);
    });
  });
  // Holidays on Gregorian Calendar
  it("Independent Day", async (t) => {
    await t.test("Before", () => {
      const result = publicHolidays(new Date(1947, 0, 4));
      assert.deepEqual(result, []);
    });
    await t.test("Start", () => {
      const result = publicHolidays(new Date(1948, 0, 4));
      assert.deepEqual(result, ["Independence Day"]);
    });
    await t.test("After", () => {
      const result = publicHolidays(new Date(2001, 0, 4));
      assert.deepEqual(result, ["Independence Day"]);
    });
  });
  //
  it("Union Day", async (t) => {
    await t.test("Before", () => {
      const result = publicHolidays(new Date(1946, 1, 12));
      assert.deepEqual(result, []);
    });
    await t.test("Start", () => {
      const result = publicHolidays(new Date(1947, 1, 12));
      assert.deepEqual(result, ["Union Day"]);
    });
    await t.test("After", () => {
      const result = publicHolidays(new Date(2001, 1, 12));
      assert.deepEqual(result, ["Union Day"]);
    });
  });
  //
  it("Peasants' Day", async (t) => {
    await t.test("Before", () => {
      const result = publicHolidays(new Date(1957, 2, 2));
      assert.deepEqual(result, []);
    });
    await t.test("Start", () => {
      const result = publicHolidays(new Date(1958, 2, 2));
      assert.deepEqual(result, ["Peasants' Day"]);
    });
    await t.test("After", () => {
      const result = publicHolidays(new Date(2001, 2, 2));
      assert.deepEqual(result, ["Peasants' Day"]);
    });
  });
  //
  it("Armed Forces Day", async (t) => {
    await t.test("Before", () => {
      const result = publicHolidays(new Date(1944, 2, 27));
      assert.deepEqual(result, []);
    });
    await t.test("Start", () => {
      const result = publicHolidays(new Date(1945, 2, 27));
      assert.deepEqual(result, ["Armed Forces Day"]);
    });
    await t.test("After", () => {
      const result = publicHolidays(new Date(2001, 2, 27));
      assert.deepEqual(result, ["Armed Forces Day"]);
    });
  });
  //
  it("Labour Day", async (t) => {
    await t.test("Before", () => {
      const result = publicHolidays(new Date(1922, 4, 1));
      assert.deepEqual(result, []);
    });
    await t.test("Start", () => {
      const result = publicHolidays(new Date(1923, 4, 1));
      assert.deepEqual(result, ["Labour Day"]);
    });
    await t.test("After", () => {
      const result = publicHolidays(new Date(2001, 4, 1));
      assert.deepEqual(result, ["Labour Day"]);
    });
  });
  //
  it("Martyrs' Day", async (t) => {
    await t.test("Before", () => {
      const result = publicHolidays(new Date(1945, 6, 19));
      assert.deepEqual(result, []);
    });
    await t.test("Start", () => {
      const result = publicHolidays(new Date(1947, 6, 19));
      assert.deepEqual(result, ["Martyrs' Day"]);
    });
    await t.test("After", () => {
      const result = publicHolidays(new Date(2001, 6, 19));
      assert.deepEqual(result, ["Martyrs' Day"]);
    });
  });
  //
  it("Christmas", async (t) => {
    await t.test("Before", () => {
      const result = publicHolidays(new Date(1750, 11, 25));
      assert.deepEqual(result, []);
    });
    await t.test("Start", () => {
      const result = publicHolidays(new Date(1752, 11, 25));
      assert.deepEqual(result, ["Christmas"]);
    });
    await t.test("After", () => {
      const result = publicHolidays(new Date(2001, 11, 25));
      assert.deepEqual(result, ["Christmas"]);
    });
  });
  //
  it("Holiday", async (t) => {
    await t.test("Before", () => {
      const result = publicHolidays(new Date(2017, 11, 30));
      assert.deepEqual(result, ["Holiday"]);
    });
    await t.test("2017", () => {
      const result = publicHolidays(new Date(2017, 11, 31));
      assert.deepEqual(result, ["Holiday"]);
    });
    await t.test("2018", () => {
      const result = publicHolidays(new Date(2018, 11, 31));
      assert.deepEqual(result, ["Holiday"]);
    });
    await t.test("2019", () => {
      const result = publicHolidays(new Date(2019, 11, 31));
      assert.deepEqual(result, ["Holiday"]);
    });
    await t.test("2020", () => {
      const result = publicHolidays(new Date(2020, 11, 31));
      assert.deepEqual(result, ["Holiday"]);
    });
    await t.test("2021", () => {
      const result = publicHolidays(new Date(2021, 11, 31));
      assert.deepEqual(result, ["Holiday"]);
    });
  });
});
