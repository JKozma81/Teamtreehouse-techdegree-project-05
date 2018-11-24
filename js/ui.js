/* eslint-disable no-unused-vars */
/* eslint-disable valid-jsdoc */
/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */
/* eslint arrow-body-style: ["error", "always"] */
/* eslint-env es6 */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint linebreak-style: ["error", "windows"] */

class UI {
  constructor() {
    this.gallery = document.querySelector('.gallery');
    this.body = document.querySelector('body');
    this.searchContainer = document.querySelector('.search-container');
    this.cards = [];
  }

  // Method for creating the search box
  createSearchBox(target) {
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
    target.appendChild(searchForm);
    searchForm.appendChild(searchField);
    searchForm.innerHTML += searchButton;
    this.searchForm = document.querySelector('form');
    this.searchField = document.querySelector('.search-input');
    this.searchButton = document.querySelector('.search-submit');
  }

  // Method for the employee cards
  createCard(employee, target) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
                <div class="card-img-container">
                  <img class="card-img" src=${employee.picture.medium} alt="profile picture">
                </div>
                <div class="card-info-container">
                  <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                  <p class="card-text">${employee.email}</p>
                  <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
                </div>`;
    target.appendChild(card);
    this.cards.push(card);
  }

  // Methode for creating the modal
  createModal(target) {
    const modal = document.createElement('div');
    modal.className = 'modal-container';
    modal.innerHTML = `
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
      </div>`;
    target.appendChild(modal);
    this.modal = document.querySelector('.modal-container');
    this.modalCloseBtn = document.querySelector('.modal-close-btn');
    this.modalNodes = document.querySelector('.modal .modal-info-container').children;
    this.next = document.querySelector('#modal-next');
    this.prev = document.querySelector('#modal-prev');
  }

  hideModal() {
    this.modal.style.display = 'none';
  }

  showModal() {
    this.modal.style.display = 'block';
  }

  updateModal(selectedEmployeeData, nodes) {
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
  }

  showNextCard(target, dataStorage, nodes) {
    if (target.id === 'modal-next') {
      counter++;
      if (counter >= dataStorage.length - 1) {
        target.style.display = 'none';
      } else {
        target.previousElementSibling.style.display = '';
      }
      this.updateModal(dataStorage[counter], nodes);
    } else if (target.id === 'modal-prev') {
      counter--;
      if (counter <= 0) {
        target.style.display = 'none';
      } else {
        target.nextElementSibling.style.display = '';
      }
      this.updateModal(dataStorage[counter], nodes);
    }
  }
}
