let interviewCount = [];
let rejectedCount = [];
let currentStatus = "all";

const filterAllBtn = document.getElementById("filter-all-btn");
const filterIntervewBtn = document.getElementById("filter-interview-btn");
const filterRejectedBtn = document.getElementById("filter-rejected-btn");

const totalJobCount = document.getElementById("total-job-count");
const JobCounter = document.getElementById("job-counter");
const totalInterviewCount = document.getElementById("total-interview-count");
const totalRejectedCount = document.getElementById("total-rejected-count");

const cardContainer = document.getElementById("cards-container");
const mainContainer = document.querySelector('main');

const filterSection = document.getElementById("filter-section");


// const btnDelete = document.querySelectorAll(".btn-delete");
const noJobs = document.getElementById("no-job");



// counter section=======
function updateCount() {
    totalJobCount.innerText = cardContainer.children.length;
    JobCounter.innerText = cardContainer.children.length;
    totalInterviewCount.innerText = interviewCount.length;
    totalRejectedCount.innerText = rejectedCount.length;

    noJobs.classList.add('hidden');

    if (currentStatus === "filter-all-btn" && cardContainer.children.length === 0) {
        noJobs.classList.remove('hidden');
    }
    if (currentStatus === "filter-interview-btn" && interviewCount.length === 0) {
        noJobs.classList.remove('hidden');
    }
    if (currentStatus === "filter-rejected-btn" && rejectedCount.length === 0) {
        noJobs.classList.remove('hidden');
    }
}
// console.log(currentStatus)
updateCount();



// Button Toggleing========
function btnToggleing(id) {
    filterAllBtn.classList.add('btn-outline');
    filterIntervewBtn.classList.add('btn-outline');
    filterRejectedBtn.classList.add('btn-outline');

    filterAllBtn.classList.remove('btn-active');
    filterIntervewBtn.classList.remove('btn-active');
    filterRejectedBtn.classList.remove('btn-active');

    const selected = document.getElementById(id);
    currentStatus = id;
    selected.classList.add('btn-active');

    if (id == "filter-interview-btn") {
        cardContainer.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderingIntervewcard();
    }else if (id == "filter-all-btn") {
        cardContainer.classList.remove('hidden');
        filterSection.classList.add('hidden');
    }else if (id == "filter-rejected-btn") {
        cardContainer.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderingRejectedcard();
    }
    updateCount();
}





// // Total count
// btnDelete.forEach(btn => {
//     btn.addEventListener("click", function () {
//         const card = this.closest(".job-card");
//         card.remove();
//         updateCount();
//     })
// })

// filterAllBtn.addEventListener("click", function () {
//     currentFilter = "all";
//     updateCount();
// });
// filterIntervewBtn.addEventListener("click", function () {
//     currentFilter = "interview";
//     updateCount();
// });
// filterRejectedBtn.addEventListener("click", function () {
//     currentFilter = "rejected";
//     updateCount();
// });



mainContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("interview-btn")) {
        const parentNode = event.target.parentNode.parentNode;

        const cardStatus = parentNode.querySelector('.card-status');
        const updateStatus = cardStatus.innerText = "Intervew";
        cardStatus.classList.add('btn', 'btn-outline', 'btn-success', 'bg-white', 'text-green-500', 'font-medium');
        cardStatus.innerText = "Intervew";
        const companyName = parentNode.querySelector('.Company-name').innerText;
        const position = parentNode.querySelector('.position').innerText;
        const jobType = parentNode.querySelector('.job-type').innerText;
        const decription = parentNode.querySelector('.decription').innerText;

        const cardInfo = {
            companyName,
            position,
            updateStatus,
            jobType,
            decription
        }
        

        const cardInfoExcist = interviewCount.find(item => item.companyName == cardInfo.companyName);
        if (!cardInfoExcist) {
            interviewCount.push(cardInfo);
        }
        rejectedCount = rejectedCount.filter(item => item.companyName != cardInfo.companyName);
        updateCount();

        if (currentStatus === "filter-interview-btn") {
            renderingIntervewcard();
        } else if (currentStatus === "filter-rejected-btn") {
            renderingRejectedcard();
        }

    } else if (event.target.classList.contains("Rejected-btn")) {
        const parentNode = event.target.parentNode.parentNode;
        const cardStatus = parentNode.querySelector('.card-status');
        const updateStatus = cardStatus.innerText = "Rejected";
        cardStatus.classList.add('btn', 'btn-outline', 'btn-secondary', 'bg-white', 'text-red-500', 'font-medium');
        const companyName = parentNode.querySelector('.Company-name').innerText;
        const position = parentNode.querySelector('.position').innerText;
        const jobType = parentNode.querySelector('.job-type').innerText;
        const decription = parentNode.querySelector('.decription').innerText;

        const cardInfo = {
            companyName,
            position,
            updateStatus,
            jobType,
            decription
        }

        const cardInfoExcist = rejectedCount.find(item => item.companyName == cardInfo.companyName);
        if (!cardInfoExcist) {
            rejectedCount.push(cardInfo);
        }
        interviewCount = interviewCount.filter(item => item.companyName != cardInfo.companyName);
        updateCount();
        if (currentStatus === "filter-interview-btn") {
            renderingIntervewcard();
        } else if (currentStatus === "filter-rejected-btn") {
            renderingRejectedcard();
        }
    }

})
function renderingIntervewcard() {
    filterSection.innerHTML = '';
    for (item of interviewCount) {
        const newDiv = document.createElement("div");
        newDiv.className = "job-card flex justify-between bg-white shadow rounded p-5 mt-5";
        newDiv.innerHTML = `
            <div id="card-item" class="space-y-4">
                <p class="Company-name text-2xl font-medium text-blue-900">${item.companyName}</p>
                <p class="position text-gray-500 font-medium text-[18px]">${item.position}</p>
                <p class="job-type text-gray-500 font-medium">${item.jobType}</p>
                <button class="card-status px-5 py-2 rounded bg-blue-100 text-blue-900 font-medium">${item.updateStatus}</button>
                <p class="decription text-gray-500 font-medium">${item.decription}</p>
                <div class="flex gap-3">
                    <button class=" interview-btn btn btn-outline btn-success">interview</button>
                    <button class="Rejected-btn btn btn-outline btn-secondary">Rejected</button>
                </div>
            </div>
            <div>
                <button
                    class="btn-delete cursor-pointer border border-gray-300 text-gray-400 w-10 h-10 rounded-full"><i
                        class="fa-regular fa-trash-can"></i></button>
            </div>
        `;
        filterSection.appendChild(newDiv);
    }
}
renderingIntervewcard();

function renderingRejectedcard() {
    filterSection.innerHTML = '';
    for (item of rejectedCount) {
        const newDiv = document.createElement("div");
        newDiv.className = "job-card flex justify-between bg-white shadow rounded p-5 mt-5";
        newDiv.innerHTML = `
            <div id="card-item" class="space-y-4">
                <p class="Company-name text-2xl font-medium text-blue-900">${item.companyName}</p>
                <p class="position text-gray-500 font-medium text-[18px]">${item.position}</p>
                <p class="job-type text-gray-500 font-medium">${item.jobType}</p>
                <button class="card-status px-5 py-2 rounded bg-blue-100 text-blue-900 font-medium">${item.updateStatus}</button>
                <p class="decription text-gray-500 font-medium">${item.decription}</p>
                <div class="flex gap-3">
                    <button class=" interview-btn btn btn-outline btn-success">interview</button>
                    <button class="Rejected-btn btn btn-outline btn-secondary">Rejected</button>
                </div>
            </div>
            <div>
                <button
                    class="btn-delete cursor-pointer border border-gray-300 text-gray-400 w-10 h-10 rounded-full"><i
                        class="fa-regular fa-trash-can"></i></button>
            </div>
        `;
        filterSection.appendChild(newDiv);
    }
}
renderingRejectedcard();