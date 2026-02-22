const totalJobCount = document.getElementById("total-job-count");
const JobCounter = document.getElementById("job-counter");
// const jobItems = document.getElementById("cards-container");
const btnDelete = document.querySelectorAll(".btn-delete");

const filterAllBtn = document.getElementById("filter-all-btn");
const filterIntervewBtn = document.getElementById("filter-interview-btn");
const filterRejectedBtn = document.getElementById("filter-rejected-btn");

const mainContainer = document.getElementById("cards-container");
const filterSection = document.getElementById("filter-section");
const totalInterviewCount = document.getElementById("total-interview-count");
const totalRejectedCount = document.getElementById("total-rejected-count");

let interviewCount = [];
let rejectedCount = [];

// Total count
updateCount();
btnDelete.forEach(btn => {
    btn.addEventListener("click", function () {
        const card = this.closest(".job-card");
        card.remove();
        updateCount();
    })
})

function updateCount() {
    const totalCards = document.querySelectorAll(".job-card").length;
    totalJobCount.innerText = totalCards;
    JobCounter.innerText = totalCards;
    totalInterviewCount.innerText = interviewCount.length;
    totalRejectedCount.innerText = rejectedCount.length;
}


// Button Toggleing
function btnToggleing(id) {
    filterAllBtn.classList.add('btn-outline');
    filterIntervewBtn.classList.add('btn-outline');
    filterRejectedBtn.classList.add('btn-outline');

    filterAllBtn.classList.remove('btn-active');
    filterIntervewBtn.classList.remove('btn-active');
    filterRejectedBtn.classList.remove('btn-active');

    const selected = document.getElementById(id);
    selected.classList.add('btn-active');
    // console.log(selected)


    if(id == "filter-interview-btn"){
        mainContainer.classList.add('hidden');
        filterSection.classList.remove('hidden');
    }if(id == "filter-all-btn"){
        mainContainer.classList.remove('hidden');
        filterSection.classList.add('hidden');
    }if(id == "filter-rejected-btn"){
        mainContainer.classList.add('hidden');
        filterSection.classList.remove('hidden');
    }
}
// console.log(jobItems.children.length);



mainContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("interview-btn")) {
        const parentNode = event.target.parentNode.parentNode;
        const cardStatus = parentNode.querySelector('.card-status');
        // const cardStatus = parentNode.querySelector('card-status');
        cardStatus.classList.add('btn', 'btn-outline', 'btn-success', 'bg-white', 'text-green-500', 'font-medium');
        cardStatus.innerText = "Intervew";

        const companyName = parentNode.querySelector('.Company-name').innerText;
        const position = parentNode.querySelector('.position').innerText;
        const jobType = parentNode.querySelector('.job-type').innerText;
        const decription = parentNode.querySelector('.decription').innerText;

        const cardInfo = {
            companyName,
            position,
            jobType,
            decription
        }

        const cardInfoExcist = interviewCount.find(item => item.companyName == cardInfo.companyName);
        if (!cardInfoExcist) {
            interviewCount.push(cardInfo);
        }
        updateCount();
    }else if(event.target.classList.contains("Rejected-btn")){
        const parentNode = event.target.parentNode.parentNode;
        const cardStatus = parentNode.querySelector('.card-status').innerText;
        const companyName = parentNode.querySelector('.Company-name').innerText;
        const position = parentNode.querySelector('.position').innerText;
        const jobType = parentNode.querySelector('.job-type').innerText;
        const decription = parentNode.querySelector('.decription').innerText;

        const cardInfo = {
            companyName,
            position,
            cardStatus,
            jobType,
            decription
        }

        const cardInfoExcist = rejectedCount.find(item => item.companyName == cardInfo.companyName);
        if(!cardInfoExcist){
            rejectedCount.push(cardInfo);
        }
        updateCount();
    }

    function renderingIntervewcard() {
        filterSection.innerHTML = '';
        for (item of interviewCount) {
            const newDiv = document.createElement("div");
            newDiv.className = "flex justify-between bg-white shadow rounded p-5 mt-5";
            newDiv.innerHTML = `
                <div id="card-item" class="space-y-4">
                    <p class="Company-name text-2xl font-medium text-blue-900">${item.companyName}</p>
                    <p class="position text-gray-500 font-medium text-[18px]">${item.position}</p>
                    <p class="job-type text-gray-500 font-medium">${item.jobType}</p>
                    <button class="card-status px-5 py-2 rounded bg-blue-100 text-blue-900 font-medium">Not Applied</button>
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
    renderingIntervewcard()
    console.log(renderingIntervewcard());
})