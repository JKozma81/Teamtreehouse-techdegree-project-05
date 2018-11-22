/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */
/* eslint arrow-body-style: ["error", "always"] */
/* eslint-env es6 */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint linebreak-style: ["error", "windows"] */

const searchContainer = document.querySelector('.search-container');
const galleryContainer = document.querySelector('.gallery');
const body = document.querySelector('body');

const employees = [];
let selected = [];
let counter = 0;

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
  * Image, Name, Email, City or location, Cell Number,
  * Detailed Address, including street name and number, state or country, and post code.
  * Birthday
  **/
  const url = 'https://randomuser.me/api/?results=12&nat=AU,GB,IE,NZ,US&inc=name,location,email,dob,picture,phone,nat';

  try {
    const rawData = await fetch(url);
    const data = await rawData.json();

    await data.results.forEach((element) => {
      employees.push(element);
    });

    createSearchBox();
    createCards();
    createModal();

    // Adding event listeners for search functionality
    document.querySelector('.search-input').addEventListener('keyup', searching);
    document.querySelector('.search-submit').addEventListener('click', searching);

    const cards = document.querySelectorAll('.card');
    // Adding event listener to the cards
    cards.forEach((card) => {
      card.addEventListener('click', (event) => {
        // Getting the id from the target div and setting the employees arrays
        // element on the position of the id selected property to true
        if (event.target.tagName === 'DIV' && event.target.className === 'card') {
          const index = parseInt(event.target.id);
          employees[index].selected = true;
          counter = index;
        } else if (event.target.tagName === 'DIV' && event.target.className !== 'card') {
          const index = parseInt(event.target.parentNode.id);
          employees[index].selected = true;
          counter = index;
        } else {
          const index = parseInt(event.target.parentNode.parentNode.id);
          employees[index].selected = true;
          counter = index;
        }
        // Getting the selected employee and passing it to the showmodal function
        selected = employees.filter((employee) => employee.selected === true);
        showModal(selected[0]);
      });
    });
  } catch (err) {
    console.log(err);
  }
};

// This function creates and appends the search form to the page
const createSearchBox = () => {
  const searchForm = document.createElement('form');
  const searchField = document.createElement('input');

  // Search form
  searchForm.action = '#';
  searchForm.method = 'get';

  // Search field
  searchField.type = 'search';
  searchField.id = 'search-input';
  searchField.className = 'search-input';
  searchField.placeholder = 'Search...';

  // Search button
  const searchButton = '<input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">';

  searchContainer.appendChild(searchForm);
  searchForm.appendChild(searchField);
  searchForm.innerHTML += searchButton;
};

// This function creates the modal and atteches event listeners to the buttons
const createModal = () => {
  const modalMarkup = `
  <div class="modal-container">
    <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
        <h3 id="name" class="modal-name cap">name</h3>
        <p class="modal-text">email</p>
        <p class="modal-text cap">city</p>
        <hr>
        <p class="modal-text">(555) 555-5555</p>
        <p class="modal-text cap">123 Portland Ave., Portland, OR 97204</p>
        <p class="modal-text">Birthday: 10/21/2015</p>
      </div>
    </div>
    <div class="modal-btn-container">
      <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
      <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
  </div>`;
  body.innerHTML += modalMarkup;
  document.querySelector('.modal-close-btn').addEventListener('click', hideModal);
  document.querySelector('#modal-prev').addEventListener('click', (event) => {
    showNextCard(event.target);
  });
  document.querySelector('#modal-next').addEventListener('click', (event) => {
    showNextCard(event.target);
  });
};

// This function creates the employee cards and appends them to the page
const createCards = () => {
  employees.forEach((employee, index) => {
    const firstName = employee.name.first;
    const lastName = employee.name.last;
    const image = employee.picture.medium;
    const city = employee.location.city;
    const state = employee.location.state;
    employee.selected = false;
    const card = `
              <div class="card" id=${index}>
                <div class="card-img-container">
                  <img class="card-img" src=${image} alt="profile picture">
                </div>
                <div class="card-info-container">
                  <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
                  <p class="card-text">${employee.email}</p>
                  <p class="card-text cap">${city}, ${state}</p>
                </div>
              </div>`;
    galleryContainer.innerHTML += card;
  });
};

// This function is the search event handler
const searching = () => {
  const searchFor = document.querySelector('.search-input').value.toLowerCase();
  const cards = document.querySelectorAll('.card');
  employees.forEach((employee) => {
    if (employee.name.first.includes(searchFor)) {
      cards[employees.indexOf(employee)].style.display = '';
    } else if (employee.name.last.includes(searchFor)) {
      cards[employees.indexOf(employee)].style.display = '';
    } else {
      cards[employees.indexOf(employee)].style.display = 'none';
    }
  });
};

// This function is providing data for the modal and showing it on it
const getSellectedData = (target) => {
  const nodes = document.querySelector('.modal-info-container').children;

  const firstName = target.name.first;
  const lastName = target.name.last;
  const image = target.picture.large;
  const city = target.location.city;
  const state = target.location.state;
  const dob = target.dob.date;
  const email = target.email;
  const phone = target.phone;
  const nat = target.nat;
  const street = target.location.street;
  const postCode = target.location.postcode;

  nodes[0].src = image;
  nodes[1].textContent = `${firstName} ${lastName}`;
  nodes[2].textContent = `${email}`;
  nodes[3].textContent = `${city}`;
  nodes[5].textContent = `${phone}`;
  nodes[6].textContent = `${street}, ${state}, ${nat}, ${postCode}`;
  nodes[7].textContent = new Date(dob).toLocaleString('en-US').split(',')[0];
};

// This function is displaying the modal and the appropriate data
const showModal = (target) => {
  const modal = document.querySelector('.modal-container');
  const next = document.querySelector('#modal-next');
  const prev = document.querySelector('#modal-prev');
  modal.style.display = 'block';

  if (counter === employees.length - 1) {
    next.style.display = 'none';
    prev.style.display = '';
  } else if (counter === 0) {
    prev.style.display = 'none';
    next.style.display = '';
  } else {
    prev.style.display = '';
    next.style.display = '';
  }
  getSellectedData(target);
};

// This function hides the modal
const hideModal = () => {
  employees.forEach((employee) => employee.selected = false);
  counter = 0;
  const modal = document.querySelector('.modal-container');
  modal.style.display = 'none';
};

// This function handles the employee carousel on the modal
const showNextCard = (target) => {
  if (target.id === 'modal-next') {
    counter++;

    if (counter >= employees.length - 1) {
      target.style.display = 'none';
    } else {
      target.previousElementSibling.style.display = '';
    }
    getSellectedData(employees[counter]);
  } else if (target.id === 'modal-prev') {
    counter--;

    if (counter <= 0) {
      target.style.display = 'none';
    } else {
      target.nextElementSibling.style.display = '';
    }
    getSellectedData(employees[counter]);
  }
};
