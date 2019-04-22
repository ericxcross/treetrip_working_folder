const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const CarbonCounter = function () {
    this.url = 'http://localhost:3000/api/transportmodes';
    this.request = new RequestHelper(this.url);
};

CarbonCounter.prototype.bindEvents = function () {
    PubSub.subscribe('FormView:RequestData', (evt) => {
        this.getData();
    });

    PubSub.subscribe('FormView:TripDetails', (evt) => {
        const distance = parseInt(evt.detail.distance);
        const co2e = evt.detail.co2e;
        const carbonTotal = this.calculateCO2e(co2e, distance)
        const outputData = {
            co2e: carbonTotal,
            trees: this.calculateTrees(carbonTotal),
            sc: this.calculateSocialCost(carbonTotal)
        }
        console.log(outputData);
        
        PubSub.publish('CarbonCounter:OutputData', outputData);

    })
};

CarbonCounter.prototype.getData = function () {
    this.request.get()
        .then((data) => {
            PubSub.publish('CarbonCounter:DataFound', data);
        })
        .catch(console.error);
};


CarbonCounter.prototype.calculateCO2e = function (co2e, distance, passengers=1) {
    const carbonTotal = co2e * distance / passengers; //kg co2e
    return carbonTotal;
};

CarbonCounter.prototype.calculateTrees = function (carbonTotal) {
    // assumes one tree absorbs 22kg CO2 / year
    const trees = carbonTotal / (22/365); //number of trees in one day to absorb the trip CO2
    
    return Math.round(trees);
};

CarbonCounter.prototype.calculateSocialCost = function (carbonTotal) {
    const socialCost = 0.025 * carbonTotal;
    return Math.round(socialCost * 100) / 100;
};


module.exports = CarbonCounter;
