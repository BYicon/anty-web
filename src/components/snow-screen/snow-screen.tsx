interface SnowScreenProps {
  count?: number;
  minSize?: number;
  maxSize?: number;
  minDuration?: number;
  maxDuration?: number;
}

const SnowflakeIcon = () => (
  <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1676" width="32" height="32"><path d="M799.55 641.31l-62.79-36 27.94-7.52a31.31 31.31 0 1 0-16.32-60.43l-88.53 23.8L574.78 512l85.07-49.16 88.53 23.8h8.16A31.57 31.57 0 1 0 764.7 424l-27.94-5.95 62.79-36a31.44 31.44 0 0 0-31.39-54.48L700.35 367l9.42-34.75A31.39 31.39 0 1 0 649.18 316l-25.74 93.94-80.05 47.9v-98l65-64.81a31.34 31.34 0 0 0-10.21-51A31.58 31.58 0 0 0 574 244a31.28 31.28 0 0 0-10.21 6.86l-20.41 20.35v-72.32a31.39 31.39 0 0 0-62.78 0v77.34l-25.43-25.36A31.37 31.37 0 1 0 410.61 295l70 69.82v93.93l-80.68-47.59-25.74-93.93a31.38 31.38 0 1 0-60.58 16.28l10 33.5-67.81-38.82a31.44 31.44 0 1 0-31.39 54.48l62.79 35.38-26.37 8.14a31.57 31.57 0 1 0 8.17 62.64h8.16L365.71 465l83.51 47-85.07 49.16-88.53-23.8a31.33 31.33 0 0 0-41.79 35 31.26 31.26 0 0 0 14.61 21.09 31.5 31.5 0 0 0 12.43 4.29l27.94 7.52-62.79 36a31.44 31.44 0 0 0 31.39 54.48L323.65 657l-9.42 34.75a31.33 31.33 0 0 0 21.66 39.45 36 36 0 0 0 8.17 0 31.39 31.39 0 0 0 31.39-23.2l25.74-93.94 79.42-47.9v98l-65 64.81a31.37 31.37 0 1 0 44.57 44.15l20.41-20.35v72.33a31.39 31.39 0 0 0 62.78 0v-77.33l25.43 25.36A31.37 31.37 0 1 0 613.39 729l-70-69.82v-93.95l80.68 46.65 25.74 93.93A31.36 31.36 0 0 0 681.2 729a35.91 35.91 0 0 0 8.16 0 31.27 31.27 0 0 0 22.29-38.51L700.35 657l67.18 38.82a31.44 31.44 0 1 0 31.39-54.48z" p-id="1677" fill="#20c9d590"></path></svg>
);

export default function SnowScreen({
  count = 30,
  minSize = 1,
  maxSize = 2,
  minDuration = 15,
  maxDuration = 25
}: SnowScreenProps) {
  return (
    <div className="absolute bottom-0 left-4 right-4 top-[-100px] pointer-events-none">
      {[...Array(count)].map((_, index) => {
        // 随机生成左右摆动的范围
        const swayAmount = Math.random() * 200 - 100; // -100px 到 100px 之间
        
        return (
          <div 
            key={index} 
            className="absolute pointer-events-none user-select-none will-change-transform animate-snowfall"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * (maxSize - minSize) + minSize}rem`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * (maxDuration - minDuration) + minDuration}s`,
              '--sway-amount': `${swayAmount}px`
            } as React.CSSProperties}
          >
            <SnowflakeIcon />
          </div>
        );
      })}
    </div>
  );
}
