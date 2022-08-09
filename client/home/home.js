async function signUp() {
  const name = document.getElementById("nameUp").value;
  const password = document.getElementById("passwordUp").value;
  console.log(name, password);
  const res = await fetch("/insertUser", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      password,
    }),
  });

  if (res.status === 200) {
    localStorage.setItem("name", name);
    window.location = "/main";
  } else {
    alert("sorry... something went wrong");
  }
}

async function signIn() {
  const name = document.getElementById("nameIn").value;
  const password = document.getElementById("passwordIn").value;
  console.log(name, password);
  const res = await fetch("/signInUser", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      password,
    }),
  });
  const user = await res.json();
  console.log(user);
  if (user.length != 0) {
    localStorage.setItem("name", name);
    window.location = "/main";
  } else {
    alert("password is rong");
  }
}
