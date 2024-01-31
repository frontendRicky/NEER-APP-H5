/*
 * @LastEditors: John
 * @Date: 2024-01-23 10:20:43
 * @LastEditTime: 2024-01-23 11:02:38
 * @Author: John
 */
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import translation_en from "./en/translation.json";
import translation_cn from "./cn/translation.json";
const resources = {
  en:{
    translation:translation_en,
  },
  cn:{
    translation:translation_cn,
  },
}
i18next.use(initReactI18next).init({
  resources,
  lng: "en", // if you're using a language detector, do not define the lng option
  debug: false,
  interpolation:{
    escapeValue:false,
  }
});
export default i18next;