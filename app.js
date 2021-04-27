const searchInput = document.getElementById('search-input');
const detailsArea = document.getElementById('details');
const errorContent = document.getElementById('error');

// Search area
const clickToSearch = () => {
  const itemsName = searchInput.value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${itemsName}`)
    .then((res) => res.json())
    .then((data) => {
      const foodItems = document.getElementById('food-items');
      let dataItem = '';

      if (itemsName === '') {
        errorContent.innerHTML = `
          <div class="error-content">
            <h2>Search box cannot be empty !</h2>
            <button onclick="closeBtn()" class="close">X</button>
          </div>
        `;
        errorContent.style.display = 'block';
        foodItems.innerHTML = '';
      } 
      else if (data.meals) {
        data.meals.forEach((item) => {
          dataItem += `
          <div onclick="itemDetails('${item.strMeal}')" class="food-item"> 
            <img src="${item.strMealThumb}" />
            <h4>${item.strMeal}</h4>
          </div>`;
        });
        foodItems.innerHTML = dataItem;
      } 
      else {
        errorContent.innerHTML = `
          <div class="error-content">
            <h2>Sorry! this item not available right now.</h2>
            <button onclick="closeBtn()" class="close">X</button>
          </div>
        `;
        errorContent.style.display = 'block';
        foodItems.innerHTML = '';
      }
    });
  searchInput.value = '';
};
// Show Items Details
const itemDetails = (itemName) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${itemName}`)
    .then((res) => res.json())
    .then((data) => {
      const itemDetailsArea = document.getElementById('item-details');
      const mealsItem = data.meals[0];
      itemDetailsArea.innerHTML = `
        <div class="details-img">
          <img
            src="${mealsItem.strMealThumb}"
            alt="${mealsItem.strMeal}"
          />
        </div>
        <h2>${mealsItem.strMeal}</h2>
        <h4>Details</h4>
        <ul>
          <li>${mealsItem.strMeasure1} ${mealsItem.strIngredient1}</li>
          <li>${mealsItem.strMeasure2} ${mealsItem.strIngredient2}</li>
          <li>${mealsItem.strMeasure3} ${mealsItem.strIngredient3}</li>
          <li>${mealsItem.strMeasure4} ${mealsItem.strIngredient4}</li>
          <li>${mealsItem.strMeasure5} ${mealsItem.strIngredient5}</li>
          <li>${mealsItem.strMeasure6} ${mealsItem.strIngredient6}</li>
        </ul>
        <button onclick="closeBtn()" class="close">X</button>
      `;
      detailsArea.style.display = 'block';
    });
};
// Close Button
const closeBtn = () => {
  detailsArea.style.display = 'none';
  errorContent.style.display = 'none';
};