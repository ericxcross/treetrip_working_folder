const PubSub = require("../helpers/pub_sub.js");
const RequestHelper = require("../helpers/request_helper.js");

const ResultAlternativeView = function(container) {
  this.container = container;
};

ResultAlternativeView.prototype.bindEvents = function() {
  PubSub.subscribe("CarbonCounter:AlternativeTravelOptions", evt => {
    this.container.innerHTML = "";
    // separate incoming data
    const alternativesData = evt.detail;
    let transportTypes = [];
    let treesChange = [];
    alternativesData.forEach(type => {
      transportTypes.push(type.name);
      treesChange.push(type.treesChange);
    });
    const seriesData = [
      {
        name: "Trees",
        data: treesChange
      }
    ];
    var myChart = Highcharts.chart("alternatives", {
      chart: {
        type: "bar"
      },
      title: {
        text: "Transport Alternatives"
      },
      xAxis: {
        categories: transportTypes
      },
      yAxis: {
        title: {
          text: "Difference in Trees"
        }
      },
      series: seriesData
    });
  });
};

module.exports = ResultAlternativeView;
