import React from "react";

import { useState } from "react";
import { useEth } from "../contexts/EthContext";

import classes from "../styles/CreateProject.module.css";

//Can be customised in input field...and better state management.

function CreateProject() {
  const {
    state: { contract, accounts, web3 },
  } = useEth();
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleChange2 = (event) => {
    setTarget(event.target.value);
  };

  const handleChange3 = (event) => {
    setDescription(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = name + ";" + description;
    console.log(data);

    const ammount = web3.utils.toWei(target, "ether");
    console.log(ammount);
    const createProject = async () => {
      await contract.methods
        .CreateProject(data, accounts[0], ammount)
        .send({ from: accounts[0] });

      setName("");
      setDescription("");
      setTarget("");
    };

    if (contract) {
      createProject();
    }
  };
  return (
    <div className={classes.createproject} onSubmit={handleSubmit}>
      <h1>Create A New Project</h1>
      <form>
        <label>Name of the Project</label>
        <input type="text" value={name} onChange={handleChange} />
        <label>Description</label>
        <textarea
          value={description}
          rows="4"
          cols="50"
          onChange={handleChange3}
        ></textarea>
        <label>Target ETH </label>
        <input type="text" value={target} onChange={handleChange2} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default CreateProject;
