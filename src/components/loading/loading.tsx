import "./loading.scss";
export default function Loading({ loading, loadingText }: { loading: boolean, loadingText: string }) {
  return (
    <div className="loading-container" style={{ display: loading ? "flex" : "none" }}>
      <img className="w-20 h-20" src="/images/loading.gif" alt="loading" />
      <div className="text-2xl">{loadingText}</div>
    </div>
  );
}
