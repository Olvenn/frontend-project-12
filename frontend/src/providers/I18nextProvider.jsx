import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import resources from '../locales/index';

const I18Provider = ({ children }) => {
  const defaultLanguage = 'ru';

  const i18Config = {
    resources,
    debug: true,
    fallbackLng: defaultLanguage,
  };

  const i18Instance = i18next.createInstance();
  i18Instance.use(initReactI18next).init(i18Config);

  return (
    <I18nextProvider i18n={i18Instance}>
      {children}
    </I18nextProvider>
  );
};

export default I18Provider;
