// // slider
class SliderClip {
	constructor(el) {
		this.el = el;
		this.Slides = Array.from(this.el.querySelectorAll('li'));
		this.Nav = Array.from(this.el.querySelectorAll('nav a'));
		this.totalSlides = this.Slides.length;
		this.current = 0;
		this.autoPlay = true; // true or false
		this.timeTrans = 4000; // transition time in milliseconds
		this.IndexElements = [];

		for (let i = 0; i < this.totalSlides; i++) {
			this.IndexElements.push(i);
		}

		this.setCurret();
		this.initEvents();
	}
	setCurret() {
		this.Slides[this.current].classList.add('current');
		this.Nav[this.current].classList.add('current_dot');
	}
	initEvents() {
		const self = this;

		this.Nav.forEach((dot) => {
			dot.addEventListener('click', (ele) => {
				ele.preventDefault();
				this.changeSlide(this.Nav.indexOf(dot));
			});
		});

		this.el.addEventListener('mouseenter', () => (self.autoPlay = false));
		this.el.addEventListener('mouseleave', () => (self.autoPlay = true));

		setInterval(function () {
			if (self.autoPlay) {
				self.current = self.current < self.Slides.length - 1 ? self.current + 1 : 0;
				self.changeSlide(self.current);
			}
		}, this.timeTrans);
	}

	changeSlide(index) {
		this.Nav.forEach((allDot) => allDot.classList.remove('current_dot'));

		this.Slides.forEach((allSlides) =>
			allSlides.classList.remove('prev', 'current')
		);

		const getAllPrev = (value) => value < index;

		const prevElements = this.IndexElements.filter(getAllPrev);

		prevElements.forEach((indexPrevEle) =>
			this.Slides[indexPrevEle].classList.add('prev')
		);

		this.Slides[index].classList.add('current');
		this.Nav[index].classList.add('current_dot');
	}
}

const slider = new SliderClip(document.querySelector('.slider'));

document.addEventListener('DOMContentLoaded', () => {
	const leftText = document.querySelector('.left > div');

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					leftText.classList.add('visible');
				}
			});
		},
		{ threshold: 0.5 }
	);

	observer.observe(document.querySelector('.intro'));
});

// cards with API

let allRecipes = []; 

const fetchAndDisplayCards = async (url, containerSelector) => {
	try {
		const response = await fetch(url);
		const data = await response.json();
		const items = (data.meals || data.drinks || data.recipes || []).slice(0, 6);
		
		allRecipes = [...allRecipes, ...items]; 
		const container = document.querySelector(containerSelector);
		container.innerHTML = ""; 
		items.forEach((item) => {
			const card = document.createElement('div');
			card.className = 'card';
			card.innerHTML = `
				<img class="cardimg" src="${item.strMealThumb || item.strDrinkThumb || item.image}" alt="${item.strMeal || item.strDrink || item.name}">
				<div class="product-title mt-4"><h5>${item.strMeal || item.strDrink || item.name}</h5></div>
			`;
			container.appendChild(card);
		});
	} catch (error) {
		console.error(`Error fetching data from ${url}:`, error);
	}
};
const apiSections = [
	{ url: 'https://dummyjson.com/recipes', container: '.desCard' },
	{ url: 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian', container: '.italianCuisine' },
	{ url: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert', container: '.dessertCuisine' },
	{ url: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Starter', container: '.starterCuisine' },
	{ url: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Margarita', container: '.drinksSection' },
	{ url: 'https://www.themealdb.com/api/json/v1/1/search.php?s=burger', container: '.burgerSection' },
];

Promise.all(apiSections.map(section => fetchAndDisplayCards(section.url, section.container)))
    .then(() => console.log("All recipes loaded!"))
    .catch(err => console.error("Error loading recipes:", err));

// Search filter
const search = () => {
	let searchField = document.querySelector('#searchField').value.toLowerCase();
	if (allRecipes.length === 0) {
		console.log("No recipes data available yet.");
		return;
	}
	let filteredData = allRecipes.filter((item) => 
		(item.strMeal || item.strDrink || item.name || "").toLowerCase().includes(searchField)
	);
	const container = document.querySelector('.desCard'); 
	if (!container) {
		console.error("desCard container not found in DOM.");
		return;
	}	container.innerHTML = ""; 

	if (filteredData.length === 0) {
		container.innerHTML = `<p>No results found</p>`; 
		return;
	}

	filteredData.forEach((item) => {
		const card = document.createElement('div');
		card.className = 'card';
		card.innerHTML = `
			<img class="cardimg" src="${item.strMealThumb || item.strDrinkThumb || item.image}" alt="${item.strMeal || item.strDrink || item.name}">
			<div class="product-title mt-4"><h5>${item.strMeal || item.strDrink || item.name}</h5></div>
		`;
		container.appendChild(card);
	});
};

document.addEventListener('DOMContentLoaded', () => {
	document.querySelector('#searchField').addEventListener('keyup', search);
});
// login password validation

function passValid() {
	let pass = document.querySelector('#inputPassword')
	let loginPass = document.querySelector('.loginPass')
	let passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;

	if (passwordPattern.test(pass.value)) {
		loginPass.innerHTML = `<p style="color: green;" class="loginPass">valid Password</p>`
	}
	else {
		loginPass.innerHTML = `<p style="color: red;" class="loginPass">Password must contain 8 characters</p>`
	}
}
// passwordValidation SignUp

function validation() {
	let pass = document.querySelector('#exampleInputPassword1');
	let confirmPass = document.querySelector('#exampleInputPassword');
	let setValid = document.querySelector('.sameValidation');

	if (pass.value === confirmPass.value) {
		setValid.innerHTML = `<p style="color: green;">Password Matched</p>`;
	} else {
		setValid.innerHTML = `<p style="color: red;">Password not Matched</p>`;
	}
}