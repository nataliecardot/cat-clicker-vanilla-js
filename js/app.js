
/* MODEL */

let model = {
  currentCat: null,
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


/* OCTOPUS */

let octopus = {

  init: function() {
    // Set current cat to first one in list
    model.currentCat = model.cats[0];

    // Tell views to initialize
    catListView.init();
    catView.init();
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
  }
};


/* VIEW */

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

    // Render this view (update DOM elements with right values)
    this.render();
  },

  render: function() {
    let cat, elem, i;
    // Get cats we'll be rendering from octopus
    let cats = octopus.getCats();

    // Empty cat list
    this.catListElem.innerHTML = '';

    // Loop over cats
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
        };
      })(cat));

      // Finally, add element to list
      this.catListElem.appendChild(elem);
    }
  }
};

// Make it go!
octopus.init();
