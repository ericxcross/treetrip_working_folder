const PubSub = require("../helpers/pub_sub.js");
const RequestHelper = require("../helpers/request_helper.js");

const ResultAlternativeView = function (container) {
    this.container = container;
};

ResultAlternativeView.prototype.bindEvents = function () {

PubSub.subscribe("CarbonCounter:AlternativeTravelOptions", (evt) => {
    this.container.innerHTML = "";
    // separate incoming data
    const alternativesData = evt.detail;
    let transportTypes = [];
    let treesChange = [];
    alternativesData.forEach((type) => {
        transportTypes.push(type.name);
        treesChange.push(type.treesChange);
    });
    const seriesData = [{
        name: 'Trees',
        data: treesChange
    }]
    // let index = 0;
    // let seriesArray = [];

    // transportTypes.forEach((name) => {
    //     let co2ediff = co2Change[index];
    //     let object = {
    //         name: 'CO2e',
    //         co2e: [co2ediff]
    //     };
    //     seriesArray.push(object);
    //     index += 1;
    // })
    // renders bar chart with incoming data
    // console.log(seriesArray);




    var myChart = Highcharts.chart('alternatives', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Transport Alternatives'
        },
        xAxis: {
            categories: transportTypes
        },
        yAxis: {
            title: {
                text: 'Difference in Trees'
            }
        },
        series: seriesData
    });
});

// document.addEventListener('DOMContentLoaded', function () {
//     var myChart = Highcharts.chart('container', {
//         chart: {
//             type: 'bar'
//         },
//         title: {
//             text: 'Fruit Consumption'
//         },
//         xAxis: {
//             categories: ['Apples', 'Bananas', 'Oranges']
//         },
//         yAxis: {
//             title: {
//                 text: 'Fruit eaten'
//             }
//         },
//         series: [{
//             name: 'Jane',
//             data: [1, 0, 4]
//         }, {
//             name: 'John',
//             data: [5, 7, 3]
//         }]
//     });
// });



};


module.exports = ResultAlternativeView;