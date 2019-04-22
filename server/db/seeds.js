use carbontrip;
db.dropDatabase();

db.transportmodes.insertOne( {
  typename: "terrain",
  type:[{
  name: "sea",
  typename: "ferry-type",
  type: [{
    name: "foot passenger",
    co2e: 0.01874
  },{
    name: "car passenger",
    co2e: 0.12953
  }]
},{
  name: "air",
  typename: "flight-type",
  type: [{
      name: "domestic",
      typename: "class",
      type: [{
        name: "economy",
        co2e: 0.0175,
      },{
        name: "business",
        co2e: 0.02624,
      }]
    },{
      name: "international",
      typename: "class",
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
    typename: "vehicle-type",
    type: [
      {
        name: "car",
        typename: "size",
        type: [
          {
            name: "Up to 1.3L engine",
            typename: "fuel-type",
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
            name: "Over 1.8L engine",
            typename: "fuel-type",
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
        name: "motorcycle",
        typename: "size",
        type: [
          {
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
      }
    ]
  }
]});


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
