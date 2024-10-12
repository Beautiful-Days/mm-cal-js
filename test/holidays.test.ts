import assert from "node:assert";
import { describe, it } from "node:test";
import { holidays, publicHolidays } from "../src/mm-calendar/holidays.js";
import { CalendarType } from "../src/mm-calendar/western-to-julian.js";
// Only the happy path is the focus of the tests, and the original package, mmcal, references the results.
// Coverage report can see ./test/holidays-lcov.info
const _sg = 2361222;
//
describe("Holidays on Gregorian and Western to Julian", () => {
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
  it("New Year's Day", async (t) => {
    await t.test("2018", () => {
      const result = publicHolidays(new Date(2018, 0, 1));
      assert.deepEqual(result, ["New Year's Day"]);
    });
    await t.test("2019", () => {
      const result = publicHolidays(new Date(2019, 0, 1));
      assert.deepEqual(result, ["New Year's Day"]);
    });
    await t.test("2020", () => {
      const result = publicHolidays(new Date(2020, 0, 1));
      assert.deepEqual(result, ["New Year's Day"]);
    });
    await t.test("2021", () => {
      const result = publicHolidays(new Date(2021, 0, 1));
      assert.deepEqual(result, ["New Year's Day"]);
    });
  });
});

describe("Myanmar to JDN and Holidays on Myanmar Calendar", () => {
  it("Myanmar to JDN", async (t) => {
    await t.test("Big Watat - Late Tagu", () => {
      const result = holidays.myanmarToJdn(1385, 13, 1);
      assert.deepEqual(result, 2460410);
    });
    await t.test("Big Watat - Tagu", () => {
      // the impotent of mmt here we use index tagu 1 instance of late-tagu index 13
      // for 1385  expected: 2460410 actually got 2460025 , its 1384-late-tagu-1
      // different = -385
      const result = holidays.myanmarToJdn(1385, 1, 1);
      const result2 = holidays.myanmarToJdn(1384, 13, 1);
      assert.deepEqual(result, 2460025);
      assert.deepEqual(result2, 2460025);
    });
    await t.test("Big Watat - Tagu", () => {
      const result = holidays.myanmarToJdn(1385, 1, 28);
      assert.deepEqual(result, 2460052);
    });
    await t.test("Big watat, Nayon + 1 day", () => {
      const result = holidays.myanmarToJdn(1385, 3, 30);
      assert.deepEqual(result, 2460113);
    });
    await t.test("Big watat, First Waso , + 30 days", () => {
      // noted index of first waso is 0
      const result = holidays.myanmarToJdn(1385, 0, 1);
      assert.deepEqual(result, 2460114);
    });
    await t.test("Big watat, 2nd waso", () => {
      const result = holidays.myanmarToJdn(1385, 4, 1);
      assert.deepEqual(result, 2460144);
    });
    await t.test("Big watat, Full Moon day of 2nd waso", () => {
      const result = holidays.myanmarToJdn(1385, 4, 15);
      assert.deepEqual(result, 2460158);
    });
    //---------------
    await t.test("Little watat, First Waso , + 30 days", () => {
      // noted index of first waso is 0
      const result = holidays.myanmarToJdn(1382, 0, 1);
      assert.deepEqual(result, 2459021);
    });
    await t.test("Little watat, 2nd waso", () => {
      const result = holidays.myanmarToJdn(1382, 4, 1);
      assert.deepEqual(result, 2459051);
    });
    await t.test("Little watat, Full Moon day of 2nd waso", () => {
      const result = holidays.myanmarToJdn(1382, 4, 15);
      assert.deepEqual(result, 2459065);
    });
  });
  it("Buddha Day", async (t) => {
    await t.test("Common Year", () => {
      const result = publicHolidays(new Date(2020, 4, 6));
      assert.deepEqual(result, ["Buddha Day"]);
    });
    await t.test("Little Watat", () => {
      const result = publicHolidays(new Date(2021, 4, 25));
      assert.deepEqual(result, ["Buddha Day"]);
    });
    await t.test("Big Watat", () => {
      const result = publicHolidays(new Date(2023, 4, 3));
      assert.deepEqual(result, ["Buddha Day"]);
    });
  });
  it("Beginning of Buddhist Lent", async (t) => {
    await t.test("Common Year", () => {
      const result = publicHolidays(new Date(2020, 7, 3));
      assert.deepEqual(result, ["Beginning of Buddhist Lent"]);
    });
    await t.test("Little Watat", () => {
      const result = publicHolidays(new Date(2021, 6, 23));
      assert.deepEqual(result, ["Beginning of Buddhist Lent"]);
    });
    await t.test("Big Watat", () => {
      const result = publicHolidays(new Date(2023, 7, 1));
      assert.deepEqual(result, ["Beginning of Buddhist Lent"]);
    });
  });
  it("End of Buddhist Lent", async (t) => {
    await t.test("Common Year", () => {
      const result = publicHolidays(new Date(2020, 9, 31));
      assert.deepEqual(result, ["End of Buddhist Lent"]);
    });
    await t.test("Little Watat", () => {
      const result = publicHolidays(new Date(2021, 9, 20));
      assert.deepEqual(result, ["End of Buddhist Lent"]);
    });
    await t.test("Big Watat", () => {
      const result = publicHolidays(new Date(2023, 9, 29));
      assert.deepEqual(result, ["End of Buddhist Lent"]);
    });
  });
  it("Tazaungdaing", async (t) => {
    await t.test("Common Year", () => {
      const result = publicHolidays(new Date(2020, 10, 29));
      assert.deepEqual(result, ["Tazaungdaing"]);
    });
    await t.test("Little Watat", () => {
      const result = publicHolidays(new Date(2021, 10, 18));
      assert.deepEqual(result, ["Tazaungdaing"]);
    });
    await t.test("Big Watat", () => {
      const result = publicHolidays(new Date(2023, 10, 27));
      assert.deepEqual(result, ["Tazaungdaing"]);
    });
  });
  it("Tabaung Pwe", async (t) => {
    await t.test("Common Year", () => {
      const result = publicHolidays(new Date(2020, 2, 8));
      assert.deepEqual(result, ["Tabaung Pwe"]);
    });
    await t.test("Little Watat", () => {
      const result = publicHolidays(new Date(2021, 2, 27));
      assert.deepEqual(result, ["Tabaung Pwe", "Armed Forces Day"]);
    });
    await t.test("Big Watat", () => {
      const result = publicHolidays(new Date(2023, 2, 5));
      assert.deepEqual(result, ["Tabaung Pwe"]);
    });
  });
  it("National Day", async (t) => {
    await t.test("Common Year", () => {
      const result = publicHolidays(new Date(2020, 11, 9));
      assert.deepEqual(result, ["National Day"]);
    });
    await t.test("Little Watat", () => {
      const result = publicHolidays(new Date(2021, 10, 28));
      assert.deepEqual(result, ["National Day"]);
    });
    await t.test("Big Watat", () => {
      const result = publicHolidays(new Date(2023, 11, 7));
      assert.deepEqual(result, ["National Day"]);
    });
  });
  it("Karen New Year's Day", async (t) => {
    await t.test("Common Year", () => {
      const result = publicHolidays(new Date(2021, 0, 13));
      assert.deepEqual(result, ["Karen New Year's Day"]);
    });
    await t.test("Little Watat", () => {
      const result = publicHolidays(new Date(2022, 0, 2));
      assert.deepEqual(result, ["Karen New Year's Day"]);
    });
    await t.test("Big Watat", () => {
      const result = publicHolidays(new Date(2024, 0, 11));
      assert.deepEqual(result, ["Karen New Year's Day"]);
    });
  });
  it("Holiday, Before End of Buddhist Lent", async (t) => {
    await t.test("Common Year", () => {
      const result = publicHolidays(new Date(2020, 9, 30));
      assert.deepEqual(result, ["Holiday"]);
    });
    await t.test("Little Watat", () => {
      const result = publicHolidays(new Date(2021, 9, 19));
      assert.deepEqual(result, ["Holiday"]);
    });
    await t.test("Big Watat", () => {
      const result = publicHolidays(new Date(2024, 9, 16));
      assert.deepEqual(result, ["Holiday"]);
    });
  });
  it("Holiday, After End of Buddhist Lent", async (t) => {
    await t.test("Common Year", () => {
      const result = publicHolidays(new Date(2020, 10, 1));
      assert.deepEqual(result, ["Holiday"]);
    });
    await t.test("Little Watat", () => {
      const result = publicHolidays(new Date(2021, 9, 21));
      assert.deepEqual(result, ["Holiday"]);
    });
    await t.test("Big Watat", () => {
      const result = publicHolidays(new Date(2024, 9, 18));
      assert.deepEqual(result, ["Holiday"]);
    });
  });
  it("Holiday, Before Tazaungdaing", async (t) => {
    await t.test("Common Year", () => {
      const result = publicHolidays(new Date(2020, 10, 13));
      assert.deepEqual(result, ["Holiday"]);
    });
    await t.test("Little Watat", () => {
      const result = publicHolidays(new Date(2021, 10, 17));
      assert.deepEqual(result, ["Holiday"]);
    });
    await t.test("Big Watat", () => {
      const result = publicHolidays(new Date(2024, 10, 14));
      assert.deepEqual(result, ["Holiday"]);
    });
  });
});
//
describe("Thingyan Holidays", () => {
  it("Common Year", async (t) => {
    await t.test("Thingyan Akyo", () => {
      const result = publicHolidays(new Date(2021, 3, 13));
      assert.deepEqual(result, ["Thingyan Akyo"]);
    });
    await t.test("Thingyan Akya", () => {
      const result = publicHolidays(new Date(2021, 3, 14));
      assert.deepEqual(result, ["Thingyan Akya"]);
    });
    await t.test("Thingyan Akyat", () => {
      const result = publicHolidays(new Date(2021, 3, 15));
      assert.deepEqual(result, ["Thingyan Akyat"]);
    });
    await t.test("Thingyan Atat", () => {
      const result = publicHolidays(new Date(2021, 3, 16));
      assert.deepEqual(result, ["Thingyan Atat"]);
    });
    await t.test("Myanmar New Year's Day", () => {
      const result = publicHolidays(new Date(2021, 3, 17));
      assert.deepEqual(result, ["Myanmar New Year's Day"]);
    });
  });
  it("Little Watat", async (t) => {
    await t.test("Thingyan Akyo", () => {
      const result = publicHolidays(new Date(2022, 3, 13));
      assert.deepEqual(result, ["Thingyan Akyo"]);
    });
    await t.test("Thingyan Akya", () => {
      const result = publicHolidays(new Date(2022, 3, 14));
      assert.deepEqual(result, ["Thingyan Akya"]);
    });
    await t.test("Thingyan Akyat", () => {
      const result = publicHolidays(new Date(2022, 3, 15));
      assert.deepEqual(result, ["Thingyan Akyat"]);
    });
    await t.test("Thingyan Atat", () => {
      const result = publicHolidays(new Date(2022, 3, 16));
      assert.deepEqual(result, ["Thingyan Atat"]);
    });
    await t.test("Myanmar New Year's Day", () => {
      const result = publicHolidays(new Date(2022, 3, 17));
      assert.deepEqual(result, ["Myanmar New Year's Day"]);
    });
  });
  it("Big Watat", async (t) => {
    await t.test("Thingyan Akyo", () => {
      const result = publicHolidays(new Date(2024, 3, 13));
      assert.deepEqual(result, ["Thingyan Akyo"]);
    });
    await t.test("Thingyan Akya", () => {
      const result = publicHolidays(new Date(2024, 3, 14));
      assert.deepEqual(result, ["Thingyan Akya"]);
    });
    await t.test("Thingyan Akyat", () => {
      const result = publicHolidays(new Date(2024, 3, 15));
      assert.deepEqual(result, ["Thingyan Akyat"]);
    });
    await t.test("Thingyan Atat", () => {
      const result = publicHolidays(new Date(2024, 3, 16));
      assert.deepEqual(result, ["Thingyan Atat"]);
    });
    await t.test("Myanmar New Year's Day", () => {
      const result = publicHolidays(new Date(2024, 3, 17));
      assert.deepEqual(result, ["Myanmar New Year's Day"]);
    });
  });
});
//
describe("Thingyan Days and Extra Thingyan Holidays 2007-2016", () => {
  it("2007", async (t) => {
    await t.test("Thingyan Holiday", () => {
      const result = publicHolidays(new Date(2007, 3, 12));
      assert.deepEqual(result, ["Thingyan Holiday"]);
    });
    await t.test("Thingyan Akyo", () => {
      const result = publicHolidays(new Date(2007, 3, 13));
      assert.deepEqual(result, ["Thingyan Akyo"]);
    });
    await t.test("Thingyan Akya", () => {
      const result = publicHolidays(new Date(2007, 3, 14));
      assert.deepEqual(result, ["Thingyan Akya"]);
    });
    await t.test("Thingyan Akyat", () => {
      const result = publicHolidays(new Date(2007, 3, 15));
      assert.deepEqual(result, ["Thingyan Akyat"]);
    });
    await t.test("Thingyan Atat", () => {
      const result = publicHolidays(new Date(2007, 3, 16));
      assert.deepEqual(result, ["Thingyan Atat"]);
    });
    await t.test("Myanmar New Year's Day", () => {
      const result = publicHolidays(new Date(2007, 3, 17));
      assert.deepEqual(result, ["Myanmar New Year's Day"]);
    });
    await t.test("Thingyan Holiday", () => {
      const result = publicHolidays(new Date(2007, 3, 18));
      assert.deepEqual(result, ["Thingyan Holiday"]);
    });
    await t.test("Thingyan Holiday", () => {
      const result = publicHolidays(new Date(2007, 3, 19));
      assert.deepEqual(result, ["Thingyan Holiday"]);
    });
    await t.test("Thingyan Holiday", () => {
      const result = publicHolidays(new Date(2007, 3, 20));
      assert.deepEqual(result, ["Thingyan Holiday"]);
    });
    await t.test("Thingyan Holiday", () => {
      const result = publicHolidays(new Date(2007, 3, 21));
      assert.deepEqual(result, ["Thingyan Holiday"]);
    });
  });
  //TODO 2008 to 2015
  it("2016 , Akyat 2 days", async (t) => {
    await t.test("Thingyan Holiday", () => {
      const result = publicHolidays(new Date(2016, 3, 11));
      assert.deepEqual(result, ["Thingyan Holiday"]);
    });
    await t.test("Thingyan Akyo", () => {
      const result = publicHolidays(new Date(2016, 3, 12));
      assert.deepEqual(result, ["Thingyan Akyo"]);
    });
    await t.test("Thingyan Akya", () => {
      const result = publicHolidays(new Date(2016, 3, 13));
      assert.deepEqual(result, ["Thingyan Akya"]);
    });
    await t.test("Thingyan Akyat", () => {
      const result = publicHolidays(new Date(2016, 3, 14));
      assert.deepEqual(result, ["Thingyan Akyat"]);
    });
    await t.test("Thingyan Akyat", () => {
      const result = publicHolidays(new Date(2016, 3, 15));
      assert.deepEqual(result, ["Thingyan Akyat"]);
    });
    await t.test("Thingyan Atat", () => {
      const result = publicHolidays(new Date(2016, 3, 16));
      assert.deepEqual(result, ["Thingyan Atat"]);
    });
    await t.test("Myanmar New Year's Day", () => {
      const result = publicHolidays(new Date(2016, 3, 17));
      assert.deepEqual(result, ["Myanmar New Year's Day"]);
    });
    await t.test("Thingyan Holiday", () => {
      const result = publicHolidays(new Date(2016, 3, 18));
      assert.deepEqual(result, ["Thingyan Holiday"]);
    });
    await t.test("Thingyan Holiday", () => {
      const result = publicHolidays(new Date(2016, 3, 19));
      assert.deepEqual(result, ["Thingyan Holiday"]);
    });
    await t.test("Thingyan Holiday", () => {
      const result = publicHolidays(new Date(2016, 3, 20));
      assert.deepEqual(result, ["Thingyan Holiday"]);
    });
  });
});

