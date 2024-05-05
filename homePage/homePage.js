const toggle_btn = document.getElementById("checkbox");
const searchBar = document.getElementById("search");
const contactSubmit = document.querySelector(".btn");

contactSubmit.addEventListener("click", (e) => {
  e.preventDefault();
});
// console.log(toggle_btn);

toggle_btn.addEventListener("change", () => {
  if (toggle_btn.checked) {
    // console.log(`checked`);
    document.body.classList.add("dark-mode");
    searchBar.style.backgroundColor = "#f2f2f2";
  } else {
    // console.log(`unchecked`);
    document.body.classList.remove("dark-mode");
  }
});

const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

window.onload = function() {
  // const introSection = document.querySelector('.intro-section');
  const searchBoxHtml = `
  <div class="search-box">
    <form action="">
      <input type="text" name="search" id="search" placeholder="Search for the products here ..">
      <button type="submit"><i class="fa fa-search"></i></button>
    </form>
  </div>
`;
  window.addEventListener('scroll', () => {
    const searchBar = document.querySelector('.search-box');
    const logoDiv = document.querySelector('header .logo');
    // const searchBar = document.querySelector('.search-box');
    if (window.innerWidth <= 980) {
  
      if (scrollY >= 60) {
        if (searchBar) {
          searchBar.remove();
        }
      } else {
        // Check if the search box doesn't already exist before adding it
        if (!searchBar) {
          logoDiv.insertAdjacentHTML('afterend',searchBoxHtml);
          // document.querySelector('.header').insertAdjacentHTML('beforeend', searchBoxHtml);
        }
      }
    } else if (window.innerWidth > 980 && !searchBar)  {
      logoDiv.insertAdjacentHTML('afterend', searchBoxHtml);
    }
    

    
  }); 

  window.addEventListener('change' , () => {
    const searchBar = document.querySelector('.search-box');
    const logoDiv = document.querySelector('header .logo');
    if (window.innerWidth > 980 && !searchBar) {
      logoDiv.insertAdjacentHTML('afterend',searchBoxHtml);
    }
  })
}

window.onchange = function() {
  const searchBar = document.querySelector('.search-box');
  const logoDiv = document.querySelector('header .logo');
  const searchBoxHtml = `
  <div class="search-box">
    <form action="">
      <input type="text" name="search" id="search" placeholder="Search for the products here ..">
      <button type="submit"><i class="fa fa-search"></i></button>
    </form>
  </div>
`;
  window.addEventListener('change' ,() => {
    if (window.innerWidth > 980 && !searchBar) {
      logoDiv.insertAdjacentHTML('afterend', searchBoxHtml);
    }
  })
}

  // Smooth scrolling function
  function smoothScroll(target, duration, offset = 0) {
    var targetElement = document.querySelector(target);
    var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset + offset;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      var timeElapsed = currentTime - startTime;
      var run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }

  // Click event listeners for navigation links
  document.querySelectorAll('header nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      var target = this.getAttribute('href');
      var offset = target === '#home' ? 50 : 0; // Adjust offset as needed
      smoothScroll(target, 1000, offset); // Adjust duration as needed
    });
  });

  //todo To know which nav link is active

  // Get all anchor links in the header
  var navLinks = document.querySelectorAll('.header ul li a');

  // Add event listeners to each link
  navLinks.forEach(nav => {
    nav.addEventListener('click', function() {
      // Remove 'active' class from all links
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      // Add 'active' class to the clicked link
      this.classList.add('active');
    });
  });

    // Function to highlight active section in navigation
    function highlightActiveSection() {
      var sections = document.querySelectorAll('main > div[id]');
      var navLinks = document.querySelectorAll('.header ul li a');
  
      sections.forEach(section => {
        var sectionTop = section.getBoundingClientRect().top;
        var sectionBottom = section.getBoundingClientRect().bottom;
        
  
        if (sectionTop <= window.innerHeight / 2 && sectionBottom >= window.innerHeight / 2) {
          var id = section.getAttribute('id');
  
          navLinks.forEach(link => {
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }
  
    // Highlight active section on initial page load
    highlightActiveSection();
  
    // Listen for scroll events to highlight active section
    window.addEventListener('scroll', highlightActiveSection);