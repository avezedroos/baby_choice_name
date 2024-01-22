const emailError = document.getElementById("emailError")
document.addEventListener("DOMContentLoaded",()=>{
    userCookieValue = getCookie('usercookies');
    
if (userCookieValue !== null) {
    console.log('User cookie found:', userCookieValue);
} else {
    console.log('User cookie not found');
}
})
function validateForm() {
    const fnameInput = document.getElementsByName("fname")[0].value;
    const fnameError = document.getElementById("fnameError");
    const lnameInput = document.getElementsByName("lname")[0].value;
    const lnameError = document.getElementById("lnameError");
    const usernameInput = document.getElementsByName("userName")[0].value;
    const usernameError = document.getElementById("usernameError");
    const password = document.getElementsByName("password")[0].value;
    const passwordError = document.getElementById("passwordError");
    const cpassword = document.getElementsByName("cpassword")[0].value;
    const cpasswordError = document.getElementById("cpasswordError");
    let isValid = false;
    const fnameRegex = /^[a-zA-Z]{1,15}$/;
    if (fnameRegex.test(fnameInput)) {
        fnameError.textContent = "";
        fnameError.style.display = "none";
        var isValid1 = true;
    } else {
        fnameError.style.display = "block"
        fnameError.textContent = "Invalid input. Only 1 to 15 alphabetical characters allowed.";
        var isValid1 = false;
    }
    if (fnameRegex.test(lnameInput)) {
        lnameError.textContent = "";
        lnameError.style.display = "none";
        var isValid2 = true;
    } else {
        lnameError.style.display = "block"
        lnameError.textContent = "Invalid input. Only 1 to 15 alphabetical characters allowed.";
        var isValid2 = false;
    }
    if (/^[a-zA-Z]+[A-Za-z0-9_]{0,15}$/.test(usernameInput)) {
        usernameError.textContent = "";
        usernameError.style.display = "none";
        var isValid3 = true;
    }
    else {
        usernameError.style.display = "block"
        usernameError.textContent = "Invalid input. Only 1 to 15 alphnumeric     characters and '_' are allowed.";
        var isValid3 = false;
    }
    //  let avez = /^[A-Za-z0-9@]{8,}$/;
    if (/^[a-zA-Z0-9][A-Za-z0-9@]{7,9}$/.test(password)) {
        passwordError.textContent = "";
        passwordError.style.display = "none";
        var isValid4 = true;
    }
    else {
        passwordError.style.display = "block"
        passwordError.textContent = "Invalid Password. Only 8 to 10 alphnumeric characters and '@' are allowed.";
        var isValid4 = false;
    }
    if (password === cpassword) {
        cpasswordError.textContent = "";
        cpasswordError.style.display = "none";
        var isValid5 = true;
    }
    else {
        cpasswordError.style.display = "block"
        cpasswordError.textContent = "Password is not Match";
        var isValid5 = false;
    }


    if (isValid1 === true && isValid2 === true && isValid3 === true && isValid4 === true && isValid5 === true) {
        // console.log(true)
        isValid = true
    }
    return isValid;
}

function handleSubmit() {
    // Your form validation logic
    if (!validateForm()) {
        // Return false to prevent the form from being submitted
        return false;
    }

    // Submit the form asynchronously using fetch
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fname: document.getElementsByName('fname')[0].value,
            lname: document.getElementsByName('lname')[0].value,
            userName: document.getElementsByName('userName')[0].value,
            email: document.getElementsByName('email')[0].value,
            gender: document.querySelector('input[name="gender"]:checked').value,
            password: document.getElementsByName('password')[0].value,
            cpassword: document.getElementsByName('cpassword')[0].value,
        }),
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response data
            // console.log(data.emailverify);
            if (!data.emailverify) {
               
                emailError.style.display = "block"
                emailError.textContent = "email alredy exist";
            }else if(data.emailverify){
                emailError.style.display = "none"
                emailError.textContent = "";
            }
            // Redirect to the index page if needed
            // if (data.redirect) {
            //     window.location.href = "/";
            // }
            if (data.usercookie !== undefined) {
                console.log("avez", data.usercookie);
                let userCookieValue = data.usercookie;
                setCookie('usercookies', userCookieValue, 90);
            }
        })
        .catch(error => console.error('Error:', error));

    // Prevent the form from being submitted in the traditional way
    return false;
}



function setCookie(name, value, daysToExpire) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + daysToExpire);

    const cookieValue = encodeURIComponent(name) + '=' + encodeURIComponent(value) + '; expires=' + expirationDate.toUTCString() + '; path=/';

    document.cookie = cookieValue;
}
function getCookie(name) {
    const decodedName = encodeURIComponent(name) + '=';
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();

        if (cookie.indexOf(decodedName) === 0) {
            // Found the cookie
            return decodeURIComponent(cookie.substring(decodedName.length));
        }
    }

    // Cookie not found
    return null;
}



