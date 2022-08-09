const socket = io();

socket.on("ad-added", (ad) => {
  console.log("ad added!", ad);
  allAds.push(ad);
});

async function suprizeme() {}
async function getSerchAdJob() {
  document.getElementById("serchblock").style.visibility = "hidden";

  const salary = document.getElementById("salarySerch").value;
  const experiense = document.getElementById("experienseEdit").value;
  const locationName = document.getElementById("locationSerch").value;

  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      experiense,
      salary,
      locationName,
    }),
  };

  const res = await fetch("/getAdSerchJob", options);
  const ads = await res.json();
  allAds = ads;

  console.log(ads);
  start();
}

async function getSerchAdCompany() {
  document.getElementById("serchblock").style.visibility = "hidden";
  const name = document.getElementById("nameSerch").value;
  const employees = document.getElementById("employeesSerch").value;
  const years = document.getElementById("yearsSerch").value;

  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      employees,
      years,
    }),
  };

  const res = await fetch("/getAdSerchCompany", options);
  const ads = await res.json();
  allAds = ads;

  console.log(ads);
  start();
}

async function getAllAd() {
  document.getElementById("serchblock").style.visibility = "hidden";

  const res = await fetch("/apiscreen");
  const ads = await res.json();

  allAds = ads;

  start();
}

let allAds = [];

async function start() {
  if (allAds.length == 0) {
    alert("There is no jpb for you, soory. refresh and try again");
  }
  while (true) {
    for (let ad of allAds) {
      // if (1) {
      // const res = await fetch(ad.templateUrl);
      // const html = await res.text();

      // document.getElementById("result").innerHTML = html;
      document.getElementById("divmap").style = "display: block";
      document.getElementById("result").style = "display: block";
      document.getElementById("serch").style = " visibility: hidden";

      veryCoolMap.setCenter(ad.location);
      veryCoolMarker.setPosition(ad.location);

      document.getElementById("text").innerText = ad.texts;
      document.getElementById("experions").innerText =
        "Experiencse: " + ad.experiense;
      document.getElementById("salary").innerText = "Salary: " + ad.salary;
      document.getElementById("company-name").innerText = "Name: " + ad.name;
      document.getElementById("employees").innerText =
        "The company have " + ad.employees + " employees";
      document.getElementById("years").innerText =
        "The company exist " + ad.years + " years";
      // document.getElementById("video").src =
      //   "https://www.youtube.com/watch?v=_VMYPLXnd7E";

      await sleep(10 * 1000);
    }
    await sleep(0);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// f();
