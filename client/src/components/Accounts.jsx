import React from "react";
import { useEth } from "../contexts/EthContext";
import classes from "../styles/Accounts.module.css";
import { ListGroup } from "react-bootstrap";
import MyFunding from "./MyFunding";

function Accounts() {
  const {
    state: { accounts },
  } = useEth();
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
      <div className={classes.votes}>
        1. My Project - Yes
        <br />
        2. New Project - No
      </div>
    </div>
  );
}

export default Accounts;
