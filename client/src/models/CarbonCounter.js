const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const CarbonCounter = function () {
    this.urlAllData = 'http://localhost:3000/api/transportmodes';
    this.urlAlternativesData = 'http://localhost:3000/api/alternativeTransportModes';
    this.request = new RequestHelper(this.urlAllData);
    this.requestAlternatives = new RequestHelper(this.urlAlternativesData);
    this.alternatives = null;
};

CarbonCounter.prototype.bindEvents = function () {
    PubSub.subscribe('FormView:RequestData', (evt) => {
        this.getData();
    });

    PubSub.subscribe('FormView:TripDetails', (evt) => {
        const distance = parseInt(evt.detail.distance);
        const co2e = evt.detail.co2e;
        const carbonTotal = this.calculateCO2e(co2e, distance);
        const treesRequired = this.calculateTrees(carbonTotal);
        const socialCost = this.calculateSocialCost(carbonTotal);
        const outputData = {
            co2e: carbonTotal,
            trees: treesRequired,
            sc: socialCost
        };
        PubSub.publish('CarbonCounter:OutputData', outputData);
        const viableAlternatives = this.viableAlternativeArray(distance);
        let alternativeTransport = [];
        viableAlternatives.forEach((element) => {
            let co2eEle = element.co2e;
            let co2eAlt = this.calculateCO2e(co2eEle, distance);
            if (co2e !== co2eEle) {
                let CO2edifference = Math.round((co2eAlt - carbonTotal) * 100) / 100;
                let treesAlt = this.calculateTrees(co2eAlt);
                let treesDifference = treesAlt - treesRequired;
                let socialCostAlt = this.calculateSocialCost(co2eAlt);
                let socialCostDifference = socialCostAlt - socialCost;
                if (element.name === "Walk") {
                    const caloriesBurned = distance * 70;
                    const alternativeData = {
                        name: element.name,
                        co2e: co2eAlt,
                        co2eChange: CO2edifference,
                        trees: treesAlt,
                        treesChange: treesDifference,
                        sc: socialCostAlt,
                        scChange: socialCostDifference,
                        calories: caloriesBurned
                    };
                    alternativeTransport.push(alternativeData);
                } else if (element.name === "Cycle") {
                    const caloriesBurned = distance * 30;
                    const alternativeData = {
                        name: element.name,
                        co2e: co2eAlt,
                        co2eChange: CO2edifference,
                        trees: treesAlt,
                        treesChange: treesDifference,
                        sc: socialCostAlt,
                        scChange: socialCostDifference,
                        calories: caloriesBurned
                    };
                    alternativeTransport.push(alternativeData);
                } else {
                    const alternativeData = {
                        name: element.name,
                        co2e: co2eAlt,
                        co2eChange: CO2edifference,
                        trees: treesAlt,
                        treesChange: treesDifference,
                        sc: socialCostAlt,
                        scChange: socialCostDifference
                    };
                    alternativeTransport.push(alternativeData);
                }

            }
        });
        PubSub.publish('CarbonCounter:AlternativeTravelOptions', alternativeTransport);

    })

    PubSub.subscribe('CarbonCounter:AlternativesDataFound', (evt) => {
        this.alternatives = evt.detail[0].alternatives;
    })
};

CarbonCounter.prototype.getData = function () {
    this.request.get()
        .then((data) => {
            PubSub.publish('CarbonCounter:DataFound', data);
        })
        .catch(console.error);
    this.requestAlternatives.get()
        .then((data) => {
            PubSub.publish('CarbonCounter:AlternativesDataFound', data);
        })
        .catch(console.error);
};

CarbonCounter.prototype.viableAlternativeArray = function (distance) {
    const viableAlternatives = [];
    this.alternatives.forEach((element) => {
        if (distance >= element.mindistance && distance <= element.maxdistance) {
            viableAlternatives.push(element);
        }
    })
    return viableAlternatives;
}

CarbonCounter.prototype.calculateCO2e = function (co2e, distance, passengers = 1) {
    const carbonTotal = co2e * distance / passengers; //kg co2e
    return Math.round(carbonTotal * 100) / 100;
};

CarbonCounter.prototype.calculateTrees = function (carbonTotal) {
    // assumes one tree absorbs 22kg CO2 / year
    const trees = carbonTotal / (22 / 365); //number of trees in one day to absorb the trip CO2
    return Math.round(trees);
};

CarbonCounter.prototype.calculateSocialCost = function (carbonTotal) {
    // 2050 values $0.50 / ton CO2 >> $0.0005 / kg CO2
    const socialCost = 0.0005 * carbonTotal;
    return parseFloat(Math.round(socialCost * 100) / 100).toFixed(2);
};


module.exports = CarbonCounter;
