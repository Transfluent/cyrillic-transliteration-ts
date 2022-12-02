import cloneDeep from "lodash/cloneDeep";
import invert from "lodash/invert";
import merge from "lodash/merge";
import omit from "lodash/omit";
import { RU_CYR_TO_LAT_DICT } from "./ru";

// Transliterate from Bulgarian cyrillic to latin

let cyrillicToLatin: Record<string, string> = omit(
  cloneDeep(RU_CYR_TO_LAT_DICT),
  // There are a couple of letters that don't exist in Bulgarian:
  ["Ё", "ё", "Ы", "ы", "Э", "э"]
);
// Some letters that are pronounced diferently
merge(cyrillicToLatin, {
  // Some letters that are pronounced differently
  Й: "Y",
  й: "y",
  Х: "H",
  х: "h",
  Ц: "TS",
  ц: "ts",
  Щ: "SHT",
  щ: "sht",
  Ю: "YU",
  ю: "yu",
  Я: "YA",
  я: "ya",
  // The following letters use the pre-2012 "Andreichin" system for lettering,
  // because in the newest "Ivanov" system "a" and "y" translate to two Bulgarian
  // letters and choosing to which one depends on the word and text context
  // https://en.wikipedia.org/wiki/Romanization_of_Bulgarian
  Ъ: "Ă",
  ъ: "ă",
  Ь: "J",
  ь: "j",
});

// Transliterate from latin Bulgarian to cyrillic.
const latinToCyrillic = invert(cloneDeep(cyrillicToLatin));
merge(latinToCyrillic, {
  ZH: "Ж",
  Zh: "Ж",
  zh: "ж",
  TS: "Ц",
  Ts: "Ц",
  ts: "ц",
  CH: "Ч",
  Ch: "Ч",
  ch: "ч",
  SH: "Ш",
  Sh: "Ш",
  sh: "ш",
  SHT: "Щ",
  Sht: "Щ",
  sht: "щ",
  YU: "Ю",
  Yu: "Ю",
  yu: "ю",
  YA: "Я",
  Ya: "Я",
  ya: "я",
});

export const BG_CYR_TO_LAT_DICT = cyrillicToLatin;
export const BG_LAT_TO_CYR_DICT = cloneDeep(latinToCyrillic);

const isBulgarianCyrillicException = (c: string, c_plus_1: string) => {
  return (
    ("Zz".includes(c) && "Hh".includes(c_plus_1)) || // Zh, zh
    ("Tt".includes(c) && "Ss".includes(c_plus_1)) || // Ts, ts
    ("Ss".includes(c) && "Hh".includes(c_plus_1)) || // Sh, sh (and also covers Sht, sht)
    ("Cc".includes(c) && "Hh".includes(c_plus_1)) || // Ch, ch
    ("Yy".includes(c) && "Uu".includes(c_plus_1)) || // Yu, yu
    ("Yy".includes(c) && "Aa".includes(c_plus_1))
  );
};

export const toCyrillic = (string_to_transliterate: string) => {
  let cyrillic_str = "";

  // Transliterate by traversing the inputted string character by character.
  const length_of_string_to_transliterate = string_to_transliterate.length;
  let index = 0;
  while (index < length_of_string_to_transliterate) {
    // Grab a character from the string at the current index
    let c = string_to_transliterate[index];

    // Watch out for Lj and lj. Don't want to interpret Lj/lj as L/l and j.
    // Watch out for Nj and nj. Don't want to interpret Nj/nj as N/n and j.
    // Watch out for Dž and and dž. Don't want to interpret Dž/dž as D/d and j.
    let c_plus_1 = "";
    if (index != length_of_string_to_transliterate - 1) {
      c_plus_1 = string_to_transliterate[index + 1];
    }

    let c_plus_2 = "";
    if (index + 2 <= length_of_string_to_transliterate - 1) {
      c_plus_2 = string_to_transliterate[index + 2];
    }

    if (
      ((c === "L" || c === "l") && c_plus_1 === "j") ||
      ((c === "N" || c === "n") && c_plus_1 === "j") ||
      ((c === "D" || c === "d") && c_plus_1 === "ž") ||
      isBulgarianCyrillicException(c, c_plus_1)
    ) {
      index += 1;
      c += c_plus_1;

      if (
        // In Bulgarian, the letter "щ" is represented by three latin letters: "sht",
        // so we need this logic to support the third latin letter
        (c === "sh" || c === "Sh" || c === "SH") &&
        "Tt".includes(c_plus_2)
      ) {
        index += 1;
        c += string_to_transliterate[index];
      }
    }

    if (c in BG_LAT_TO_CYR_DICT) {
      // If character is in dictionary, it means it's a cyrillic so let's transliterate that character.
      // Transliterate current character.
      cyrillic_str += BG_LAT_TO_CYR_DICT[c];
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
    const char = BG_CYR_TO_LAT_DICT[c];
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
