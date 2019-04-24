const PubSub = require("../helpers/pub_sub.js");

const SummaryView = function (element) {
  this.element = element;
};

SummaryView.prototype.bindEvents = function () {
  PubSub.subscribe('FormView:TripDetails', evt => {
    console.dir(evt.detail);
    const obj = evt.detail;
    delete obj.co2e;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const val = obj[key];
        if (key === 'Terrain') {
          this.renderHeader(val)
        } else if (key === 'distance') {
          this.renderDistance(val)
        } else {
          this.renderItem(key, val);
        }

      }
    }
  });
};

SummaryView.prototype.renderHeader = function (val) {
  
};

SummaryView.prototype.renderItem = function (key, val) {

};

SummaryView.prototype.renderDistance = function (val) {

};

module.exports = SummaryView;