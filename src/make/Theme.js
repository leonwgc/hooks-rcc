import cssVars from 'css-vars-ponyfill';

export let defaultBrandColor = '#1890ff';

const recoverFromStorage = () => {
  const themeText = localStorage.getItem('theme');
  if (themeText) {
    try {
      const theme = JSON.parse(themeText);
      defaultBrandColor = theme.brandColor;
    } catch (ex) {}
  }
};

recoverFromStorage();

const updateTheme = ({brandColor}) => {
  brandColor = brandColor || defaultBrandColor;
  cssVars({
    variables: {
      '--brand-color': brandColor,
    },
  });

  localStorage.setItem('theme', JSON.stringify({brandColor}));
};

updateTheme({});

export default updateTheme;
