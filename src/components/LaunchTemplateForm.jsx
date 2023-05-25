import { useState } from "react";
import "./Form.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const instanceTypes = [
  { value: "-- Choose Instance Type --" },
  { value: "t2.micro" },
  { value: "t3.micro" },
];

const volumeTypes = [
  { label : "SSD gp2", value: "gp2" },
  { label : "SSD gp3", value: "gp3" },
  { label : "Cold HDD", value: "sc1" },
  { label : "Throughput Optimized HDD", value: "st1" },
  { label : "Provisioned IOPS SSD", value: "io1" },
];

const apiGatewayEndpoint =
  "https://7wmmb7rm3i.execute-api.us-east-1.amazonaws.com/test-environment/launchtemplate";
const LaunchTemplateForm = () => {
  const [LaucnhTemplateName, setLaucnhTemplateName] = useState("");
  const [amiId, setAmiId] = useState("");
  const [instanceType, setInstanceType] = useState("-- Choose Instance Type --");
  const [keyPair, setKeyPair] = useState("");
  const [securityGroup, setSecurityGroup] = useState("");
  const [ebsVolumeSize, setEbsVolumeSize] = useState(0);
  const [ebsVolumeType, setEbsVolumeType] = useState("gp2");
  const [userData, setUserData] = useState("");

  const handleSubmit = async (event) => {
    if (validation() != true) {
      displayToast(validation());
    }
    event.preventDefault();
    const params = {
      LaucnhTemplateName,
      amiId,
      instanceType,
      keyPair,
      securityGroup,
      ebsVolumeSize,
      ebsVolumeType,
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

  function validation() {
    if (!LaucnhTemplateName) return "Write a Template Name";
    if (!amiId) return "Write an AMI id";
    if (instanceType === "-- Choose Instance Type --") return "Choose an Instance Type";
    if (ebsVolumeSize<8) return "Volume size must be greater or equal to 8";
      
    return true;
  }

  function displayToast(message) {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="launch-form">
        <h3 className="pb-3">Launch Template</h3>
        <br />
        
        
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
          <label htmlFor="instanceType">Instance Type</label>
          <select
            id="instanceType"
            className="form-control"
            value={instanceType}
            onChange={(event) => setInstanceType(event.target.value)}
          >
            {instanceTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
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
          <label htmlFor="ebsVolumeSize">Volume Size</label>
          <input
            type="number"
            id="ebsVolumeSize"
            className="form-control"
            value={ebsVolumeSize}
            onChange={(event) => setEbsVolumeSize(event.target.value)}
          />
          <span className="lablegb">GB</span>
          <select
            id="ebsVolumeType"
            className="form-control"
            value={ebsVolumeType}
            onChange={(event) => setEbsVolumeType(event.target.value)}
          >
            {volumeTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
          <button type="submit" className="LaunchTemplatebutton">
            Create
          </button>
        </div>


      </form>
    </>
  );
};
export default LaunchTemplateForm;
