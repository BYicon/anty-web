import { EnumTheme } from "@/shared/enums";
import { useCommonStore } from "@/stores/useStore";
import clsx from "clsx";

export default function Widget({
  children,
  top,
  left,
  bottom,
  right,
  className,
}: {
  children: React.ReactNode;
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
  className?: string;
}) {
  const style = {
    top: `${top ? `${top}px` : "unset"}`,
    left: `${left ? `${left}px` : "unset"}`,
    bottom: `${bottom ? `${bottom}px` : "unset"}`,
    right: `${right ? `${right}px` : "unset"}`,
  };
  return (
    <div
      className={clsx("absolute", className)}
      style={style}
    >
      {children}
    </div>
  );
}
