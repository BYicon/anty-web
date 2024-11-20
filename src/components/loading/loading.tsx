import "./loading.scss";
export default function Loading() {
  return (
    <div className="loading-container">
      {/* cute style 加载动画 */}
      <div className="loading-animation">
        <div className="loading-animation-dot"></div>
      </div>
    </div>
  );
}
