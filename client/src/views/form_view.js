const PubSub = require("../helpers/pub_sub.js");

const FormView = function(form) {
  this.form = form;
};

FormView.prototype.bindEvents = function() {
  this.form.addEventListener("load", evt => {
    PubSub.publish("FormView:RequestData");
  });
  PubSub.subscribe("CarbonCounter:DataFound", evt => {
    this.render(evt.detail);
  });
};

FormView.prototype.render = function(formData) {
  this.form.innerHTML = "";

  const selectElement = this.createSelect(formData, "las");
  this.form.appendChild(selectElement);

  selectElement.addEventListener("change", evt => {
    const action = filteredData => {
      if (filteredData.type !== undefined) {
        const newSelect = this.createSelect(filteredData.type);
        this.form.appendChild(newSelect);
        newSelect.addEventListener("change", evt => {
          action(filteredData.type[evt.target.value]).reset();
        });
      } else {
      }
    };
    action(formData[evt.target.value]);
  });
};

FormView.prototype.createSelect = function(formData, id) {
  const selectElement = document.createElement("select");
  selectElement.id = id;

  const option = document.createElement("option");
  selectElement.appendChild(option);

  formData.forEach((item, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.innerHTML = item.name;
    selectElement.appendChild(option);
  });

  return selectElement;
};

// FormView.prototype.handleSubmit = function(evt) {
//   evt.preventDefault();
//   PubSub.publish("FormView:form-submitted", evt.target);
// };

module.exports = FormView;
