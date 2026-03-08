 /* Login page Scripts */

document.getElementById('login-btn')?.addEventListener('click', function () {
    const username = document.getElementById('username-field').value;
    const password = document.getElementById('password-field').value;

    if (username === "admin" && password === "admin123") {
        window.location.href = "./main.html";
    } else {
        alert("Invalid username or password. Please try again.");
    }
});











/* Main Page Scripts */

// API url
const API_URL = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

/*Gets Element*/

const issuesContainer = document.getElementById("issues-container");
const issuesCount = document.getElementById("issues-count");

const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");

const searchInput = document.getElementById("search-input");

const modal = document.getElementById("issue-modal");

const loading = document.getElementById("loading");

let allIssues = [];


/*Loading Spinner*/

function showLoading() {
  loading.classList.remove("hidden");
}

function hideLoading() {
  loading.classList.add("hidden");
}


/*Load All Issues-API*/

async function loadIssues() {

  try {

    showLoading();

    const res = await fetch(API_URL);
    const data = await res.json();

    allIssues = data.data;

    displayIssues(allIssues);

  } catch (error) {

    console.log("Error loading issues:", error);

  } finally {

    hideLoading();

  }

}

loadIssues();
