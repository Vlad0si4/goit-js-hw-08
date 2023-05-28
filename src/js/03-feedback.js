import throttle from 'lodash.throttle';
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
  event.preventDefault();
  

  for (const key in userInfo) { 
    if (feedbackForm.elements[key].value === '') {
      delete userInfo[key]
    }
  }
    const contactFormReset = event.target;
    localStorageAPI.remove(FEEDBACK_KEY);
    contactFormReset.reset();
    console.log(userInfo);
  };

feedbackForm.addEventListener('input', throttle(onContactFormFieldInput, 500));
feedbackForm.addEventListener('submit', onContactFormSubmit)
