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
      employeesData.searching(event.target.value.toLowerCase(), data);
    });
    // Submit event listener for the search form
    ui.searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      employeesData.searching(ui.searchField.value.toLowerCase(), data);
    });
    // Card click event listeners for showing the modal and selecting the employee to display
    ui.cards.forEach((card, index) => {
      card.addEventListener('click', (event) => {
        if (event.target.tagName === 'DIV' && event.target.className === 'card') {
          employeesData.setSelected(data, index);
        } else if (event.target.tagName === 'DIV' && event.target.className !== 'card') {
          employeesData.setSelected(data, index);
        } else {
          employeesData.setSelected(data, index);
        }
        const selected = data.filter((employee) => employee.selected === true);
        ui.updateModal(...selected, ui.modalNodes);
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
      ui.showNextCard(event.target, data, ui.modalNodes);
    });
    ui.prev.addEventListener('click', (event) => {
      ui.showNextCard(event.target, data, ui.modalNodes);
    });
  });
});

