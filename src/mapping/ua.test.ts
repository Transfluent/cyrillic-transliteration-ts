import { toCyrillic, toLatin } from "./ua";

const ukrainian_alphabet_cyrillic =
  "АаБбВвГгҐґДдЕеЄєЖжЗзИиІіЇїЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЮюЯяь"; // not testing Ь for the apostrophe, sticking with just ь. Both will transliterate to '.
const ukrainian_alphabet_latin =
  "AaBbVvHhGgDdEeJejeŽžZzYyIiÏïJjKkLlMmNnOoPpRrSsTtUuFfXxCcČčŠšŠčščJujuJaja'";

describe("TestUkrainianTransliteration", () => {
  it("test_alphabet_transliteration_cyrillic_to_latin", () => {
    // Transliteration of entire cyrillic alphabet to latin.
    const transliterated_alphabet = toLatin(ukrainian_alphabet_cyrillic);
    expect(transliterated_alphabet).toEqual(ukrainian_alphabet_latin);
  });

  it("test_alphabet_transliteration_latin_to_cyrillic", () => {
    // Transliteration of entire latin alphabet to cyrillic.
    const transliterated_alphabet = toCyrillic(ukrainian_alphabet_latin);
    expect(transliterated_alphabet).toEqual(ukrainian_alphabet_cyrillic);
  });
});
