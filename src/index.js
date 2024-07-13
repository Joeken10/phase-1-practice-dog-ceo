// console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', () => {
  fetchDogImages();
  fetchDogBreeds();
});

function fetchDogImages() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  
  fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
      const imageContainer = document.getElementById('dog-image-container');
      data.message.forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = imageUrl;
        imageContainer.appendChild(img);
      });
    });
}

function fetchDogBreeds() {
  const breedUrl = "https://dog.ceo/api/breeds/list/all";
  
  fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
      const breeds = Object.keys(data.message);
      renderBreeds(breeds);
      addBreedSelectListener(breeds);
    });
}

function renderBreeds(breeds) {
  const breedList = document.getElementById('dog-breeds');
  breedList.innerHTML = '';
  
  breeds.forEach(breed => {
    const li = document.createElement('li');
    li.textContent = breed;
    li.addEventListener('click', () => {
      li.style.color = 'blue';
    });
    breedList.appendChild(li);
  });
}

function addBreedSelectListener(breeds) {
  const dropdown = document.getElementById('breed-dropdown');
  
  dropdown.addEventListener('change', (event) => {
    const selectedLetter = event.target.value;
    const filteredBreeds = breeds.filter(breed => breed.startsWith(selectedLetter));
    renderBreeds(selectedLetter === 'all' ? breeds : filteredBreeds);
  });
}
