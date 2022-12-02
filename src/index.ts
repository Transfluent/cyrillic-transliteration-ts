import mapping, { LangCode } from "./mapping";

function encodeToUtf8(input: string) {
  return Buffer.from(input).toString("utf8");
}

function decodeFromUtf8(input: string) {
  return Buffer.from(input, "utf8").toString();
}

// Transliterate cyrillic string of characters to latin string of characters.
// :param input: The cyrillic string to transliterate into latin characters.
// :param lang_code: Indicates the cyrillic language code we are translating from. functionaults to Serbian (sr).
// :return: A string of latin characters transliterated from the given cyrillic string.
export function toLatin(input: string, lang: LangCode) {
  // First check if we support the cyrillic alphabet we want to transliterate to latin.
  const dictionaries = mapping[lang];
  if (!dictionaries) {
    // If we don't support it, then just return the original string.
    return input;
  }

  // If we do support it, check if the implementation is not missing before proceeding.
  // Get the character per character transliteration dictionary
  const toLatinFn = dictionaries.toLatin;
  if (!toLatinFn) {
    return input;
  }

  // Everything checks out, proceed with transliteration.

  const string_to_transliterate = decodeFromUtf8(input);

  let latinized_str = toLatinFn(string_to_transliterate);

  // Return the transliterated string.
  return encodeToUtf8(latinized_str);
}

// Transliterate latin string of characters to cyrillic string of characters.
// :param string_to_transliterate: The latin string to transliterate into cyrillic characters.
// :param lang_code: Indicates the cyrillic language code we are translating to. Defaults to Serbian (sr).
// :return: A string of cyrillic characters transliterated from the given latin string.
export function toCyrillic(input: string, lang: LangCode) {
  // First check if we support the cyrillic alphabet we want to transliterate to latin.
  const mappingForLang = mapping[lang];
  if (!mappingForLang) {
    // If we don't support it, then just return the original string.
    return input;
  }

  // If we do support it, check if the implementation is not missing before proceeding.
  // Get the character per character transliteration dictionary
  const toCyrillicFn = mapping[lang].toCyrillic;
  if (!toCyrillicFn) {
    return input;
  }

  // Initialize the output cyrillic string variable
  const string_to_transliterate = decodeFromUtf8(input);

  let cyrillic_str = toCyrillicFn(string_to_transliterate);

  return encodeToUtf8(cyrillic_str);
}

// Returns list of supported languages, sorted alphabetically.
export function supported() {
  return Object.keys(mapping).sort();
}
