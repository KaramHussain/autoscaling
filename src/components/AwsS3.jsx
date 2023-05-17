import { useEffect } from 'react';
import * as AWS from "aws-sdk";
import { useState } from "react";

function AwsS3() {
  AWS.config.update({
    accessKeyId: "AKIAT43VCAR4JLMSUYV4",
    secretAccessKey: "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",
    region: "us-east-1",
  });
  const ec2 = new AWS.EC2();
  const [instances, setInstances] = useState([]);
  useEffect(() => {
    ec2.describeInstances({}, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        setInstances(data.Reservations.map(reservation => reservation.Instances).flat());
      }
    });
  },[]);
  console.log(instances)
  return (
    <div>
      <h1 className='bg-warning'>EC2 Instances</h1>
      <ul className='list-group'>
        {instances.map(instance => (
          <ul className="list-group bg-dark text-light p-4 m-1 row" key={instance.InstanceId}>{instance.InstanceId}
            <li className="list-group-item "><span className=".col-3">Image Id : </span>{instance.ImageId}</li>
            <li className="list-group-item "><span className=".col-3">Key Name </span>{instance.KeyName}</li>
            <li className="list-group-item "><span className=".col-3">Type     : </span>{instance.InstanceType}</li>
            <li className="list-group-item "><span className=".col-3">LaunchTime : </span>{instance.LaunchTime.toString()}</li>
            <li className="list-group-item "><span className=".col-3">Availability Zone : </span>{instance.Placement.AvailabilityZone}</li>
            <li className="list-group-item "><span className=".col-3">State : </span>{instance.State.Name}</li>
            <li className="list-group-item "><span className=".col-3">Subnet : </span>{instance.SubnetId}</li>
            <li className="list-group-item "><span className=".col-3">Tag Name : </span>{instance.Tags[0].Value}</li>
            <li className="list-group-item "><span className=".col-3">VPC : </span>{instance.VpcId}</li>
          </ul>

        ))}
      </ul>
    </div>
  );
}
export default AwsS3;
