const CrowdFunding = artifacts.require("CrowdFunding");
const BN = require("bn.js");
const Web3 = require("web3");
const web3 = new Web3("HTTP://127.0.0.1:8545");
contract("CrowdFunding", () => {
  it("Should deploy the contract correctly.", async () => {
    const instance = await CrowdFunding.deployed();
    assert(instance.address !== "");
  });

  it("Should return min ammount of funding.", async () => {
    const instance = await CrowdFunding.deployed();
    value = await instance.min_donation();
    number = new BN("1000000000000000000", 10);
    // console.log(number);
    // console.log(value);
    assert(value.toString() === number.toString());
  });

  it("Should donate 1Eth", async () => {
    const instance = await CrowdFunding.deployed();
    const accounts = await web3.eth.getAccounts();
    // console.log(Web3.utils.toWei("1", "ether"));
    const balance = await instance.TotalDonation();
    //console.log(balance.toString());
    await instance.Donate({
      from: accounts[0],
      value: Web3.utils.toWei("1", "ether"),
    });
    const newBalance = await instance.TotalDonation();
    //console.log(newBalance.toString());
    //console.log(balance + Web3.utils.toWei("1", "ether").toString());
    assert(
      (balance + Web3.utils.toWei("1", "ether")).toString() ==
        ("0" + newBalance).toString()
    );
  });

  it("Should check balance", async () => {
    const instance = await CrowdFunding.deployed();
    const balance = await instance.TotalDonation();
    //console.log(balance.toString());
    assert(balance.toString() > "0");
  });

  it("Should create  a new project", async () => {
    const instance = await CrowdFunding.deployed();
    const data = "Name: My Project; Description: It is a good project";

    //const ammount = "1000000000000000000";
    const accounts = await web3.eth.getAccounts();
    //console.log(web3.eth.accounts[0]);
    const ammount = Web3.utils.toWei("1", "ether");
    instance.CreateProject(data, accounts[0], ammount);
  });

  it("should be 1 Eth", async () => {
    const instance = await CrowdFunding.deployed();
    const min_donation = await instance.min_donation();
    assert(
      min_donation.toString() == Web3.utils.toWei("1", "ether").toString()
    );
  });

  it('Should get project of ith index', async()=>{
    const instance = await CrowdFunding.deployed();
    project = await instance.projects(0);
    console
  })
});
