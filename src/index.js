document.addEventListener('DOMContentLoaded', () => {
    const dogBar = document.getElementById('dog-bar');
    const dogInfo = document.getElementById('dog-info');
  
    // Function to fetch and display all pups in the dog bar
    function fetchAndDisplayPups() {
      fetch('http://localhost:3000/pups')
        .then((response) => response.json())
        .then((pupsData) => {
          // Clear the dog bar
          dogBar.innerHTML = '';
  
          // Iterate through the pups and create spans for each
          pupsData.forEach((pup) => {
            const pupSpan = document.createElement('span');
            pupSpan.textContent = pup.name;
            pupSpan.addEventListener('click', () => {
              displayPupDetails(pup);
            });
            dogBar.appendChild(pupSpan);
          });
        })
        .catch((error) => {
          console.error('Error fetching pup data:', error);
        });
    }
  
    // Function to display pup details
    function displayPupDetails(pup) {
      dogInfo.innerHTML = `
        <img src="${pup.image}" alt="${pup.name}" />
        <h2>${pup.name}</h2>
        <button id="good-bad-button">${pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!'}</button>
      `;
  
      const goodBadButton = document.getElementById('good-bad-button');
      goodBadButton.addEventListener('click', () => {
        toggleGoodBadStatus(pup);
      });
    }
  
    // Function to toggle Good Dog/Bad Dog status
    function toggleGoodBadStatus(pup) {
      pup.isGoodDog = !pup.isGoodDog;
  
      fetch(`http://localhost:3000/pups/${pup.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isGoodDog: pup.isGoodDog }),
      })
        .then(() => {
          // Update the button text
          const goodBadButton = document.getElementById('good-bad-button');
          goodBadButton.textContent = pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!';
        })
        .catch((error) => {
          console.error('Error updating pup status:', error);
        });
    }
  
    // Initial fetch and display of pups
    fetchAndDisplayPups();
  });
  