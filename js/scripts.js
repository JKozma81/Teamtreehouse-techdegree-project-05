/* eslint-disable valid-jsdoc */
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

let counter = 0;

// As DOM Content loaded, JavaScript operation allowed
document.addEventListener('DOMContentLoaded', () => {
  /**
  * Formatted url for the API call
  * See documentation for more info: https://randomuser.me/documentation
  **/
  const url = 'https://randomuser.me/api/?results=12&nat=AU,GB,IE,NZ,US&inc=name,location,email,dob,picture,phone,nat';
  const employees = []; // This array is represented as dataStorage in the codes below

  fetchData(url, employees);
});

/**
* Fetching data from the API with async function
* More info about async/await: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 **/
const fetchData = async (url, dataStorage) => {
  try {
    const rawData = await fetch(url);
    const data = await rawData.json();

    await data.results.forEach((element) => {
      dataStorage.push(element);
    });

    createSearchBox();
    createCards(dataStorage);
    createModal(dataStorage);

    // Adding event listeners for search functionality
    document.querySelector('.search-input').addEventListener('keyup', () => {
      const searchFor = document.querySelector('.search-input').value.toLowerCase();
      if (searchFor === '') {
        searching(dataStorage);
      }
    });
    document.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      searching(dataStorage);
    });

    addEventListeners(dataStorage);
  } catch (err) {
    console.error(err);
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
const createModal = (dataStorage) => {
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
};

// This function is displaying the modal with the appropriate data
const showModal = (selectedEmployeeData, dataStorage) => {
  const modal = document.querySelector('.modal-container');
  const next = document.querySelector('#modal-next');
  const prev = document.querySelector('#modal-prev');
  modal.style.display = 'block';

  if (counter === dataStorage.length - 1) {
    next.style.display = 'none';
    prev.style.display = '';
  } else if (counter === 0) {
    prev.style.display = 'none';
    next.style.display = '';
  } else {
    prev.style.display = '';
    next.style.display = '';
  }
  getSellectedData(selectedEmployeeData);
};

// This function hides the modal
const hideModal = (dataStorage) => {
  dataStorage.forEach((employee) => employee.selected = false);
  counter = 0;
  const modal = document.querySelector('.modal-container');
  modal.style.display = 'none';
};

// This function creates the employee cards and appends them to the page
const createCards = (dataStorage) => {
  dataStorage.forEach((employee, index) => {
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

// This function handles the employee carousel on the modal
const showNextCard = (target, dataStorage) => {
  if (target.id === 'modal-next') {
    counter++;
    if (counter >= dataStorage.length - 1) {
      target.style.display = 'none';
    } else {
      target.previousElementSibling.style.display = '';
    }
    getSellectedData(dataStorage[counter]);
  } else if (target.id === 'modal-prev') {
    counter--;
    if (counter <= 0) {
      target.style.display = 'none';
    } else {
      target.nextElementSibling.style.display = '';
    }
    getSellectedData(dataStorage[counter]);
  }
};

// This function is the search event handler
const searching = (dataStorage) => {
  const searchFor = document.querySelector('.search-input').value.toLowerCase();
  const cards = document.querySelectorAll('.card');
  dataStorage.forEach((employee) => {
    if (employee.name.first.includes(searchFor)) {
      cards[dataStorage.indexOf(employee)].style.display = '';
    } else if (employee.name.last.includes(searchFor)) {
      cards[dataStorage.indexOf(employee)].style.display = '';
    } else {
      cards[dataStorage.indexOf(employee)].style.display = 'none';
    }
  });
};

// This function is providing data for the modal and showing it on it
const getSellectedData = (selectedEmployeeData) => {
  const nodes = document.querySelector('.modal-info-container').children;

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

// Setting the provided employee status to selected
const setSelected = (dataStorage, id) => {
  dataStorage[id].selected = true;
  counter = id;
};

const addEventListeners = (dataStorage) => {
  const cards = document.querySelectorAll('.card');
  // Adding event listener to the cards
  cards.forEach((card) => {
    card.addEventListener('click', (event) => {
      // Getting the id from the target div and setting the employees arrays
      // element on the position of the id to selected
      if (event.target.tagName === 'DIV' && event.target.className === 'card') {
        const index = parseInt(event.target.id);
        setSelected(dataStorage, index);
      } else if (event.target.tagName === 'DIV' && event.target.className !== 'card') {
        const index = parseInt(event.target.parentNode.id);
        setSelected(dataStorage, index);
      } else {
        const index = parseInt(event.target.parentNode.parentNode.id);
        setSelected(dataStorage, index);
      }
      // Getting the selected employee and passing it to the showmodal function
      const selected = dataStorage.filter((employee) => employee.selected === true);
      showModal(selected[0], dataStorage);
    });
  });

  document.querySelector('.modal-close-btn').addEventListener('click', () => {
    hideModal(dataStorage);
  });
  document.querySelector('#modal-prev').addEventListener('click', (event) => {
    showNextCard(event.target, dataStorage);
  });
  document.querySelector('#modal-next').addEventListener('click', (event) => {
    showNextCard(event.target, dataStorage);
  });
};

