const PubSub = require("../helpers/pub_sub.js");

const ResultTotalView = function(element) {
  this.element = element;
};

ResultTotalView.prototype.bindEvents = function() {
  PubSub.subscribe("CarbonCounter:OutputData", evt => {
    this.element.innerHTML = "";
    this.renderHexagon(
      "co2-result",
      `${evt.detail.co2e}kg`,
      `of CO<sub>2</sub>e`
    );
    this.renderHexagon(
      "tree-result",
      `${evt.detail.trees} trees`,
      "to offset emissions"
    );
    this.renderHexagon("sc-result", `£ ${evt.detail.sc}`, "social cost");
  });
};

ResultTotalView.prototype.renderHexagon = function(divId, text, subtext) {
  const containerDiv = document.createElement("div");
  containerDiv.id = divId;
  containerDiv.classList.add(`hexagon`);
  const header = document.createElement("h2");
  header.innerHTML = text;
  const paragraph = document.createElement("p");
  paragraph.innerHTML = subtext;

  containerDiv.appendChild(header);
  containerDiv.appendChild(paragraph);
  this.element.appendChild(containerDiv);
};

module.exports = ResultTotalView;
