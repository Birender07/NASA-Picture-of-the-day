window.onload = function getCurrentImageOfTheDay() {
  const currentDate = new Date().toISOString().split("T")[0];
  fetch(
    `https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=Y5CaV83P8geZUa8yplSZPn5OOpF7mK6ncs234uMp`
  )
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(
        "#current-image-container"
      ).innerHTML = `<img src="${data.url}" alt="Example">
            <h3> ${data.title} </h3>
            <p> ${data.explanation} </p>
            `;
    })
    .catch((error) => console.error("Error:", error));
  localStorage.clear();
  addSearchToHistory();
};

document.querySelector("button").addEventListener("click", getImageOfTheDay);

function getImageOfTheDay(event) {
  event.preventDefault();
  const searchDate = document.querySelector("#search-input").value;
  fetch(
    `https://api.nasa.gov/planetary/apod?date=${searchDate}&api_key=Y5CaV83P8geZUa8yplSZPn5OOpF7mK6ncs234uMp`
  )
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#current-image-container").innerHTML = ``;
      document.querySelector(
        "#current-image-container"
      ).innerHTML = `<h1>Picture On ${data.date}</h1><img src="${data.url}" alt="Example">
            <h3> ${data.title} </h3>
            <p> ${data.explanation} </p>
            `;
    })
    .catch((error) => console.error("Error:", error));

  function saveSearch() {
    let searches = JSON.parse(localStorage.getItem("Searches")) || [];

    searches.push({ date: searchDate });

    localStorage.setItem("Searches", JSON.stringify(searches));
  }
  saveSearch();
  addSearchToHistory();
}

function addSearchToHistory() {
  const searches = JSON.parse(localStorage.getItem("Searches")) || [];
  const searchHistoryList = document.getElementById("search-history");
  searchHistoryList.innerHTML = "";
  searches.forEach((search) => {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.textContent = search.date;
    link.href = "#"; // Set the href attribute to '#' or any other value
    link.style.textDecoration = "underline"; // Add underline
    link.style.color = "blue"; // Set the link color

    listItem.addEventListener("click", function () {
      fetch(
        `https://api.nasa.gov/planetary/apod?date=${search.date}&api_key=Y5CaV83P8geZUa8yplSZPn5OOpF7mK6ncs234uMp`
      )
        .then((response) => response.json())
        .then((data) => {
          document.querySelector("#current-image-container").innerHTML = ``;
          document.querySelector(
            "#current-image-container"
          ).innerHTML = `<h1>Picture On ${data.date}</h1><img src="${data.url}" alt="Example">
            <h3> ${data.title} </h3>
            <p> ${data.explanation} </p>
            `;
        })
        .catch((error) => console.error("Error:", error));
    });

    listItem.appendChild(link);
    searchHistoryList.appendChild(listItem);
  });
}
addSearchToHistory();
