document.addEventListener("pjax:complete", tonav);
document.addEventListener("DOMContentLoaded", tonav);
function is_home() {
  if (
    window.document.location.href != "http://localhost:4000/" &&
    window.document.location.href != "http://cloudchewie.com/" &&
    window.document.location.href != "http://www.cloudchewie.com" &&
    window.document.location.href != "http://github.cloudchewie.com" &&
    window.document.location.href != "https://localhost:4000/" &&
    window.document.location.href != "https://cloudchewie.com/" &&
    window.document.location.href != "https://www.cloudchewie.com" &&
    window.document.location.href != "https://github.cloudchewie.com"
  )
    return false;
  return true;
}
function tonav() {
  if (localStorage.getItem("fixedNav") == "1" && !is_home()) {
    $("#name-container").show();
    var position = $(window).scrollTop();
    $(window).scroll(function () {
      if (localStorage.getItem("fixedNav") == "1") {
        var scroll = $(window).scrollTop();
        if (scroll > position) {
          $("#page-header").addClass("nav-down");
        } else {
          $("#page-header").removeClass("nav-down");
        }
        position = scroll;
      }
    });
    document.getElementById("page-name").innerText =
      document.title.split(" | Cloudchewie")[0];
  } else {
    $("#name-container").hide();
  }
}
