/*jslint browser, es6 */

const preloader = document.querySelector('.preloader');

const body = document.body;
const html = document.documentElement;
const header = document.querySelector('.header');
const headerBody = document.querySelector('.header__body');
const toggleHeaderEls = document.querySelectorAll('.toggleHeader');

const selectCountry = document.querySelectorAll('.selectCountry');
const selectLanguage = document.querySelectorAll('.selectLanguage');

let previousScrollPosition = 0;

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

const set1VhInPx = () => {
  let vh = window.innerHeight * 0.01;
  html.style.setProperty('--vh', `${vh}px`);
}
set1VhInPx();

const Scrollbar = window.Scrollbar;
Scrollbar.use(OverscrollPlugin);


const pastEventTriggers = document.querySelectorAll('.past-events__el-content-header');
const images = [{
  src  : 'img/past-events/1.jpg',
  thumb: 'img/past-events/1.jpg',
  caption: "image1"
}, {
  src  : 'img/past-events/2.jpg',
  thumb: 'img/past-events/2.jpg',
  caption: "image2"
}, {
  src  : 'img/past-events/3.jpg',
  thumb: 'img/past-events/3.jpg',
  caption: "image3"
}, {
  src  : 'img/past-events/4.jpg',
  thumb: 'img/past-events/4.jpg',
  caption: "image4"
}, {
  src  : 'img/past-events/5.jpg',
  thumb: 'img/past-events/5.jpg',
  caption: "image5"
}];
if(pastEventTriggers) {
  pastEventTriggers.forEach((el, i) => {
    el.addEventListener('click', function() {
      
      Fancybox.show(images, {
        Thumbs: {
          type: "classic",
        },
      });
    })
  });
}



