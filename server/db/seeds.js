use carbontrip;
db.dropDatabase();

db.transportmodes.insertOne({
  typename: "terrain",
  type: [{
    name: "Sea",
    typename: "ferry-type",
    type: [{
      name: "foot passenger",
      co2e: 0.01874
    }, {
      name: "car passenger",
      co2e: 0.12953
    }]
  }, {
    name: "Air",
    typename: "flight-type",
    type: [{
      name: "Domestic",
      typename: "class",
      type: [{
        name: "economy",
        co2e: 0.0175,
      }, {
        name: "business",
        co2e: 0.02624,
      }]
    }, {
      name: "International",
      typename: "class",
      type: [{
        name: "economy",
        co2e: 0.01783,
      }, {
        name: "premium economy",
        co2e: 0.02853,
      }, {
        name: "business",
        co2e: 0.05172,
      }, {
        name: "first",
        co2e: 0.07134,
      }]
    }]
  }, {
    name: "Land",
    typename: "vehicle-type",
    type: [{
        name: "Car",
        typename: "size",
        type: [{
            name: "Up to 1.3L engine",
            typename: "fuel-type",
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
            typename: "fuel-type",
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
            typename: "fuel-type",
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
        name: "Taxi",
        typename: "Category",
        type: [{
          name: "Regular Taxi",
          co2e: 0.15344
        }, {
          name: "Black cab",
          co2e: 0.2142
        }]
      }
    ]
  }]
});


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