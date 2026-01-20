const tg = window.Telegram.WebApp;
tg.ready();

// ТВОИ БРЕЛКИ (меняй названия, цены, фото)
const products = [
  { id: 1, name: "W68HP нормис", price: 700, img: "https://github.com/Elaanych/keychain-shop/blob/main/images/.jpg?raw=true" },
  { id: 2, name: "KW9J лилипут", price: 500, img: "https://raw.githubusercontent.com/Elaanych/keychain-shop/main/images/бел мал.png" },
  { id: 3, name: "QH1 великан", price: 600, img: "https://via.placeholder.com/400x250" },
  { id: 4, name: "KY2HT", price: 550, img: "https://via.placeholder.com/400x250" },
  { id: 5, name: "TSJ0D", price: 600, img: "https://via.placeholder.com/400x250" },
  { id: 6, name: "FB67K", price: 520, img: "https://via.placeholder.com/400x250" }
];

const cart = [];
const productsDiv = document.getElementById("products");
const cartUl = document.getElementById("cart");

// вывод товаров
products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
        <img src="${p.img}">
        <h4>${p.name}</h4>
        <p>${p.price} ₽</p>
        <button onclick="addToCart(${p.id})">Добавить</button>
    `;
    productsDiv.appendChild(div);
});

// добавить в корзину
window.addToCart = (id) => {
    cart.push(products.find(p => p.id === id));
    renderCart();
};

// обновить корзину
function renderCart() {
    cartUl.innerHTML = "";
    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} — ${item.price} ₽`;
        cartUl.appendChild(li);
    });
}

// отправка заказа
document.getElementById("orderBtn").onclick = () => {
    if (!cart.length) {
        tg.showAlert("Корзина пуста");
        return;
    }

    const user = tg.initDataUnsafe.user;
    const order = cart.map(i => `${i.name} (${i.price} ₽)`).join("\n");

    tg.sendData(
        `Заказ от ${user.first_name}\n\n${order}`
    );
};









