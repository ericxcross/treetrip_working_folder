use carbontrip;
db.dropDatabase();

db.transportmodes.insertOne({
  typename: "Terrain",
  type: [{
    name: "Sea",
    typename: "Ferry",
    image: "images/icon_sea.png",
    type: [{
      name: "Foot Passenger",
      co2e: 0.01874
    }, {
      name: "Car Passenger",
      co2e: 0.12953
    }]
  }, {
    name: "Air",
    image: "images/icon_air.png",
    typename: "Flight Type",
    type: [{
      name: "Domestic",
      typename: "Class",
      type: [{
        name: "Economy",
        co2e: 0.1597,
      }, {
        name: "Business",
        co2e: 0.23955,
      }]
    }, {
      name: "International",
      typename: "Class",
      type: [{
        name: "Economy",
        co2e: 0.13996470332751,
      }, {
        name: "Premium Economy",
        co2e: 0.22395,
      }, {
        name: "Business",
        co2e: 0.4059,
      }, {
        name: "First",
        co2e: 0.55987,
      }]
    }]
  }, {
    name: "Land",
    image: "images/icon_land.png",
    typename: "Transport Type",
    type: [{
        name: "Car",
        image: "images/icon_car.png",
        typename: "Size",
        type: [{
            name: "Up to 1.3L engine",
            typename: "Fuel-type",
            type: [{
                name: "Diesel",
                co2e: 0.14533
              },
              {
                name: "Petrol",
                co2e: 0.15565
              },
              {
                name: "Hybrid",
                co2e: 0.10957
              },
              {
                name: "Plug-In Hybrid Electric Vehicle",
                co2e: 0.02255
              },
              {
                name: "Electric Vehicle",
                co2e: 0.0
              }
            ]
          },
          {
            name: "Up to 1.8L engine",
            typename: "Fuel-type",
            type: [{
                name: "Diesel",
                co2e: 0.17353
              },
              {
                name: "Petrol",
                co2e: 0.19386
              },
              {
                name: "Hybrid",
                co2e: 0.11538
              },
              {
                name: "CNG",
                co2e: 0.16324
              },
              {
                name: "LPG",
                co2e: 0.18217
              },
              {
                name: "Plug-In Hybrid Electric Vehicles",
                co2e: 0.0712
              },
              {
                name: "Electric Vehicle",
                co2e: 0.0
              }
            ]
          },
          {
            name: "Over 1.8L engine",
            typename: "Fuel-type",
            type: [{
                name: "Diesel",
                co2e: 0.2152
              },
              {
                name: "Petrol",
                co2e: 0.28411
              },
              {
                name: "Hybrid",
                co2e: 0.16134
              },
              {
                name: "CNG",
                co2e: 0.23851
              },
              {
                name: "LPG",
                co2e: 0.26704
              },
              {
                name: "Plug-In Hybrid Electric Vehicle",
                co2e: 0.07717
              },
              {
                name: "Electric Vehicle",
                co2e: 0.0
              }
            ]
          }
        ]
      },
      {
        name: "Motorcycle",
        image: "images/icon_motorcycle.png",
        typename: "size",
        type: [{
            name: "Up to 125CC engine",
            co2e: 0.08463
          },
          {
            name: "Up to 700CC engine",
            co2e: 0.1031
          },
          {
            name: "Over 700CC engine",
            co2e: 0.13528
          }
        ]
      },
      {
        name: "Rail",
        image: "images/icon_train.png",
        typename: "Category",
        type: [{
            name: "National Rail",
            co2e: 0.04424
          },
          {
            name: "International Rail",
            co2e: 0.01226
          },
          {
            name: "Light Rail and Tram",
            co2e: 0.03967
          },
          {
            name: "Underground Metro",
            co2e: 0.0376
          }
        ]
      },
      {
        name: "Bus",
        image: "images/icon_bus.png",
        typename: "Category",
        type: [{
          name: "Local bus (not London)",
          co2e: 0.12007
        }, {
          name: "Local London bus",
          co2e: 0.07211
        }, {
          name: "Average local bus",
          co2e: 0.10097
        }, {
          name: "Coach",
          co2e: 0.02801
        }]
      }, {
        name: "Cycle",
        image: "images/icon_bicycle.png",
        co2e: 0
      }, {
        name: "Walk",
        image: "images/icon_walk.png",
        co2e: 0
      }
    ]
  }]
});

// plane
// ferry
// train
// Bus
// Electric vehicle
// Cycle
// Walk
db.alternativeTransportModes.insertOne({
  alternatives: [{
    name: "Plane - Economy Class",
    image: "images/icon_plane.png",
    co2e: 0.1597
  },
  {
    name: "Ferry",
    image: "images/icon_boat.png",
    co2e: 0.112873
  },
  {
    name: "Train",
    image: "images/icon_train.png",
    co2e: 0.04424
  },
  {
    name: "Tram",
    image: "images/icon_tram.png",
    co2e: 0.03967
  },
  {
    name: "Bus",
    image: "images/icon_bus.png",
    co2e: 0.10097
  },
  {
    name: "Electric Car",
    image: "images/icon_car.png",
    co2e: 0
  },
  {
    name: "Cycle",
    image: "images/icon_bicycle.png",
    co2e: 0
  },
  {
    name: "Walk",
    image: "images/icon_walk.png",
    co2e: 0
  }]}
)
// {
//   name: "average",
//   typename: "fuel type",
//   type: [
//     {
//       name: "Diesel",
//       co2e: 0.17753
//     },
//     {
//       name: "Petrol",
//       co2e: 0.18368
//     },
//     {
//       name: "Hybrid",
//       co2e: 0.12568
//     },
//     {
//       name: "CNG",
//       co2e: 0.17925
//     },
//     {
//       name: "LPG",
//       co2e: 0.20022
//     },
//     {
//       name: "Plug-In Hybrid Electric Vehicles",
//       co2e: 0.07096
//     },
//     {
//       name: "Electric Vehicle",
//       co2e: 0.0
//     }
//   ]
// }
