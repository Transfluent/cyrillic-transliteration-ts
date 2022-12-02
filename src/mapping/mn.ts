import { merge } from "lodash";
import cloneDeep from "lodash/cloneDeep";
import invert from "lodash/invert";

// This version of Mongolian Latin <-> Cyrillic is based on  MNS 5217:2012
// as far as I know this is the latest standard. Imform me @ https://github.com/Serbipunk
// https://gogo.mn/r/101115
// https://en.wikipedia.org/wiki/Mongolian_Cyrillic_alphabet
export const MN_CYR_TO_LAT_DICT = {
  А: "A",
  а: "a",
  Э: "E",
  э: "e",
  И: "I",
  и: "i", // i
  О: "O",
  о: "o",
  У: "U",
  у: "u",
  Ө: "Ö",
  ө: "ö",
  Ү: "Ü",
  ү: "ü",
  Н: "N",
  н: "n",
  М: "M",
  м: "m",
  Л: "L",
  л: "l",
  В: "V",
  в: "v",
  П: "P",
  п: "p",
  Ф: "F",
  ф: "f",
  К: "K",
  к: "k",
  Х: "Kh",
  х: "kh", // lat 1
  Г: "G",
  г: "g",
  С: "S",
  с: "s",
  Ш: "Sh",
  ш: "sh", // sh  // lat2
  Т: "T",
  т: "t",
  Д: "D",
  д: "d",
  Ц: "Ts",
  ц: "ts", // lat3
  Ч: "Ch",
  ч: "ch", // lat4
  З: "Z",
  з: "z",
  Ж: "J",
  ж: "j",
  Й: "I",
  й: "i", // i * 2
  Р: "R",
  р: "r",
  Б: "B",
  б: "b",
  Е: "Ye",
  е: "ye", // lat 5
  Ё: "Yo",
  ё: "yo", // lat 6
  Щ: "Sh",
  щ: "sh", // sh x 2   // lat 7
  Ъ: "I",
  ъ: "i", // i * 3
  Ы: "Y",
  ы: "y",
  Ь: "I",
  ь: "i", // i * 4
  Ю: "Yu",
  ю: "yu", // lat 8
  Я: "Ya",
  я: "ya", // lat 9
};
const MN_LAT_TO_CYR_DICT = invert(cloneDeep(MN_CYR_TO_LAT_DICT));
merge(MN_LAT_TO_CYR_DICT, {
  I: "И",
  i: "и",
  Sh: "Ш",
  sh: "ш",
});

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
      ("Kk".includes(c) && c_plus_1 === "h") || // Х х
      ("Ss".includes(c) && c_plus_1 === "h") || // Ш ш
      ("Tt".includes(c) && c_plus_1 === "s") || // Ц ц
      ("Cc".includes(c) && c_plus_1 === "h") || // Ч ч
      ("Yy".includes(c) && "eoua".includes(c_plus_1)) // Е Ё Ю Я
    ) {
      index += 1;
      c += c_plus_1;

      // In Mongolia the beginning of if statement is not the truth
      //                ((c === 'L' or c === 'l') and c_plus_1 === 'j') or \
      //                ((c === 'N' or c === 'n') and c_plus_1 === 'j') or \
      //                ((c === 'D' or c === 'd') and c_plus_1 === 'ž') or \
      // Sü(nj)idmaa -> Сүнжидмаагаа  not  Сүnjидмаа
      // I add post-processing , wonder if @georgeslabreche would like to change the old code, thx
      if (["Lj", "lj", "Nj", "nj"].includes(c)) {
        index -= 1;
        c = c.slice(0, -1);
      }
    }

    if (c in MN_LAT_TO_CYR_DICT) {
      // If character is in dictionary, it means it's a cyrillic so let's transliterate that character.
      // Transliterate current character.
      cyrillic_str += MN_LAT_TO_CYR_DICT[c];
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
    const char = MN_CYR_TO_LAT_DICT[c];
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
