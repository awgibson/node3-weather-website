const weatherForm = document.querySelector('form');
const search = weatherForm.search;
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

search.focus();

weatherForm.addEventListener('submit', async event => {
  event.preventDefault();

  const searchQuery = search.value;

  search.value = '';

  messageOne.textContent = 'Getting weather for ' + searchQuery + '...';
  messageTwo.textContent = '';

  const request = await fetch('/weather?address=' + searchQuery);
  const data = await request.json();

  if (data.error) messageOne.textContent = data.error;
  else {
    messageOne.textContent = data.location;
    messageTwo.textContent = data.forecast;
  }
});
