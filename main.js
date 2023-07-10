
import { renderCategories,
  renderProducts,
  renderBasketItem
  } from "./ui.js";

document.addEventListener("DOMContentLoaded", ()=>{
    fetchCatogories();
    fetchProducts();
});
const baseUrl = "https://api.escuelajs.co/api/v1";

function fetchCatogories(){
    fetch(`${baseUrl}/categories`)
    .then((response)=> response.json())
    .then((data)=> renderCategories(data))
    .catch((error)=> console.log(error))
}

let globalData = [];

async function fetchProducts(){
    try {
        const res = await fetch(`${baseUrl}/products`)
        const data = await res.json()
        globalData = data;
        renderProducts(data)
    } catch (err) {
        console.log(err)
    }
}

// sepet işlemleri

let basket = [];
let total = 0;

const sepetBtn = document.querySelector("#sepet-btn")
const closeBtn = document.querySelector("#close-btn")
const modal = document.querySelector(".modal-wrapper")
const basketList = document.querySelector(".list")
const modalInfo = document.querySelector(".total-span")


sepetBtn.addEventListener("click",()=>{
    modal.classList.add("active")
    addList()
})

closeBtn.addEventListener("click",()=>{
    modal.classList.remove("active")
    basketList.innerHTML = '';
    total = 0;
    modalInfo.textContent = "0";
})

document.addEventListener("click",(e)=>{
    let clickedEl = e.target
    if(clickedEl.classList.contains("modal-wrapper")){
        modal.classList.remove("active")
        basketList.innerHTML = '';
        total = 0;
        modalInfo.textContent = "0";
    }
})


document.body.addEventListener("click",findItem)

function findItem(e) {
    const ele = e.target;
    if (ele.id === 'add-btn') {
      const selected = globalData.find(
        (product) => product.id == ele.dataset.id
      );
      if (!selected.amount) {
        selected.amount = 1;
      }
      addToBasket(selected);
    }
    if(ele.id === "del-button"){
      ele.parentElement.remove()
      const selected = globalData.find((i)=> i.id == ele.dataset.id)
      deleteItem(selected)
    }
}

function addToBasket(product) {
  if (product) {
    const foundItem = basket.find((item) => item.id == product.id);
    if (foundItem) {
      foundItem.amount++;
    } else {
      basket.push(product);
    }
  }
}

function addList(){
    basket.forEach((product)=>{
        renderBasketItem(product)

        total += product.price * product.amount;
    })
    modalInfo.textContent = total;
}

function deleteItem(deletingItem){
  const filtredData = basket.filter((item)=> item.id !== deletingItem.id);
  basket = filtredData;
  total-= deletingItem.price * deletingItem.amount;
  modalInfo.textContent = total;
}
