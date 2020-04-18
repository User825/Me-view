import countries from 'i18n-iso-countries';
const DEFAULT_LANG = 'en';
countries.registerLocale(
  require(`i18n-iso-countries/langs/${DEFAULT_LANG}.json`)
);

const getCountriesLocaleName = (unicode, localeLang) => {
  countries.registerLocale(
    require(`i18n-iso-countries/langs/${localeLang}.json`)
  );

  const name = countries.getName(unicode, localeLang)
    ? countries.getName(unicode, localeLang)
    : countries.getName(unicode, DEFAULT_LANG);

  return name ? name : unicode;
};

export default getCountriesLocaleName;
