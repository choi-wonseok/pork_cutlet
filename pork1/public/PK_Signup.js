/*변수 선언*/

var id = document.querySelector("#userid");

var userName = document.querySelector("#fullname");

var pw1 = document.querySelector("#password");
var pwMsg = document.querySelector("#alertTxt");
var pwImg1 = document.querySelector("#pswd1_img1");

var pw2 = document.querySelector("#pswd2");
var pwImg2 = document.querySelector("#pswd2_img1");
var pwMsgArea = document.querySelector(".int_pass");

var gender = document.querySelector("#gender");

var email = document.querySelector("#email");

var sub = document.querySelector("#haksa");

var error = document.querySelectorAll(".error_next_box");

/*이벤트 핸들러 연결*/

id.addEventListener("focusout", checkId);
userName.addEventListener("focusout", checkName);
pw1.addEventListener("focusout", checkPw);
pw2.addEventListener("focusout", comparePw);
gender.addEventListener("focusout", function () {
  if (gender.value === "성별") {
    error[4].style.display = "block";
  } else {
    error[4].style.display = "none";
  }
});
email.addEventListener("focusout", isEmailCorrect);
sub.addEventListener("focusout", function () {
  if (sub.value === "") {
    error[6].innerHTML = "필수정보입니다.";
    error[6].style.display = "block";
  } else {
    error[6].style.display = "none";
  }
});
/*콜백 함수*/

function checkId() {
  if (id.value === "") {
    error[0].innerHTML = "필수 정보입니다.";
    error[0].style.display = "block";
  } else if (id.value.length != 8) {
    error[0].innerHTML = "8자리로 적어주세요";
    error[0].style.display = "block";
  } else {
    error[0].innerHTML = "환영합니다";
    error[0].style.color = "#08A600";
    error[0].style.display = "block";
  }
}

function checkName() {
  var namePattern = /^[가-힣]{2,5}$/;

  if (userName.value === "") {
    error[1].innerHTML = "필수 정보입니다.";
    error[1].style.display = "block";
  } else if (!namePattern.test(userName.value)) {
    error[1].innerHTML =
      "이름을 제대로 입력하세요. (영문, 특수기호, 공백 사용 불가)";
    error[1].style.display = "block";
  } else {
    error[1].style.display = "none";
  }
}

function checkPw() {
  var pwPattern = /[a-zA-Z0-9~!@#$%^&*()_+|<>?:{}]{8,16}/;
  if (pw1.value === "") {
    error[2].innerHTML = "필수 정보입니다.";
    pwMsg.style.display = "block";
    pwMsgArea.style.paddingRight = "40px";
    error[2].style.display = "block";
  } else if (!pwPattern.test(pw1.value)) {
    error[2].innerHTML = "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.";
    pwMsg.innerHTML = "사용불가";
    pwMsgArea.style.paddingRight = "93px";
    error[2].style.display = "block";
    pwMsg.style.color = "red";
    pwMsg.style.display = "block";
  } else {
    error[2].style.display = "none";
    pwMsg.innerHTML = "안전";
    pwMsgArea.style.paddingRight = "93px";
    pwMsg.style.color = "#03c75a";
    pwMsg.style.display = "block";
  }
}

function comparePw() {
  if (pw2.value === pw1.value && pw2.value != "") {
    error[3].style.display = "none";
  } else if (pw2.value !== pw1.value) {
    error[3].innerHTML = "비밀번호가 일치하지 않습니다.";
    error[3].style.display = "block";
  }

  if (pw2.value === "") {
    error[3].innerHTML = "필수 정보입니다.";
    error[3].style.display = "block";
  }
}

function isEmailCorrect() {
  var emailPattern = /[a-z0-9]{2,}@[a-z0-9-]{2,}\.[a-z0-9]{2,}/;

  if (email.value === "선택입력") {
    error[5].style.display = "none";
  } else if (!emailPattern.test(email.value)) {
    error[5].style.display = "block";
  } else {
    error[5].style.display = "none";
  }
}
