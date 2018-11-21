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

    document.querySelector('.search-input').addEventListener('keyup', searching);
    document.querySelector('.search-submit').addEventListener('click', searching);
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

// This function creates the modal
const createModal = () => {
  const modal = document.createElement('div');
  modal.className = 'modal-container';
  body.appendChild(modal);
  const modalMarkup = `
    <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
        <h3 id="name" class="modal-name cap">name</h3>
        <p class="modal-text">email</p>
        <p class="modal-text cap">city</p>
        <hr>
        <p class="modal-text">(555) 555-5555</p>
        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
        <p class="modal-text">Birthday: 10/21/2015</p>
      </div>
    </div>
    <div class="modal-btn-container">
      <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
      <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>`;
  modal.innerHTML += modalMarkup;
  document.querySelector('.modal-close-btn').addEventListener('click', hideModal);
};

// This function creates the employee cards and appends them to the page
const createCards = () => {
  employees.forEach((employee) => {
    const firstName = employee.name.first;
    const lastName = employee.name.last;
    const image = employee.picture.medium;
    const city = employee.location.city;
    const state = employee.location.state;
    employee.selected = false;
    const card = `
              <div class="card">
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
    const cards = document.querySelectorAll('.card');

    // Adding event listener to the cards
    cards.forEach((card) => {
      card.addEventListener('click', (event) => {
        createModal();
        console.log(event.target);
      });
    });
  });
};

// This function is the search event handler
const searching = () => {
  const searchFor = document.querySelector('.search-input').value;
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

const hideModal = () => {
  employees.map((employee) => employee.selected = false);
  const modal = document.querySelector('.modal-container');
  const modalChilds = modal.childNodes;
  console.log(modalChilds);
  modalChilds.forEach((child) => child.remove());
};

const showNextCard = (target) => {
  console.log('next');
};

// As DOM Content loaded JavaScript operation allowed
document.addEventListener('DOMContentLoaded', () => {
  fetchData();
  console.log(employees);
});
