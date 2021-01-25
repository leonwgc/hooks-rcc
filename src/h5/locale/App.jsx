import React, { useEffect, useRef, useState } from 'react';
import { useTranslation, initReactI18next } from 'react-i18next';
import { Cell, LocaleProvider, Button, SearchBar, Modal, Keyboard, Radio } from 'zarm';

const locales = {
  en_US: {
    locale: 'en-US',
    test: {
      title: 'title',
      desc: 'desc',
    },
    SearchBar: {
      placeholder: 'Search',
      cancelText: 'Cancel',
    },
    Alert: {
      cancelText: 'Close',
    },
    Confirm: {
      cancelText: 'Cancel',
      okText: 'OK',
    },
    Select: {
      placeholder: 'please select',
    },
    Picker: {
      cancelText: 'Cancel',
      okText: 'OK',
      title: 'please select',
    },
    Keyboard: {
      okText: 'OK',
    },
  },
  zh_CN: {
    locale: 'zh-CN',
    test: {
      title: '标题',
      desc: '描述',
    },
    SearchBar: {
      placeholder: '搜索',
      cancelText: '取消',
    },
    Alert: {
      cancelText: '关闭',
    },
    Confirm: {
      cancelText: '取消',
      okText: '确定',
    },
    Select: {
      placeholder: '请选择',
    },
    Picker: {
      cancelText: '取消',
      okText: '确定',
      title: '请选择',
    },
    Keyboard: {
      okText: '确定',
    },
  },
};

export default function App() {
  const [lang, setLang] = useState('zh_CN');
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <LocaleProvider locale={locales[lang]}>
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
