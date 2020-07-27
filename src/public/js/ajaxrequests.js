$(document).ready(function () {
  //   const urlConvertBtn = document.querySelector("#url-convert-button");
  //   urlConvertBtn.addEventListener("click", convertImageUrl);
  const imageHolder = document.getElementById("image-holder");

  $("#upload-form").submit((e) => {
    e.preventDefault();

    let formData = new FormData();
    let dd = document.querySelector("#customFile").files[0];
    formData.append("image_upload", dd);
    $("#upload-btn").text("please wait...");
    $.ajax({
      type: "post",
      url: "/",
      processData: false,
      contentType: false,
      data: formData,
      xhr: function () {
        const xhr = new window.XMLHttpRequest();
        xhr.addEventListener("progress", function (e) {
          if (e.lengthComputable) {
            let prgress = (e.loaded / e.total) * 100;
            console.log(prgress);
          }
        });
        return xhr;
      },
    })
      .done((res) => {
        $("#upload-btn").text("convert");
        alert(res.result);
        window.location.reload();
      })
      .fail((res) => {
        console.log(res);
      });
  });
  $(".single-convert-btn").click(function (e) {
    const target = e.target;
    const id = target.getAttribute("data-id");
    $(this).text("please wait...");
    console.log(id);
    $.ajax({
      url: "/image/" + id,
      type: "GET",
    })
      .done((res) => {
        console.log(res.result);
        window.location = "/download";
        $(this).text("done");
      })
      .fail((res) => {
        console.log(res.message);
      });
  });
});
