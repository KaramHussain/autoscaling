import { Route, Routes, Link } from "react-router-dom";
import LaunchTemplateForm from "./components/LaunchTemplateForm";
import './App.css'
import ViewTemplate from "./components/ViewTemplate";
import AutoScalingForm from "./components/AutoScalingForm";
function App() {
  return (
    <div className="body">
      <div className="sidebar">
        <h2 className="text-warning p-5">AutoScaling</h2>
        <div className="box-container">
          <h5 className="pb-3">Template</h5>
          <ul className="nav-links">
            <li>
              <Link to="/createtemplate" className="link">
                <div className="row">
                  <div className="text">Create Template</div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/viewtemplate" className="link">
                <div className="row">
                  <div className="text">View Templates</div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="box-container">
          <h5 className="pb-3">Auto Scaling Group</h5>
          <ul className="nav-links">
            <li>
              <Link to="/createautoscaling" className="link">
                <div className="row">
                  <div className="text">Create AutoScaling Group</div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/viewtemplate" className="link">
                <div className="row">
                  <div className="text">View AutoScaling Group</div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="main-content">
        <Routes>
          <Route path="/createtemplate" element={<LaunchTemplateForm/>} />
          <Route path="/viewtemplate" element={<ViewTemplate/>} />
          <Route path="/createautoscaling" element={<AutoScalingForm/>} />
          <Route path="/viewtemplate" element={<ViewTemplate/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
