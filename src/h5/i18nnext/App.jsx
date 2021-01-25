import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Cell, LocaleProvider, Button, SearchBar, Modal, Keyboard, Radio } from 'zarm';
import zarmLocales from './zarm-locales';

export default function App() {
  const [lang, setLang] = useState('zh_CN');
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <LocaleProvider locale={zarmLocales[lang]}>
      <>
        <Cell
          title="切换语言包"
          description={
            <Radio.Group compact type="button" value={lang} onChange={setLang}>
              <Radio value="zh_CN">中文</Radio>
              <Radio value="en_US">EN</Radio>
            </Radio.Group>
          }
        />

        <SearchBar />
        <Keyboard />
        <Cell title={t('hi')}>{t('Welcome to React')}</Cell>
      </>
    </LocaleProvider>
  );
}
