import { useState, useEffect } from "react";
import "./ViewAutoScaling.css";
import ec2Logo from "../assets/ec2.png";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Divider } from "@mui/material";

const apiGatewayEndpoint =
  "https://082ff5fu6g.execute-api.us-east-1.amazonaws.com/test-environment/autoscalinggroup";

function ViewAutoScaling() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [scalingGroup, setScalingGroup] = useState([]);
  const [instances, setInstances] = useState([]);
  const [loadBalancer, setLoadBalancer] = useState([]);
  const [targetGroup, setTargetGroup] = useState([]);
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiGatewayEndpoint);
        const data = JSON.parse(response.data.body);
        setScalingGroup(Object.values(data));
        setOpen(false)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const getAutoScalingStatus = async (name) => {
    setOpen(true)
    let params = {
      AutoScalingName: name,
    };
    const autoScalingStatusApi =
      "https://082ff5fu6g.execute-api.us-east-1.amazonaws.com/test-environment/autoscalingstatus";
    axios
      .post(autoScalingStatusApi, JSON.stringify(params))
      .then((response) => {
        const dataresponse = JSON.parse(response.data.body);
        const data = Object.values(dataresponse);
        setInstances(data[2]);
        setLoadBalancer(data[1]["LoadBalancerDetails"]);
        setTargetGroup(data[1]["TargetGroupDetails"]);

        // console.log(instances);
        // console.log(instanceArray[2][0]['InstanceId'])
        setOpen(false)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRowClick = (name) => {
    setSelectedRow(name);
    getAutoScalingStatus(name);
  };

  return (
    <>
      <div className="tableContainer">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 0 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Template</TableCell>
                <TableCell>Desired EC2</TableCell>
                <TableCell>Total Subnets</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scalingGroup.map((row) => (
                <TableRow
                  key={row.AutoScalingName}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    backgroundColor:
                      selectedRow === row.AutoScalingName
                        ? "lightblue"
                        : "white",
                    cursor: "pointer",
                  }}
                  onClick={() => handleRowClick(row.AutoScalingName)}
                >
                  <TableCell component="th" scope="row">
                    {row.AutoScalingName}
                  </TableCell>
                  <TableCell>{row.LaunchTemplateName}</TableCell>
                  <TableCell>{row.desiredCapacity}</TableCell>
                  <TableCell>{row.subnetId.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="mt-4">
        <div className="cardContainer mb-5">
          {instances.map((instance, index) => (
            <Card
              sx={{
                maxWidth: 700,
                width: 320,
                margin: "10px",
                // backgroundColor: "#00001",
                // color: "#fff",
                boxShadow: "0px 0px 5px #000",
              }}
              className="cardImage"
              key={instance.InstanceId}
            >
              <Box
                sx={{
                  display: "flex",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid #bbb !important",
                }}
              >
                <CardMedia
                  className="image"
                  sx={{
                    height: 50,
                    width: 50,
                    marginLeft: 2,
                    marginRight: 5,
                  }}
                  image={ec2Logo}
                  title="green iguana"
                />
                <Typography
                  sx={{
                    paddingTop: 1,
                  }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  Server {index + 1}
                </Typography>
              </Box>
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <span
                    className="label"
                    style={{ display: "inline-block", minWidth: "80px" }}
                  >
                    Id:
                  </span>
                  <span
                    className="label"
                    style={{ display: "inline-block", minWidth: "80px" }}
                  >
                    {instance["InstanceId"]}
                  </span>
                </Typography>
                <Divider></Divider>
                <Typography
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <span
                    className="label"
                    style={{ display: "inline-block", minWidth: "80px" }}
                  >
                    AMI:
                  </span>
                  <span
                    className="label"
                    style={{ display: "inline-block", minWidth: "80px" }}
                  >
                    {instance["ImageId"]}
                  </span>
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <span
                    className="label"
                    style={{ display: "inline-block", minWidth: "80px" }}
                  >
                    Type:
                  </span>
                  <span
                    className="label"
                    style={{ display: "inline-block", minWidth: "80px" }}
                  >
                    {instance["InstanceType"]}
                  </span>
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <span
                    className="label"
                    style={{ display: "inline-block", minWidth: "80px" }}
                  >
                    Zone:
                  </span>
                  <span
                    className="label"
                    style={{ display: "inline-block", minWidth: "80px" }}
                  >
                    {instance["Placement"]["AvailabilityZone"]}
                  </span>
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <span
                    className="label"
                    style={{ display: "inline-block", minWidth: "80px" }}
                  >
                    SubnetId:
                  </span>
                  <span
                    className="label"
                    style={{ display: "inline-block", minWidth: "80px" }}
                  >
                    {instance["SubnetId"]}
                  </span>
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  {instance["PublicDnsName"] ? (
                    <a href={"http://" + instance["PublicDnsName"]}>
                      {instance["PublicDnsName"]}
                    </a>
                  ) : null}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <span
                    className="label"
                    style={{ display: "inline-block", minWidth: "80px" }}
                  >
                    <Button color="success" className="pt-1 p-0 m-0">
                      {instance["PublicDnsName"] ? (
                        "Running"
                      ) : (
                        <span className="pt-5 text-danger">Stopped</span>
                      )}
                    </Button>
                  </span>
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
        {instances.length > 0 ? (
          <div className="lower section">
            <h4>Elastic Load Balancer</h4>
            <div className="loadBalancer">
              <div className="elbRow">
                <div className="elblabel">Name</div>
                <div className="elbdata">
                  {loadBalancer["LoadBalancerName"]}
                </div>
              </div>
              <div className="elbRow">
                <div className="elblabel">Arn</div>
                <div className="elbdata">{loadBalancer["LoadBalancerArn"]}</div>
              </div>
              <div className="elbRow">
                <div className="elblabel">DNS</div>
                <div className="elbdata">
                  <a href={"http://" + loadBalancer["DNSName"]}>
                    {loadBalancer["DNSName"]}
                  </a>
                </div>
              </div>
              <div className="elbRow">
                <div className="elblabel">Vpc Id</div>
                <div className="elbdata">{loadBalancer["VpcId"]}</div>
              </div>
              <div className="elbRow">
                <div className="elblabel">State</div>
                <div className="elbdata">{loadBalancer["State"]["Code"]}</div>
              </div>
            </div>
            <div className="TargetGroup mt-4 pb-"></div>
            <h4>Target Group</h4>
            <div className="elbRow">
              <div className="elblabel">Name</div>
              <div className="elbdata">{targetGroup["TargetGroupName"]}</div>
            </div>
            <div className="elbRow">
              <div className="elblabel">ARN</div>
              <div className="elbdata">{targetGroup["TargetGroupArn"]}</div>
            </div>
            <div className="elbRow">
              <div className="elblabel">Target Type</div>
              <div className="elbdata">{targetGroup["TargetType"]}</div>
            </div>
            <div className="elbRow">
              <div className="elblabel">Protocol</div>
              <div className="elbdata">{targetGroup["Protocol"]}</div>
            </div>
            <div className="elbRow">
              <div className="elblabel">Port</div>
              <div className="elbdata">{targetGroup["Port"]}</div>
            </div>
          </div>
        ) : null}
        
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  );
}

export default ViewAutoScaling;
