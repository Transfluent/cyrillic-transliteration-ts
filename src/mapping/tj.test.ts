import { toCyrillic, toLatin } from "./tj";

const tajik_alphabet_cyrillic =
  "АаБбВвГгҒғДдЕеЁёЖжЗзИиӢӣЙйКкЛлМмНнОоПпРрСсТтУуӮӯФфХхҲҳЧчҶҷШшъЭэЮюЯя";
const tajik_alphabet_latin =
  "AaBbVvGgǦǧDdEeËëŽžZzIiĪīJjKkLlMmNnOoPpRrSsTtUuŪūFfHhḨḩČčÇçŠš’ÈèÛûÂâ";
const diacritic_chars =
  "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝàáâãäåæçèéêëìíîïðñòóôõöøùúûüý";
const numerical_chars = "1234567890";

describe("TestTajikTransliteration", () => {
  it("test_alphabet_transliteration_cyrillic_to_latin", () => {
    // Transliteration of entire cyrillic alphabet to latin.
    const transliterated_alphabet = toLatin(tajik_alphabet_cyrillic);
    expect(transliterated_alphabet).toEqual(tajik_alphabet_latin);
  });

  it("test_alphabet_transliteration_latin_to_cyrillic", () => {
    // Transliteration of entire latin alphabet to cyrillic.
    const transliterated_alphabet = toCyrillic(tajik_alphabet_latin);
    expect(transliterated_alphabet).toEqual(tajik_alphabet_cyrillic);
  });

  it("test_special_diacritic_characters", () => {
    // Diacritic characters should remain the same.
    const transliterated_diacritic_chars = toLatin(diacritic_chars);
    expect(transliterated_diacritic_chars).toEqual(diacritic_chars);
  });

  it("test_numerical_characters", () => {
    // Numerical characters should remain the same.
    const transliterated_numerical_chars = toLatin(numerical_chars);
    expect(transliterated_numerical_chars).toEqual(numerical_chars);
  });
});
