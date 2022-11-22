import { setBackgroundImage, setFieldValues } from './common';

function setFormValues(form, formValues) {
  setFieldValues(form, '[name="title"]', formValues?.title);
  setFieldValues(form, '[name="author"]', formValues?.author);
  setFieldValues(form, '[name="description"]', formValues?.description);
  setFieldValues(form, '[name="imageUrl"]', formValues?.imageUrl);
  setBackgroundImage(document, '#postHeroImage', formValues?.imageUrl);
}

function getFormValues(form) {
  const formValues = {};

  //C1
  // ['title', 'author', 'description', 'imageUrl'].forEach((name) => {
  //   const field = form.querySelector(`[name="${name}"]`);
  //   if (field) formValues[name] = field.value;
  // });

  //C2
  const data = new FormData(form);
  if (!data) return;

  for (const [key, value] of data) {
    formValues[key] = value;
  }

  return formValues;
}

export function initPostForm({ formId, defaultValues, onSubmit }) {
  const form = document.getElementById(formId);
  if (!form) return;

  setFormValues(form, defaultValues);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('submit form');

    //get form values
    const formValues = getFormValues(form);
    console.log(formValues);
    //validation
    //if valid trigger submit callback
    //otherwise, show validation error
  });
}
