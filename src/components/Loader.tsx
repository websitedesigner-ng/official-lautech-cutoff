import "./Loader.css";

export function Loader() {
  return (
    <div className="loader-wrap">
      <div className="loader">
        <div className="box1"></div>
        <div className="box2"></div>
        <div className="box3"></div>
      </div>
      <p className="loader-text">Calculating your score...</p>
    </div>
  );
}
