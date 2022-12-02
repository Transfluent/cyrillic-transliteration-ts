import cloneDeep from "lodash/cloneDeep";
import invert from "lodash/invert";
import { SR_CYR_TO_LAT_DICT } from "./sr";

// Build the dictionaries to transliterate Montenegrin cyrillic to latin and vice versa.

// Montenegrin Latin is based on Serbo-Croatian Latin, with the addition of the two letters Ś and Ź,
// to replace the digraphs SJ and ZJ.
// These parallel the two letters of the Montenegrin Cyrillic alphabet not found in Serbian, С́ and З́.
// These, respectively, could also be represented in the original alphabets as šj and žj, and шj and жj.
// Source: https://en.wikipedia.org/wiki/Montenegrin_alphabet#Latin_alphabet
// Also see: http://news.bbc.co.uk/2/hi/8520466.stm
export const ME_CYR_TO_LAT_DICT = cloneDeep(SR_CYR_TO_LAT_DICT);
// Montenegrin
ME_CYR_TO_LAT_DICT["С́"] = "Ś";
ME_CYR_TO_LAT_DICT["с́"] = "ś";
ME_CYR_TO_LAT_DICT["З́"] = "Ź";
ME_CYR_TO_LAT_DICT["з́"] = "ź";

// This dictionary is to transliterate from Montenegrin latin to cyrillic.
export const ME_LAT_TO_CYR_DICT: Record<string, string> = invert(
  cloneDeep(ME_CYR_TO_LAT_DICT)
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

    if (c in ME_LAT_TO_CYR_DICT) {
      // If character is in dictionary, it means it's a cyrillic so let's transliterate that character.
      // Transliterate current character.
      cyrillic_str += ME_LAT_TO_CYR_DICT[c];
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
    const char = ME_CYR_TO_LAT_DICT[c];
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