/**swiper function*/
if(document.querySelector('.othersSay .swiper')) {
  const othersSaySwiper = new Swiper(".othersSay .swiper", {
    slidesPerView: "auto",
    spaceBetween: 15.21,
    loop: true,
    slidesPerView: 4,
    navigation: {
      nextEl: ".othersSay .swiper-button-next",
      prevEl: ".othersSay .swiper-button-prev",
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
if(document.querySelector('.comments .swiper')) {
  const commentsSwiper = new Swiper(".comments .swiper", {
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: ".comments .swiper-pagination__el--prev",
      prevEl: ".comments .swiper-pagination__el--next",
    },
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
  //header.classList.add('fixed');
  setTimeout(()=>{
    preloader.classList.add('hidden');
    html.classList.remove('overflow-hidden');
    body.classList.remove('overflow-hidden');

  }, 1)
  /**header toggle init*/
  const toggleHeader = () => {
    toggleHeaderEls.forEach(el => el.classList.toggle('active'));
    headerBody.classList.toggle('active');
    html.classList.toggle('overflow-hidden--md');
    body.classList.toggle('overflow-hidden--md');
  };
  toggleHeaderEls.forEach(el => el.addEventListener('click', toggleHeader));
};

window.onscroll = function(e) {
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
document.querySelectorAll('.modal').forEach(el => {
  el.addEventListener('hide.bs.modal', function (e) {
    e.currentTarget.querySelector('video').pause();
  })
})

if(document.querySelectorAll(".calendar-table .dropdown-menu__inner")) {
  document.querySelectorAll(".calendar-table .dropdown-menu__inner").forEach(el => {
    Scrollbar.init(el, {
      alwaysShowTracks: true,
    });
  })
}
if(document.querySelectorAll('.dropdown-selectalbe')) {
  document.querySelectorAll('.dropdown-selectalbe').forEach(el => {
    el.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', function(e) {
        el.querySelectorAll('.dropdown-item').forEach(el => el.classList.remove('active'));
        e.currentTarget.classList.add('active');
        el.querySelector('.dropdown-selectalbe__title').textContent = e.currentTarget.textContent;
      });
    })
  })
}

const createDropdownSearchable = function(dropdown) {
  const checkAll = dropdown.querySelector('[data-value="all"]');
  const dropdownSearch = dropdown.querySelector('.events-select__search input');
  const dropdownMenu = dropdown.querySelector('.dropdown-menu');
  const dropdownListContainer = dropdown.querySelector('.events-select__list');
  const dropdownList = dropdown.querySelectorAll('.events-select__list [type="checkbox"]');
  const searchClear = dropdown.querySelector('.search-clear');
  const dropdownSearchClear = () => dropdownSearch.value = "";
  const setActualList = function() {
    dropdownList.forEach(el => {
      const setDisplay = (value) => {el.parentElement.style.display = value;}
      if(el.value.includes(dropdownSearch.value)) {
        setDisplay("flex");
      } else {
        setDisplay("none");
      }
    })
   
  };
  
  searchClear.addEventListener('click', function(e) {
    dropdownSearchClear();
    setActualList();
    dropdownSearch.focus();
    e.currentTarget.classList.remove('active');
  })
  dropdownSearch.addEventListener('input', function(e){
    setActualList();
    if(e.currentTarget.value) {
      searchClear.classList.add('active');
    } else {
      searchClear.classList.remove('active');
    }
  });
  dropdownMenu.addEventListener('click', function(e) {
    e.stopPropagation();
  });
  dropdownList.forEach(el => {
    el.addEventListener('change', function(){
      if(!el.checked) {
        checkAll.checked = el.checked;
      }
    })
  });
  checkAll.addEventListener('change', function(){
    dropdownSearchClear();
    setActualList();
    dropdownList.forEach(el => {
      el.checked = checkAll.checked;
    });
    searchClear.classList.remove('active');
  });
  Scrollbar.init(dropdownListContainer, {
    thumbMinSize: 80,
    alwaysShowTracks: true
  });
}

const calendarTable = document.querySelector('.calendar-table__container');
if(calendarTable) {
Scrollbar.init(calendarTable, {
  alwaysShowTracks: true,
  plugins: {
    overscroll: false,
  }
});
}
const dropdownsSearchable = document.querySelectorAll('.dropdown-searchable');
if(dropdownsSearchable) {
  dropdownsSearchable.forEach(el => {
    createDropdownSearchable(el);
  });
  
}






const password = document.querySelectorAll('.password__visibility');
const passwordVisibilityToggle = function(toggler) {
  toggler.addEventListener('click', function(e) {
    e.currentTarget.classList.toggle('active');
    const type = e.currentTarget.previousElementSibling.type;
    if(type == 'password') {
      type = 'text';
    } else if(type == 'text') {
      type = 'password';
    }
  });
}
if(password){
  password.forEach(el => passwordVisibilityToggle(el))
}

let creditCard = document.querySelector('.creditCard');
if(creditCard) {
  let creditCardMaskOptions = {
    mask: '0000 0000 0000 0000'
  };
  let creditCardMask = IMask(creditCard, creditCardMaskOptions);
}
let creditCardDate = document.querySelector('.creditCardDate');

let creditCardCvc = document.querySelector('.creditCardCvc');

let forms = document.querySelectorAll('form');

let emails = document.querySelectorAll('input.email');

function validateEmail(input) {
  function removeErrorMessage() {
    if(input.nextElementSibling && input.nextElementSibling.classList.contains('emailError')) {
      input.nextElementSibling.remove();
    }
  }
  removeErrorMessage();

  const createErrorMessage = (message) => {
    let messageBlock = document.createElement('p');
    messageBlock.classList.add('emailError');
    messageBlock.textContent = message;
    return messageBlock;
  }
  let validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if(input.value) {
    if (!input.value.match(validRegex)) {
      input.after(createErrorMessage("Invalid email address"));
      setTimeout(removeErrorMessage, 3000);
      return false;
    } else {
      return true;
    }
  } else {
    input.after(createErrorMessage("The field must not be empty"));
    setTimeout(removeErrorMessage, 3000);
    return false;
  }
}
if(forms) {
  forms.forEach(form => form.addEventListener('submit', function(e){
    if(e.currentTarget.querySelectorAll('input.email')) {
      e.currentTarget.querySelectorAll('input.email').forEach(email => {
        validateEmail(email);
        if(!validateEmail(email)) {
          email.focus();
        } 
      });
    }
    e.stopPropagation();
    e.preventDefault();
  }));
}
if(creditCardDate) {
  let creditCardDateMaskOptions = {
    mask: 'mm / yy',
    blocks: {
      mm: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12,
        autofix: 'pad'
      },
      yy: {
        mask: IMask.MaskedRange,
        from: 23,
        to: 99,
        autofix: 'pad'
      }
    }
  };
  let creditCardDateMask = IMask(creditCardDate, creditCardDateMaskOptions);

  creditCard.addEventListener('input', function(e){
    const value = e.currentTarget.value;
    const valueRealLength = value.length - (value.split(' ').length - 1);
    if(valueRealLength == 16) {
      creditCardDate.focus();
    }
  });
  creditCardDate.addEventListener('keydown', function(e){
    const key = e.key;
    if (key == "Backspace" || key == "Delete") {
      if(!e.currentTarget.value.length) {
        creditCard.focus();
      }
    }
  })
}

if(creditCardCvc) {
  let creditCardCvcMaskOptions = {
    mask: '000'
  };
  let creditCardCvcMask = IMask(creditCardCvc, creditCardCvcMaskOptions);

  creditCardDate.addEventListener('input', function(e){
    const value = e.currentTarget.value;
    const valueRealLength = value.length - (value.split(' ').length - 1);
    if(valueRealLength == 5) {
      creditCardCvc.focus();
    }
  });
  creditCardCvc.addEventListener('keydown', function(e){
    const key = e.key;
    if (key == "Backspace" || key == "Delete") {
      if(!e.currentTarget.value.length) {
        creditCardDate.focus();
      }
    }
  })
}

function inputReq(el) {
  const form = el.closest('.form');
  const submitButton = form.querySelector('.button');
  let allInputsError = [...form.querySelectorAll('.input__input.req')].filter(el => !el.value.length);
  function setDisable() {
    allInputsError = [...form.querySelectorAll('.input__input.req')].filter(el => !el.value.length);
    if(!allInputsError.length) {
      submitButton.removeAttribute('disabled');
    } else {
      submitButton.setAttribute('disabled', 'disabled');
    }
    
  }
  function setInputReq(el) {
    el.addEventListener('input', function(e) {
      const elem = e.currentTarget;
      const allInputs = form.querySelectorAll('.input__input.req');
      
      
      if(!elem.value) {
        elem.closest('.input').classList.add('error');
      } else {
        elem.closest('.input').classList.remove('error');
      }
      allInputsError = [...allInputs].filter(el => !el.value.length);
      setDisable();
    })
  }
  setInputReq(el);

  if(form.querySelector('#attendee2')) {
    form.querySelector('#attendee2').addEventListener('change', function(e){
      const container = form.querySelector('.border-container--additional');
      container.classList.toggle('d-none');
      container.querySelectorAll('.input__input').forEach(el => {
        el.classList.toggle('req');
        setInputReq(el);
      });
      setDisable();
    })
  }
};

if(document.querySelectorAll('.input__input.req')) {
  document.querySelectorAll('.input__input.req').forEach(el => {
    inputReq(el);
  });
}

