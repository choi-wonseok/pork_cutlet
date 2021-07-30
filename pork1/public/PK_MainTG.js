var settingmenu = document.querySelector(".settings_menu");

function settingsMenuToggle() {
  settingmenu.classList.toggle("settings_menu_height");
}

$(this).click(function (e) {
  $(this).find("ul").stop(true, true).slideDown();
  e.preventDefault();
});

// $(document).ready(function () {
//   var spanSubmit = $(".submit-span");

//   spanSubmit.on("click", function () {
//     $(this).closest("form").submit();
//   });
// });
// <label>
//   <span id="searchButton" class="search icon-small open-btn"></span>
//   <input type="submit" style="display:none"/>
// </label>
