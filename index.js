document.addEventListener('DOMContentLoaded', () => {
  // Fetch drinks data from API
  async function getDrinks() {
    try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail');
      const data = await response.json();
      return data.drinks;
    } catch (error) {
      console.log('Error fetching drinks:', error);
      return [];
    }
  }

  // Display the list of drinks
  function displayDrinks(drinks) {
    const drinksList = document.getElementById('drinksList');
    drinks.forEach(drink => {
      const drinkItem = document.createElement('li');
      drinkItem.textContent = drink.strDrink;
      drinkItem.addEventListener('click', () => {
        displaySelectedDrink(drink);
      });
      drinksList.appendChild(drinkItem);
    });
  }

  // Display the selected drink
  function displaySelectedDrink(drink) {
    const selectedDrinkSection = document.getElementById('selectedDrink');
    selectedDrinkSection.innerHTML = `
      <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
      <h2>${drink.strDrink}</h2>
      <h3>Ingredients:</h3>
      <p>${drink.strIngredient1}, ${drink.strIngredient2}, ${drink.strIngredient3}, ${drink.strIngredient4}</p>
      <h3>Instructions:</h3>
      <p>${drink.strInstructions}</p>
    `;
  }

  // Add event listeners to the rating stars
  function addRatingEventListeners() {
    const ratingStars = document.querySelectorAll('.rating-stars i');
    ratingStars.forEach(star => {
      star.addEventListener('click', () => {
        const rating = star.dataset.rating;
        displayRatingMessage(rating);
      });
    });
  }

  // Display the rating message
  function displayRatingMessage(rating) {
    const ratingMessage = document.getElementById('ratingMessage');
    ratingMessage.textContent = `You rated this drink ${rating} stars. Thank you!`;
  }

  // Handle form submission for contact
  function handleFormSubmit(event) {
    event.preventDefault();
    const nameInput = document.getElementById('nameInput');
    const messageInput = document.getElementById('messageInput');
    console.log(`Name: ${nameInput.value}, Message: ${messageInput.value}`);
    nameInput.value = '';
    messageInput.value = '';
  }

  // Fetch drinks and initialize the page
  getDrinks()
    .then(drinks => {
      displayDrinks(drinks);
      addRatingEventListeners();
    })
    .catch(error => {
      console.log('Error initializing the page:', error);
    });

  // Add form submission event listener
  const form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
});
