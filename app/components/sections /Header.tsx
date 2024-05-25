import { useContext } from 'react';
import Switch from 'react-switch';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import { TypeAnimation } from 'react-type-animation';
import { Theme, useTheme } from 'remix-themes';
import ThemeSwitch from '~/components/ThemeSwitch';

const Header = () => {
  const basicTitles = [
    'Web Developer',
    'React Developer',
    'Laravel Developer',
    'Coffee Drinker',
    'Coding Enthusiast',
  ];

  return (
    <header className='h-[650px] w-[100%] bg-background]'>
      <div className='flex h-full flex-col items-center justify-center gap-5'>
        <div>
          <Icon
            className='text-gray-dark'
            icon='la:laptop-code'
            style={{
              height: '100%',
              fontSize: 150,
            }}
          />
        </div>

        <h1 className='text-4xl font-bold text-gray-dark dark:text-white'>
          Tat Tran
        </h1>

        <TypeAnimation
          sequence={basicTitles.flatMap((title: string) => [title, 1000])}
          wrapper='span'
          speed={50}
          className='text-regular text-2xl text-gray-dark dark:text-white'
          repeat={Infinity}
        />
        <ThemeSwitch />
      </div>
    </header>
  );
};

export default Header;
