const infoContainer = document.querySelector('.modal-info-container');

document.getElementById('modal-right-btn').addEventListener('click', () => {

  infoContainer.animate([
    // keyframes
  { 
    transform: 'translateX(0px)',
    opacity: 1
  },
  {
    transform: 'translateX(100%)',
    opacity: 0
  }
  ], { 
    // timing options
    fill: "forwards",
    duration: 500
  });

  infoContainer.animate([
    // keyframes
  {
    transform: 'translateX(0px)',
    opacity: 0
  },
  {
    transform: 'translateX(0px)',
    opacity: 1
  }
  ], { 
    // timing options
    delay: 400,
    fill: "forwards",
    duration: 500
  }); 
})

document.getElementById('modal-left-btn').addEventListener('click', () => {

  infoContainer.animate([
    // keyframes
  { 
    transform: 'translateX(0px)',
    opacity: 1
  },
  {
    transform: 'translateX(-100%)',
    opacity: 0
  }
  ], { 
    // timing options
    fill: "forwards",
    duration: 500
  });

  infoContainer.animate([
    // keyframes
  {
    transform: 'translateX(0px)',
    opacity: 0
  },
  {
    transform: 'translateX(0px)',
    opacity: 1
  }
  ], { 
    // timing options
    delay: 400,
    fill: "forwards",
    duration: 500
  }); 
})



