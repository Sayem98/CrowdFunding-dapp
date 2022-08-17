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

  // eslint-disable-next-line
  const [change, setChange] = useState(false);
  const [vote, setVote] = useState(false);

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
    console.log(project);

    //Check events
    const checkEvents = async () => {
      await contract.events.EventVote((error, event) => {
        setChange((prevChange) => {
          return !prevChange;
        });
      });

      await contract.events.EventPay((error, event) => {
        setChange((prevChange) => {
          return !prevChange;
        });
      });
    };

    const checkPastVoteEvent = async () => {
      await contract
        .getPastEvents("EventVote", {
          filter: {
            _address: accounts[0],
            _no_of_project: id,
          },
          fromBlock: 0,
          toBLock: "latest",
        })
        .then((events) => {
          if (events.length !== 0) {
            setVote(true);
          }
        });
    };
    if (contract) {
      getProject();
      checkEvents();
      checkPastVoteEvent();
    }
  }, [id, accounts, contract, contributor, project, change]);

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
      {vote ? (
        "Already Voted"
      ) : (
        <Button variant="secondary" onClick={handleClick}>
          Vote
        </Button>
      )}
      &nbsp;
      {project ? (
        project.is_completed ? (
          "Already payed"
        ) : (
          <Button variant="secondary" onClick={handleClick2}>
            Pay
          </Button>
        )
      ) : (
        "Waiting"
      )}
    </div>
  );
}

export default ProjectDetails;
