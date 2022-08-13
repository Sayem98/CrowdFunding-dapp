import React from "react";
import { useEth } from "../contexts/EthContext";
import classes from "../styles/AllProjects.module.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import image from "../images/project.png";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function AllProjects() {
  const {
    state: { contract, accounts, web3 },
  } = useEth();
  const navigate = useNavigate();

  const [projects, setProjects] = useState();

  useEffect(() => {
    const getAllProjects = async () => {
      const no_of_project = await contract.methods
        .no_of_projects()
        .call({ from: accounts[0] });

      let all_projects = [];

      for (let i = 0; i < no_of_project; i++) {
        all_projects[i] = await contract.methods
          .projects(i)
          .call({ from: accounts[0] });
      }

      setProjects(all_projects);
    };

    if (contract) {
      getAllProjects();
    }
  }, [contract, accounts]);

  return (
    <div className={classes.allprojects}>
      {projects
        ? projects.map((project, index) => (
            <Card style={{ width: "18rem" }} key={index}>
              <Card.Img variant="top" src={image} />
              <Card.Body>
                <Card.Title>{project.data.split(";")[0]}</Card.Title>
                <Card.Text>
                  {project.data.split(";")[1].slice(0, 50) + "..."}
                </Card.Text>
                <Card.Text>
                  {web3.utils.fromWei(project.ammount.toString(), "ether") +
                    "ETH"}
                  &nbsp;
                  <Button
                    onClick={() => {
                      navigate(`project/${index}`);
                    }}
                  >
                    Details
                  </Button>
                </Card.Text>
              </Card.Body>
            </Card>
          ))
        : ""}
    </div>
  );
}

export default AllProjects;
