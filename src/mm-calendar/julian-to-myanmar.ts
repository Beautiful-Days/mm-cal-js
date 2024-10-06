import { MYANMAR_ERA_START, SOLAR_YEAR } from "./constants";

export const julianToMyanmarDate = (julianDay: number) => {
  let julianDayNumber = Math.round(julianDay);
  let myanmarYear = Math.floor(
    (julianDayNumber - 0.5 - MYANMAR_ERA_START) / SOLAR_YEAR
  );
};

export const checkMyanmarYear = (myanmarYear: number) => {};
