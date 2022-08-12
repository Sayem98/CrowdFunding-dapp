import React from "react";
import { useEth } from "../contexts/EthContext";

function AllProjects() {
  const {
    state: { contract, accounts, web3 },
  } = useEth();

  return <div>AllProjects</div>;
}

export default AllProjects;
