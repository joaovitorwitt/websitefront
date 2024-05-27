//////////////////////////////////////////////////////
// Imports
//////////////////////////////////////////////////////
import "../assets/css/loading.modules.css";

//////////////////////////////////////////////////////
// Loading Component Implementation
//////////////////////////////////////////////////////
export default function LoadingComponent() {
  return (
    <div className="loading-container-wrapper">
      <div className="loading-container">
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
      </div>
    </div>
  );
}
