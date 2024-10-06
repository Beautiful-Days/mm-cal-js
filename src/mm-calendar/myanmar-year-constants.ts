/**
 * Get Myanmar year constants depending on era
 * @param myanmarYear Myanmar year
 * @returns map
 * ERA_ID = Myanmar calendar era id [1-3] (EI)
 * WATAT_OFFSET = watat offset to compensate (WO)
 * NUMBER_OF_MONTHS = number of months to find excess days (NM)
 * EXCEPTION_IN_WATAT_YEAR = exception in watat year (EW)
 */
export const getMyanmarConstants = (myanmarYear: number) => {
  let eraId: number;
  let watatOffset: number;
  let numberOfMonths: number;
  let exceptionInWatatYear = 0;
  let fullmoonExceptions: number[][];
  let watatExceptions: number[];
  let i: number;

  // the third era (the era after Independence 1312 ME and after)
  if (myanmarYear > 1312) {
    eraId = 3;
    watatOffset = -0.5;
    numberOfMonths = 8;
    fullmoonExceptions = [[1377, 1]];
    watatExceptions = [1344, 1345];
  }
  // The second era (the era under British colony: 1217 ME to 1311 ME)
  else if (myanmarYear >= 1217) {
    eraId = 2;
    watatOffset = -1;
    numberOfMonths = 4;
    fullmoonExceptions = [
      [1234, 1],
      [1261, -1],
    ];
    watatExceptions = [1263, 1264];
  }
  // The first era (the era of Myanmar kings: 1216 ME and before)
  // Thandeikta (ME 1100 - 1216)
  else if (myanmarYear >= 1100) {
    eraId = 1.3;
    watatOffset = -0.85;
    numberOfMonths = -1;
    fullmoonExceptions = [
      [1120, 1],
      [1126, -1],
      [1150, 1],
      [1172, -1],
      [1207, 1],
    ];
    watatExceptions = [1201, 1202];
  }
  // Makaranta system 2 (ME 798 - 1099)
  else if (myanmarYear >= 798) {
    eraId = 1.2;
    watatOffset = -1.1;
    numberOfMonths = -1;
    fullmoonExceptions = [
      [813, -1],
      [849, -1],
      [851, -1],
      [854, -1],
      [927, -1],
      [933, -1],
      [936, -1],
      [938, -1],
      [949, -1],
      [952, -1],
      [963, -1],
      [968, -1],
      [1039, -1],
    ];
    watatExceptions = [];
  }
  // Makaranta system 1 (ME 0 - 797)
  else {
    eraId = 1.1;
    watatOffset = -1.1;
    numberOfMonths = -1;
    fullmoonExceptions = [
      [205, 1],
      [246, 1],
      [471, 1],
      [572, -1],
      [651, 1],
      [653, 2],
      [656, 1],
      [672, 1],
      [729, 1],
      [767, -1],
    ];
    watatExceptions = [];
  }
  i = bSearch2(myanmarYear, fullmoonExceptions);
  if (i >= 0) {
    // full moon day offset exceptions
    watatOffset += fullmoonExceptions[i][1];
  }
  i = bSearch1(myanmarYear, watatExceptions);
  if (i >= 0) {
    // correct watat exceptions
    exceptionInWatatYear = 1;
  }
  return {
    ERA_ID: eraId, // EI
    WATAT_OFFSET: watatOffset, // WO
    NUMBER_OF_MONTHS: numberOfMonths, // NM
    EXCEPTION_IN_WATAT_YEAR: exceptionInWatatYear, // EW
  };
};

// Binary search for array with two elements
const bSearch2 = (key: number, arr: number[][]) => {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    let mid = (low + high) / 2;
    if (arr[mid][0] == key) {
      return mid;
    } else if (arr[mid][0] < key) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  // Key not found
  return -1;
};

const bSearch1 = (key: number, arr: number[]) => {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    let mid = (low + high) / 2;
    if (arr[mid] == key) {
      return mid;
    } else if (arr[mid] < key) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  // Key not found
  return -1;
};
