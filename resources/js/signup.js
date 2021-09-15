if (document.cookie) {
    location.replace("http://127.0.0.1:8080/views/menu/index.html");
}

document.getElementById("sub").disabled = true;

function nameValidation(name) {
    let regx = /^[a-zA-Z\s]{3,}$/g;
    if (!regx.test(name)) {
        var errorName = new Error("Name Should Be At Least 4 Charactars"); //<<<<<<<<<
        throw errorName;
    }
    return true; //true
}

let emailValidation = (email) => {
    let regx = /^[a-zA-Z0-9\.]{1,}\@[a-zA-Z0-9]{2,}\.[a-zA-Z]{2,}$/gm;
    if (!regx.test(email)) {
        throw new Error("Email Not Valid");
    }
    return true;
};

let passwordValidation = (password) => {
    let regx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gm;
    if (!regx.test(password)) {
        throw new Error("Password Must be at least 8 Chars Containing Letters, Capital letters, Digits and Special Character");
    }
    return true;
};

function setCookie(cookies) {
    for (i = 0; i < cookies.length; i++) {
        document.cookie = `${cookies[i][0]}=${cookies[i][1]};expires=${cookies[i][2]}`;
    }
}

/* handling events in JS*/
document.getElementById("name").onblur = function () {
    try {
        let valid = nameValidation(document.getElementById("name").value);
        if (valid) {
            document.getElementById("name").classList.remove("is-invalid");
            document.querySelector("#name+div").innerText = "";
        }
    } catch (e) {
        document.getElementById("name").classList.add("is-invalid");
        document.getElementById("name").focus();
        document.querySelector("#name+div").innerText = e.message;
    }

    if (CheckValidAll()) document.getElementById("sub").disabled = false;
};

document.getElementById("email").onblur = function () {
    try {
        let valid = emailValidation(document.getElementById("email").value);
        if (valid) {
            document.getElementById("email").classList.remove("is-invalid");
            document.querySelector("#email+div").innerText = "";
        }
    } catch (e) {
        document.getElementById("email").classList.add("is-invalid");
        document.getElementById("email").focus();
        document.querySelector("#email+div").innerText = e.message;
    }

    if (CheckValidAll()) document.getElementById("sub").disabled = false;
};

document.getElementById("pass").onblur = function () {
    try {
        let password = passwordValidation(document.getElementById("pass").value);
        if (password) {
            document.getElementById("pass").classList.remove("is-invalid");
            document.querySelector("#pass+div").innerText = "";
        }
    } catch (e) {
        document.getElementById("pass").classList.add("is-invalid");
        document.getElementById("pass").focus();
        document.querySelector("#pass+div").innerText = e.message;
    }

    if (CheckValidAll()) document.getElementById("sub").disabled = false;
};
document.getElementById("pass2").onblur = function () {
    try {
        let password = document.getElementById("pass").value;
        let passwordConfirm = document.getElementById("pass2").value;
        if (password == passwordConfirm) {
            document.getElementById("pass2").classList.remove("is-invalid");
            document.querySelector("#pass2+div").innerText = "";
        } else {
            throw Error(`Password and Password Confirm doesn't match`);
        }
    } catch (e) {
        document.getElementById("pass2").classList.add("is-invalid");
        document.getElementById("pass2").focus();
        document.querySelector("#pass2+div").innerText = e.message;
    }

    if (CheckValidAll()) document.getElementById("sub").disabled = false;
};

function CheckValidAll() {
    for (errorMessage of document.querySelectorAll(".invalid-feedback")) {
        if (errorMessage.innerText != "") return false;
    }
    return true;
}

document.getElementById("sub").addEventListener("click", (e) => {
    try {
        let userName = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("pass").value;
        let Confirmpassword = document.getElementById("pass2").value;
        if (password != Confirmpassword) {
            throw Error("Password and Password Confirm doesn't match");
        }
        e.preventDefault();
        nameValidation(userName);
        emailValidation(email);
        passwordValidation(password);
        let date = new Date();
        date.setMonth(date.getMonth() + 2);
        let cookies = [
            ["username", userName, date],
            ["email", email, date],
        ];
        setCookie(cookies);
        location.replace("http://127.0.0.1:8080/views/menu/index.html");
    } catch (error) {
        alert(error);
    }
});

