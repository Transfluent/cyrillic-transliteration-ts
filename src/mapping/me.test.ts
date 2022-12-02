import { toCyrillic, toLatin } from "./me";

const montenegrin_alphabet_cyrillic =
  "АаБбВвГгДдЂђЕеЖжЗзЗ́з́ИиЈјКкЛлЉљМмНнЊњОоПпРрСсТтЋћУуФфХхЦцЧчЏџШшС́с́";
const montenegrin_alphabet_latin =
  "AaBbVvGgDdĐđEeŽžZzŹźIiJjKkLlLjljMmNnNjnjOoPpRrSsTtĆćUuFfHhCcČčDždžŠšŚś";

describe("TestMontenegrinTransliteration", () => {
  it("test_alphabet_transliteration_cyrillic_to_latin", () => {
    // Transliteration of entire cyrillic alphabet to latin.
    const transliterated_alphabet = toLatin(montenegrin_alphabet_cyrillic);
    // transliterated_alphabet =  u's\u0301' 's\xcc\x81'
    expect(transliterated_alphabet).toEqual(montenegrin_alphabet_latin);
  });

  it("test_alphabet_transliteration_latin_to_cyrillic", () => {
    // Transliteration of entire latin alphabet to cyrillic.
    const transliterated_alphabet = toCyrillic(montenegrin_alphabet_latin);
    expect(transliterated_alphabet).toEqual(montenegrin_alphabet_cyrillic);
  });
});
