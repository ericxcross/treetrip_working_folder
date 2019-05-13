const PubSub = require("../helpers/pub_sub.js");
const content_text = require("../content/result_view_content.js");

const ResultTotalView = function(element) {
  this.element = element;
};

ResultTotalView.prototype.bindEvents = function() {
  PubSub.subscribe("CarbonCounter:OutputData", evt => {
    this.element.innerHTML = "";
    this.renderHexagon("co2-result", `${evt.detail.co2e}kg`, content_text.co2e);
    this.renderHexagon("tree-result",`${evt.detail.trees}`, content_text.trees);
    this.renderHexagon("sc-result", `£ ${evt.detail.sc}`, content_text.sc);
  });

  PubSub.subscribe("ClearElement", evt=>{
    this.element.innerHTML = '';
  });
};

ResultTotalView.prototype.renderHexagon = function(divId, text, object) {
  const containerDiv = document.createElement("div");
  containerDiv.id = divId;
  containerDiv.classList.add("hexagon");

  containerDiv.innerHTML = `
    <div class="info-card" style="background-image: url(${object.url})">
      <h2>${text}</h2>
    </div>
    <h3>${object.subtext}</h3>
    <p>${object.paragraph}</p>
  `;

  this.element.appendChild(containerDiv);
};

module.exports = ResultTotalView;
