import cloneDeep from "lodash/cloneDeep";
import invert from "lodash/invert";
import merge from "lodash/merge";
import omit from "lodash/omit";
import { RU_CYR_TO_LAT_DICT } from "./ru";

// copy from ru, delete letters not used
let cyrillicToLatin: Record<string, string> = omit(
  cloneDeep(RU_CYR_TO_LAT_DICT),
  ["Ц", "ц", "Щ", "щ", "Ы", "ы"]
);
// Change Mapping according to ISO 9 (1995)
cyrillicToLatin["Э"] = "È";
cyrillicToLatin["э"] = "è";
cyrillicToLatin["ъ"] = "’";
cyrillicToLatin["Х"] = "H";
cyrillicToLatin["х"] = "h";
cyrillicToLatin["Ч"] = "Č";
cyrillicToLatin["ч"] = "č";
cyrillicToLatin["Ж"] = "Ž";
cyrillicToLatin["ж"] = "ž";
cyrillicToLatin["Ё"] = "Ë";
cyrillicToLatin["ё"] = "ë";
cyrillicToLatin["Ш"] = "Š";
cyrillicToLatin["ш"] = "š";
cyrillicToLatin["Ю"] = "Û";
cyrillicToLatin["ю"] = "û";
cyrillicToLatin["Я"] = "Â";
cyrillicToLatin["я"] = "â";

// update the dict for the additional letters in the tajik cyrillic alphabet ( Ғ, Ӣ, Қ, Ӯ, Ҳ, Ҷ )
// see https://en.wikipedia.org/wiki/Tajik_alphabet#Cyrillic
merge(cyrillicToLatin, {
  Ғ: "Ǧ",
  ғ: "ǧ",
  Ӣ: "Ī",
  ӣ: "ī",
  Қ: "Q",
  қ: "q",
  Ӯ: "Ū",
  ӯ: "ū",
  Ҳ: "Ḩ",
  ҳ: "ḩ",
  Ҷ: "Ç",
  ҷ: "ç",
});

// Transliterate from Tajik cyrillic to latin
export const TJ_CYR_TO_LAT_DICT: Record<string, string> =
  cloneDeep(cyrillicToLatin);

// transliterate from latin tajik to cyrillic
export const TJ_LAT_TO_CYR_DICT: Record<string, string> = invert(
  cloneDeep(TJ_CYR_TO_LAT_DICT)
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

    if (c in TJ_LAT_TO_CYR_DICT) {
      // If character is in dictionary, it means it's a cyrillic so let's transliterate that character.
      // Transliterate current character.
      cyrillic_str += TJ_LAT_TO_CYR_DICT[c];
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
    const char = TJ_CYR_TO_LAT_DICT[c];
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
