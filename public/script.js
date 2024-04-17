function navigator() {
  var existUser = localStorage.getItem("existUser");
  if (!existUser) {
    window.location.href = 'quiz.html';
  } else {
    window.location.href = 'dashboard.html';
  }
}

const textData = [
  "Coding",
  "Excel",
  "Forklift Driving",
  "Engineering",
  "Cooking",
  "construction",
  "accounting",
  "Communication", "Leadership", "Teamwork", "Creativity", "Adaptability", "Problem-Solving", "Technical", "Analytical", "Organization", "Detail-Oriented", "Innovation", "Collaboration", "Efficiency", "Reliability", "Initiative", "Empathy", "Interpersonal", "Motivation", "Flexibility", "Critical-Thinking"
];


let selectedItems1 = []; 
let selectedItems2 = []; 

function search(num) {
const query = document.getElementById("searchBox" + num).value.trim().toLowerCase();
const resultsContainer = document.getElementById("results" + num);
resultsContainer.innerHTML = "";

const selectedItems = num === 1 ? selectedItems1 : selectedItems2; // Use the appropriate array
const filteredItems = textData.filter(text => text.toLowerCase().includes(query));

filteredItems.forEach(text => {
    const resultItem = document.createElement("div");
    resultItem.textContent = text;
    resultItem.classList.add("result-item");
    if (selectedItems.includes(text)) {
        resultItem.classList.add("selected");
    }
    resultItem.addEventListener("click", function() {
        const index = selectedItems.indexOf(text);
        if (index === -1) {
            selectedItems.push(text); 
            resultItem.classList.add("selected");
        } else {
            selectedItems.splice(index, 1); 
            resultItem.classList.remove("selected");
        }
        addTimeFrame();
    });
    resultsContainer.appendChild(resultItem);
});

selectedItems.forEach(text => {
    if (!filteredItems.includes(text)) {
        const resultItem = document.createElement("div");
        resultItem.textContent = text;
        resultItem.classList.add("result-item", "selected");
        resultItem.addEventListener("click", function() {
            const index = selectedItems.indexOf(text);
            selectedItems.splice(index, 1); 
            resultItem.remove();
        });
        resultsContainer.appendChild(resultItem);
    }
});
addTimeFrame();
}

document.getElementById("searchBox1").addEventListener("input", function() {
  search(1);
});

document.getElementById("searchBox2").addEventListener("input", function() {
search(2);
});

function addTimeFrame() {
const timeFramesContainer = document.getElementById('timeFrames');
timeFramesContainer.innerHTML = '';

for (let i = 0; i < selectedItems2.length; i++) {
  const skill = selectedItems2[i];
  const selectContainer = document.createElement('div'); // Create a new container for each item
  const select = document.createElement('select');

  for (let j = 1; j <= 6; j++) {
    const option = document.createElement('option');
    option.value = j;
    option.text = j + ' month(s)';
    select.appendChild(option);
  }

  const label = document.createElement('label');
  label.innerHTML = 'Time frame for ' + skill + ': ';
  label.appendChild(select);

  selectContainer.appendChild(label); 
  timeFramesContainer.appendChild(selectContainer);
}
}

document.getElementById("submit").addEventListener("click", function() {
var skillTimeFrames = {};

for (var i = 0; i < selectedItems2.length; i++) {
  var skill = selectedItems2[i];
  var select = document.querySelector('select[label="Time frame for ' + skill + ':"]');
  console.log(select);
  var timeFrame = select.value;

  skillTimeFrames[skill] = timeFrame;
}

console.log(skillTimeFrames);
});


function saveToLocalStorage() {
  localStorage.setItem('selectedItems1', JSON.stringify(selectedItems1));
  localStorage.setItem('selectedItems2', JSON.stringify(selectedItems2));
  localStorage.setItem('skillTimeFrames', JSON.stringify(skillTimeFrames));
}

// document.getElementById("submit").addEventListener("click", function() {
//   var skillTimeFrames = {};

//   for (var i = 0; i < selectedItems2.length; i++) {
//     var skill = selectedItems2[i];
//     var selector = 'select[label="Time frame for ' + skill + ':"]';
//     console.log("Selector:", selector);
//     var select = document.querySelector(selector);
//     console.log("Select:", select);
//     var timeFrame = select.value;

//     skillTimeFrames[skill] = timeFrame;
//   }

//   console.log(skillTimeFrames);
//   // saveToLocalStorage(); 
// });
