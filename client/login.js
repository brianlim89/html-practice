const loginPage = document.querySelector('#login');
console.log('login div: ', loginPage)


// creating a title to label the input box for the username
const usernameTitle = document.createElement('h2');
usernameTitle.innerHTML = "Username: "


const userNameBox = document.createElement('input');

const passwordTitle = document.createElement('h2');
passwordTitle.innerHTML = "Password: "



const passwordBox = document.createElement('input');
passwordBox.setAttribute('type', 'password');


const signInButton = document.createElement('button')
signInButton.innerHTML = 'Sign In'


loginPage.appendChild(usernameTitle);
loginPage.appendChild(userNameBox);
loginPage.appendChild(passwordTitle);
loginPage.appendChild(passwordBox);
loginPage.appendChild(signInButton);



signInButton.addEventListener('click', () => {
  const user = {
    username: userNameBox.value,
    password: passwordBox.value
  }
  console.log('userNameBox.value: ', userNameBox.value);
  console.log('passwordBox.value: ', passwordBox.value);

  fetch('/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch(err => console.log(err));

})
