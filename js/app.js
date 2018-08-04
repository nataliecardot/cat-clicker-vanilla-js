/* MODEL (where data is stored, from both user and server) */

let model = {
  currentCat: null,
  adminShow: false,
  cats: [
    {
      clickCount: 0,
      name: 'Spice',
      imgSrc: 'img/Spice.jpeg'
    },
    {
      clickCount: 0,
      name: 'Marshmallow',
      imgSrc: 'img/Marshmallow.jpeg'
    },
    {
      clickCount: 0,
      name: 'Cuddles',
      imgSrc: 'img/Cuddles.jpeg'
    },
    {
      clickCount: 0,
      name: 'Baby',
      imgSrc: 'img/Baby.jpeg'
    },
    {
      clickCount: 0,
      name: 'Muffin',
      imgSrc: 'img/Muffin.jpeg'
    }
  ]
};


/* OCTOPUS (connects model and view. Holds things together, while keeping them separate enough to allow changes in individual pieces without disrupting the rest. Also called controller, view model, presenter) */

let octopus = {

  init: function() {
    // Set current cat to first one in list
    model.currentCat = model.cats[0];

    // Tell views to initialize
    catListView.init();
    catView.init();
    adminView.init();
    adminView.hide();
  },

  getCurrentCat: function() {
    return model.currentCat;
  },

  getCats: function() {
    return model.cats;
  },

  // Set currently selected cat to object passed in
  setCurrentCat: function(cat) {
    model.currentCat = cat;
  },

  // Increments counter for currently selected cat
  incrementCounter: function() {
    model.currentCat.clickCount++;
    catView.render();
    adminView.render();
  },

  // Runs when 'Admin' button is clicked. Note: adminShow set to false in model object on page load
  adminDisplay: function() {
    if (model.adminShow === false) {
      model.adminShow = true;
      adminView.show(); // Displays admin input boxes and buttons
    }
    else if (model.adminShow === true) {
      model.adminShow = false;
      adminView.hide(); // Hides admin input boxes and buttons
    }
  },

  // Hides admin display when cancel button is clicked
  adminCancel: function() {
    adminView.hide();
  },

  // Hides admin display and saves new cat data when save button is clicked
  adminSave: function() {
    model.currentCat.name = adminCatName.value;
    model.currentCat.imgSrc = adminCatURL.value;
    model.currentCat.clickCount = adminCatClicks.value;
    catView.render();
    catListView.render();
    adminView.hide();
  }
};


/* VIEW (user's interface to application, both for giving application data and for reading data)*/

let catView = {

  init: function() {
    // Store pointers to DOM elements for easy access later
    this.catElem = document.getElementById('cat');
    this.catNameElem = document.getElementById('cat-name');
    this.catImageElem = document.getElementById('cat-img');
    this.countElem = document.getElementById('cat-count');

    // On click, increment current cat's counter
    this.catImageElem.addEventListener('click', function() {
      octopus.incrementCounter();
    });

    // Render this view (update DOM elements with right values)
    this.render();
  },

  render: function() {
    // Update DOM elements with values from current cat
    let currentCat = octopus.getCurrentCat();
    this.countElem.textContent = currentCat.clickCount;
    this.catNameElem.textContent = currentCat.name;
    this.catImageElem.src = currentCat.imgSrc;
  }
};

let catListView = {

  init: function() {
    // Store DOM element for easy access later
    this.catListElem = document.getElementById('cat-list');

    // Render this view (update DOM elements with correct values)
    this.render();
  },

  render: function() {
    let cat, elem, i;
    // Get cats we'll be rendering from octopus
    let cats = octopus.getCats();

    // Empty cat list
    this.catListElem.innerHTML = '';

    // Loops over cats
    for (i = 0; i < cats.length; i++) {
      // This is cat we're currently looping over
      cat = cats[i];

      // Make new cat list item and set its text
      elem = document.createElement('li');
      elem.textContent = cat.name;

      /* On click, setCurrentCat and render catView (this uses closure-in-a-loop trick to connect value of cat variable to click event function) */
      elem.addEventListener('click', (function(catCopy) {
        return function() {
          octopus.setCurrentCat(catCopy);
          catView.render();
          // If adminView is open, updates fields with info about current cat
          adminView.render();
        };
      })(cat));

      // Adds li for each cat inside ul with ID cat-list
      this.catListElem.appendChild(elem);
    }
  }
};

let adminView = {
  init: function() {
    this.adminCatName = document.getElementById('adminCatName');
    this.adminCatURL = document.getElementById('adminCatURL');
    this.adminCatClicks = document.getElementById('adminCatClicks');
    let admin = document.getElementById('admin');

    this.adminBtn = document.getElementById('adminBtn');
    this.adminCancel = document.getElementById('adminCancel');
    this.adminSave = document.getElementById('adminSave');

    this.adminBtn.addEventListener('click', function() {
      octopus.adminDisplay();
    });

    this.adminCancel.addEventListener('click', function() {
      octopus.adminCancel();
    });

    this.adminSave.addEventListener('click', function() {
      octopus.adminSave();
    });

  },

  render: function() {
    let currentCat = octopus.getCurrentCat();
    this.adminCatName.value = currentCat.name;
    this.adminCatURL.value = currentCat.imgSrc;
    this.adminCatClicks.value = currentCat.clickCount;
  },

  show: function() {
    // Gets info based on last-clicked cat
    this.render();
    admin.style.display = 'block';
  },

  hide: function() {
    admin.style.display = 'none';
  }

};

octopus.init();
