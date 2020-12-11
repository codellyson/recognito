function updateProgress() {
  console.log("update", this.responseText);
}
function transferComplete() {
  console.log("Complete", this.responseText);
}
function transferFailed() {
  console.log("Failed", this.responseText);
}
function transferCanceled() {
  console.log("Cancelled", this.responseText);
}
const xhr = new XMLHttpRequest();
// xhr.setRequestHeader("Content-Type", "application/json");
function convertImageUrl(e) {
  const imageUrl = document.querySelector("#img-url").value;

  // xhr.addEventListener("progress", updateProgress);
  // xhr.addEventListener("load", transferComplete);
  // xhr.addEventListener("error", transferFailed);
  // xhr.addEventListener("abort", transferCanceled);

  xhr.open("post", "/");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onprogress = function (e) {
    // console.log(e.loaded, e.total);
    if (e.lengthComputable) {
      const tt = Math.round((e.loaded / e.total) * 100) + "%";
      setInterval(() => {
        document.querySelector(".progress-bar").style.width = tt;
      }, 1000);
      console.log(tt);
    }
  };
  // xhr.addEventListener("load", logReq);
  xhr.send(JSON.stringify({ url: imageUrl.trim() }));

  xhr.onload = function () {
    console.log("Loading");
    const data = JSON.parse(xhr.response);
    console.log(data);
    document.getElementById("output").innerHTML = `
      <p> ${data.text}</p>
    `;
  };
}

document.addEventListener("submit", function (e) {
  if (e.target.id !== "upload-form") return;
  e.preventDefault();
  uploadImage();
});

function uploadImage(e) {
  const uploadForm = document.querySelector("#upload-form");
  const uploadValue = uploadForm.querySelector("#customFile").files[0].name;

  xhr.open("post", "/");
  // xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(uploadValue);
  console.log(uploadValue);
}
