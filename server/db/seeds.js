use carbontrip;
db.dropDatabase();

db.transportmodes.insertOne( {
  typename: "Medium",
  type:[{
  name: "sea",
  typename: "Ferry Type",
  type: [{
    name: "foot passenger",
    co2e: 0.01874
  },{
    name: "car passenger",
    co2e: 0.12953
  }]
},{
  name: "air",
  typename: "Flight Length",
  type: [{
      name: "short-haul",
      typename: "Flight Class",
      type: [{
        name: "economy",
        co2e: 0.0175,
      },{
        name: "business",
        co2e: 0.02624,
      }]
    },{
      name: "long-haul",
      typename: "Flight Class",
      type: [{
        name: "economy",
        co2e: 0.01783,
      },{
        name: "premium economy",
        co2e: 0.02853,
      },{
        name: "business",
        co2e: 0.05172,
      },{
        name: "first",
        co2e: 0.07134,
      }]
    }]
},{
    name: "land",
    typename: "Vehicle Type",
    type: [
      {
        name: "car",
        typename: "Vehicle Size",
        type: [
          {
            name: "small",
            typename: "Fuel Type",
            type: [
              {
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
                name: "Plug-In Hybrid Electric Vehicles",
                co2e: 0.02255
              },
              {
                name: "Electric Vehicle",
                co2e: 0.0
              }
            ]
          },
          {
            name: "medium",
            typename: "Fuel Type",
            type: [
              {
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
            name: "large",
            typename: "Fuel Type",
            type: [
              {
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
                name: "Plug-In Hybrid Electric Vehicles",
                co2e: 0.07717
              },
              {
                name: "Electric Vehicle",
                co2e: 0.0
              }
            ]
          },
          {
            name: "average",
            typename: "Fuel Type",
            type: [
              {
                name: "Diesel",
                co2e: 0.17753
              },
              {
                name: "Petrol",
                co2e: 0.18368
              },
              {
                name: "Hybrid",
                co2e: 0.12568
              },
              {
                name: "CNG",
                co2e: 0.17925
              },
              {
                name: "LPG",
                co2e: 0.20022
              },
              {
                name: "Plug-In Hybrid Electric Vehicles",
                co2e: 0.07096
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
        name: "motorbike",
        typename: "Vehicle Size",
        type: [
          {
            name: "small",
            co2e: 0.08463
          },
          {
            name: "medium",
            co2e: 0.1031
          },
          {
            name: "large",
            co2e: 0.13528
          },
          {
            name: "average",
            co2e: 0.11529
          }
        ]
      }
    ]
  }
]});
