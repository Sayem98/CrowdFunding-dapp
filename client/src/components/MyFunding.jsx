import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useEth } from "../contexts/EthContext";
import classes from "../styles/MyFunding.module.css";

function MyFunding() {
  const {
    state: { contract, accounts, web3 },
  } = useEth();

  const [totaldonation, setTotalDonation] = useState();

  useEffect(() => {
    const GetTotalFunding = async () => {
      const balance = await contract.methods
        .contributors(accounts[0])
        .call({ from: accounts[0] });
      //console.log(balance.toString());

      setTotalDonation(web3.utils.fromWei(balance).toString());
    };
    if (contract) {
      GetTotalFunding();
    }
  });
  return (
    <div className={classes.funding}>
      <p>
        My total funding is:&nbsp;
        <b>{totaldonation ? totaldonation + " ETH" : "Wating for data !"}</b>
      </p>
    </div>
  );
}

export default MyFunding;
