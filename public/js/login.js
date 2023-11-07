//create a function that takes in the input values of the login page and uses the post route to check if it is valid, then redirect to home page if successful
const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
      alert('Logged in!');
    } else {
      alert('Failed to log in.');
    }
  } else {
    document.location.replace('/');
  }
};


document.querySelector('.login-button').addEventListener('click', loginFormHandler);


