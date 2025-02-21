const cusine = async () => {
    try {
        let getCusine = await fetch('https://web.langmingle.com/api/get-recipes');
        let setCusine = await getCusine.json();
        let mycusines = setCusine.recipes;
        console.log(mycusines);
        let lunch = mycusines.filter(item => item.course === 'lunch');
        recipes = lunch
        return recipes;
    } catch (error) {
        console.log(error);
    }
};

// Creating Cards
const createCard = (cards) => {
    let cusines = document.querySelector('#cusineCard');
    cusines.innerHTML = '';
    // Container for grid layout
    let gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');

    cards.forEach((product) => {
        let newCusineCard = document.createElement('div');
        newCusineCard.classList.add('newCusineCard');
        newCusineCard.innerHTML = `
            <div class="card">
                <img class="card-img" src="${product.image}" alt="${product.name}">
                <div class="card-body">
                    <h3 class="card-title">${product.name}</h3>
                    <p class="card-desc">${product.description || "Delicious Lunch!"}</p>
                    <button id="viewDetails" type="button" class="btn"><a style="text-decoration: none; color: white;" href="showRecipePage.html?id=${product.id}">View Recipe</a></button>

                </div>
            </div>
        `;
        gridContainer.appendChild(newCusineCard);
    });

    cusines.appendChild(gridContainer);
};

cusine().then((data) => {
    if (data) {
        createCard(data);
    }
});

// Search filter
let recipes = [];
const search = () => {

    let searchField = document.getElementById('searchField')
    let filterData = searchField.value.toLowerCase()
    let setFilterData = recipes.filter((item)=>{
        console.log(recipes);
        
        return item.name.toLowerCase().includes(filterData)
    })
    let container = document.getElementById('noRecipe')
    if (setFilterData.length === 0) {
        container.innerHTML = `<p>No results found</p>`;
    }
    createCard(setFilterData)
}
document.getElementById('searchField')?.addEventListener('keyup', search)

