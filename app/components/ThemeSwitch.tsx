import Switch from 'react-switch';
import { Icon } from '@iconify/react';
import { Theme, useTheme } from 'remix-themes';
import { useCallback } from 'react';

const ThemSwitch = () => {
  const [theme, setTheme] = useTheme();

  const darkTheme = theme === 'dark';

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? Theme.LIGHT : Theme.DARK));
  }, [setTheme]);

  return (
    <Switch
      checked={darkTheme}
      onChange={toggleTheme}
      offColor='#baaa80'
      onColor='#353535'
      className='react-switch mx-auto'
      width={90}
      height={40}
      uncheckedIcon={
        <Icon
          className='ml-5 h-full text-end text-[25px] text-gray-dark'
          icon='twemoji:owl'
        />
      }
      checkedIcon={
        <Icon
          className='ml-5 h-full text-end text-[25px] text-gray-dark'
          icon='noto-v1:sun-with-face'
        />
      }
    />
  );
};

export default ThemSwitch;
