//create a function to sign up, add new user to users data, and redirect to the homepage if succesful
const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const user_name = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (user_name && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ user_name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  };

  document.querySelector('.signup-button').addEventListener('click', signupFormHandler);