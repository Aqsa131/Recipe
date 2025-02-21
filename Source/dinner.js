const dinnerApi = async()=>{
    try{
        let dinner = await fetch('https://web.langmingle.com/api/get-recipes')
        let toJson = await dinner.json()
        let recipe = toJson.recipes
        console.log(recipe);
        let dinnerRecipe = recipe.filter(item=> item.course === 'dinner')
        console.log(dinnerRecipe);
        return dinnerRecipe
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
                    <button id="viewDetails" type="button" class="btn"><a href="showRecipePage.html?id=${product.id}">view recipe</a></button>
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

// const querySnapshot = await getDocs(collection(db, "recipe"));
// querySnapshot.forEach((doc) => {
//     if (doc.data().category === 'Salad') {
//         // Salad recipes ko display karein
//     }
// });