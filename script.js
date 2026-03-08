/* Login page Scripts */

document.getElementById("login-btn")?.addEventListener("click", function () {
  const username = document.getElementById("username-field").value;
  const password = document.getElementById("password-field").value;

  if (username === "admin" && password === "admin123") {
    window.location.href = "./main.html";
  } else {
    alert("Invalid username or password. Please try again.");
  }
});


/* Main Page Scripts */

// API url
const API_URL = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

/* Gets Element */

const issuesContainer = document.getElementById("issues-container");
const issuesCount = document.getElementById("issues-count");

const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");

const searchInput = document.getElementById("search-input");

const modal = document.getElementById("issue-modal");

const loading = document.getElementById("loading");

let allIssues = [];


/* Loading Spinner */

function showLoading() {
  loading.classList.remove("hidden");
}

function hideLoading() {
  loading.classList.add("hidden");
}


/* Load All Issues - API */

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


/* Display Issues */

function displayIssues(issues) {
  issuesContainer.innerHTML = "";

  issuesCount.innerText = `${issues.length} Issues`;

  issues.forEach((issue) => {
    let borderColor =
      issue.status === "open" ? "border-green-500" : "border-purple-500";

    let statusIcon =
      issue.status === "open"
        ? "./assets/Open-Status.png"
        : "./assets/Closed-Status.png";

    let labelsHTML = "";

    issue.labels.forEach((label) => {
      if (label === "bug") {
        labelsHTML += `
        <span class="bg-red-100 text-red-600 text-[10px] px-3 py-1 rounded-full font-bold flex items-center gap-1">
          <img src="./assets/Bug Vector.png" class="w-3 h-3">
          BUG
        </span>`;
      }

      if (label === "help wanted") {
        labelsHTML += `
        <span class="bg-yellow-100 text-yellow-600 text-[10px] px-3 py-1 rounded-full font-bold flex items-center gap-1">
          <img src="./assets/Help Vector.png" class="w-3 h-3">
          HELP WANTED
        </span>`;
      }
    });

    /* Display Issues Cards */

    const date = new Date(issue.createdAt).toLocaleDateString();

    let priorityClass = "";

    if (issue.priority === "high") {
      priorityClass = "bg-red-100 text-red-600";
    } else if (issue.priority === "medium") {
      priorityClass = "bg-yellow-100 text-yellow-600";
    } else if (issue.priority === "low") {
      priorityClass = "bg-gray-100 text-gray-600";
    }

    const card = document.createElement("div");

    card.className = `bg-white rounded-xl shadow-sm border-t-4 ${borderColor} p-5 hover:shadow-md transition cursor-pointer`;

    card.innerHTML = `
      <div class="flex justify-between items-start mb-3">

        <div class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
          <img src="${statusIcon}" class="w-4">
        </div>

        <span class="${priorityClass} text-[10px] font-semibold px-4 py-[3px] rounded-full uppercase">
          ${issue.priority}
        </span>

      </div>

      <h3 class="font-bold text-gray-800 text-sm mb-2">
        ${issue.title}
      </h3>

      <p class="text-gray-500 text-xs mb-4">
        ${issue.description}
      </p>

      <div class="flex gap-2 mb-4">
        ${labelsHTML}
      </div>

      <hr class="border-gray-100 mb-3">

      <div class="flex justify-between text-[10px] text-gray-500">
        <span>#${issue.id} by ${issue.author}</span>
        <span>${date}</span>
      </div>
    `;

    /* Card Click Modal */

    card.addEventListener("click", () => {
      loadSingleIssue(issue.id);
    });

    issuesContainer.appendChild(card);
  });
}


/* Active Tab Button */

function setActiveButton(activeButton) {
  const buttons = [allBtn, openBtn, closedBtn];

  buttons.forEach((btn) => {
    btn.classList.remove("bg-[#4F46E5]", "text-white", "shadow-md");
    btn.classList.add(
      "bg-white",
      "text-gray-600",
      "border",
      "border-gray-200",
      "hover:bg-gray-50"
    );
  });

  activeButton.classList.remove(
    "bg-white",
    "text-gray-600",
    "border",
    "border-gray-200",
    "hover:bg-gray-50"
  );

  activeButton.classList.add("bg-[#4F46E5]", "text-white", "shadow-md");
}


/* Filter Tabs */

allBtn.addEventListener("click", () => {
  setActiveButton(allBtn);
  displayIssues(allIssues);
});

openBtn.addEventListener("click", () => {
  setActiveButton(openBtn);

  const openIssues = allIssues.filter((issue) => issue.status === "open");

  displayIssues(openIssues);
});

closedBtn.addEventListener("click", () => {
  setActiveButton(closedBtn);

  const closedIssues = allIssues.filter((issue) => issue.status === "closed");

  displayIssues(closedIssues);
});
