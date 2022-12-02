import cloneDeep from "lodash/cloneDeep";
import invert from "lodash/invert";
import omit from "lodash/omit";
import { SR_CYR_TO_LAT_DICT } from "./sr";

// Build the dictionaries to transliterate Macedonian cyrillic to latin and vice versa.
// Copy from sr
let dictionary: Record<string, string> = cloneDeep(SR_CYR_TO_LAT_DICT);

// Differences with Serbian:
// 1) Between Ze (З з) and I (И и) is the letter Dze (Ѕ ѕ), which looks like the Latin letter S and represents /d͡z/.
dictionary["Ѕ"] = "Dz";
dictionary["ѕ"] = "dz";

// 2) Dje (Ђ ђ) is replaced by Gje (Ѓ ѓ), which represents /ɟ/ (voiced palatal stop).
// In some dialects, it represents /d͡ʑ/ instead, like Dje
// It is written ⟨Ǵ ǵ⟩ in the corresponding Macedonian Latin alphabet.
dictionary = omit(dictionary, ["Ђ", "ђ"]);
dictionary["Ѓ"] = "Ǵ";
dictionary["ѓ"] = "ǵ";

// 3) Tshe (Ћ ћ) is replaced by Kje (Ќ ќ), which represents /c/ (voiceless palatal stop).
// In some dialects, it represents /t͡ɕ/ instead, like Tshe.
// It is written ⟨Ḱ ḱ⟩ in the corresponding Macedonian Latin alphabet.
dictionary = omit(dictionary, ["Ћ", "ћ"]);
dictionary["Ќ"] = "Ḱ";
dictionary["ќ"] = "ḱ";

export const MK_CYR_TO_LAT_DICT = cloneDeep(dictionary);

// This dictionary is to transliterate from Macedonian latin to cyrillic.
export const MK_LAT_TO_CYR_DICT = invert(cloneDeep(dictionary));

const isMacedonianCyrillicException = (c: string, c_plus_1: string) => {
  return (c === "D" || c === "d") && c_plus_1 === "z";
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
      isMacedonianCyrillicException(c, c_plus_1)
    ) {
      index += 1;
      c += c_plus_1;
    }

    if (c in MK_LAT_TO_CYR_DICT) {
      // If character is in dictionary, it means it's a cyrillic so let's transliterate that character.
      // Transliterate current character.
      cyrillic_str += MK_LAT_TO_CYR_DICT[c];
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
    const char = MK_CYR_TO_LAT_DICT[c];
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
