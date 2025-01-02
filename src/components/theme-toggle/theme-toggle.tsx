import { useTheme } from "next-themes";
export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  return (
    <div
      className="flex items-center gap-2 border border-gray-300 rounded-md p-2 text-xs cursor-pointer"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <i
        className='iconfont fs-10 icon-sun text-yellow-500 dark:opacity-10'
      ></i>
      <div className="w-px h-4 bg-gray-300 dark:bg-gray-700"></div>
      <i
        className='iconfont fs-10 icon-moon opacity-10 dark:text-yellow-500 dark:opacity-100'
      ></i>
    </div>
  );
}
