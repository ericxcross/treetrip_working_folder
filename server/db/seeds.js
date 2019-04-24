use carbontrip;
db.dropDatabase();

db.transportmodes.insertOne({
  typename: "Terrain",
  type: [{
    name: "Sea",
    typename: "Ferry",
    image: "images/icon_sea.png",
    type: [{
      name: "Foot_Passenger",
      image: "images/icon_passenger_ferry.png",
      co2e: 0.01874
    }, {
      name: "Car_Passenger",
      image: "images/icon_car_ferry.png",
      co2e: 0.12953
    }]
  }, {
    name: "Air",
    image: "images/icon_air.png",
    typename: "Flight_Type",
    type: [{
      name: "Domestic",
      image: "images/icon_domestic_plane.png",
      typename: "Class",
      type: [{
        name: "Economy",
        image: "images/icon_economy_class.png",
        co2e: 0.1597,
      }, {
        name: "Business",
        image: "images/icon_business_class.png",
        co2e: 0.23955,
      }]
    }, {
      name: "International",
      image: "images/icon_plane.png",
      typename: "Class",
      type: [{
        name: "Economy",
        image: "images/icon_economy_class.png",
        co2e: 0.13996470332751,
      }, {
        name: "Premium_Economy",
        image: "images/icon_premium_class.png",
        co2e: 0.22395,
      }, {
        name: "Business",
        image: "images/icon_business_class.png",
        co2e: 0.4059,
      }, {
        name: "First",
        image: "images/icon_first_class.png",
        co2e: 0.55987,
      }]
    }]
  }, {
    name: "Land",
    image: "images/icon_land.png",
    typename: "Transport_Type",
    type: [{
        name: "Car",
        image: "images/icon_car.png",
        typename: "Size",
        type: [{
            name: "Up_to_1.3L_engine",
            image: "images/icon_small_engine.png",
            typename: "Fuel_Type",
            type: [{
                name: "Diesel",
                image: "images/icon_fuel.png",
                co2e: 0.14533
              },
              {
                name: "Petrol",
                image: "images/icon_fuel.png",
                co2e: 0.15565
              },
              {
                name: "Hybrid",
                image: "images/icon_fuel.png",
                co2e: 0.10957
              },
              {
                name: "Plug-In_Hybrid",
                image: "images/icon_fuel.png",
                co2e: 0.02255
              },
              {
                name: "Electric_Vehicle",
                image: "images/icon_electric.png",
                co2e: 0.0
              }
            ]
          },
          {
            name: "Up_to_1.8L_engine",
            image: "images/icon_engine.png",
            typename: "Fuel_Type",
            type: [{
                name: "Diesel",
                image: "images/icon_fuel.png",
                co2e: 0.17353
              },
              {
                name: "Petrol",
                image: "images/icon_fuel.png",
                co2e: 0.19386
              },
              {
                name: "Hybrid",
                image: "images/icon_fuel.png",
                co2e: 0.11538
              },
              {
                name: "CNG",
                image: "images/icon_fuel.png",
                co2e: 0.16324
              },
              {
                name: "LPG",
                image: "images/icon_fuel.png",
                co2e: 0.18217
              },
              {
                name: "Plug-In_Hybrid",
                image: "images/icon_fuel.png",
                co2e: 0.0712
              },
              {
                name: "Electric_Vehicle",
                image: "images/icon_electric.png",
                co2e: 0.0
              }
            ]
          },
          {
            name: "Over_1.8L_engine",
            image: "images/icon_large_engine.png",
            typename: "Fuel_Type",
            type: [{
                name: "Diesel",
                image: "images/icon_fuel.png",
                co2e: 0.2152
              },
              {
                name: "Petrol",
                image: "images/icon_fuel.png",
                co2e: 0.28411
              },
              {
                name: "Hybrid",
                image: "images/icon_fuel.png",
                co2e: 0.16134
              },
              {
                name: "CNG",
                image: "images/icon_fuel.png",
                co2e: 0.23851
              },
              {
                name: "LPG",
                image: "images/icon_fuel.png",
                co2e: 0.26704
              },
              {
                name: "Plug-In_Hybrid",
                image: "images/icon_fuel.png",
                co2e: 0.07717
              },
              {
                name: "Electric_Vehicle",
                image: "images/icon_electric.png",
                co2e: 0.0
              }
            ]
          }
        ]
      },
      {
        name: "Motorcycle",
        image: "images/icon_motorcycle.png",
        typename: "Size",
        type: [{
            name: "Up_to_125CC_engine",
            image: "images/icon_small_engine.png",
            co2e: 0.08463
          },
          {
            name: "Up_to_700CC_engine",
            image: "images/icon_engine.png",
            co2e: 0.1031
          },
          {
            name: "Over_700CC_engine",
            image: "images/icon_large_engine.png",
            co2e: 0.13528
          }
        ]
      },
      {
        name: "Rail",
        image: "images/icon_train.png",
        typename: "Category",
        type: [
          {
            name: "International_Rail",
            image: "images/icon_train.png",
            co2e: 0.01226
          },
          {
            name: "National_Rail",
            image: "images/icon_slow_train.png",
            co2e: 0.04424
          },
          {
            name: "Light_Rail_and_Tram",
            image: "images/icon_tram.png",
            co2e: 0.03967
          },
          {
            name: "Underground_Metro",
            image: "images/icon_metro.png",
            co2e: 0.0376
          }
        ]
      },
      {
        name: "Bus",
        image: "images/icon_bus.png",
        typename: "Category",
        type: [{
          name: "Local_Bus",
          image: "images/icon_local_bus.png",
          co2e: 0.12007
        }, {
          name: "London_Bus",
          image: "images/icon_double_decker_bus.png",
          co2e: 0.07211
        }, {
          name: "Coach",
          image: "images/icon_bus.png",
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

db.alternativeTransportModes.insertOne({
  alternatives: [{
    name: "Plane",
    co2e: 0.1597,
    mindistance: 200,
    maxdistance: 999999
  },
  {
    name: "Ferry",
    co2e: 0.129529,
    mindistance: 0,
    maxdistance: 999999
  },
  {
    name: "Train",
    co2e: 0.04424,
    mindistance: 0,
    maxdistance: 999999
  },
  {
    name: "Tram",
    co2e: 0.03967,
    mindistance: 0,
    maxdistance: 100
  },
  {
    name: "Bus",
    co2e: 0.10097,
    mindistance: 0,
    maxdistance: 999999
  },
  {
    name: "Car (average)",
    co2e: 0.17753,
    mindistance: 0,
    maxdistance: 1000
  },
  {
    name: "Motorbike (average)",
    co2e: 0.11529,
    mindistance: 0,
    maxdistance: 1000
  },
  {
    name: "Electric Car",
    co2e: 0,
    mindistance: 0,
    maxdistance: 600
  },
  {
    name: "Cycle",
    co2e: 0,
    mindistance: 0,
    maxdistance: 100
  },
  {
    name: "Walk",
    co2e: 0,
    mindistance: 0,
    maxdistance: 50
  }]}
)
