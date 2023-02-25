// get signuppage so we can easily maniuplate later
const signUpPage = document.querySelector('#signup');
// create a h2 element so the user can see "Create Username" on the page

const usernameTitle = document.createElement('h2');
// this is where we actually set the h2 element to the text "Create Username: "
usernameTitle.innerHTML = "Create Username: "
// create an input so a user can actually type in his/her username
const userNameBox = document.createElement('input');
// create a h2 element so the user can see "Password"
const passwordTitle = document.createElement('h2');
// this is where we actually set the h2 element to the text "Password"
passwordTitle.innerHTML = "Password";
// create an input so a user can actually type  in his/her password
const passwordBox = document.createElement('input');
// set attribute type to password
passwordBox.setAttribute('type', 'password');
// create a button element
const signUpButton = document.createElement('button')
// set the sign in button text to "sign up"
signUpButton.innerHTML = 'Sign Up!'

// add all elements to signup page
signUpPage.appendChild(usernameTitle);
signUpPage.appendChild(userNameBox);
signUpPage.appendChild(passwordTitle);
signUpPage.appendChild(passwordBox);
signUpPage.appendChild(signUpButton);

// add an event listener for when a user clicks on signup button
signUpButton.addEventListener('click', async () => {
    // we need to get the username that the user inputted
    const username = userNameBox.value;
    const password = passwordBox.value;
    console.log(username, password)
    // const result = await JSON.stringify({
    //         username: username,
    //         password: password
    //     })
    let res = await fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })

    


    // res = await res.json();
    // console.log(res);
    // WE PROBABLY WANT TO DO SOMETHING ELSE
    // REDIRECT
})
