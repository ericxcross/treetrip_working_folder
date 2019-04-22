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

  let idNum = 0;

  const action = (filteredData) => {
    idNum ++;
    if (filteredData.type !== undefined) {
      const newSelect = this.createSelect( filteredData, idNum );
      newSelect.addEventListener("change", evt => {
        console.dir(evt);
        console.log(evt.target.classList[0].slice(7))
        const selectIdNum = parseInt(evt.target.classList[0].slice(7));
        if (idNum > selectIdNum){
          for (var i = selectIdNum; i < idNum; i++) {
            const redundantSelect = document.querySelector(`.select-${i+1}`);
            if (redundantSelect !== null){
              delete this.currentItems[redundantSelect.id];
              redundantSelect.remove();
            }
          }
          idNum = selectIdNum;
        }
        console.log(evt.target.value);
        const selectedData = JSON.parse(evt.target.value);
        this.currentItems[filteredData.typename] = selectedData.name;
        this.currentItems.co2e = selectedData.co2e;
        action(selectedData);
      });
    }else{
      this.createDistanceInput(idNum);
      idNum++;
      const submit = this.createSubmit(idNum);

      submit.addEventListener("click", evt => {
        this.handleSubmit(evt);
      })

    }
  };

  action(formData[0]);
};

FormView.prototype.createSelect = function(formData, idNum) {
  console.log(formData);

  //CREATE FIELDSET
  const fieldset = document.createElement("fieldset");
  fieldset.classList.add(`select-${idNum}`);
  fieldset.classList.add(`selectdiv`);
  fieldset.id = formData.typename;

  //DIV TITLE
  const h2 = document.createElement('h2');
  h2.innerHTML = formData.typename.split("-").join(" ");
  fieldset.appendChild(h2);

  //CREATE RADIO BUTTONS FOR EACH ITEM
  formData.type.forEach((item) => {
    //DIV CONTAINER WITH CONTAINING RADIO BUTTON AND LABELS
    const radioDiv = document.createElement("radioDiv")

    radioDiv.innerHTML = `
      <image src = ${item.image} class = "select-image">
      <label for = ${item.name}>${item.name}</label>
    `;
    //<input type = "radio" id = ${item.name} class="select-${idNum}" name = ${formData.typename} value = ${itemJson}>
    const input = document.createElement("input");
    input.type = "radio";
    input.id = item.name;
    input.classList.add(`select-${idNum}`);
    input.name = formData.typename;
    input.value = JSON.stringify(item);

    radioDiv.appendChild(input);
    fieldset.appendChild(radioDiv);
  });

  this.form.appendChild(fieldset);

  return fieldset;
};

FormView.prototype.createDistanceInput = function(idNum) {
  const inputDiv = document.createElement('div');
  inputDiv.classList.add(`select-${idNum}`);
  inputDiv.id = "distance"

  const inputLabel = document.createElement("label");
  inputLabel.for = "distance";
  inputLabel.innerHTML = 'Distance Travelled';

  const distanceInput = document.createElement("input");
  distanceInput.type = "number";
  distanceInput.name = "distance";
  distanceInput.min = 0;
  distanceInput.step = 1;
  distanceInput.classList.add(`select-${idNum}`);

  inputDiv.appendChild(inputLabel);
  inputDiv.appendChild(distanceInput);

  this.form.appendChild(inputDiv);

  return distanceInput;
};

FormView.prototype.createSubmit = function(idNum) {
  const submit = document.createElement("input");
  submit.type = "submit";
  submit.name = "Calculate";
  submit.classList.add(`select-${idNum}`);
  this.form.appendChild(submit)
  return submit;
};

FormView.prototype.handleSubmit = function(evt) {
  evt.preventDefault();
  this.currentItems['distance'] = evt.target.form.distance.value;
  PubSub.publish('FormView:TripDetails', this.currentItems);
};

module.exports = FormView;
