/* eslint-disable arrow-body-style */
/* eslint arrow-body-style: ["error", "always"] */
/* eslint-env es6 */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint linebreak-style: ["error", "windows"]*/

const employees = [];

// As DOM Content loaded JavaScript operation allowed
document.addEventListener('DOMContentLoaded', () => {
  fetchData();
  console.log(employees);
});

/**
* Fetching data from the API with async function
* More info about async/await: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
**/
const fetchData = async () => {
  /**
  * Formatted url for the API call
  * See documentation for more info: https://randomuser.me/documentation
  * Required info:
  * Image
  * Name
  * Email
  * City or location
  * Cell Number
  * Detailed Address, including street name and number, state or country, and post code.
  * Birthday
  **/
  const url = 'https://randomuser.me/api/?results=12&nat=AU,CA,FI,GB,IE,NZ,US&inc=name,location,email,dob,picture,phone,nat';

  try {
    const rawData = await fetch(url);
    const data = await rawData.json();

    await data.results.forEach((element) => {
      employees.push(element);
    });
  } catch (err) {
    console.log(err);
  }
};
