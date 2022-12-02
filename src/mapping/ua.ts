import cloneDeep from "lodash/cloneDeep";
import invert from "lodash/invert";
import merge from "lodash/merge";
import omit from "lodash/omit";
import { RU_CYR_TO_LAT_DICT } from "./ru";

// Transliterate from Ukrainian
// Copy from ru, Delete unused letters
export let UA_CYR_TO_LAT_DICT: Record<string, string> = omit(
  cloneDeep(RU_CYR_TO_LAT_DICT),
  ["Ё", "ё", "Ъ", "ъ", "Ы", "ы", "Э", "э"]
);

// Change mapping to match with Scientific Ukrainian
UA_CYR_TO_LAT_DICT["Г"] = "H";
UA_CYR_TO_LAT_DICT["г"] = "h";
UA_CYR_TO_LAT_DICT["Ж"] = "Ž";
UA_CYR_TO_LAT_DICT["ж"] = "ž";
UA_CYR_TO_LAT_DICT["И"] = "Y";
UA_CYR_TO_LAT_DICT["и"] = "y";
UA_CYR_TO_LAT_DICT["Х"] = "X";
UA_CYR_TO_LAT_DICT["х"] = "x";
UA_CYR_TO_LAT_DICT["Ц"] = "C";
UA_CYR_TO_LAT_DICT["ц"] = "c";
UA_CYR_TO_LAT_DICT["Ч"] = "Č";
UA_CYR_TO_LAT_DICT["ч"] = "č";
UA_CYR_TO_LAT_DICT["Ш"] = "Š";
UA_CYR_TO_LAT_DICT["ш"] = "š";
UA_CYR_TO_LAT_DICT["Щ"] = "Šč";
UA_CYR_TO_LAT_DICT["щ"] = "šč";
UA_CYR_TO_LAT_DICT["Ю"] = "Ju";
UA_CYR_TO_LAT_DICT["ю"] = "ju";
UA_CYR_TO_LAT_DICT["Я"] = "Ja";
UA_CYR_TO_LAT_DICT["я"] = "ja";

// Update for Ukrainian letters
merge(UA_CYR_TO_LAT_DICT, {
  Ґ: "G",
  ґ: "g",
  Є: "Je",
  є: "je",
  І: "I",
  і: "i",
  Ї: "Ï",
  ї: "ï",
});

// Latin to Cyrillic
export const UA_LAT_TO_CYR_DICT = invert(cloneDeep(UA_CYR_TO_LAT_DICT));

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
      ("Jj".includes(c) && "eau".includes(c_plus_1)) || // je, ja, ju
      ("Šš".includes(c) && "č".includes(c_plus_1))
    ) {
      index += 1;
      c += c_plus_1;
    }

    if (c in UA_LAT_TO_CYR_DICT) {
      // If character is in dictionary, it means it's a cyrillic so let's transliterate that character.
      // Transliterate current character.
      cyrillic_str += UA_LAT_TO_CYR_DICT[c];
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
    const char = UA_CYR_TO_LAT_DICT[c];
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
