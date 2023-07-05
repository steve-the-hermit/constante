// DOM elements
const drinksContainer = document.getElementById("drinksContainer");
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
const sortSelect = document.getElementById("sortSelect");

// Filter and sorting variables
let filteredDrinks = [];
let currentSort = "name";

// Render drinks based on filter and sort
function renderDrinks() {
  drinksContainer.innerHTML = "";

  // Apply filters
  filteredDrinks = drinks.filter((drink) => {
    const searchTerm = searchInput.value.toLowerCase();
    const filterValue = filterSelect.value.toLowerCase();

    return (
      drink.name.toLowerCase().includes(searchTerm) &&
      (filterValue === "" || drink.category.toLowerCase() === filterValue)
    );
  });

  // Sort drinks
  filteredDrinks.sort((a, b) => {
    if (currentSort === "name") {
      return a.name.localeCompare(b.name);
    } else if (currentSort === "popularity") {
      return b.popularity - a.popularity;
    } else if (currentSort === "rating") {
      return b.rating - a.rating;
    }
  });

  // Render drinks
  filteredDrinks.forEach((drink) => {
    const drinkCard = createDrinkCard(drink);
    drinksContainer.appendChild(drinkCard);
  });
}

// Create drink card element
function createDrinkCard(drink) {
  const drinkCard = document.createElement("div");
  drinkCard.className = "drink-card";

  const drinkImage = document.createElement("img");
  drinkImage.src = drink.image;
  drinkImage.alt = drink.name;
  drinkCard.appendChild(drinkImage);

  const drinkName = document.createElement("h3");
  drinkName.textContent = drink.name;
  drinkCard.appendChild(drinkName);

  const drinkIngredients = document.createElement("p");
  drinkIngredients.textContent = `Ingredients: ${drink.ingredients.join(", ")}`;
  drinkCard.appendChild(drinkIngredients);

  const drinkRecipe = document.createElement("p");
  drinkRecipe.textContent = `Recipe: ${drink.recipe}`;
  drinkCard.appendChild(drinkRecipe);

  return drinkCard;
}

// Event listeners
searchInput.addEventListener("input", renderDrinks);
filterSelect.addEventListener("change", renderDrinks);
sortSelect.addEventListener("change", () => {
  currentSort = sortSelect.value;
  renderDrinks();
});

// Initial render
renderDrinks();
