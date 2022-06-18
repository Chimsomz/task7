# task7
RESTFUL API THAT COLLECTS THE INFORMATION ON DIFFERENT LOCATIONS AND DETERMINE DISTANCE

The task was aimed at creating a RESTful API that collects info and determines distance between locations

The app is set up using the Express framework.
content-type: application/json

Dependencies(axios, express, mongoose, validator, nodemon) and dev Dependencies (nodemon) installed using the npm package manager and the External APIs:Find my address or domain location worldwide
The main file used to anchor the external app is the app.js file and more information about the whole app can be found at the package.json file.
This server listened and ran successfully on port 3000 and connected to mongodb and supplied the data requested

the Areas to pay special attention to
The algorithm used to calculate the distance between two locations

    const calcLocdistance = (a1, a2, b1, b2) => {
      let b = a2 - a1;
      let a = b2 - b1;
      const total = Math.sqrt(a * a + b * b);
      const R = 6371; //km
      const totalDistance = Math.round(total * R);
      return `The total distance between you and ${dataLog.name} is ${totalDistance}km`;
    };


