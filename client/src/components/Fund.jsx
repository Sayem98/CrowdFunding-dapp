import React from "react";
import { Button } from "react-bootstrap";
import { useEth } from "../contexts/EthContext";

function Fund() {
  const {
    state: { contract, accounts, web3 },
  } = useEth();

  const handleClick = () => {
    const Donate = async () => {
      await contract.methods
        .Donate()
        .send({ from: accounts[0], value: web3.utils.toWei("1", "ether") });
    };
    if (contract) {
      Donate();
    }
  };
  return (
    <div>
      <Button variant="secondary" onClick={handleClick}>
        Fund
      </Button>
    </div>
  );
}

export default Fund;
