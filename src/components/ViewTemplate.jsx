import { useState, useEffect } from "react";
import "./viewtemplate.css";
import axios from "axios";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const apiGatewayEndpoint =
  "https://082ff5fu6g.execute-api.us-east-1.amazonaws.com/test-environment/launchtemplate";

const ViewTemplate = () => {
  const [names, setNames] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [open, setOpen] = useState(true);
  const handleClick = (index) => {
    setSelectedIndex(index + 1);
  };

  const handleClose = () => {
    setSelectedIndex(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiGatewayEndpoint);
        const data = JSON.parse(response.data.body);
        setNames(Object.values(data));
        setOpen(false)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <h1>Launch Templates</h1>
      <ul className="list-group name-list">
        {names.map((name, index) => (
          <li
            key={index}
            onClick={() => handleClick(index)}
            className="list-group-item list-group-item-action"
          >
            {name.LaucnhTemplateName}
          </li>
        ))}
      </ul>

      {selectedIndex && (
        <div className="modal d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-warning">Launch Template</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <div className="property">
                  <span className="property-name">Launch Template Name:</span>
                  <span className="property-value">{names[selectedIndex - 1].LaucnhTemplateName}</span>
                </div>
                <div className="property">
                  <span className="property-name">AMI ID:</span>
                  <span className="property-value">{names[selectedIndex - 1].amiId}</span>
                </div>
                <div className="property">
                  <span className="property-name">Instance Type:</span>
                  <span className="property-value">{names[selectedIndex - 1].instanceType}</span>
                </div>
                <div className="property">
                  <span className="property-name">Key Pair:</span>
                  <span className="property-value">{names[selectedIndex - 1].keyPair}</span>
                </div>
                <div className="property">
                  <span className="property-name">Security Group</span>
                  <span className="property-value">{names[selectedIndex - 1].securityGroup}</span>
                </div>
                <div className="property">
                  <span className="property-name">EBS Volume</span>
                  <span className="property-value">{names[selectedIndex - 1].ebsVolumeSize} GB {names[selectedIndex - 1].ebsVolumeType.toUpperCase()}</span>
                </div>
                <div className="propertyUserData">
                  <span className="property-name-userdata">User Data:</span>
                  <div className="user-data-box">
                    {names[selectedIndex - 1].userData}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTemplate;
