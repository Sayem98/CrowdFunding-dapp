import React, { useEffect } from "react";
import { useEth } from "../contexts/EthContext";
import classes from "../styles/Accounts.module.css";
import { ListGroup } from "react-bootstrap";
import MyFunding from "./MyFunding";
import Fund from "./Fund";
import { useState } from "react";

function Accounts() {
  const {
    state: { contract, accounts },
  } = useEth();
  // eslint-disable-next-line
  const [change, setChange] = useState(false);
  useEffect(() => {
    const checkEvent = async () => {
      await contract.events.EventDonate((error, event) => {
        setChange((prevChange) => {
          return !prevChange;
        });
      });
    };
    if (contract) {
      checkEvent();
    }
  }, [contract]);
  return (
    <div className={classes.accounts}>
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
        1. My Project - Yes
        <br />
        2. New Project - No
      </div>
    </div>
  );
}

export default Accounts;
