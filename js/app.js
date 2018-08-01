
/* ======= Model ======= */

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


/* ======= Octopus ======= */

let octopus = {

  init: function() {
    // Set our current cat to the first one in the list
    model.currentCat = model.cats[0];

    // Tell our views to initialize
    catListView.init();
    catView.init();
  },

  getCurrentCat: function() {
    return model.currentCat;
  },

  getCats: function() {
    return model.cats;
  },

  // Set the currently-selected cat to the object passed in
  setCurrentCat: function(cat) {
    model.currentCat = cat;
  },

  // Increments the counter for the currently-selected cat
  incrementCounter: function() {
    model.currentCat.clickCount++;
    catView.render();
  }
};


/* ======= View ======= */

let catView = {

  init: function() {
    // Store pointers to our DOM elements for easy access later
    this.catElem = document.getElementById('cat');
    this.catNameElem = document.getElementById('cat-name');
    this.catImageElem = document.getElementById('cat-img');
    this.countElem = document.getElementById('cat-count');

    // On click, increment the current cat's counter
    this.catImageElem.addEventListener('click', function() {
      octopus.incrementCounter();
    });

    // Render this view (update the DOM elements with the right values)
    this.render();
  },

  render: function() {
    // Update the DOM elements with values from the current cat
    let currentCat = octopus.getCurrentCat();
    this.countElem.textContent = currentCat.clickCount;
    this.catNameElem.textContent = currentCat.name;
    this.catImageElem.src = currentCat.imgSrc;
  }
};

let catListView = {

  init: function() {
    // Store the DOM element for easy access later
    this.catListElem = document.getElementById('cat-list');

    // Render this view (update the DOM elements with the right values)
    this.render();
  },

  render: function() {
    let cat, elem, i;
    // Get the cats we'll be rendering from the octopus
    let cats = octopus.getCats();

    // Empty the cat list
    this.catListElem.innerHTML = '';

    // Loop over the cats
    for (i = 0; i < cats.length; i++) {
      // This is the cat we're currently looping over
      cat = cats[i];

      // Make a new cat list item and set its text
      elem = document.createElement('li');
      elem.textContent = cat.name;

      /* On click, setCurrentCat and render the catView (this uses our closure-in-a-loop trick to connect the value of the cat variable to the click event function) */
      elem.addEventListener('click', (function(catCopy) {
        return function() {
          octopus.setCurrentCat(catCopy);
          catView.render();
        };
      })(cat));

      // Finally, add the element to the list
      this.catListElem.appendChild(elem);
    }
  }
};

// Make it go!
octopus.init();
