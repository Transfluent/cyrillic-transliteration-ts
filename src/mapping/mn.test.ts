import { toCyrillic, toLatin } from "./mn";

const mongolian_alphabet_cyrillic =
  "АаЭэИиОоУуӨөҮүНнМмЛлВвПпФфКкХхГгСсШшТтДдЦцЧчЗзЖжРрБбЕеЁёЫыЮюЯя"; // exclude (Й Ъ Ь)<->I  Щ<->Sh
const mongolian_alphabet_latin =
  "AaEeIiOoUuÖöÜüNnMmLlVvPpFfKkKhkhGgSsShshTtDdTstsChchZzJjRrBbYeyeYoyoYyYuyuYaya";

describe("TestMongolianTransliteration", () => {
  it("test_alphabet_transliteration_cyrillic_to_latin", () => {
    // Transliteration of entire cyrillic alphabet to latin.
    const transliterated_alphabet = toLatin(mongolian_alphabet_cyrillic);
    expect(transliterated_alphabet).toEqual(mongolian_alphabet_latin);
  });

  it("test_alphabet_transliteration_latin_to_cyrillic", () => {
    // Transliteration of entire latin alphabet to cyrillic.
    const transliterated_alphabet = toCyrillic(mongolian_alphabet_latin);
    expect(transliterated_alphabet).toEqual(mongolian_alphabet_cyrillic);
  });
});
