import cloneDeep from "lodash/cloneDeep";
import invert from "lodash/invert";
import omit from "lodash/omit";

// Build the dictionaries to transliterate Serbian cyrillic to latin and vice versa.

// This dictionary is to transliterate from cyrillic to latin.
export const SR_CYR_TO_LAT_DICT: Record<string, string> = {
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
  Ђ: "Đ",
  ђ: "đ",
  Е: "E",
  е: "e",
  Ж: "Ž",
  ж: "ž",
  З: "Z",
  з: "z",
  И: "I",
  и: "i",
  Ј: "J",
  ј: "j",
  К: "K",
  к: "k",
  Л: "L",
  л: "l",
  Љ: "Lj",
  љ: "lj",
  М: "M",
  м: "m",
  Н: "N",
  н: "n",
  Њ: "Nj",
  њ: "nj",
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
  Ћ: "Ć",
  ћ: "ć",
  У: "U",
  у: "u",
  Ф: "F",
  ф: "f",
  Х: "H",
  х: "h",
  Ц: "C",
  ц: "c",
  Ч: "Č",
  ч: "č",
  Џ: "Dž",
  џ: "dž",
  Ш: "Š",
  ш: "š",
};

// This dictionary is to transliterate from Serbian latin to cyrillic.
// Let's build it by simply swapping keys and values of previous dictionary.
export const SR_LAT_TO_CYR_DICT: Record<string, string> = omit(
  invert(cloneDeep(SR_CYR_TO_LAT_DICT)),
  [""]
);

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
      ((c === "D" || c === "d") && c_plus_1 === "ž")
    ) {
      index += 1;
      c += c_plus_1;
    }

    if (c in SR_LAT_TO_CYR_DICT) {
      // If character is in dictionary, it means it's a cyrillic so let's transliterate that character.
      // Transliterate current character.
      cyrillic_str += SR_LAT_TO_CYR_DICT[c];
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
    const char = SR_CYR_TO_LAT_DICT[c];
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
