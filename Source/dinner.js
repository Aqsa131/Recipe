const dinnerApi = async()=>{
    try{
        let dinner = await fetch('https://web.langmingle.com/api/get-recipes')
        let toJson = await dinner.json()
        let recipe = toJson.recipes
        console.log(recipe);
        let dinnerRecipe = recipe.filter(item=> item.course === 'dinner')
        console.log(dinnerRecipe);
        recipes = dinnerRecipe
        return recipes
    }
    catch(error){
        console.error(error);
        
    }
}
// dinnerApi()
const dinner = (cards)=>{
    let dinnerCard = document.getElementById('dinner-cards')    
    dinnerCard.innerHTML = ''

    if(cards.length === 0){
        dinnerCard.innerHTML = `<p>No Recipe Found</p>`
    }
    let gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');

    cards.forEach((product)=>{
        let newCard = document.createElement('div')
        newCard.classList.add('newSaladCard')
        newCard.innerHTML =`
            <div class="card">
                <img class="card-img" src="${product.image}" alt="${product.name}">
                <div class="card-body">
                    <h3 class="card-title">${product.name}</h3>
                    <p class="card-desc">${product.description || "Salads!"}</p>
                    <button id="viewDetails" type="button" class="btn"><a style="text-decoration: none; color: white;" href="showRecipePage.html?id=${product.id}">View Recipe</a></button>
                </div>
            </div>
        `
        gridContainer.appendChild(newCard)
    })
    dinnerCard.appendChild(gridContainer)
}
dinnerApi().then((data)=>{
    if (data) {
        dinner(data)
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
    dinner(setFilterData)
}
document.getElementById('searchField')?.addEventListener('keyup', search)


