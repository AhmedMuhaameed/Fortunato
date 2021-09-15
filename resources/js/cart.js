let FillProducts = () => {
    // debugger;
    if (localStorage.Cart) {
        let cart = JSON.parse(localStorage.Cart);
        for (item in cart) {
            let product = `
            <div class="item">
                <div class="buttons">
                    <button class="plus-btn" onclick="removeItem('${item}')">
                        <i class="ion-close-round delete-btn"></i>
                    </button>
                </div>

                <div class="image">
                    <img src="${cart[item].image}" />
                </div>

                <div class="description">
                    <p>${item}</p>
                </div>

                <div class="quantity">
                    <button class="plus-btn" type="button" name="button" onclick="addOne('${item}')">
                        <i class="ion-plus-round"></i>
                    </button>
                    <input type="number" name="name" value="${cart[item].count}"  min="1" id="count-${item}"/>
                    <button class="minus-btn" type="button" name="button" onclick="removeOne('${item}',this)">
                        <i class="ion-minus-round"></i>
                    </button>
                </div>

                <div class="total-price">${cart[item].price}</div>
            </div>`;
            document.getElementById("shopping-cart").innerHTML += product;
        }
        document.getElementById("shopping-cart").innerHTML += `
        <div class="row">
        <button class="order-button">Place Order</button>
        </div>`;
    }
};
FillProducts();

let removeOne = (itemTitle,elem) => {
    let cart = JSON.parse(localStorage.Cart);
    let count = document.getElementById(`count-${itemTitle}`).value;
    if (count == 1) {
        let deleteItem = confirm("are you sure you want to delete this item?");
        if (deleteItem) {
            for (item in cart) {
                if (item == itemTitle) {
                    delete cart[item];
                    localStorage.Cart = JSON.stringify(cart);
                    location.reload();
                }
            }
        }
    } else {
        for (item in cart) {
            if (item == itemTitle) {
                cart[item].count--;
                document.getElementById(`count-${itemTitle}`).value= `${parseInt(count) - 1}`;
                break;
            }
        }
    }
    localStorage.Cart = JSON.stringify(cart);
};

let addOne = (itemTitle) => {
    let cart = JSON.parse(localStorage.Cart);
    let count = document.getElementById(`count-${itemTitle}`).value;
    for (item in cart) {
        if (item == itemTitle) {
            cart[item].count++;
            document.getElementById(`count-${itemTitle}`).value= `${cart[item].count}`;
            break;
        }
    }
    localStorage.Cart = JSON.stringify(cart);

};

let removeItem =(itemTitle)=>{
    let cart = JSON.parse(localStorage.Cart);
    for (item in cart) {
        if (item == itemTitle) {
            delete cart[item];
            break;
        }
    }
    localStorage.Cart = JSON.stringify(cart);
    location.reload();

}