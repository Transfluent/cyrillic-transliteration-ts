import * as bg from "./bg";
import * as me from "./me";
import * as mk from "./mk";
import * as mn from "./mn";
import * as ru from "./ru";
import * as sr from "./sr";
import * as tj from "./tj";
import * as ua from "./ua";

// Bundle up all the dictionaries in a lookup dictionary
export type Dictionary = {
  toLatin: (str: string) => string;
  toCyrillic: (str: string) => string;
};
const dictionaries: { [lang: string]: Dictionary } = {
  sr: {
    // Serbia
    toLatin: sr.toLatin,
    toCyrillic: sr.toCyrillic,
  },
  me: {
    // Montenegro
    toLatin: me.toLatin,
    toCyrillic: me.toCyrillic,
  },
  mk: {
    // Macedonia
    toLatin: mk.toLatin,
    toCyrillic: mk.toCyrillic,
  },
  ru: {
    // Russian
    toLatin: ru.toLatin,
    toCyrillic: ru.toCyrillic,
  },
  tj: {
    // Tajik
    toLatin: tj.toLatin,
    toCyrillic: tj.toCyrillic,
  },
  bg: {
    // Bulgarian
    toLatin: bg.toLatin,
    toCyrillic: bg.toCyrillic,
  },
  ua: {
    // Ukrainian
    toLatin: ua.toLatin,
    toCyrillic: ua.toCyrillic,
  },
  mn: {
    // Mongolian
    toLatin: mn.toLatin,
    toCyrillic: mn.toLatin,
  },
};
export type LangCode = keyof typeof dictionaries;
export default dictionaries;
