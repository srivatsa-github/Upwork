let generateUser = document.querySelector(".generate");
generateUser.addEventListener("click", addUser);
let userExists = false;

function addUser(e) {
  if (userExists === false) {
    fetch("https://randomuser.me/api/")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        getName(data);
        getImg(data);
        userExists = true;
      });
  } else {
    let userData = document.querySelector(".randomUser");
    while (userData.firstChild !== null) {
      userData.removeChild(userData.firstChild);
    }
    fetch("https://randomuser.me/api/")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        getName(data);
        getImg(data);
        userExists = true;
      });
  }
}

function getImg(data) {
  let userImg = document.createElement("img");
  userImg.src = data.results[0].picture.thumbnail;

  let userData = document.querySelector(".randomUser");
  userData.appendChild(userImg);
}

function getName(data) {
  let user = data.results[0];
  let userName = document.createElement("p");
  userName.innerText =
    user.name.title + " " + user.name.first + " " + user.name.last;
  let userData = document.querySelector(".randomUser");
  userData.appendChild(userName);
}
