import { useState } from "react";
import "./Form.css";
import axios from "axios";

const apiGatewayEndpoint =
  "https://7wmmb7rm3i.execute-api.us-east-1.amazonaws.com/test-environment/launchtemplate";
const LaunchTemplateForm = () => {
  const [LaucnhTemplateName, setLaucnhTemplateName] = useState("");
  const [amiId, setAmiId] = useState("");
  const [keyPair, setKeyPair] = useState("");
  const [securityGroup, setSecurityGroup] = useState("");
  const [subnetId, setSubnetId] = useState("");
  const [userData, setUserData] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission here
    const params = {
      LaucnhTemplateName,
      amiId,
      keyPair,
      securityGroup,
      subnetId,
      userData,
    };

    const api = apiGatewayEndpoint;
    axios
      .post(api, JSON.stringify(params))
      .then((response) => {
        console.log(response.data.body);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="launch-form">
        <h3 className="pb-3">Launch Template</h3>
        <br/>
        <div className="form-group">
          <label htmlFor="LaucnhTemplateName">Template Name</label>
          <input
            type="text"
            id="templateName"
            className="form-control"
            value={LaucnhTemplateName}
            onChange={(event) => setLaucnhTemplateName(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amiId">AMI ID</label>
          <input
            type="text"
            id="amiId"
            className="form-control"
            value={amiId}
            onChange={(event) => setAmiId(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="keyPair">Key Pair</label>
          <input
            type="text"
            id="keyPair"
            className="form-control"
            value={keyPair}
            onChange={(event) => setKeyPair(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="securityGroup">Security Group</label>
          <input
            type="text"
            id="securityGroup"
            className="form-control"
            value={securityGroup}
            onChange={(event) => setSecurityGroup(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="subnetId">Subnet ID</label>
          <input
            type="text"
            id="subnetId"
            className="form-control"
            value={subnetId}
            onChange={(event) => setSubnetId(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="userData">User Data</label>
          <textarea
            id="userData"
            className="form-control userData"
            value={userData}
            onChange={(event) => setUserData(event.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </div>
      </form>
    </>
  );
};
export default LaunchTemplateForm;

