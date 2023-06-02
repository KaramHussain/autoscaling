import { useState, useEffect } from "react";
import "./AutoScalingForm.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const submitGatewayEndpoint =
  "https://082ff5fu6g.execute-api.us-east-1.amazonaws.com/test-environment/autoscalinggroup";
const apiGatewayEndpoint =
  "https://082ff5fu6g.execute-api.us-east-1.amazonaws.com/test-environment/vpc";
const launchtemplateApiGateway =
  "https://082ff5fu6g.execute-api.us-east-1.amazonaws.com/test-environment/launchtemplate";

const AutoScalingForm = () => {
  const [AutoScalingName, setAutoScalingName] = useState("");
  const [LaunchTemplate, setLaunchTemplate] = useState("");
  const [vpcId, setVpcId] = useState("");
  const [subnetId, setSubnetId] = useState([]);
  const [loadBalancer, setloadBalancer] = useState("");
  const [warmUp, setwarmUp] = useState("0");
  const [desiredCapacity, setdesiredCapacity] = useState("0");
  const [minimumCapacity, setminimumCapacity] = useState("0");
  const [maximumCapacity, setmaximumCapacity] = useState("0");

  // temperory data getting from api calls
  const [VPC, setVPC] = useState([]);
  const [subnet, setSubnet] = useState([]);
  const [launchTemplateArray, setlaunchTemplateArray] = useState([]);

  const handleItemClick = (id) => {
    console.log(id);
    if (subnetId.includes(id)) {
      setSubnetId(subnetId.filter((selectedItem) => selectedItem !== id));
    } else {
      setSubnetId([...subnetId, id]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validation() != true) {
      displayToast(validation());
    } else {
      const params = {
        AutoScalingName,
        LaunchTemplate,
        vpcId,
        subnetId,
        loadBalancer,
        warmUp,
        desiredCapacity,
        minimumCapacity,
        maximumCapacity,
      };
      const api = submitGatewayEndpoint;
      axios
        .post(api, JSON.stringify(params))
        .then((response) => {
          console.log(response.data.body);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  function setSubnetValue(value) {
    let index = VPC.findIndex((element) => element.VpcId === value);
    if (index != -1) {
      setSubnetId([]);
      setSubnet(VPC[index].subnet);
    }
  }

  useEffect(() => {
    const fetchVpcData = async () => {
      try {
        const response = await axios.get(apiGatewayEndpoint);
        const data = JSON.parse(response.data.body);
        const subnetArray = Object.values(data);
        setVPC(subnetArray[0]);
        setSubnet(subnetArray[0][0].subnet);
        setVpcId(subnetArray[0][0].VpcId);
        setSubnetValue(VPC.vpcId);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchLaunchTemplate = async () => {
      try {
        const response = await axios.get(launchtemplateApiGateway);
        const data = JSON.parse(response.data.body);
        const temp = Object.values(data);
        setlaunchTemplateArray(temp);
        if(launchTemplateArray) setLaunchTemplate(temp[0].LaucnhTemplateName)
      } catch (error) {
        console.log(error);
      }
    };
    fetchLaunchTemplate();
    fetchVpcData();
  }, []);

  function validation() {
    if (!AutoScalingName) return "Write Auto Scaling Group Name";
    else if (!subnetId.length) return "Choose a Subnet";
    else if (!loadBalancer) return "Enter a name for Load Balancer";
    else if (!maximumCapacity < minimumCapacity)
      return "Minimum Capacity cant be greater than Maximum Capacity";
    else return true;
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
        <h3 className="pb-3">Auto Scaling Group</h3>
        <br />

        <div className="form-group">
          <label htmlFor="AutoScalingName">Name</label>
          <input
            type="text"
            id="AutoScalingName"
            className="form-control"
            value={AutoScalingName}
            onChange={(event) => setAutoScalingName(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="LaunchTemplate">Template Name</label>
          <select
            id="LaunchTemplate"
            className="form-control"
            value={LaunchTemplate}
            onChange={(event) => setLaunchTemplate(event.target.value)}
          >
            {launchTemplateArray.map((option) => (
              <option
                key={option.LaucnhTemplateName}
                value={option.LaucnhTemplateName}
              >
                {option.LaucnhTemplateName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="loadbalancer">VPC</label>
          <select
            id="loadbalancer"
            className="form-control"
            value={vpcId}
            onChange={(event) => {
              setVpcId(event.target.value);
              setSubnetValue(event.target.value);
              console.log(event.target.value);
            }}
          >
            {VPC.map((option) => (
              <option key={option.VpcId} value={option.VpcId}>
                {option.VpcId}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Choose Subnet</label>
          <ul className="subnetBoxul">
            {subnet.map((item) => (
              <button
                key={item.SubnetId}
                className={`subnetButton list-group-item list-group-item-action ${
                  subnetId.includes(item.SubnetId) ? "selected" : ""
                }`}
                onClick={(event) => {
                  event.preventDefault();
                  handleItemClick(item.SubnetId);
                }}
              >
                <div className="subnetListBox">
                  <div className="line1">
                    <div className="availabilityZone">
                      {item.AvailabilityZone}
                    </div>
                    <div>{item.SubnetId}</div>
                  </div>
                  <div className="line2">
                    {item.DefaultForAz == true ? (
                      <div className="rightside">Default</div>
                    ) : (
                      ""
                    )}
                    <div>{item.CidrBlock}</div>
                  </div>
                </div>
              </button>
            ))}
          </ul>
        </div>

        <div className="form-group">
          <label htmlFor="loadbalancer-name">LoadBalancer Name</label>
          <input
            type="text"
            id="loadbalancer-name"
            className="form-control"
            value={loadBalancer}
            onChange={(event) => setloadBalancer(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="warmup">Warm Up</label>
          <input
            type="number"
            id="warmup"
            className="form-control"
            value={warmUp}
            onChange={(event) => setwarmUp(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="DesiredCapacity">Desired Capacity</label>
          <input
            type="number"
            id="DesiredCapacity"
            className="form-control"
            value={desiredCapacity}
            onChange={(event) => setdesiredCapacity(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="MinimumCapacity">Minimum Capacity</label>
          <input
            type="number"
            id="MinimumCapacity"
            className="form-control"
            value={minimumCapacity}
            onChange={(event) => setminimumCapacity(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="MaximumCapacity">Maximum Capacity</label>
          <input
            type="number"
            id="MaximumCapacity"
            className="form-control"
            value={maximumCapacity}
            onChange={(event) => setmaximumCapacity(event.target.value)}
          />
        </div>

        <div className="form-group mt-3">
          <button type="submit" className="btn AutScalingbutton">
            Create
          </button>
        </div>
      </form>
    </>
  );
};
export default AutoScalingForm;
