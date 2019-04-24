const PubSub = require("../helpers/pub_sub.js");

const ResultAlternativeView = function(container) {
  this.container = container;
};

ResultAlternativeView.prototype.bindEvents = function() {
  PubSub.subscribe("CarbonCounter:AlternativeTravelOptions", evt => {
    this.container.innerHTML = "";

    const subDiv = document.createElement('div');
    subDiv.id = 'subdiv-alternatives';
    this.container.appendChild(subDiv);

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
    let treesChangeLessPositive = treesChangeLess.map(value => -value);
    let allTreesChangeItems = treesChangeAdditional.concat(treesChangeLessPositive);
    let maxNumberOfTrees = Math.max( ...allTreesChangeItems );

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

    Highcharts.chart("subdiv-alternatives", {
      chart: {
        type: "bar"
      },
      title: {
        text: "Alternate Transport Options"
      },
      subtitle: {
        text: "How many trees could you save by using alternative transport methods?"
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
          text: "Tree Difference"
        },
        max: maxNumberOfTrees,
        min: -maxNumberOfTrees
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

  PubSub.subscribe("ClearElement", evt=>{
    this.container.innerHTML = '';
  });
};

module.exports = ResultAlternativeView;
