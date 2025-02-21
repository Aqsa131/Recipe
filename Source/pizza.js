const pizzaApi = async () => {
    let getRecipe = await fetch('https://web.langmingle.com/api/get-recipes')
    let tojson = await getRecipe.json()
    let setRecipe = tojson.recipes
    let takeRecipe = setRecipe.filter(item => item.course === 'pizza')
    recipes = takeRecipe
    console.log(takeRecipe);
    return recipes
}
const pizzaCards = (cards) => {
    let pizzzaCard = document.getElementById('pizza-cards')
    pizzzaCard.innerHTML = ''
    let gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');

    cards.forEach((product) => {
        let newCard = document.createElement('div')
        newCard.classList.add('newPizzaCard')
        newCard.innerHTML = `
            <div class="card">
                <img class="card-img" src="${product.image}" alt="${product.name}">
                <div class="card-body">
                    <h3 class="card-title">${product.name}</h3>
                    <p class="card-desc">${product.description || "Cheesy Indulgence!"}</p>
                    <button id="viewDetails" type="button" class="btn"><a style="text-decoration: none; color: white;" href="showRecipePage.html?id=${product.id}">View Recipe</a></button>
                </div>
            </div>
        `
        gridContainer.appendChild(newCard)
    })
    pizzzaCard.appendChild(gridContainer)
}
pizzaApi().then((data) => {
    if (data) {
        pizzaCards(data)
    }
})

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
    pizzaCards(setFilterData)
}
document.getElementById('searchField')?.addEventListener('keyup', search)


