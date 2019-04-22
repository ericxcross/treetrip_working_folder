const PubSub = require("../helpers/pub_sub.js");
const RequestHelper = require("../helpers/request_helper.js");

const ResultTotalView = function(element) {
  this.element = element;
};

ResultTotalView.prototype.bindEvents = function() {
  PubSub.subscribe("CarbonCounter:OutputData", evt => {
    this.element.innerHTML = "";
    this.renderCO2e(evt.detail.co2e);
    this.renderTrees(evt.detail.trees);
    this.renderSC(evt.detail.sc);
  });
};

ResultTotalView.prototype.renderCO2e = function(co2e) {
  const co2eDiv = document.createElement("div");
  co2eDiv.id = "co2-result";
  co2eDiv.classList.add(`hexagon`);
  const co2eH2 = document.createElement("h2");
  co2eH2.innerHTML = `${co2e}kg`;
  const co2eP = document.createElement("p");
  co2eP.innerHTML = `of CO<sub>2</sub>e`;

  co2eDiv.appendChild(co2eH2);
  co2eDiv.appendChild(co2eP);
  this.element.appendChild(co2eDiv);
};

ResultTotalView.prototype.renderTrees = function(trees) {
  const treeDiv = document.createElement("div");
  treeDiv.id = "tree-result";
  treeDiv.classList.add(`hexagon`);
  const treeH2 = document.createElement("h2");
  treeH2.innerHTML = `${trees} trees`;
  const treeP = document.createElement("p");
  treeP.innerHTML = "to offset emissions";

  treeDiv.appendChild(treeH2);
  treeDiv.appendChild(treeP);
  this.element.appendChild(treeDiv);
};

ResultTotalView.prototype.renderSC = function(sc) {
  const scDiv = document.createElement("div");
  scDiv.id = "sc-result";
  scDiv.classList.add(`hexagon`);
  const scH2 = document.createElement("h2");
  scH2.innerHTML = `${sc}£`;
  const scP = document.createElement("p");
  scP.innerHTML = `social cost`;

  scDiv.appendChild(scH2);
  scDiv.appendChild(scP);
  this.element.appendChild(scDiv);
};

module.exports = ResultTotalView;
