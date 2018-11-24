/* eslint-disable no-unused-vars */
/* eslint-disable valid-jsdoc */
/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */
/* eslint arrow-body-style: ["error", "always"] */
/* eslint-env es6 */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint linebreak-style: ["error", "windows"] */

class Employees {
  constructor() {
    this.nationalities = 'AU,GB,IE,NZ,US';
    this.fields = 'name,location,email,dob,picture,phone,nat';
  }

  /**
  * Fetching data from the API with async method
  * More info about async/await: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
  **/
  async getEmployees(numberOfEmpl) {
    const url = `https://randomuser.me/api/?results=${numberOfEmpl}&nat=${this.nationalities}&inc=${this.fields}`;
    this.employees = [];
    try {
      const data = await fetch(url);
      const result = await data.json();
      result.results.forEach((empl, index) => {
        empl.selected = false;
        empl.divId = index;
        this.employees.push(empl);
      });
      return this.employees;
    } catch (err) {
      console.error(err);
    }
  }

  // This methode handles the search
  searching(searchingFor, searchIn) {
    searchIn.forEach((employee) => {
      if (employee.name.first.includes(searchingFor)) {
        ui.cards[employee.divId].style.display = '';
      } else if (employee.name.last.includes(searchingFor)) {
        ui.cards[employee.divId].style.display = '';
      } else {
        ui.cards[employee.divId].style.display = 'none';
      }
    });
  };

  setSelected(dataStorage, id) {
    dataStorage[id].selected = true;
    counter = id;
  };
}
