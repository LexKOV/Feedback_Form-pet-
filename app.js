const form = document.querySelector('#feedback-form');
const firstNameInput = document.querySelector('#first-name');
const lastNameInput = document.querySelector('#last-name');
const emailInput = document.querySelector('#email');
const categoryInput = document.querySelector('#category');
const messageInput = document.querySelector('#message');
const imageInput = document.querySelector('#image');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Валидация формы
  if (!validateForm()) {
    return;
  }
  
  // Создание объекта данных для отправки в API
  const formData = new FormData();
  if (firstNameInput.value) {
    formData.append('first-name', firstNameInput.value);
  }
  if (lastNameInput.value) {
    formData.append('last-name', lastNameInput.value);
  }
  formData.append('email', emailInput.value);
  formData.append('category', categoryInput.value);
  formData.append('message', messageInput.value);
  if (imageInput.files.length > 0) {
    formData.append('image', imageInput.files[0]);
  }
  
  // Отправка данных в API в формате JSON
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://example.com/api/feedback', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      console.log(response);
    } else {
      console.error('Ошибка отправки формы.');
    }
  };
  xhr.send(JSON.stringify(Object.fromEntries(formData)));
});

