let cityInput = document.getElementById("cityInput");
let btn = document.querySelector("#btn");
let result = document.querySelector("#result");
let container = document.querySelector(".container");

async function getFacts() {
  result.classList.remove("error-message", "full-content");
  let cityName = cityInput.value.toLowerCase().trim();
  if (cityName === "") {
    result.innerHTML = " ⚠️ Please enter a city!";
    result.classList.add("show", "error-message");
    result.classList.remove("loading");
    container.classList.remove("expanded");
    document.body.classList.remove("has-content");
    return;
  }

  result.classList.add("show", "loading");
  result.innerHTML = "loading";

  let today = new Date().toISOString().split("T")[0];
  let URL = `https://api.aladhan.com/v1/timingsByAddress/${today}?address=${cityName}&method=8`;
  let response = await fetch(URL);
  console.log(response);
  let data = await response.json();
  console.log(data);

  if (data.code === 200) {
    result.innerHTML = `
    <div class = "resultAfterContent"><h1>${data.data.meta.timezone}</h1> <h6>${data.data.meta.method.name}</h6></div>
    <div class = "firsth2"><h2>🌙 Fajr </h2> <span>${data.data.timings.Fajr}</span></div>
     <div class = "firsth2"><h2>☀️ Dhuhr </h2> <span>${data.data.timings.Dhuhr}</span></div>
     <div class = "firsth2"><h2>🌤️ Asr </h2> <span>${data.data.timings.Asr}</span></div>
     <div class = "firsth2"><h2>🌅 Maghrib </h2> <span>${data.data.timings.Maghrib}</span></div>
     <div class = "firsth2"><h2>✨ Isha </h2> <span>${data.data.timings.Isha}</span></div>`;
    result.classList.add("show");
    result.classList.remove("loading");
    result.classList.add("full-content");
    container.classList.add("expanded");
    document.body.classList.add("has-content");
  }
}
btn.addEventListener("click", getFacts);
