document.getElementById("sub").disabled = true;

if (document.cookie) {
  location.replace("http://127.0.0.1:8080/views/menu/index.html");
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

document.getElementById("password").onblur = function () {
  try {
      let password = passwordValidation(document.getElementById("password").value);
      if (password) {
          document.getElementById("password").classList.remove("is-invalid");
          document.querySelector("#password+div").innerText = "";
      }
  } catch (e) {
      document.getElementById("password").classList.add("is-invalid");
      document.getElementById("password").focus();
      document.querySelector("#password+div").innerText = e.message;
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
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        e.preventDefault();
        emailValidation(email);
        passwordValidation(password);
        let date = new Date();
        date.setMonth(date.getMonth() + 2);
        let cookies = [["email", email, date]];
        setCookie(cookies);
        location.replace("http://127.0.0.1:8080/views/menu/index.html");
    } catch (error) {
        console.log(error.message);
    }
});

function setCookie(cookies) {
    for (i = 0; i < cookies.length; i++) {
        document.cookie = `${cookies[i][0]}=${cookies[i][1]};expires=${cookies[i][2]}`;
    }
}
