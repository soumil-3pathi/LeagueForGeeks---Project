let inventList = document.querySelector(".invent-list");
let btns = document.querySelectorAll(".add");
let totalPrice = 0;
let initial = 0;
let state = false;

let initialAmt = document.getElementById("init");
let btn3 = document.getElementById("forInit");

btn3.addEventListener("click", () => {
    let enteredValue = parseInt(initialAmt.value) || 0;
    if (enteredValue < 0) {
        alert("Initial amount cannot be negative!");
        initialAmt.value = ""; 
        return;
    }
    initial = enteredValue;

    // clear previous budget display
    let budget = document.querySelector(".budget");
    budget.innerHTML = '';
    
    let h2 = document.createElement("h2");
    h2.innerHTML = `Initial Amount Entered: ₽${initial} <br> Surf the Items Menu for your inventory!`;
    budget.append(h2);
    state = true;
    updateSubtotalDisplay();
});

function updateSubtotalDisplay() {
    let subtotalAmount = document.querySelector(".subtotal-amount");
    if (subtotalAmount) {
        subtotalAmount.textContent = totalPrice;
    }
    
    let subtotalDiv = document.querySelector(".subtotal");
    let budgetInfo = document.querySelector(".budget-info");
    
    // create budget info if it doesn't exist
    if (!budgetInfo && initial > 0) {
        budgetInfo = document.createElement("div");
        budgetInfo.className = "budget-info";
        subtotalDiv.appendChild(budgetInfo);
    }
    
    if (budgetInfo) {
        budgetInfo.innerHTML = `
            <h3>Budget: ₽${initial}</h3>
            <h3>Remaining: ₽${initial - totalPrice}</h3>
        `;
        if (totalPrice >= initial && initial > 0) {
            if (totalPrice > initial) {
                alert("Warning: You have exceeded your budget!");
            }
            disableAddButtons(true);
        } else {
            disableAddButtons(false);
        }
    }
}

function disableAddButtons(disabled) {
    btns.forEach(btn => {
        btn.disabled = disabled;
        if (disabled) {
            btn.style.opacity = "0.5";
            btn.style.cursor = "not-allowed";
        } else {
            btn.style.opacity = "1";
            btn.style.cursor = "pointer";
        }
    });
}

for (let btn of btns) {
    btn.addEventListener("click", function() {
        if (!state) {
            alert("Please set your budget first!");
            return;
        }
        
        // check if budget is already used up
        if (totalPrice >= initial && initial > 0) {
            alert("Budget exhausted! You cannot add more items.");
            return;
        }
        
        let name, src, price = "";
        let id = this.getAttribute("id");
        switch(id){
            // Healing Items
            case "potion":
                name = "Potion";
                price = 100; 
                src="download.jpg"
                break;
            case "spotion":
                name = "Super Potion";
                price = 200;
                src="superpotion.jpg"
                break;
            case "hpotion":
                name = "Hyper Potion";
                price = 300;
                src="hyperpotion.jpg"
                break;
            // Pokeballs
            case "pball":
                name = "PokeBall";
                price = 100;
                src="pokeball.png"
                break;
            case "gball":
                name = "Great Ball";
                price = 200;
                src="greatball.png"
                break;
            case "uball":
                name = "Ultra Ball";
                price = 300;
                src="ultra ball.jpg"
                break;
            // Status Items
            case "bheal":
                name = "Burn Heal";
                price = 50;
                src="burn heal.jpg"
                break;
            case "pheal":
                name = "Paralyse Heal";
                price = 50;
                src="paralyse heal.jpg"
                break;
            case "fheal":
                name = "Full Heal";
                price = 100;
                src="full heal.png"
                break;
            // Miscellaneous items
            case "erope":
                name = "Escape Rope";
                price = 250;
                src="escape rope.jpg"
                break;
            case "repel":
                name = "Repel";
                price = 50;
                src="repel.png"
                break;
            case "srepel":
                name = "Super Repel";
                price = 100;
                src="super repel.jpg"
                break;
            default:
                console.log("Unknown item");
                return;
        }
        if (initial > 0 && (totalPrice + price) > initial) {
            alert(`Cannot add ${name}! This would exceed your budget.`);
            return;
        }
        
        listItemAdd(name, price, src);
    });
}

function listItemAdd(name, price, src) {
    let item = document.createElement("li");
    item.innerHTML = `◓ Item Name:&nbsp; <b>${name}</b>, Price:&nbsp; <b>₽${price}</b> &nbsp;&nbsp;&nbsp;<img src="${src}" alt="name">`;
    inventList.appendChild(item);
    totalPrice += price;
    updateSubtotalDisplay();
}

disableAddButtons(true); // disable all buttons initially until budget is set