import { toCyrillic, toLatin } from "./sr";

const serbian_alphabet_cyrillic =
  "АаБбВвГгДдЂђЕеЖжЗзИиЈјКкЛлЉљМмНнЊњОоПпРрСсТтЋћУуФфХхЦцЧчЏџШш";
const serbian_alphabet_latin =
  "AaBbVvGgDdĐđEeŽžZzIiJjKkLlLjljMmNnNjnjOoPpRrSsTtĆćUuFfHhCcČčDždžŠš";

const alphabet_chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
const mix_characters_some_cyrillic = "!ЉFљñМ мНÈÆнЊњО)*+,оП>пР?р";
const mix_characters_all_latin = "!LjFljñM mNÈÆnNjnjO)*+,oP>pR?r";
const mix_characters_some_cyrillic_no_alpha = "'Ћ<=>?ћУуФфХхЦцЧчЏ%4џШ12ш♥";
const mix_characters_all_latin_no_alpha = "'Ć<=>?ćUuFfHhCcČčDž%4džŠ12š♥";
const diacritic_chars =
  "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝàáâãäåæçèéêëìíîïðñòóôõöøùúûüý";
const numerical_chars = "1234567890";
const special_chars =
  "‘’‚“”„†‡‰‹›♠♣♥♦‾←↑→↓™!\"#$%&'()*+,-./ :;<=>?@[\\]^_`{|}~…–—¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿×";

describe("TestSerbianTransliterationFromCyrillicToLatin", () => {
  it("test_alphabet_transliteration", () => {
    // Transliteration of entire Serbian cyrillic alphabet to latin.
    const transliterated_serbian_alphabet = toLatin(serbian_alphabet_cyrillic);
    expect(transliterated_serbian_alphabet).toEqual(serbian_alphabet_latin);
  });

  it("test_special_characters", () => {
    // Special characters should remain the same.
    const transliterated_special_chars = toLatin(special_chars);
    expect(transliterated_special_chars).toEqual(special_chars);
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

  it("test_latin_alphabet_characters", () => {
    // Alphabet characters should remain the same.
    const transliterated_alphabet_chars = toLatin(alphabet_chars);
    expect(transliterated_alphabet_chars).toEqual(alphabet_chars);
  });

  it("test_mix_characters", () => {
    // Serbian cyrillic characters should be transliterated but non serbian cyrillic ones shouldn't.
    const transliterated_mix = toLatin(mix_characters_some_cyrillic);
    expect(transliterated_mix).toEqual(mix_characters_all_latin);
  });
});

describe("TestSerbianTransliterationFromLatinToCyrillic", () => {
  it("test_alphabet_transliteration", () => {
    // Transliteration of entire Serbian latin alphabet to cyrillic.
    const transliterated_serbian_alphabet = toCyrillic(serbian_alphabet_latin);
    expect(transliterated_serbian_alphabet).toEqual(serbian_alphabet_cyrillic);
  });

  it("test_special_characters", () => {
    // Special characters should remain the same.
    const transliterated_special_chars = toCyrillic(special_chars);
    expect(transliterated_special_chars).toEqual(special_chars);
  });

  it("test_special_diacritic_characters", () => {
    // Diacritic characters should remain the same.
    const transliterated_diacritic_chars = toCyrillic(diacritic_chars);
    expect(transliterated_diacritic_chars).toEqual(diacritic_chars);
  });

  it("test_numerical_characters", () => {
    // Numerical characters should remain the same.
    const transliterated_numerical_chars = toCyrillic(numerical_chars);
    expect(transliterated_numerical_chars).toEqual(numerical_chars);
  });

  it("test_mix_characters", () => {
    // Serbian cyrillic characters should be transliterated but non serbian cyrillic ones shouldn't.
    const transliterated_mix = toCyrillic(mix_characters_all_latin_no_alpha);
    expect(transliterated_mix).toEqual(mix_characters_some_cyrillic_no_alpha);
  });
});
