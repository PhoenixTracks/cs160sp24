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
}



document.getElementById("searchBox1").addEventListener("input", function() {
    search(1);
});

document.getElementById("searchBox2").addEventListener("input", function() {
  search(2);
});
