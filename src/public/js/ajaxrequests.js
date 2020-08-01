$(document).ready(function () {
  function toast(content, title, alertType, showDismissBtn, timeout) {
    halfmoon.initStickyAlert({
      content: content,
      title: title,
      alertType: alertType,
      hasDismissButton: showDismissBtn,
      timeShown: timeout,
    });
  }
  document.getElementById("toggle-sidebar").onclick = function () {
    halfmoon.toggleSidebar();
  };
  // File upload function
  $("#upload-form").submit((e) => {
    e.preventDefault();

    let formData = new FormData();
    const inputFiles = document.querySelector("#customFile");

    for (const file of inputFiles.files) {
      formData.append("image_upload", file);
    }
    $("#upload-btn").text("please wait...");
    toast("uploading please wait...", "Info", "alert-secondary", false, 1000);

    $.ajax({
      type: "post",
      url: "/",
      processData: false,
      contentType: false,
      data: formData,
    })
      .done((res) => {
        $("#upload-btn").text("convert");
        toast(res.message, "Info", "alert-success", true, 10000);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .fail((res) => {
        toast(res.message, "Info", "alert-danger", true, 10000);
        setTimeout(() => {
          window.location.href = "/recognize";
        }, 10000);
      });
  });
  // Convert button function
  $(".single-convert-btn").click(function (e) {
    const target = e.target;
    const id = target.getAttribute("data-id");
    target.classList.add("fa-spin");
    toast(
      "Recognizing please wait...",
      "Info",
      "alert-secondary",
      false,
      10000
    );

    $.ajax({
      url: "/image/" + id,
      type: "GET",
    })
      .done((res) => {
        toast(
          "Recognition completed! wait for auto download 😎",
          "Info",
          "alert-success",
          true,
          10000
        );
        target.classList.remove("fa-spin");
        window.location = "/download";
      })
      .fail((res) => {
        toast(res.message, "Error", "alert-danger", true, 10000);
      });
  });
  // Remove Button function
  $(".remove-btn").click(function (e) {
    const target = e.target;
    const id = target.getAttribute("data-id");
    $.ajax({
      url: "/image/" + id,
      type: "DELETE",
    })
      .done((res) => {
        toast(res.message, "Info", "alert-success", true, 1000);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .fail((res) => {
        toast(res.message, "Error", "alert-danger", true, 10000);
        setTimeout(() => {
          window.location.reload();
        }, 10000);
      });
  });
  // remove all task function
  // $(".remove-all-tasks").click(function (e) {
  //   $.ajax({
  //     url: "/image/",
  //     type: "DELETE",
  //   })
  //     .done((res) => {
  //       toast(res.message, "Info", "alert-success", true, 1000);
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 1000);
  //     })
  //     .fail((res) => {
  //       toast(res.message, "Error", "alert-danger", true, 10000);
  //     });
  // });
});
