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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiGatewayEndpoint);
        const data = JSON.parse(response.data.body);
        setScalingGroup(Object.values(data));
        getAutoScalingStatus();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const getAutoScalingStatus = async () => {
    let params = {
      AutoScalingName: selectedRow,
    };
    const autoScalingStatusApi =
      "https://082ff5fu6g.execute-api.us-east-1.amazonaws.com/test-environment/autoscalingstatus";
    axios
      .post(autoScalingStatusApi, JSON.stringify(params))
      .then((response) => {
        const dataresponse = JSON.parse(response.data.body);
        const data = Object.values(dataresponse);
        setInstances(data[2]);
        setLoadBalancer(data[1]['LoadBalancerDetails'])
        // console.log(instances);
        // console.log(instanceArray[2][0]['InstanceId'])
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRowClick = (name) => {
    setSelectedRow(name);
    getAutoScalingStatus();

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
      <div className="m-4">
        <div className="cardContainer">
          {instances.map((instance, index) => (
            <Card
              sx={{
                maxWidth: 700,
                width: 400,
                margin: "10px",
                // backgroundColor: "#777",
                // color: "#fff",
                border: "1px solid #ccc !important",
              }}
              className="cardImage"
              key={instance.InstanceId}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: "40px",
                  paddingBottom: "40px",
                  backgroundColor: "rgba(255, 255, 255)",
                }}
              >
                <CardMedia
                  className="image"
                  sx={{
                    height: 80,
                    width: 80,
                  }}
                  image={ec2Logo}
                  title="green iguana"
                />
              </Box>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Instance {index + 1}
                </Typography>
                <Typography
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <span
                    className="label"
                    style={{ display: "inline-block", minWidth: "120px" }}
                  >
                    Instance Id:
                  </span>
                  <span
                    className="label"
                    style={{ display: "inline-block", minWidth: "120px" }}
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
                    style={{ display: "inline-block", minWidth: "120px" }}
                  >
                    ImageId:
                  </span>
                  <span
                    className="label"
                    style={{ display: "inline-block", minWidth: "120px" }}
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
                    style={{ display: "inline-block", minWidth: "120px" }}
                  >
                    InstanceType:
                  </span>
                  <span
                    className="label"
                    style={{ display: "inline-block", minWidth: "120px" }}
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
                    style={{ display: "inline-block", minWidth: "120px" }}
                  >
                    Zone:
                  </span>
                  <span
                    className="label"
                    style={{ display: "inline-block", minWidth: "120px" }}
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
                    style={{ display: "inline-block", minWidth: "120px" }}
                  >
                    SubnetId:
                  </span>
                  <span
                    className="label"
                    style={{ display: "inline-block", minWidth: "120px" }}
                  >
                    {instance["SubnetId"]}
                  </span>
                </Typography>
              </CardContent>
              <CardActions>
                <Button color="success">Running</Button>
              </CardActions>
            </Card>
          ))}
        </div>
        <div className="lower section">
          <div className="loadBalancer">
            {loadBalancer['LoadBalancerName']}
          </div>
          <div className="TargetGroup"></div>
        </div>
      </div>
    </>
  );
}

export default ViewAutoScaling;
