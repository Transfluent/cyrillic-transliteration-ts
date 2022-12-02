import { toCyrillic, toLatin } from "./mk";

const macedonian_alphabet_cyrillic =
  "АаБбВвГгДдЃѓЕеЖжЗзЅѕИиЈјКкЛлЉљМмНнЊњОоПпРрСсТтЌќУуФфХхЦцЧчЏџШш";
const macedonian_alphabet_latin =
  "AaBbVvGgDdǴǵEeŽžZzDzdzIiJjKkLlLjljMmNnNjnjOoPpRrSsTtḰḱUuFfHhCcČčDždžŠš";

describe("TestMacedonianTransliteration", () => {
  it("test_alphabet_transliteration_cyrillic_to_latin", () => {
    // Transliteration of entire cyrillic alphabet to latin.
    const transliterated_alphabet = toLatin(macedonian_alphabet_cyrillic);
    // transliterated_alphabet =  u's\u0301' 's\xcc\x81'
    expect(transliterated_alphabet).toEqual(macedonian_alphabet_latin);
  });

  it("test_alphabet_transliteration_latin_to_cyrillic", () => {
    // Transliteration of entire latin alphabet to cyrillic.
    const transliterated_alphabet = toCyrillic(macedonian_alphabet_latin);
    expect(transliterated_alphabet).toEqual(macedonian_alphabet_cyrillic);
  });
});
