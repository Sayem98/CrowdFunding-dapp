import React, { useEffect } from "react";
import { useEth } from "../contexts/EthContext";
import classes from "../styles/Accounts.module.css";
import { ListGroup } from "react-bootstrap";
import MyFunding from "./MyFunding";
import Fund from "./Fund";
import { useState } from "react";

function Accounts() {
  const {
    state: { contract, accounts, web3 },
  } = useEth();
  // eslint-disable-next-line
  const [projects, setProjects] = useState([]);
  const [change, setChange] = useState(false);
  const [balance, setBalance] = useState();
  useEffect(() => {
    const checkEvent = async () => {
      await contract.events.EventDonate((error, event) => {
        setChange((prevChange) => {
          return !prevChange;
        });
      });
      await contract.events.EventVote((error, event) => {
        setChange((prevChange) => {
          return !prevChange;
        });
      });
    };

    const getBal = async () => {
      let _bal = await contract.methods
        .getBalance()
        .call({ from: accounts[0] });
      let bal = web3.utils.fromWei(_bal.toString(), "ether");
      setBalance(bal);
    };

    const getVotedProjects = async () => {
      await contract
        .getPastEvents("EventVote", {
          filter: {
            _address: accounts[0],
          },
          fromBlock: 0,
          toBLock: "latest",
        })
        .then((events) => {
          let _projects = [];
          events.map((event, index) => {
            // console.log(event.returnValues.no_of_project);

            _projects[index] = event.returnValues.no_of_project;
            return true;
          });
          setProjects(_projects);
        });
    };
    if (contract) {
      checkEvent();
      getVotedProjects();
      getBal();
    }
  }, [contract, change, accounts, web3]);
  return (
    <div className={classes.accounts}>
      <h2>Balance: {balance ? balance + " ETH" : "Getting..."}</h2>
      <div className={classes.account}>
        <h2>Accounts</h2>
        {accounts
          ? accounts.map((account, index) => (
              <ListGroup key={index}>{account}</ListGroup>
            ))
          : "Waiting for connection with MetaMask"}
      </div>
      <MyFunding />
      <Fund />
      <div className={classes.votes}>
        <h4>Voted Projects</h4>
        {projects && projects.length !== 0
          ? projects.map((project, index) => (
              <ListGroup key={index}>Projrct ID: {project}</ListGroup>
            ))
          : "None"}
      </div>
    </div>
  );
}

export default Accounts;
