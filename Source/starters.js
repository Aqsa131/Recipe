
const stareter = async () => {
    try {
        let getStarter = await fetch('https://web.langmingle.com/api/get-recipes');
        let setStarter = await getStarter.json()
        let myStarter = setStarter.recipes;
        let appetizers = myStarter.filter(item => item.course === 'appetizer');
        console.log(appetizers);
        recipes = appetizers
        return recipes;
    } catch (error) {
        console.log(error);
    }

}

// display cards\
const starterCardGenerate = (cards) => {
    let starterCard = document.getElementById('starter-cards')
    starterCard.innerHTML = ''
    let gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');

    cards.forEach((product) => {
        let newCard = document.createElement('div')
        newCard.classList.add('newStarterCard')
        newCard.innerHTML = `
            <div class="card">
                <img class="card-img" src="${product.image}" alt="${product.name}">
                <div class="card-body">
                    <h3 class="card-title">${product.name}</h3>
                    <p class="card-desc">${product.description || "Tangling appetizer!"}</p>
                    <button id="viewDetails" type="button" class="btn"><a style="text-decoration: none; color: white;" href="showRecipePage.html?id=${product.id}">View Recipe</a></button>
                </div>
            </div>
        `
        gridContainer.appendChild(newCard)
    })
    starterCard.appendChild(gridContainer)
}
stareter().then((data) => {
    if (data) {
        starterCardGenerate(data)
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
    starterCardGenerate(setFilterData)
}
document.getElementById('searchField')?.addEventListener('keyup', search)


