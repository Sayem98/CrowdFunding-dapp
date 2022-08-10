// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract CrowdFunding{

    mapping(address=>uint) public contributors;
    address public creator;
    uint public min_donation;
    uint public no_contributor;

    //Project Structure.
    struct Project{
        string data;
        address payable recipient;
        uint ammount;
        bool is_completed;
        uint no_of_voters;
        mapping(address=>bool) votes;
        bool is_created;
    }

    //Projects
    mapping(uint => Project) public projects;
    uint public no_of_projects;

    //Events..
    event EventDonate(address indexed _address, uint _value);
    event EventProject(uint indexed _no_of_project);
    event EventPay(uint indexed _receipient, uint _ammount);
    event EventVote(address indexed _address, uint no_of_project, uint _no_of_voters);

    //Initializing the contract with minimum contribution.
    constructor(uint _min_donation){
        creator = msg.sender;
        min_donation = _min_donation;

    }
    
    //Donate money...
    function Donate() public payable{
        //Checking if donation is higher or equal to minimum donation.
        require(msg.value >= min_donation, 'Please enter a higher value !');
        // For giving only one vote power to a contributor.
       if(contributors[msg.sender] == 0){
           no_contributor ++;
       }
        //Adding the value the contributor contributed.
       contributors[msg.sender]+= msg.value;

       //Emitting donation event.
       emit EventDonate(msg.sender, msg.value);

    }

    // For getting the total balance of the contract.
    function TotalDonation() public view returns(uint){
        return address(this).balance;
    }



    
    // Create a new project for getting donations.
    function CreateProject(string memory _data, address payable _receipient, uint _ammount) public{
        //Getting a instance of the project.
        Project storage project = projects[no_of_projects];

        

        //Initial values for the projects.
        project.data = _data;
        project.recipient = _receipient;
        project.ammount = _ammount;
        project.is_completed = false;
        project.no_of_voters = 0;
        project.is_created = true;


        //Emitting new project event.
        emit EventProject(no_of_projects);

        //increasing the number of projects.
        no_of_projects++;
    }

    function Vote(uint _no_of_project) public{
        //Checking voters contribution.
        require(contributors[msg.sender]>0, 'You must contribute to vote.');
        
        //Getting the Project.
        Project storage project = projects[_no_of_project];

        //Checking for projects existence.
        require(project.is_created == true, 'This project has not been created');

        //Checking if contributor already voted.
        require(project.votes[msg.sender]==false, 'You already voted');

        //Checking if project already been completed.
        require(project.is_completed == false, 'Prject already been completed !');

        //Giving the vote and increasing the voter number.
        project.votes[msg.sender] = true;
        project.no_of_voters++;
        emit EventVote(msg.sender, no_of_projects, project.no_of_voters);
        
    }



    // Only accessable by creator. If enough donation is raised and 
    // MAjority votes for the project to be funded then the ammount is sent 
    // to the receipient.
    function Pay(uint _no_of_project) public{
        require(msg.sender == creator, 'Permission denied !');
        Project storage project = projects[_no_of_project];
        require(TotalDonation()>= project.ammount, 'Sorry not enough Money to pay !');
        require(project.no_of_voters > no_contributor/2, 'Majority does not support');

        project.recipient.transfer(project.ammount);
        project.is_completed = true;

        
    }

    // function Refund() public {
    //     //Need to think the logic.
    // }

   

    function GetAProject(uint _index) public view returns(string memory, address payable, uint, bool, uint){
        //Getting the project.
        Project storage project = projects[_index];
        require(project.is_created == true, 'Not created yet.');
        
        return(project.data, project.recipient, project.ammount, project.is_completed, project.no_of_voters);
    }
}