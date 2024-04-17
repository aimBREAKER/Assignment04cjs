document.addEventListener("DOMContentLoaded", function () {
  // Event listeners
  document
    .getElementById("showStudentInfoButton")
    .addEventListener("click", showStudentInfo);

  document
    .getElementById("searchButton")
    .addEventListener("click", () =>
      fetchAnimeData(document.getElementById("searchQuery").value)
    );

  document
    .getElementById("searchByIdButton")
    .addEventListener("click", () =>
      fetchAnimeById(document.getElementById("animeIdInput").value)
    );

  // Display student info
  function showStudentInfo() {
    document.getElementById("student-info").innerHTML =
      "<p>Student ID: 200508182 | Name: Ashish Arora</p>";
  }

  // Fetch anime data by title (using Fetch API)
  async function fetchAnimeData(query) {
    const apiUrl = `https://api.jikan.moe/v4/anime?q=${query}&limit=10`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      displayData(data.data);
    } catch (error) {
      console.error("Error fetching anime data:", error);
    }
  }

  // Fetch anime data by ID (using Fetch API)
  async function fetchAnimeById(animeId) {
    const apiUrl = `https://api.jikan.moe/v4/anime/${animeId}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      displaySingleAnime(data);
    } catch (error) {
      console.error("Error fetching anime by ID:", error);
    }
  }

  // Display multiple anime data
  function displayData(animeList) {
    const dataOutputDiv = document.getElementById("data-output");
    dataOutputDiv.innerHTML = animeList
      .map((anime) => createAnimeItemHTML(anime))
      .join("");
  }

  // Display single anime data
  function displaySingleAnime(anime) {
    const singleAnimeOutputDiv = document.getElementById("single-anime-output");
    singleAnimeOutputDiv.innerHTML = createAnimeItemHTML(anime);
  }

  // Create HTML for anime item
  function createAnimeItemHTML(anime) {
    return `
      <div class="anime-item">
        <h2 class="anime-title">${anime.title}</h2>
        <img class="anime-img" src="${anime.images.jpg.image_url}" alt="${anime.title}" />
        <p>${anime.synopsis}</p>
      </div>
    `;
  }
});