describe("Thingyan Days and Extra Thingyan Holidays 2022 and 2023", () => {
  it("2022", async (t) => {
    await t.test("Thingyan Holiday", () => {
      const result = publicHolidays(new Date(2022, 3, 9));
      assert.deepEqual(result, ["Thingyan Holiday"]);
    });
    await t.test("Thingyan Holiday", () => {
      const result = publicHolidays(new Date(2022, 3, 10));
      assert.deepEqual(result, ["Thingyan Holiday"]);
    });
    await t.test("Thingyan Holiday", () => {
      const result = publicHolidays(new Date(2022, 3, 11));
      assert.deepEqual(result, ["Thingyan Holiday"]);
    });
    await t.test("Thingyan Holiday", () => {
      const result = publicHolidays(new Date(2022, 3, 12));
      assert.deepEqual(result, ["Thingyan Holiday"]);
    });
    await t.test("Thingyan Akyo", () => {
      const result = publicHolidays(new Date(2022, 3, 13));
      assert.deepEqual(result, ["Thingyan Akyo"]);
    });
    await t.test("Thingyan Akya", () => {
      const result = publicHolidays(new Date(2022, 3, 14));
      assert.deepEqual(result, ["Thingyan Akya"]);
    });
    await t.test("Thingyan Akyat", () => {
      const result = publicHolidays(new Date(2022, 3, 15));
      assert.deepEqual(result, ["Thingyan Akyat"]);
    });
    await t.test("Thingyan Atat", () => {
      const result = publicHolidays(new Date(2022, 3, 16));
      assert.deepEqual(result, ["Thingyan Atat"]);
    });
    await t.test("Myanmar New Year's Day", () => {
      const result = publicHolidays(new Date(2022, 3, 17));
      assert.deepEqual(result, ["Myanmar New Year's Day"]);
    });
  });
  it("2023", async (t) => {
    await t.test("Thingyan Holiday", () => {
      const result = publicHolidays(new Date(2023, 3, 9));
      assert.deepEqual(result, ["Thingyan Holiday"]);
    });
    await t.test("Thingyan Holiday", () => {
      const result = publicHolidays(new Date(2023, 3, 10));
      assert.deepEqual(result, ["Thingyan Holiday"]);
    });
    await t.test("Thingyan Holiday", () => {
      const result = publicHolidays(new Date(2023, 3, 11));
      assert.deepEqual(result, ["Thingyan Holiday"]);
    });
    await t.test("Thingyan Holiday", () => {
      const result = publicHolidays(new Date(2023, 3, 12));
      assert.deepEqual(result, ["Thingyan Holiday"]);
    });
    await t.test("Thingyan Akyo", () => {
      const result = publicHolidays(new Date(2023, 3, 13));
      assert.deepEqual(result, ["Thingyan Akyo"]);
    });
    await t.test("Thingyan Akya", () => {
      const result = publicHolidays(new Date(2023, 3, 14));
      assert.deepEqual(result, ["Thingyan Akya"]);
    });
    await t.test("Thingyan Akyat", () => {
      const result = publicHolidays(new Date(2023, 3, 15));
      assert.deepEqual(result, ["Thingyan Akyat"]);
    });
    await t.test("Thingyan Atat", () => {
      const result = publicHolidays(new Date(2023, 3, 16));
      assert.deepEqual(result, ["Thingyan Atat"]);
    });
    await t.test("Myanmar New Year's Day", () => {
      const result = publicHolidays(new Date(2023, 3, 17));
      assert.deepEqual(result, ["Myanmar New Year's Day"]);
    });
  });
});
//
describe("Thingyan Days and Extra Thingyan Holidays 2024", () => {
  it("2024", async (t) => {
    await t.test("Thingyan Akyo", () => {
      const result = publicHolidays(new Date(2024, 3, 13));
      assert.deepEqual(result, ["Thingyan Akyo"]);
    });
    await t.test("Thingyan Akya", () => {
      const result = publicHolidays(new Date(2024, 3, 14));
      assert.deepEqual(result, ["Thingyan Akya"]);
    });
    await t.test("Thingyan Akyat", () => {
      const result = publicHolidays(new Date(2024, 3, 15));
      assert.deepEqual(result, ["Thingyan Akyat"]);
    });
    await t.test("Thingyan Atat", () => {
      const result = publicHolidays(new Date(2024, 3, 16));
      assert.deepEqual(result, ["Thingyan Atat"]);
    });
    await t.test("Myanmar New Year's Day", () => {
      const result = publicHolidays(new Date(2024, 3, 17));
      assert.deepEqual(result, ["Myanmar New Year's Day"]);
    });
    await t.test("Thingyan Holiday", () => {
      const result = publicHolidays(new Date(2024, 3, 18));
      assert.deepEqual(result, ["Thingyan Holiday"]);
    });
    await t.test("Thingyan Holiday", () => {
      const result = publicHolidays(new Date(2024, 3, 19));
      assert.deepEqual(result, ["Thingyan Holiday"]);
    });
    await t.test("Thingyan Holiday", () => {
      const result = publicHolidays(new Date(2024, 3, 20));
      assert.deepEqual(result, ["Thingyan Holiday"]);
    });
    await t.test("Thingyan Holiday", () => {
      const result = publicHolidays(new Date(2024, 3, 21));
      assert.deepEqual(result, ["Thingyan Holiday"]);
    });
  });
});
