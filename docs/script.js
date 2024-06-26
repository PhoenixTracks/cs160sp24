function navigator() {
  var existUser = localStorage.getItem("existUser");
  if (!existUser) {
    window.location.href = 'quiz.html';
  } else {
    window.location.href = 'dashboard.html';
  }
}

const skillsList = [
  "Coding",
  "Excel",
  "Forklift Driving",
  "Engineering",
  "Cooking",
  "Construction",
  "Accounting",
  "Photoshop",
  "Git",
  "Communication", "Leadership", "Teamwork", "Creativity", "Adaptability", "Problem-Solving", "Technical", "Analytical", "Organization", "Detail-Oriented", "Innovation", "Collaboration", "Efficiency", "Reliability", "Initiative", "Empathy", "Interpersonal", "Motivation", "Flexibility", "Critical-Thinking"
];


let selectedItems1 = JSON.parse(localStorage.getItem('selectedItems1')) || []; 
let selectedItems2 = JSON.parse(localStorage.getItem('selectedItems2')) || []; 
let dailyHours = localStorage.getItem('dailyHours') || 0;

function search(num) {
  const query = document.getElementById("searchBox" + num).value.trim().toLowerCase();
  const resultsContainer = document.getElementById("results" + num);
  resultsContainer.innerHTML = "";

  const selectedItems = num === 1 ? selectedItems1 : selectedItems2; // Use the appropriate array
  const filteredItems = skillsList.filter(text => text.toLowerCase().includes(query));
  filteredItems.forEach(text => {
      const resultItem = document.createElement("div");
      resultItem.textContent = text;
      resultItem.classList.add("result-item");
      //resultItem.style.color = black;
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
document.getElementById("dailyHoursInput").addEventListener("input", addDailyHours);


function addTimeFrame() {
  const timeFramesContainer = document.getElementById('timeFrames');
  timeFramesContainer.innerHTML = '';

  for (let i = 0; i < selectedItems2.length; i++) {
    const skill = selectedItems2[i];
    const selectContainer = document.createElement('div'); 
    const select = document.createElement('select');

    select.id = 'select_' + i;

    for (let j = 1; j <= 6; j++) {
      const option = document.createElement('option');
      option.value = j;
      option.text = j + ' month(s)';
      select.appendChild(option);
    }

    const label = document.createElement('label');
    label.innerHTML = 'Time frame for ' + skill + ':  ';
    label.setAttribute('for', select.id); 

    selectContainer.appendChild(label);
    selectContainer.appendChild(select);
    timeFramesContainer.appendChild(selectContainer);
  }
}

function addDailyHours() {
  dailyHours = parseInt(document.getElementById("dailyHoursInput").value, 10) || 0;
}

var skillTimeFrames = {};
document.getElementById("submit").addEventListener("click", function() {

  
  for (var i = 0; i < selectedItems2.length; i++) {
    var skill = selectedItems2[i];
    var select = document.getElementById('select_' + i);
    console.log(select);
    var timeFrame = select.value;
    skillTimeFrames[skill] = timeFrame;
  }

  localStorage.removeItem('name');
  localStorage.removeItem('selectedItems1');
  localStorage.removeItem('selectedItems2');
  localStorage.removeItem('skillTimeFrames');
  saveToLocalStorage();
  window.location.href = 'dashboard.html';
});


function saveToLocalStorage() {
  var name = document.getElementById('nameBox').value.trim();

  var bio = document.getElementById('bioInput').value.trim();
  localStorage.setItem('name', name);
  localStorage.setItem('selectedItems1', JSON.stringify(selectedItems1)); // existing skills
  localStorage.setItem('selectedItems2', JSON.stringify(selectedItems2));
  localStorage.setItem('skillTimeFrames', JSON.stringify(skillTimeFrames)); // dictionary -> key: skill, value: # of months
  localStorage.setItem('dailyHours', dailyHours);
  localStorage.setItem('bio', bio);
  localStorage.setItem("existUser", 1);
}
