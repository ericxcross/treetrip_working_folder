const PubSub = require("../helpers/pub_sub.js");

const FormView = function(form) {
  this.form = form;
  this.currentItems = {};
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

  let id = 0;
  let idString;

  const action = (filteredData) => {
    id ++;
    if (filteredData.type !== undefined) {
      const newSelect = this.createSelect( filteredData, id );
      newSelect.addEventListener("change", evt => {
        const selectIdNum = parseInt(evt.srcElement.classList[0].slice(7));
        console.log('click');
        console.log(selectIdNum);
        console.log(id);
        if (id > selectIdNum){
          for (var i = selectIdNum; i < id; i++) {
            const redundantSelect = document.querySelector(`.select-${i+1}`);
            if (redundantSelect !== null){redundantSelect.remove()};
          }
          id = selectIdNum;
        }
        const selectedData = JSON.parse(evt.target.value);

        this.currentItems[filteredData.typename] = selectedData.name;
        action(selectedData);
      });
    }else{
      const newDistanceInput = this.createDistanceInput(id)
      this.form.appendChild(newDistanceInput);

      id++;

      const submit = this.createSubmit(id);
      this.form.appendChild(submit);

      submit.addEventListener("click", evt => {
        this.handleSubmit(evt);
      })

    }
  };

  action(formData[0]);
};

FormView.prototype.createSelect = function(formData, idNum) {
  const selectDiv = document.createElement('div');
  selectDiv.classList.add(`select-${idNum}`);

  const selectElement = document.createElement("select");
  selectElement.classList.add(`select-${idNum}`);

  const selectLabel = document.createElement("label");
  selectLabel.for = selectElement.id;
  selectLabel.innerHTML = `${formData.typename}:`;

  const option = document.createElement("option");
  selectElement.appendChild(option);

  formData.type.forEach((item) => {
    const option = document.createElement("option");
    option.value = JSON.stringify(item);
    option.innerHTML = item.name;
    selectElement.appendChild(option);
  });

  selectDiv.appendChild(selectLabel);
  selectDiv.appendChild(selectElement);

  this.form.appendChild(selectDiv);

  return selectElement;
};

FormView.prototype.createDistanceInput = function(idNum) {
  const distanceInput = document.createElement("input");
  distanceInput.type = "number";
  distanceInput.min = 0;
  distanceInput.step = 1;
  distanceInput.value = 0;
  distanceInput.classList.add(`select-${idNum}`);
  return distanceInput;
};

FormView.prototype.createSubmit = function(idNum) {
  const submit = document.createElement("input");
  submit.type = "submit";
  submit.name = "Calculate";
  submit.classList.add(`select-${idNum}`);
  return submit;
};

FormView.prototype.handleSubmit = function(evt) {
  evt.preventDefault();
  console.dir(evt.target);
  PubSub.publish('FormView:TripDetails', this.data);
};

module.exports = FormView;
