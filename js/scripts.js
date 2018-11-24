/* eslint-disable valid-jsdoc */
/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */
/* eslint arrow-body-style: ["error", "always"] */
/* eslint-env es6 */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint linebreak-style: ["error", "windows"] */
const ui = new UI;
const employeesData = new Employees;
const data = [];
let counter = 0;
const employeesNum = 12;

// As DOM Content loaded, JavaScript operation allowed
document.addEventListener('DOMContentLoaded', () => {
  const employees = employeesData.getEmployees(employeesNum);

  employees.then((result) => {
    // Creating page structure
    ui.createSearchBox(ui.searchContainer);
    result.forEach((employee) => {
      ui.createCard(employee, ui.gallery);
      data.push(employee);
    });
    ui.createModal(ui.body);

    // Attaching event listeners
    // KeyUp event listener for search
    ui.searchField.addEventListener('keyup', (event) => {
      searching(event.target.value.toLowerCase());
    });
    // Submit event listener for the search form
    ui.searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      searching(ui.searchField.value.toLowerCase());
    });
    // Card click event listeners for showing the modal and selecting the employee to display
    ui.cards.forEach((card, index) => {
      card.addEventListener('click', () => {
        if (event.target.tagName === 'DIV' && event.target.className === 'card') {
          setSelected(data, index);
        } else if (event.target.tagName === 'DIV' && event.target.className !== 'card') {
          setSelected(data, index);
        } else {
          setSelected(data, index);
        }
        const selected = data.filter((employee) => employee.selected === true);
        updateModal(...selected, ui.modalNodes);
        if (counter === data.length - 1) {
          ui.next.style.display = 'none';
          ui.prev.style.display = '';
        } else if (counter === 0) {
          ui.prev.style.display = 'none';
          ui.next.style.display = '';
        } else {
          ui.prev.style.display = '';
          ui.next.style.display = '';
        }
        ui.showModal();
      });
    });
    // Modal close button click event listener for hiding the modal
    ui.modalCloseBtn.addEventListener('click', () => {
      data.forEach((empl) => empl.selected = false);
      ui.hideModal();
    });
    // Modal next/prev button click event listeners
    ui.next.addEventListener('click', (event) => {
      showNextCard(event.target, data, ui.modalNodes);
    });
    ui.prev.addEventListener('click', (event) => {
      showNextCard(event.target, data, ui.modalNodes);
    });
  });
});

// This function is the search event handler
const searching = (searchingFor) => {
  data.forEach((employee) => {
    if (employee.name.first.includes(searchingFor)) {
      ui.cards[employee.divId].style.display = '';
    } else if (employee.name.last.includes(searchingFor)) {
      ui.cards[employee.divId].style.display = '';
    } else {
      ui.cards[employee.divId].style.display = 'none';
    }
  });
};

// Setting the provided employee status to selected
const setSelected = (dataStorage, id) => {
  dataStorage[id].selected = true;
  counter = id;
};

// This function is providing data for the modal and showing it on it
const updateModal = (selectedEmployeeData, nodes) => {
  const firstName = selectedEmployeeData.name.first;
  const lastName = selectedEmployeeData.name.last;
  const image = selectedEmployeeData.picture.large;
  const city = selectedEmployeeData.location.city;
  const state = selectedEmployeeData.location.state;
  const dob = selectedEmployeeData.dob.date;
  const email = selectedEmployeeData.email;
  const phone = selectedEmployeeData.phone;
  const nat = selectedEmployeeData.nat;
  const street = selectedEmployeeData.location.street;
  const postCode = selectedEmployeeData.location.postcode;

  nodes[0].src = image;
  nodes[1].textContent = `${firstName} ${lastName}`;
  nodes[2].textContent = `${email}`;
  nodes[3].textContent = `${city}`;
  nodes[5].textContent = `${phone}`;
  nodes[6].textContent = `${street}, ${state}, ${nat}, ${postCode}`;
  nodes[7].textContent = new Date(dob).toLocaleString('en-US').split(',')[0];
};

// This function handles the employee carousel on the modal
const showNextCard = (target, dataStorage, nodes) => {
  if (target.id === 'modal-next') {
    counter++;
    if (counter >= dataStorage.length - 1) {
      target.style.display = 'none';
    } else {
      target.previousElementSibling.style.display = '';
    }
    updateModal(dataStorage[counter], nodes);
  } else if (target.id === 'modal-prev') {
    counter--;
    if (counter <= 0) {
      target.style.display = 'none';
    } else {
      target.nextElementSibling.style.display = '';
    }
    updateModal(dataStorage[counter], nodes);
  }
};
