console.log(localStorage.getItem("name"));

document.getElementById("titel").value =
  "Hi " +
  localStorage.getItem("name") +
  " Looking for job? this is the place for you!";
