import { useState, useEffect } from 'react';

// 定义一个枚举来表示主题模式
enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || Theme.Light;
    }
    return Theme.Light;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === Theme.Light ? Theme.Dark : Theme.Light));
  };

  return (
    <button onClick={toggleTheme}>
      Toggle Theme
    </button>
  );
}