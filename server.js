const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const app = express();

let Advertisement = require("./advertisementSchema");

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://it17100144:jahrin123@cluster0-scx5r.gcp.mongodb.net/RESEARCH?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("mongodb connected");
  })


app.get("/", (req, res) => {
  res.send("App is working perfectly : " + address);
})


const Web3 = require("web3");
const Owner = require("./build/contracts/Owner.json");
//const { create } = require("./advertisementSchema");

//  connecting to Ganache personal Blockchain(Ethereum Blockchain)
const web3 = new Web3("HTTP://0.0.0.0:7545");

//  ----------------------------------------

const abi = Owner.abi;
const address = Owner.networks[5777].address;

// console.log(abi);
console.log("hello " + address);

// printing the smart contract which is deployed to the blcok chain **********************************************************
const owner = new web3.eth.Contract(abi, address);


//  send transection to block chain
app.post('/add', function (req, res) {
  // console.log(req.body);
  console.log(req.body.name);
  console.log(req.body.nic);
  console.log(req.body.deviceId);

  const name = req.body.name
  const nic = req.body.nic
  //const nic = "962244667V";
  //3abcdef2ghijk3lm
  const deviceId = req.body.deviceId
  // const deviceId = "3abcdef2ghijk3lm";

  //  sending transection to blockchain through mobile app
  async function load() {

    const accounts = await web3.eth.getAccounts();
    const totalCount = await owner.methods.OwnerCount().call();

    const owners = [];
    for (var i = 1; i <= totalCount; i++) {

      const ownersf = await owner.methods.owners(i).call();

      console.log(ownersf.deviceId);

      const ownerObj = {
        deviceId: ownersf.deviceId,
        nic: ownersf.nic
      }

      owners.push(ownerObj);
    };


    console.log(owners);
    const filteredArray = owners.filter(d => d.nic == nic && d.deviceId == deviceId);
    console.log('filter_Arr', filteredArray);

    if (filteredArray.length !== 0) {

      // console.log("Record already exsist");
    }
    else {
      return await Promise.resolve(accounts[0]);
      //console.log("No previous records found");
    }
    // console.log(accounts[0]);
  };

  load().then((account) => {
    // console.log(account);
    owner.methods.createOwner(name, deviceId, nic).send({ from: account, gas: 3000000 });
  }).catch(error => {
    console.log("Error : address not found due to duplicate value - " + error);
  })


})

//  Adding records to mongoDB -  //  post requested initiated to mongodb, writing a transection to mongo db
app.post('/add/recordsMDB', function (req, res) {

  //console.log(req.body.name);
  console.log(req.body.nic);
  console.log(req.body.deviceId);
  //console.log(req.body.model);
  const nic = req.body.nic
  const deviceId = req.body.deviceId

  let advertisement = new Advertisement(req.body);


  advertisement.save()
    .then(own => {
      res.status(200).json({ 'owner mdb': 'owner added successfully' });
      console.log("Successfully data added.....");
    })
    .catch(err => {
      res.status(400).send('adding new failed');
      console.log("Error while saving to mongodb....");
    });


})
//-----------------------------------------------------------------------------------------------------------

//  retriewing from mongodb
app.get('/retriew/recordsMDB', function (req, res) {

  Advertisement.find(function (err, ownerlist) {
    if (err) {
      console.log(err);
    } else {
      res.json(ownerlist);
      //     console.log("----------------------------------");
      // console.log(ownerlist);
    }
  });

});

//  retriew from bockchian ***************************************************************

console.log("filteree owners --------------------------------------------------------");

app.get('/retriewSingle/recordsBC', function (req, res) {


  async function retriew() {

    const totalCount = await owner.methods.OwnerCount().call();
    const owners = [];
    for (var i = 1; i <= totalCount; i++) {

      const ownersf = await owner.methods.owners(i).call();

      console.log(ownersf.deviceId);

      const ownerObj = {
        deviceId: ownersf.deviceId,
        nic: ownersf.nic,
        name: ownersf.name
      }

      owners.push(ownerObj);
    };


    console.log(owners);
    return await Promise.resolve(owners);
  }

  retriew().then((ow) => {
    res.json(ow);
  }).catch(err => {
    console.log(err);
  })

});




//  sending a transection to blockchain
// async function create(){

//   const accounts = await web3.eth.getAccounts();
//   console.log(accounts[0]);

//   await owner.methods.createOwner("stephen","3abcdef2ghijk3lm","962244667V").send({from :accounts[0],gas:3000000 });

// }

// create();


app.listen(4000, function () {
  console.log("listeneing on 4000");
});






//console.log(owner);
//console.log(Owner.abi);
//console.log(Owner.networks[5777].address);

//console.log("server file wcich serves for web3js and mongodb");
