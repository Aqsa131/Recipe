import { db, doc, collection, query, onSnapshot, getAuth, onAuthStateChanged, addDoc, where, getDocs, updateDoc, deleteDoc } from "./firebase.config.js";

const auth = getAuth();
let currentUserId = null;
let editingRecipeId = null; // Global state for editing



document.addEventListener('DOMContentLoaded', () => {
    const myRecipesBtn = document.getElementById('myRecipes');
    if (myRecipesBtn) {
        myRecipesBtn.addEventListener('click', function () {
            window.location.href = 'myRecipes.html';
        });
    } else {
        console.log('myRecipes button not found');
    }
});
// Auth State Change
onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUserId = user.uid;
        console.log("User ID:", currentUserId);
        getAllRecipes();
    } else {
        console.log("No user is signed in.");
    }
});

// Save Recipe
const saveRecipe = async () => {
    const recipeName = document.getElementById('recipeName').value;
    const category = document.getElementById('category').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;

    if (recipeName && category && ingredients && instructions) {
        try {
            await addDoc(collection(db, "recipe"), {
                name: recipeName,
                category: category,
                ingredients: ingredients,
                instructions: instructions,
                userId: currentUserId,
                createdAt: new Date()
            });
            console.log("Recipe added successfully!");
            clearForm();
        } catch (error) {
            console.error("Error adding recipe:", error);
        }
    } else {
        alert('Please fill in all fields.');
    }
}

// Get All Recipes
const getAllRecipes = async () => {
    if (!currentUserId) {
        console.error("User is not logged in");
        return;
    }
    const ref = query(collection(db, "recipe"), where("userId", "==", currentUserId));
    onSnapshot(ref, (querySnapshot) => {
        const recipes = [];
        querySnapshot.forEach((doc) => {
            recipes.push({ id: doc.id, ...doc.data() });
        });
        renderCreatedRecipes(recipes);
    });
};

// Render Recipes
const renderCreatedRecipes = (recipes) => {
    let recipeContainer = document.getElementById('recipe-container');
    if (!recipeContainer) {
        console.log('No recipe container found');
        return;
    }
    recipeContainer.innerHTML = '';
    recipes.forEach((recipe) => {
        let card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4');
        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">${recipe?.name}</h3>
                    <p class="card-text">Ingredients: ${recipe?.ingredients}</p>
                    <p class="card-text">Instructions: ${recipe?.instructions}</p>
                    <button class="editRecipeBtn" data-id="${recipe.id}">Edit</button>
                    <button class="deleteRecipeBtn" data-id="${recipe.id}">Delete</button>
                </div>
            </div>
        `;
        recipeContainer.appendChild(card);
    });
};

// Load Recipe Data for Editing
const loadRecipeData = async (recipeId) => {
    try {
        const docRef = doc(db, "recipe", recipeId);
        const docSnap = await getDocs(query(collection(db, "recipe"), where("__name__", "==", recipeId)));

        if (!docSnap.empty) {
            const recipeData = docSnap.docs[0].data();
            document.getElementById('recipeName').value = recipeData.name;
            document.getElementById('category').value = recipeData.category;
            document.getElementById('ingredients').value = recipeData.ingredients;
            document.getElementById('instructions').value = recipeData.instructions;

            editingRecipeId = recipeId;
            showModal();
        } else {
            console.log("No such recipe found.");
        }
    } catch (error) {
        console.error("Error loading recipe data:", error);
    }
};

// Update Recipe
const updateRecipe = async () => {
    if (!editingRecipeId) return;

    const updatedName = document.getElementById('recipeName').value;
    const updatedCategory = document.getElementById('category').value;
    const updatedIngredients = document.getElementById('ingredients').value;
    const updatedInstructions = document.getElementById('instructions').value;

    try {
        const docRef = doc(db, "recipe", editingRecipeId);
        await updateDoc(docRef, {
            name: updatedName,
            category: updatedCategory,
            ingredients: updatedIngredients,
            instructions: updatedInstructions,
            updatedAt: new Date()
        });
        console.log("Recipe updated successfully!");
        clearForm();
        hideModal();
        editingRecipeId = null;
    } catch (error) {
        console.error("Error updating recipe:", error);
    }
};

// Delete Recipe
const deleteRecipe = async (recipeId) => {
    try {
        const docRef = doc(db, "recipe", recipeId);
        await deleteDoc(docRef);
        console.log("Recipe deleted with ID:", recipeId);
    } catch (error) {
        console.error("Error deleting recipe:", error);
    }
}

// Event Listeners
document.getElementById('recipeUploadBtn')?.addEventListener('click', saveRecipe);
document.getElementById('updateRecipeBtn')?.addEventListener('click', updateRecipe);
document.getElementById('recipe-container')?.addEventListener('click', (event) => {
    const recipeId = event.target.getAttribute('data-id');
    if (event.target.classList.contains('editRecipeBtn')) {
        loadRecipeData(recipeId);
    }
    if (event.target.classList.contains('deleteRecipeBtn')) {
        deleteRecipe(recipeId);
    }
});

// Modal Functions
const showModal = () => {
    const modalContainer = document.getElementById('modalContainer');
    modalContainer.style.display = 'block';
    setTimeout(() => {
        // Ensure form elements are accessible
        document.getElementById('recipeName').focus();
    }, 100);
};
const hideModal = () => {
    const modalContainer = document.getElementById('modalContainer');
    modalContainer.style.display = 'none';
    clearForm();
};

const clearForm = () => {
    document.getElementById('recipeName').value = '';
    document.getElementById('category').value = '';
    document.getElementById('ingredients').value = '';
    document.getElementById('instructions').value = '';
    editingRecipeId = null;
};

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    getAllRecipes();
    document.querySelector('.close-btn').addEventListener('click', hideModal);
    window.addEventListener('click', (event) => {
        const modalContainer = document.getElementById('modalContainer');
        if (event.target === modalContainer) {
            hideModal();
        }
    });
});
window.getMyRecipes = () => {
    // function getMyRecipes() {
        console.log(222)
        getAllRecipes();
    }