const PubSub = require("../helpers/pub_sub.js");

const SummaryView = function (element) {
  this.element = element;
  this.secondaryElement = null;
};

SummaryView.prototype.bindEvents = function () {
  PubSub.subscribe('FormView:TripDetails', evt => {
    this.element.innerHTML = ``;
    console.dir(evt.detail);
    const obj = {...evt.detail};
    const distance = evt.detail.distance;
    delete obj.co2e;
    delete obj.distance;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const val = textParse(obj[key]);
        const keyParsed = textParse(key);
        if (key === 'Terrain') {
          this.renderHeader(val);
        } else {
          this.renderItem(keyParsed, val);
        }
      }
    }
    this.renderDistance(distance);
    this.element.scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'center'});
  });

};

SummaryView.prototype.renderHeader = function (val) {
  this.secondaryElement = document.createElement("div");
  this.secondaryElement.classList.add("terrain");
  this.secondaryElement.innerHTML = `
  <h2>${val} Transport</h2>
  `;
  this.element.appendChild(this.secondaryElement);
};

SummaryView.prototype.renderItem = function (key, val) {
  const containerDiv = document.createElement("div");
  containerDiv.classList.add("sub-category");
  containerDiv.innerHTML = `
  <h3>${key}: ${val}</h3>
  `;
  this.secondaryElement.appendChild(containerDiv);
};

SummaryView.prototype.renderDistance = function (val) {
  const containerDiv = document.createElement("div");
  containerDiv.classList.add("distance-category");
  containerDiv.innerHTML = `
  <h3>Distance: ${val} km</h3>
  `;
  this.element.appendChild(containerDiv);
};

const textParse = function(text){
  return (typeof text === 'string' || text instanceof String) ? text.split("_").join(" ") : text.toString()
}

module.exports = SummaryView;