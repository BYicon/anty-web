import { EnumTheme } from '@/shared/enums';
import { useCommonStore } from '@/stores/useStore';

export default function ThemeToggle() {
  const { theme, setTheme } = useCommonStore();

  const toggleTheme = () => {
    setTheme();
  };

  return (
    <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2 text-sm cursor-pointer" onClick={() => toggleTheme()}>
      {/* <img className="w-4 h-4 cursor-pointer" src="/images/sun.svg" alt="sun" onClick={() => toggleTheme(Theme.Light)} /> */}
      <i className={`iconfont icon-sun fs-10 ${theme === EnumTheme.Light ? 'text-yellow-500' : 'opacity-10'}`}></i>
      <div className="w-px h-4 bg-gray-300"></div>
      <i className={`iconfont icon-moon fs-10 ${theme === EnumTheme.Dark ? 'text-yellow-500' : 'opacity-10'}`}></i>
    </div>
  );
}