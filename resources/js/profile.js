document.getElementById("save").disabled = true;

if (!document.cookie) {
  location.replace("http://127.0.0.1:8080/views/signin/index.html");
}

let telValidation = (telephone) => {
  let regx = /^(010|011|012|015)[0-9]{8}$/gm;
  if (!regx.test(telephone)) {
    throw new Error("Phone Must be 11 Digit starts with 010|011|012|015");
  }
  return true;
};

document.getElementById("telephone").onblur = function () {
  try {
      let valid = telValidation(document.getElementById("telephone").value);
      if (valid) {
          document.getElementById("telephone").classList.remove("is-invalid");
          document.querySelector("#telephone+div").innerText = "";
      }
  } catch (e) {
      document.getElementById("telephone").classList.add("is-invalid");
      document.getElementById("telephone").focus();
      document.querySelector("#telephone+div").innerText = e.message;
  }

  if (CheckValidAll()) document.getElementById("save").disabled = false;
};

function CheckValidAll() {
  for (errorMessage of document.querySelectorAll(".invalid-feedback")) {
      if (errorMessage.innerText != "") return false;
  }
  return true;
}

document.getElementById("save").addEventListener("click", (e) => {
  try {
    let phone = document.getElementById("telephone").value;
    let address = document.getElementById("address").value;
    e.preventDefault();
    telValidation(phone);
    if(!address) throw new Error('Address cannot be empty')
    let date = new Date();
    date.setMonth(date.getMonth() + 2);
    let cookies = [
      ["phone", phone, date],
      ["address", address, date],
    ];
    setCookie(cookies);
    location.replace("http://127.0.0.1:8080/views/menu/index.html");
  } catch (error) {
    alert(error);
  }
});



function setCookie(cookies) {
  for (i = 0; i < cookies.length; i++) {
    document.cookie = `${cookies[i][0]}=${cookies[i][1]};expires=${cookies[i][2]}`;
  }
}


let logout = () => {
  let cookies = [
    ["email", "", '9-9-2009'],
  ];
  delCookie(cookies);
};


function delCookie(cookies) {
  for (i = 0; i < cookies.length; i++) {
    document.cookie = `${cookies[i][0]}=${cookies[i][1]};expires=${cookies[i][2]}`;
  }
  setTimeout(() => {
    location.href = "http://127.0.0.1:8080/views/home/index.html";
  }, 1000);
}
