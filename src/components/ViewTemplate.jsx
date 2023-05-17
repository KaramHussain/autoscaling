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
      <h1>Random Name List</h1>
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
                <h5 className="modal-title">{selectedIndex}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="list-group">
                        <div className="list-group-item">Row 1, Column 1</div>
                        <div className="list-group-item">Row 2, Column 1</div>
                        <div className="list-group-item">Row 3, Column 1</div>
                        <div className="list-group-item">Row 4, Column 1</div>
                        <div className="list-group-item">Row 5, Column 1</div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="list-group">
                        <div className="list-group-item">Row 1, Column 2</div>
                        <div className="list-group-item">Row 2, Column 2</div>
                        <div className="list-group-item">Row 3, Column 2</div>
                        <div className="list-group-item">Row 4, Column 2</div>
                        <div className="list-group-item">Row 5, Column 2</div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <div className="list-group">
                        <div className="list-group-item">
                          Additional Row 1, Column 1
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <div className="list-group">
                        <div className="list-group-item">
                          Additional Row 2, Column 1
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p>{names[selectedIndex - 1].LaucnhTemplateName}</p>
                <p>{names[selectedIndex - 1].amiId}</p>
                <p>{names[selectedIndex - 1].keyPair}</p>
                <p>{names[selectedIndex - 1].securityGroup}</p>
                <p>{names[selectedIndex - 1].subnetId}</p>
                <pre>{names[selectedIndex - 1].userData}</pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTemplate;
