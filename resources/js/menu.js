let createCard = (item) => {
    let card = document.createElement("div");
    card.classList.add("col");
    card.classList.add("span-1-of-4");
    card.classList.add("card");
    card.innerHTML = `
    <div class="card-image">
        <img src="${item.meals[0].strMealThumb}" alt="item-image" class="item-image" />
    </div>
    <p class="item-name">${item.meals[0].strMeal}</p>
    <p class="item-description">${item.meals[0].strIngredient1}-${item.meals[0].strIngredient2}-${item.meals[0].strIngredient3}-${item.meals[0].strIngredient4}-${item.meals[0].strIngredient5}-${item.meals[0].strIngredient6}</p>
    <p class="item-price">23</p>
    <button class="card-btn" onclick="AddToCart(${item.meals[0].idMeal},'${item.meals[0].strMeal}','${item.meals[0].strMealThumb}',23)">Add To Cart</button>`;
    return card;
};

let fetchMenu = async () => {
    const foodArr = [];
    let item;
    for (i = 0; i < 15; i++) {
        item = await (await fetch("https://www.themealdb.com/api/json/v1/1/random.php")).json();
        foodArr.push(item);
    }

    return foodArr;
};

let appendMenu = async () => {
    const foodArr = await fetchMenu();
    items = 0;
    child = 1;
    divs = document.querySelector(`.section-menu`).children;
    for (item of foodArr) {
        if (items < 4) {
            divs[child].appendChild(createCard(item));
            items++;
        } else {
            items = 0;
            child++;
        }
    }
};

appendMenu();

let AddToCart = (itemId, itemTitle, itemImage, itemPrice) => {
    console.log(itemId, itemTitle, itemImage, itemPrice);
    let cart = {};
    if (localStorage.Cart) {
        cart = JSON.parse(localStorage.Cart);
        let found = false;
        for (item in cart) {
            if (cart[item].id == itemId) {
                found = true;
                cart[item].count++;
                break;
            }
        }
        if (!found) {
            cart[itemTitle] = { id: itemId, price: itemPrice, image: itemImage, count: 1 };
        }
    } else {
        cart[itemTitle] = { id: itemId, price: itemPrice, image: itemImage, count: 1 };
    }
    localStorage.setItem("Cart", JSON.stringify(cart));
};
