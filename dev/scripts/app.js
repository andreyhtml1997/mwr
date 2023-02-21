/*jslint browser, es6 */

const body = document.body;
const html = document.documentElement;
const preloader = document.querySelector('.preloader');
const headerBody = document.querySelector('.header__body');

const selectCountry = document.querySelectorAll('.selectCountry');
const selectLanguage = document.querySelectorAll('.selectLanguage');

let previousScrollPosition = 0;

const set1VhInPx = () => {
  let vh = window.innerHeight * 0.01;
  html.style.setProperty('--vh', `${vh}px`);
}
set1VhInPx();

const smoothAnchorScroll = function() {
  document.querySelectorAll('a.scrollto[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
}

body.classList.add('overflow-hidden');
html.classList.add('overflow-hidden');

/**swiper function*/
if(document.querySelector('.othersSay .swiper')) {
  const othersSaySwiper = new Swiper(".othersSay .swiper", {
    slidesPerView: "auto",
    spaceBetween: 15.21,
    loop: true,
    slidesPerView: 4,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 15.21,
      },
      450: {
        slidesPerView: 2,
      },
      576: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      992: {
        spaceBetween: 15.21,
      }
    }
  });
}
/**swiper function*/
if(document.querySelector('.explore .swiper')) {
  const exploreSwiper = new Swiper('.explore .swiper', {
    direction: 'vertical',
    speed: 8000,
    mousewheelControl: true,
    slidesPerView: "auto",
    loop: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false
    },
    mousewheel: {
      releaseOnEdges: true,
    }
  });
}

/**choices init*/
function choicesAdditional(el, choices) {
  const dropdown = choices.dropdown.element
  const dropdownList = dropdown.querySelector('.choices__list');
  const dropdownListWrapper = document.createElement('div');
  dropdownListWrapper.classList.add('choicesListWrapper');
  const changeChoicesHeaderValue = () => el.parentElement.parentElement.querySelector('.choices__inner .choices__item').textContent = el.value;
  changeChoicesHeaderValue();
  const addHeaderBodyBlur = () => headerBody.classList.add('blur-0');
  const removeHeaderBodyBlur = () => headerBody.classList.remove('blur-0');
  const highlightSelected = function() {
    dropdown.querySelectorAll('.choices__item').forEach(el => {
      el.classList.remove('is-highlighted');
      if(el.classList.contains('is-selected')) {
        el.classList.add('is-highlighted');
      }
    })
  }
  function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }
  wrap(dropdownList, dropdownListWrapper);
  const Scrollbar = window.Scrollbar;
  Scrollbar.init(dropdownListWrapper, {
    thumbMinSize: 80,
    alwaysShowTracks: true
  });
  el.addEventListener('change', changeChoicesHeaderValue);
  el.addEventListener('showDropdown', () => {
    addHeaderBodyBlur();
    highlightSelected();
  });
  el.addEventListener('hideDropdown', removeHeaderBodyBlur);
  dropdownList.addEventListener('click', () => choices.hideDropdown());
  dropdown.addEventListener('click', (e) => {
    if(
      !e.composedPath().includes(dropdown.querySelector('.scrollbar-track-y')) &&
      !e.composedPath().includes(dropdown.querySelector('.scrollbar-thumb-y')) &&
      !e.composedPath().includes(choices.input.element)
    ) {
      choices.hideDropdown();
    }
  });
 


  
}
if(selectCountry) {
  [...selectCountry].forEach(el => {
    const choices = new Choices(el, {
      searchPlaceholderValue: 'Select your country',
      classNames: {
        containerOuter: 'choices choices--selectCountry',
      }
    });
    choicesAdditional(el, choices);
  });
}
if(selectLanguage) {
  [...selectLanguage].forEach(el => {
    const choices = new Choices(el, {
      searchEnabled: false,
      shouldSort: false,
      classNames: {
        containerOuter: 'choices choices--selectLanguage',
      }
    });
    choicesAdditional(el, choices);
  });
}

/**window events*/
window.onload = function (e) {
  preloader.classList.add('hidden');
  html.classList.remove('overflow-hidden');
  body.classList.remove('overflow-hidden');
  /**header toggle init*/
  const toggleHeaderEls = document.querySelectorAll('.toggleHeader');
  const toggleHeader = () => {
    toggleHeaderEls.forEach(el => el.classList.toggle('active'));
    headerBody.classList.toggle('active');
    html.classList.toggle('overflow-hidden--md');
    body.classList.toggle('overflow-hidden--md');
  };
  toggleHeaderEls.forEach(el => el.addEventListener('click', toggleHeader));
};
window.onscroll = function(e) {
  const header = document.querySelector('.header');
  if(header) {
    const offsetTop = e.currentTarget.pageYOffset;
    const scrollingDown = offsetTop > previousScrollPosition;
    
    if(offsetTop > header.clientHeight/2) {
      if(scrollingDown) {
        header.classList.add('fixed');
      }
    } else if(offsetTop == 0) {
      header.classList.remove('fixed');
    }
    previousScrollPosition = offsetTop;
  }
}
window.onresize = function(e) {
  set1VhInPx();
}



document.querySelector('#dynamicVideoModal').addEventListener('hide.bs.modal', function (e) {
  e.currentTarget.querySelector('video').pause();
})