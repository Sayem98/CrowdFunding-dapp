import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEth } from "../contexts/EthContext";
import classes from "../styles/ProjectDetails.module.css";
import Button from "react-bootstrap/Button";
function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState();
  const [contributor, setContributor] = useState("");
  const {
    state: { contract, accounts, web3 },
  } = useEth();

  useEffect(() => {
    const getProject = async () => {
      const _project = await contract.methods
        .projects(id)
        .call({ from: accounts[0] });
      setProject(_project);
      const _contributor = await contract.methods
        .no_contributor()
        .call({ from: accounts[0] });
      setContributor(_contributor);
    };
    if (contract) {
      getProject();
    }
  }, [id, accounts, contract, contributor]);

  const handleClick = () => {
    const Vote = async () => {
      await contract.methods.Vote(id).send({ from: accounts[0] });
    };
    if (contract) {
      Vote();
    }
  };

  const handleClick2 = () => {
    const pay = async () => {
      await contract.methods.Pay(id).send({ from: accounts[0] });
    };
    if (contract) {
      pay();
    }
  };
  return (
    <div className={classes.project}>
      {project ? (
        <>
          <h3>{project.data.split(";")[0]}</h3>
          <p>{project.data.split(";")[1]}</p>
          <label>Receipient</label>
          <h4>{project.recipient}</h4>
          <p>
            Target:
            {" " +
              web3.utils.fromWei(project.ammount.toString(), "ether") +
              "ETH"}
          </p>
          <p>Completed: {project.is_completed ? "Yes" : "No"}</p>
          <p>
            Positive Vote: {project.no_of_voters}/{contributor}
          </p>
        </>
      ) : (
        "Getting data, Please wait."
      )}
      <Button variant="secondary" onClick={handleClick}>
        Vote
      </Button>
      &nbsp;
      <Button variant="secondary" onClick={handleClick2}>
        Pay
      </Button>
    </div>
  );
}

export default ProjectDetails;
