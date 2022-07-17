async function geocode(locationName) {
  const geocode = await fetch(
    "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBkidOHDUiNEDVET4YBNFOZW6jVPpOqLN0&address=" +
      encodeURIComponent(locationName)
  ).then((res) => res.json());

  const latlng = geocode.results[0].geometry.location;
  return latlng;
}

async function add_ads() {
  var name = document.getElementById("name").value;
  document.getElementById("name").value = "";
  var templateName = document.getElementById("template").value;
  document.getElementById("template").value = "";
  var texts = document.getElementById("text").value;
  document.getElementById("text").value = "";
  var locationName = document.getElementById("location").value;
  document.getElementById("location").value = "";
  const salary = document.getElementById("salary").value;
  document.getElementById("salary").value = "";
  const employees = document.getElementById("employees").value;
  document.getElementById("employees").value = "";
  const years = document.getElementById("years").value;
  document.getElementById("years").value = "";
  const experiense = document.getElementById("experiense").value;
  document.getElementById("experiense").value = "";
  const video = document.getElementById("Video").value;
  document.getElementById("Video").value = "";

  const latlng = await geocode(locationName);
  console.log(latlng);

  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      templateName,
      texts: texts,
      experiense,
      salary,
      location: latlng,
      locationName,
      employees,
      years,
      video,
    }),
  };

  const res = await fetch("/addAd", options);
  if (res.status === 200) {
    get_adds_name();
    alert("item added successfully");
  }
}

async function updateAdd() {
  const texts = document.getElementById("textEdit").value;
  const locationName = document.getElementById("locationEdit").value;
  const templateName = document.getElementById("templateEdit").value;
  const name = document.getElementById("edit").value;
  const salary = parseInt(document.getElementById("salaryEdit").value);
  const experiense = document.getElementById("experienseEdit").value;
  const employees = document.getElementById("employeesEdit").value;
  const years = document.getElementById("yearsEdit").value;

  const location =
    adBeingUpdated.locationName === locationName
      ? adBeingUpdated.location
      : await geocode(locationName);

  const res = await fetch("/updateAd", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      templateName,
      texts,
      salary,
      experiense,
      location,
      locationName,
      employees,
      years,
      _id: adBeingUpdated._id,
    }),
  });

  if (res.status === 200) {
    get_adds_name();
    alert("item updated successfully");
  } else {
    alert("sorry... something went wrong");
  }
}

let adBeingUpdated;

async function edit_item() {
  document.getElementById("hederEdit").style.visibility = "hidden";

  document.getElementById("editBlock").style.display = "block";
  document.getElementById("deleteblock").style.display = "none";
  document.getElementById("addblock").style.display = "none";
  document.getElementById("edit").style.display = "block";

  const name = document.getElementById("edit").value;
  const ad = await fetch("/getAd/?name=" + encodeURIComponent(name)).then(
    (res) => res.json()
  );

  document.getElementById("textEdit").value = ad.texts;
  document.getElementById("locationEdit").value = ad.locationName;
  document.getElementById("templateEdit").value = ad.templateName;
  document.getElementById("salaryEdit").value = ad.salary;
  document.getElementById("experienseEdit").value = ad.experiense;
  document.getElementById("employeesEdit").value = ad.employees;
  document.getElementById("yearsEdit").value = ad.years;
  document.getElementById("nameEdit").value = ad.name;

  adBeingUpdated = ad;
}

async function get_adds_name() {
  const res = await fetch("/adds_name");
  const ads_name = await res.json();
  console.log(ads_name);

  var parentdelet = document.getElementById("delete");
  var parentedit = document.getElementById("edit");

  parentdelet.innerHTML = "";
  parentedit.innerHTML = "";

  for (var ad in ads_name) {
    var opthin = document.createElement("option");
    opthin.value = ads_name[ad];
    opthin.text = ads_name[ad];

    var option2 = document.createElement("option");
    option2.value = ads_name[ad];
    option2.text = ads_name[ad];

    parentdelet.appendChild(option2);
    parentedit.appendChild(opthin);
  }
}

async function delete_item() {
  const to_delete = document.getElementById("delete").value;
  const res = await fetch("/deleteAd", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to_delete,
    }),
  });
  if (res.status === 200) {
    get_adds_name();
    alert("item deleted successfully");
  }
}

get_adds_name();
