import { toCyrillic, toLatin } from "./bg";

const bulgarian_alphabet_cyrillic =
  "АаБбВвГгДдЕеЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЬьЮюЯя";
const bulgarian_alphabet_latin =
  "AaBbVvGgDdEeZHzhZzIiYyKkLlMmNnOoPpRrSsTtUuFfHhTStsCHchSHshSHTshtĂăJjYUyuYAya";

describe("Bulgarian", () => {
  it("test_alphabet_transliteration_cyrillic_to_latin", () => {
    // Transliteration of entire cyrillic alphabet to latin.
    const transliterated_alphabet = toLatin(bulgarian_alphabet_cyrillic);
    expect(transliterated_alphabet).toEqual(bulgarian_alphabet_latin);
  });

  it("test_alphabet_transliteration_latin_to_cyrillic", () => {
    // Transliteration of entire latin alphabet to cyrillic.
    const transliterated_alphabet = toCyrillic(bulgarian_alphabet_latin);
    expect(transliterated_alphabet).toEqual(bulgarian_alphabet_cyrillic);
  });
});
