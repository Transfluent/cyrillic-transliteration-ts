import cloneDeep from "lodash/cloneDeep";
import invert from "lodash/invert";
import merge from "lodash/merge";

// This dictionary is to transliterate from Russian cyrillic to latin (GOST_7.79-2000 System B).
export const RU_CYR_TO_LAT_DICT = {
  А: "A",
  а: "a",
  Б: "B",
  б: "b",
  В: "V",
  в: "v",
  Г: "G",
  г: "g",
  Д: "D",
  д: "d",
  Е: "E",
  е: "e",
  Ё: "YO",
  ё: "yo",
  Ж: "ZH",
  ж: "zh",
  З: "Z",
  з: "z",
  И: "I",
  и: "i",
  Й: "J",
  й: "j",
  К: "K",
  к: "k",
  Л: "L",
  л: "l",
  М: "M",
  м: "m",
  Н: "N",
  н: "n",
  О: "O",
  о: "o",
  П: "P",
  п: "p",
  Р: "R",
  р: "r",
  С: "S",
  с: "s",
  Т: "T",
  т: "t",
  У: "U",
  у: "u",
  Ф: "F",
  ф: "f",
  Х: "X",
  х: "x",
  Ц: "CZ",
  ц: "cz",
  Ч: "CH",
  ч: "ch",
  Ш: "SH",
  ш: "sh",
  Щ: "SHH",
  щ: "shh",
  Ъ: "''",
  ъ: "''",
  Ы: "Y'",
  ы: "y'",
  Ь: "'",
  ь: "'",
  Э: "E'",
  э: "e'",
  Ю: "YU",
  ю: "yu",
  Я: "YA",
  я: "ya",
};

// This dictionary is to transliterate from Russian latin to cyrillic.
const latinToCyrillic = invert(cloneDeep(RU_CYR_TO_LAT_DICT));

merge(latinToCyrillic, {
  "''": "ъ",
  "'": "ь",
  C: "К",
  c: "к",
  CK: "К",
  Ck: "К",
  ck: "к",
  JA: "ЖА",
  Ja: "Жа",
  ja: "жа",
  JE: "ЖЕ",
  Je: "Же",
  je: "же",
  JI: "ЖИ",
  Ji: "Жи",
  ji: "жи",
  JO: "ЖО",
  Jo: "Жо",
  jo: "жо",
  JU: "ЖУ",
  Ju: "Жу",
  ju: "жу",
  PH: "Ф",
  Ph: "Ф",
  ph: "ф",
  TH: "З",
  Th: "З",
  th: "з",
  W: "В",
  w: "в",
  Q: "К",
  q: "к",
  WH: "В",
  Wh: "В",
  wh: "в",
  Y: "И",
  y: "и",
  YA: "Я",
  Ya: "я",
  ya: "я",
  YE: "Е",
  Ye: "е",
  ye: "е",
  YI: "И",
  Yi: "и",
  yi: "и",
  YO: "Ё",
  Yo: "ё",
  yo: "ё",
  YU: "Ю",
  Yu: "ю",
  yu: "ю",
  "Y'": "ы",
  "y'": "ы",
  iy: "ый",
  ij: "ый", // dobriy => добрый
});

export const RU_LAT_TO_CYR_DICT = cloneDeep(latinToCyrillic);

const isRussianCyrillicException = (
  c: string,
  c_plus_1: string,
  c_plus_2: string
) => {
  return (
    ("Cc".includes(c) && "HhKkZz".includes(c_plus_1)) || // c, ch, ck, cz
    ("Tt".includes(c) && "Hh".includes(c_plus_1)) || // th
    ("Ww".includes(c) && "Hh".includes(c_plus_1)) || // wh
    ("Pp".includes(c) && "Hh".includes(c_plus_1)) || // ph
    ("Ee".includes(c) && c_plus_1 === "'") || // e'
    (c === "i" && c_plus_1 === "y" && !"aou".includes(c_plus_2)) || // iy[^AaOoUu]
    ("Jj".includes(c) && "UuAaEeIiOo".includes(c_plus_1)) || // j, ju, ja, je, ji, jo
    ("Ss".includes(c) && "HhZz".includes(c_plus_1)) || // s, sh, sz
    ("Yy".includes(c) && "AaOoUuEeIi'".includes(c_plus_1)) || // y, ya, yo, yu, ye, yi, y'
    ("Zz".includes(c) && "Hh".includes(c_plus_1)) || // z, zh
    (c === "'" && c_plus_1 === "'") // ''
  );
};

export const toCyrillic = (str: string) => {
  let cyrillic_str = "";

  // Transliterate by traversing the inputted string character by character.
  let index = 0;
  while (index < str.length) {
    // Grab a character from the string at the current index
    let c = str[index];

    // Watch out for Lj and lj. Don't want to interpret Lj/lj as L/l and j.
    // Watch out for Nj and nj. Don't want to interpret Nj/nj as N/n and j.
    // Watch out for Dž and and dž. Don't want to interpret Dž/dž as D/d and j.
    let c_plus_1 = "";
    if (index != str.length - 1) {
      c_plus_1 = str[index + 1];
    }

    let c_plus_2 = "";
    if (index + 2 <= str.length - 1) {
      c_plus_2 = str[index + 2];
    }

    if (
      ((c === "L" || c === "l") && c_plus_1 === "j") ||
      ((c === "N" || c === "n") && c_plus_1 === "j") ||
      ((c === "D" || c === "d") && c_plus_1 === "ž") ||
      isRussianCyrillicException(c, c_plus_1, c_plus_2)
    ) {
      index += 1;
      c += c_plus_1;

      if (
        // Similarly in Russian, the letter "щ" шы represented by "shh".
        index + 2 <= str.length - 1 &&
        (c === "sh" || c === "Sh" || c === "SH") &&
        "Hh".includes(c_plus_2)
      ) {
        index += 1;
        c += str[index];
      }
    }

    if (c in RU_LAT_TO_CYR_DICT) {
      // If character is in dictionary, it means it's a cyrillic so let's transliterate that character.
      if (
        "Yy".includes(c) &&
        "аеиоуэя".includes(cyrillic_str.slice(-1).toLowerCase())
      ) {
        // ay, ey, iy, oy, uy
        cyrillic_str += c === "y" ? "й" : "Й";
      } else {
        // Transliterate current character.
        cyrillic_str += RU_LAT_TO_CYR_DICT[c];
      }
    } else {
      // If character is not in character transliteration dictionary,
      // it is most likely a number or a special character so just keep it.
      cyrillic_str += c;
    }

    index += 1;
  }
  return cyrillic_str;
};

export const toLatin = (string_to_transliterate: string) => {
  let latinized_str = "";
  // iterate each character in string
  for (let i = 0; i < string_to_transliterate.length; i++) {
    // get the current character
    const c = string_to_transliterate[i];

    // If character is in dictionary, it means it's a cyrillic so let's transliterate that character.
    const char = RU_CYR_TO_LAT_DICT[c];
    if (char) {
      // Transliterate current character.
      latinized_str += char;
    } else {
      // If character is not in character transliteration dictionary,
      // it is most likely a number or a special character so just keep it.
      latinized_str += c;
    }
  }
  return latinized_str;
};
