import { toCyrillic, toLatin } from "./ru";

const russian_alphabet_cyrillic =
  "АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыьЭэЮюЯя";
const russian_alphabet_latin =
  "AaBbVvGgDdEeYOyoZHzhZzIiJjKkLlMmNnOoPpRrSsTtUuFfXxCZczCHchSHshSHHshh''''Y'y''E'e'YUyuYAya";

describe("TestRussianTransliteration", () => {
  it("test_alphabet_transliteration_cyrillic_to_latin", () => {
    // Transliteration of entire cyrillic alphabet to latin.
    const transliterated_alphabet = toLatin(russian_alphabet_cyrillic);
    expect(transliterated_alphabet).toEqual(russian_alphabet_latin);
  });

  it("test_alphabet_transliteration_latin_to_cyrillic", () => {
    // Transliteration of entire latin alphabet to cyrillic.
    const transliterated_alphabet = toCyrillic(russian_alphabet_latin);
    expect(transliterated_alphabet).toEqual(
      russian_alphabet_cyrillic
        .replace("Ъ", "ъ")
        .replace("Ь", "ь")
        .replace("Ы", "ы")
    );
  });
});
