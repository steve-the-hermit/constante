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

  function displayDrinks(drinks) {
    const drinkContainer = document.getElementById("drinksContainer");
    drinkContainer.innerHTML = "";

    drinks.forEach((drink) => {
      const drinkElement = document.createElement("div");
      drinkElement.classList.add("drink-card");

      const drinkImage = document.createElement("img");
      drinkImage.src = drink.strDrinkThumb;
      drinkImage.alt = drink.strDrink;
      drinkElement.appendChild(drinkImage);

      const drinkName = document.createElement("h2");
      drinkName.textContent = drink.strDrink;
      drinkElement.appendChild(drinkName);

      const drinkPrice = document.createElement("p");
      if (drink.hasOwnProperty("price")) {
        drinkPrice.textContent = `Price: $${drink.price.toFixed(2)}`;
      } else {
        drinkPrice.textContent = "Price: N/A";
      }
      drinkElement.appendChild(drinkPrice);

      drinkElement.addEventListener("click", () => {
        openDrinkPopup(drink);
        setTimeout(() => {
          closeDrinkPopup();
        }, 2000);
      });

      drinkContainer.appendChild(drinkElement);
    });
  }

  function openDrinkPopup(drink) {
    const drinkPopup = document.getElementById("drinkPopup");
    const drinkPopupContent = document.getElementById("drinkPopupContent");

    drinkPopupContent.innerHTML = `
      <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
      <h2>${drink.strDrink}</h2>
      <p>${drink.instructions}</p>
    `;

    drinkPopup.style.display = "block";
  }

  function closeDrinkPopup() {
    const drinkPopup = document.getElementById("drinkPopup");
    drinkPopup.style.display = "none";
  }

  // Fetch drinks and initialize the page
  getDrinks()
    .then(drinks => {
      displayDrinks(drinks);
    })
    .catch(error => {
      console.log('Error initializing the page:', error);
    });
});
