import { useState, useEffect } from "react";
import "./viewtemplate.css";
import axios from "axios";

const apiGatewayEndpoint =
  "https://7wmmb7rm3i.execute-api.us-east-1.amazonaws.com/test-environment/launchtemplate";

const ViewTemplate = () => {
  const [names, setNames] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

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
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
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
