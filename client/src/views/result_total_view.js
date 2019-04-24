const PubSub = require("../helpers/pub_sub.js");
const content_text = require("../content/result_view_content.js");

const ResultTotalView = function(element) {
  this.element = element;
};

ResultTotalView.prototype.bindEvents = function() {
  PubSub.subscribe("CarbonCounter:OutputData", evt => {
    this.element.innerHTML = "";
    this.renderHexagon("co2-result", `${evt.detail.co2e}kg`, content_text.co2e);
    this.renderHexagon(
      "tree-result",
      `${evt.detail.trees} trees`,
      content_text.trees
    );
    this.renderHexagon("sc-result", `£ ${evt.detail.sc}`, content_text.sc);
  });
};

ResultTotalView.prototype.renderHexagon = function(divId, text, object) {
  const containerDiv = document.createElement("div");

  containerDiv.innerHTML = `
    <div class="info-card">
      <image src=${object.url} alt="background image">
      <h2>${text}</h2>
      <p>${object.subtext}</p>
    </div>
    <p>${object.paragraph}</p>
  `;

  this.element.appendChild(containerDiv);
};

module.exports = ResultTotalView;
