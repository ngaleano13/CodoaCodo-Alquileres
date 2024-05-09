const toastLiveExample = document.getElementById('liveToast');

function btnClick(ev) {

  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var subject = document.getElementById("subject").value.trim();
  var message = document.getElementById("message").value.trim();
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)

  if (name !== "" || email !== "" || subject !== "" || message !== "") {
    toastBootstrap.show();
  }
}
