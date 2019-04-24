const PubSub = require("../helpers/pub_sub.js");

const SummaryView = function (element) {
  this.element = element;
  this.innerElement = null;
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
    this.innerElement = document.createElement("div");
    this.innerElement.id = "inner-element-summary";
    this.element.appendChild(this.innerElement);
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
    this.element.scrollIntoView();
  });

  PubSub.subscribe("ClearElement", evt=>{
    this.element.innerHTML = '';
  });
};

SummaryView.prototype.renderHeader = function (val) {
  this.secondaryElement = document.createElement("div");
  this.secondaryElement.classList.add("terrain");
  this.secondaryElement.innerHTML = `
  <h2>${val} Transport</h2>
  `;
  this.innerElement.appendChild(this.secondaryElement);
};

SummaryView.prototype.renderItem = function (key, val) {
  const textcontainer = document.createElement("h3");
  textcontainer.classList.add("sub-category");
  textcontainer.textContent = `${key}: ${val}`;
  this.secondaryElement.appendChild(textcontainer);
};

SummaryView.prototype.renderDistance = function (val) {
  const containerDiv = document.createElement("div");
  containerDiv.classList.add("distance-category");
  containerDiv.innerHTML = `
  <h1>${val}km</h1>
  `;
  this.innerElement.appendChild(containerDiv);
};

const textParse = function(text){
  return (typeof text === 'string' || text instanceof String) ? text.split("_").join(" ") : text.toString()
}

module.exports = SummaryView;
