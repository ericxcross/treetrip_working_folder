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
    let treesChangeAdditional = [];
    let treesChangeLess = [];
    alternativesData.forEach(type => {
      transportTypes.push(type.name);
      if (type.treesChange > 0) {
        treesChangeAdditional.push(type.treesChange);
        treesChangeLess.push(0);
      } else {
        treesChangeAdditional.push(0);
        treesChangeLess.push(type.treesChange);
      }
    });

    const seriesData = [
      {
        name: "Less trees required",
        data: treesChangeLess
      },
      {
        name: "Additional trees required",
        data: treesChangeAdditional
      }
    ];

    // Highcharts.chart('alternatives', {
    //     chart: {
    //         type: 'bar'
    //     },
    //     title: {
    //         text: 'Transport Alternatives'
    //     },
    //     xAxis: {
    //         categories: transportTypes
    //     },
    //     yAxis: {
    //         title: {
    //             text: 'Difference in Trees'
    //         }
    //     },
    //     series: seriesData

    // });

    // Data gathered from http://populationpyramid.net/germany/2015/

    Highcharts.chart("alternatives", {
      chart: {
        type: "bar"
      },
      title: {
        text: "Transport Alternatives"
      },
      subtitle: {
        text: "Showing the difference in trees required to absorb the trip CO2 in 1 day"
      },
      xAxis: [
        {
          categories: transportTypes,
          reversed: false,
          labels: {
            step: 1
          }
        },
        {
          // mirror axis on right side
          opposite: true,
          reversed: false,
          categories: transportTypes,
          linkedTo: 0,
          labels: {
            step: 1
          }
        }
      ],
      yAxis: {
        title: {
          text: "Difference in Trees"
        }
      },

      plotOptions: {
        series: {
          stacking: "normal"
        }
      },

      tooltip: {
          formatter: function () {
              return '<b>' + this.point.category + '</b><br/>' +
                  'Tree Difference: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
          }
      },

      series: seriesData
    });
  });
};

module.exports = ResultAlternativeView;
