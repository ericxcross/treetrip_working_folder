const PubSub = require("../helpers/pub_sub.js");

const SummaryView = function(element) {
  this.element = element;
};

SummaryView.prototype.bindEvents = function () {
  PubSub.subscribe('FormView:TripDetails', evt => {
    console.dir(evt.detail);
  });
};

SummaryView.prototype.bindEvents = function () {
  
};

module.exports = SummaryView;
