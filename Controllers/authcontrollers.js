const MongooseModel = require("../models/schema");
const axios = require("axios");
const validator = require("validator");

const options = {
  method: "GET",
  url: "https://find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com/iplocation",

  params: { apikey: "873dbe322aea47f89dcf729dcc8f60e8" },
  headers: {
    "X-RapidAPI-Key": "326c8612cbmsh8500e8d34584c31p1dc224jsn089a8e4ea4dc",
    "X-RapidAPI-Host":
      "find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com",
  },
};

//to return error
const handleErr = (err) => {
  if (err) {
    console.log(err);
  }
};
// Add location data
module.exports.addLoc = async (req, res) => {
  try {
    let {
      id,
      location,
      description,
      phone,
      website,
      contactPerson,
      longitude,
      latitude
    } = req.body; //requested data


      axios.request(options).then((response) => {
        const insertData = new MongooseModel({
          id,
          location: response.data["country"],
          description,
          phone,
          website,
          contactPerson,
          longitude: response.data["longitude"],
          latitude: response.data["latitude"],
        });
        insertData.save((err, newData) => {
          handleErr(err);
          res.json({
            success: true,
            newData,
            status: 200,
          });
        });
      });

  } catch (err) {
    console.log(err);
  }
};

// edit location
module.exports.editLoc = async (req, res) => {
  const id = req.params.id;
  const { ...loc } = req.body;

  try {
    const editLoc = await MongooseModel.findByIdAndUpdate(
      { _id:id },
      { loc },
      { new: true }
    );

    if (editLoc) {
      res.json({
        success: true,
        editLoc,
        status: 200,
      });
    } else {
      res.json({
        success: false,
        message: `${id} does not exist`,
        status: 400,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
// delete location
module.exports.deleteLoc = async (req, res) => {
  try {
    const { id } = req.body;

    // check if the data  exists in the database
    const checkData = await MongooseModel.findById({ _id:id });
    if (checkData) {
      // delete the data
      const deleteData = await MongooseModel.findByIdAndDelete({ _id:id });
      res.json({
        success: true,
        message: `${checkData.name} has been deleted`,
        status: 200,
      });
    }
    // if the data does not exist in the database
    else {
      res.json({
        success: false,
        message: `${id} does not exist`,
        status: 400,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// fetch specific location
module.exports.SpecificLoc = async (req, res) => {
  try {
    const { id } = req.body;

    const SpecificLoc = await MongooseModel.findOneById({ _id: id });
    if (SpecificLoc) {
      res.json({
        successful: true,
        message: SpecificLoc,
        status: 200,
      });
    } else {
      res.json({
        success: false,
        message: `${id} does not exist`,
        status: 400,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// fetch all location
module.exports.allLoc = async (req, res) => {
  try {
    const allLoc= await MongooseModel.find();

    if (fetchallLoc) {
      res.json({
        success: true,
        message: allLoc,
        status: 200,
      });
    } else {
      res.json({
        successful: false,
        message: `No data`,
        status: 400,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
// calclocation post request
module.exports.calLocdistance = async (req, res) => {
  try {
    const { id } = req.body;
    const dataLog = await MongooseModel.findOne({ id });

    // formular for distance calculation
    const calcLocdistance = (a1, a2, b1, b2) => {
      let b = a2 - a1;
      let a = b2 - b1;
      const total = Math.sqrt(a * a + b * b);
      const R = 6371; //km
      const totalDistance = Math.round(total * R);
      return `The total distance between you and ${dataLog.name} is ${totalDistance}km`;
    };
    // -----------------------------------------------------------------
    axios
      .request(options)
      .then((res) => {
        // current User Location
        const userLongitude = response.data["longitude"];
        const userLatitude = response.data["latitude"];

        // location of the user in database
        const dataLogLongitude = dataLog.longitude;
        const dataLogLatitude = dataLog.latitude;

        res.json({
          success: true,
          message: calcLocdistance(
            userLatitude,
            dataLogLatitude,
            userLongitude,
            dataLogLongitude
          ),
          statusCode: 200,
        });
      })
      .catch(handleErr(err));
  } catch (err) {
    console.log(err);
  }
};
