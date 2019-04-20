const PubSub = require("../helpers/pub_sub.js");

const FormView = function(form) {
  this.form = form;
};

FormView.prototype.bindEvents = function() {
  this.form.addEventListener("load", evt => {
    PubSub.publish("FormView:RequestData");
  });
  PubSub.subscribe("CarbonCounter:DataFound", evt => {
    form.render(evt.detail);
  });
};

FormView.prototype.render = function(formData) {
  const selectElement = this.createSelect;
  selectElement.addEventListener("change", evt => {});
};

FormView.prototype.createSelect = function(formData) {
  const selectElement = document.createElement("select");
  formData.forEach(item => {
    const option = document.createElement("option");
    option.value = index;
    option.name = item.name;
    selectElement.appendChild(option);
  });
  return selectElement;
};

// FormView.prototype.handleSubmit = function(evt) {
//   evt.preventDefault();
//   PubSub.publish("FormView:form-submitted", evt.target);
// };

module.exports = FormView;
