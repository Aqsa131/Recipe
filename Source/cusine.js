const cusine = async () => {
    try {
        let getCusine = await fetch('https://web.langmingle.com/api/get-recipes')
        let setCusine = await getCusine.json()
        let mycusines = setCusine.recipes
        console.log(mycusines);
        return mycusines  
    }
    catch (error) {
        console.log(error);
    }
}
// creating cards
const createCard = (card) => {
    let cusines = document.querySelector('#cusineCard')
    cusines.innerHTML = ''
    card.forEach((products) => {
        let newCusineCard = document.createElement('div')
        newCusineCard.classList.add('newCusineCard')
        newCusineCard.innerHTML = `
            <div class="dessertCard">
                <img class="dessertCardImg" src="${products.image}" alt="">
                <h3>${products.name}</h3>
                <button>this is btn</button>
            </div>
        `
        cusines.appendChild(newCusineCard)
    })
    
}
cusine().then((data) => {
    if (data) {
        createCard(data); 
    }
});