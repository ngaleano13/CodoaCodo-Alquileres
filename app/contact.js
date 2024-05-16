const toastLiveExample = document.getElementById('liveToast');

function btnSendMail() {
  
  let inputName = document.querySelector('#contact-name').value;
  let inputMail = document.querySelector('#contact-mail').value;
  let inputSubject = document.querySelector('#contact-subject').value;
  let inputMessage = document.querySelector('#contact-message').value;

  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)

  if(inputName.value !== "" && inputMail !== "" && inputSubject !== "" && inputMessage !== ""){
    toastBootstrap.show();

  }
}
