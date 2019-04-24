const PubSub = require("../helpers/pub_sub.js");

const SummaryView = function (element) {
  this.element = element;
  this.secondaryElement = null;
};

SummaryView.prototype.bindEvents = function () {
  PubSub.subscribe('FormView:TripDetails', evt => {
    console.dir(evt.detail);
    const obj = evt.detail;
    const distance = evt.detail.distance;
    delete obj.co2e;
    delete obj.distance;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const val = obj[key];
        if (key === 'Terrain') {
          this.renderHeader(val)
        } else {
          this.renderItem(key, val);
        }

      }
    }
    this.renderDistance(distance);
  });
};

SummaryView.prototype.renderHeader = function (val) {
  this.secondaryElement = document.createElement("div");
  this.secondaryElement.classList.add("terrain");
  this.secondaryElement.innerHTML = `
  <h2>Travelling over: ${val}</h2>
  `;
  this.element.appendChild(this.secondaryElement);
};

SummaryView.prototype.renderItem = function (key, val) {
  const containerDiv = document.createElement("div");
  containerDiv.classList.add("terrain");
  containerDiv.innerHTML = `
  <h4>${key}: ${val}</h4>
  `;
  this.secondaryElement.appendChild(containerDiv);
};

SummaryView.prototype.renderDistance = function (val) {

};

module.exports = SummaryView;