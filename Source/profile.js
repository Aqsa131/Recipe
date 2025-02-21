import { db, doc, setDoc, getDoc, collection, query, getDocs, onSnapshot } from "./firebase.config.js"

// const db = getFirestore();
const saveRecipe = async () => {
    const recipeName = document.getElementById('recipeName').value;
    const category = document.getElementById('category').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;
    // const image = document.getElementById('imageUpload').files[0];
    if (recipeName && category && ingredients && instructions) {
        alert('Recipe saved successfully!');
        //firestore save data with setDoc
        try {
            await setDoc(doc(db, "recipe", recipeName), {
                name: recipeName,
                category: category,
                ingredients: ingredients,
                instructions: instructions,
                // userId: currentUserId
            });
            //call getDoc from readData----------->getData
            //yahan recipe name wo name he jo id ki jaga pe save hoga, ham chahen tw isko recipe name ki jaga
            // unique id se bhi likh saktay hen usk lye recipeName ki jaga doc.id ayega, or getDoc ki jaga 
            // addDoc ayega jo umique id generate karayga uska faida ye hoga k recipeName ki waja
            // se over write nahy hoga, ye recipe name wo hoga jo user recipe create katay waqt recipe ka name likhay ga
            const docRef = doc(db, "recipe", recipeName);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
            } else {
                console.log("No such document!");
            }

            console.log('data saved to data bas');

            // if(category === 'Salad'){
            //     window.location.pathname = 'Source/salad.html'
            // }
            // else if(category === 'Starter'){
            //     window.location.pathname = 'Source/starters.html'
            // }
            // else if(category === 'lunch'){
            //     window.location.pathname = 'Source/lunch.html'
            // }
            // else if(category === 'Smoothies'){
            //     window.location.pathname = 'Source/smoothies.html'
            // }
            // else if(category === 'Pizza'){
            //     window.location.pathname = 'Source/pizzs.html'
            // }
            // else if(category === 'Dinner'){
            //     window.location.pathname = 'Source/dinner.html'
            // }
            // else{
            //     alert('category not found')
            // }
        }
        catch (error) {
            console.error(error);

        }
        // document.getElementById('recipeUploadBtn')

    } else {
        alert('Please fill in all fields.');
    }
}
document.getElementById('recipeUploadBtn')?.addEventListener('click', saveRecipe)

const getAllRecipes = async () => {
    const ref = query(collection(db, "recipe"));
    const unsubscribe = onSnapshot(ref, (querySnapshot) => {
        const recipe = [];
        querySnapshot.forEach((doc) => {
            recipe.push(doc.data());
            console.log('recived', recipe);
            renderCreatedRecipes(recipe)  
        });
        console.log("Current cities in CA: ", recipe.join(", "));
    });
};
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('myRecipes')?.addEventListener('click', () => {
        // Set flag in sessionStorage
        sessionStorage.setItem('navigateToRecipes', 'true');
         getAllRecipes(); 
        window.location.href = 'myRecipes.html';
    });
});

// render Recipe cards into myRecipe page

const renderCreatedRecipes = (recipes) => {
    let recipeContainer = document.getElementById('recipe-container')
    if(!recipeContainer){
        console.log('no recipe container found');
        return;
    }
    recipeContainer.innerHTML = ''
    recipes.forEach((recipe) => {
        console.log('Recipe:', recipe);
        let card = document.createElement('div')
        card.classList.add('col-md-4', 'mb-4');
        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                <img class="card-img-top" src="default.jpg" alt="${recipe?.name}">
                    <h5 class="card-title">${recipe?.name}</h5>
                    <p class="card-text">${recipe?.ingredients}</p>
                    <p class="card-text">${recipe?.instructions}</p>
                </div>
            </div>
        `
        recipeContainer.appendChild(card)
    })
    console.log('clicked');
}