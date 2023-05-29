import throttle from 'lodash.throttle';
import localStorageAPI from './localstorage.js';
const email = document.querySelector("input")
const message = document.querySelector("textarea")

const feedbackForm = document.querySelector('.feedback-form');


const FEEDBACK_KEY = "feedback-form-state"
const userInfo = {};

const fillContactFormFields = () => {
  const userInfoFromLS = localStorageAPI.load(FEEDBACK_KEY)

  if (userInfoFromLS === undefined) {
    return;
  }

    for (const key in userInfoFromLS) {
      feedbackForm.elements[key].value = userInfoFromLS[key];
      userInfo[key] = userInfoFromLS[key];
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
if (email.value === '' || message.value === '') {
    return alert('Fill all the fields please');
  }

  event.preventDefault();
  const contactFormReset = event.target;

  contactFormReset.reset();
  console.log(userInfo);
  
      for (const key in userInfo) {
    if (feedbackForm.elements[key].value === '') {
      delete userInfo[key]
      }
  }
    localStorageAPI.remove(FEEDBACK_KEY);
  };


feedbackForm.addEventListener('input', throttle(onContactFormFieldInput, 500));
feedbackForm.addEventListener('submit', onContactFormSubmit)
