/* 헤더 토글 */
var settingmenu = document.querySelector(".settings_menu");

function settingsMenuToggle() {
  settingmenu.classList.toggle("settings_menu_height");
}

$(this).click(function (e) {
  $(this).find("ul").stop(true, true).slideDown();
  e.preventDefault();
});

function sideMenu() {
  let menu = document.querySelector(".menu");
  let side_menu = document.querySelector(".side_menu");
  menu.classList.toggle("active");
  side_menu.classList.toggle("active");
}
/* 게시물 토글 */
var postmenu = document.querySelector(".post_menu");

function PostToggle() {
  postgmenu.classList.toggle("post_menu_height");
}

$(this).click(function (e) {
  $(this).find("ul").stop(true, true).slideDown();
  e.preventDefault();
});

// 더보기

$(function () {
  $(".main_contents").slice(0, 10).show();
  $(".more").click(function (e) {
    e.preventDefault();
    $(".main_contents:hidden").slice(0, 5).slideDown();
    if ($(".main_contents:hidden").length == 0) {
      $(".more").fadeOut("slow");
    }
  });
});

// $(document).ready(function () {
//   $("#comment_list").on("click", function () {
//     $.ajax({
//       URL: "/list",
//       type: "GET",
//       success: function (contents) {
//         $("#demo").empty();
//         $("#demo").append("<form method='post' action=''");
//         $("#demo").append(
//           "<input id='comment' name='comment' placeholder='댓글'>"
//         );
//         $("#demo").append("<button id='submit'>등록</button>");
//         $("#demo").append("</form>");
//         $(contents).each(function (index, data) {
//           $("#demo").append("<div class='comments'");
//           $("#demo").append("<p>" + data.CONTENTS + "</p>");
//           $("#demo").append("<br>");
//           $("#demo").append(data.COMMENT);
//           $("#demo").append("<p>" + data.WRT_DTT + "</p>");
//           $("#demo").append("</div>");
//           $("#demo").append("<hr>");
//         });
//       },
//     });
//   });
// });

// $(function () {
//   $("#like").click(function () {
//     var $this = $("#material-icons");
//     if ($this.hasId("highlighted")) {
//       $this.removeId("highlighted");
//     } else {
//       $this.addId("highlighted");
//     }
//   });
// });
// $(function () {
//   var cnt = 0;
//   $("#like").click(function () {
//     cnt++;
//     $("#like_cnt").text("thumb_up" + cnt);
//   });
// });

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

// popup

// function showPopup(hasFilter) {
//   const popup = document.querySelector("#popup");

//   if (hasFilter) {
//     popup.classList.add("has-filter");
//   } else {
//     popup.classList.remove("has-filter");
//   }

//   popup.classList.remove("hide");
// }

// function closePopup() {
//   const popup = document.querySelector("#popup");
//   popup.classList.add("hide");
// }

// <a onclick="showPopup(true)"><%= data.WRT_ID%></a></p>
// <div id="popup" class="hide">
//     <div class="content">
//       <p></p>

//       </p>
//       <button onclick="closePopup()">닫기</button>
//     </div>
//   </div>
