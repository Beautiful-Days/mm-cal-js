# Myanmar Calendar JS

> This repository is the TypeScript fork of [chanmratekoko/mmcalendar](https://github.com/chanmratekoko/mmcalendar) and the opinionated TypeScript implementation of the original [yan9a/mmcal](https://github.com/yan9a/mmcal), and based on this very awesome article by **yan9a/mmcal's** author: [Algorithm, Program and Calculation of Myanmar Calendar](https://cool-emerald.blogspot.com/2013/06/algorithm-program-and-calculation-of.html).

##  🚧 🚧 Only certain features are available for now 🚧 🚧
[x] western date to Myanmar date
[x] Sabbath day calculation


## Installation

```shell
npm i mm-cal-js
```

## Usage

### Western date to Myanmar Date

```ts
import { getMyanmarDate } from "mm-cal-js";

console.log(getMyanmarDate(new Date(2000, 1, 1)));
```

#### Output

```ts
{
  myanmarYear: 1361,
  myanmarYearType: 1, // [0=common, 1=little watat, 2=big watat]
  yearLength: 384,
  // Tagu=1, Kason=2, Nayon=3, 1st Waso=0, 2nd Waso=4,
  // Wagaung=5, Tawthalin=6, Thadingyut=7, Tazaungmon=8,
  // Nadaw=9, Pyatho=10, Tabodwe=11, Tabaung=12,
  // Late Tagu=13, Late Kason=14]
  month: 10,
  monthType: 0, // [0=Hnaung, 1=Oo]
  monthLength: 30, // [29 or 30]
  monthDay: 27, // [1 to 30]
  moonPhase: 4.3375, // [0=waxing, 1=full moon, 2=waning, 3=new moon]
  fortnightDay: 1.6875, // [1 to 15]
  weekDay: 3, // [0=sat, 1=sun, 2=mon, 3=tue, 4=wed, 5=thu, 6=fri]
  julianDay: 2451575.5
}
```

### Checking Sabbath day

```ts
import { isSabbath } from "mm-cal-js";

console.log(isSabbath(new Date()));
// output: [1=Sabbath, 2=Sabbath Eve, 0=else]
```

## Documenation
The code is very well-documented. I suggest you explore into the source code. You can also read more about the implementation details [here](https://cool-emerald.blogspot.com/2013/06/algorithm-program-and-calculation-of.html).

Essentially, the Gregorian date is converted into Julian day number, and it's converted into Myanmar date.


## Motivation

Although Dr. Yan Naing Aye's original codebase is flawless, it's not type-safe and the variable names are very confusing. This implementation aims to appeal to modern web developers with type-safety and functional API.
