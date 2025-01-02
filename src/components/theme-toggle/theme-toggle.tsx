import { useTheme } from "next-themes"
export default function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  };
  return (
    <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2 text-xs cursor-pointer" onClick={() => toggleTheme()}>
      {/* <img className="w-4 h-4 cursor-pointer" src="/images/sun.svg" alt="sun" onClick={() => toggleTheme(Theme.Light)} /> */}
      <i className={`iconfont icon-sun fs-10 ${theme === 'light' ? 'text-yellow-500' : 'opacity-10'}`}></i>
      <div className="w-px h-4 bg-gray-300"></div>
      <i className={`iconfont icon-moon fs-10 ${theme === 'dark' ? 'text-yellow-500' : 'opacity-10'}`}></i>
    </div>
  );
}