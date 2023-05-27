const debounce = require('lodash.debounce');
import localStorageAPI from './localstorage.js';

const feedbackForm = document.querySelector('.feedback-form');


const FEEDBACK_KEY = "feedback-form-state"
const userInfo = {};

const fillContactFormFields = () => {
  const userInfoFromLS = localStorageAPI.load(FEEDBACK_KEY)

  if (userInfoFromLS === undefined) {
    return;
  }

    for (const key in userInfoFromLS) {
    feedbackForm.elements[key].value = userInfoFromLS[key]
  };
}

fillContactFormFields();

const onContactFormFieldInput = event => {
  const feedbackFormEl = event.target;
  const contactValue = feedbackFormEl.value;
  const contactName = feedbackFormEl.name;

  userInfo[contactName] = contactValue

  localStorageAPI.save(FEEDBACK_KEY, userInfo)
  
}

const onContactFormSubmit = event => {
  event.preventDefault();
  const contactFormReset = event.target;

  if (contactFormReset.elements.email.value === '') {
    alert('Please enter your email.');
  } 
    localStorageAPI.remove(FEEDBACK_KEY);
    contactFormReset.reset();
    console.log(userInfo);
  
};
feedbackForm.addEventListener('input', debounce(onContactFormFieldInput, 500));
feedbackForm.addEventListener('submit', onContactFormSubmit)
