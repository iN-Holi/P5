// Recuperation des donnees du localstorage

let cartStorage = JSON.parse(localStorage.getItem("myCart"));
console.table(cartStorage);

emptyCart().then(() => {
  // deleteProduct();
});

async function emptyCart() {
  const cartContainer = document.getElementById("cart__items");
  // si le panier est vide :
  if (cartStorage === null || cartStorage == 0) {
    const empty = `<p>Votre panier est vide</p>`;
    cartContainer.innerHTML = empty;
  } 
  // si pas vide
  else {
    let totalQuantity = 0;
    let totalPrice = 0;
    // boucle forEach pour attribuer les différente values
    cartStorage.forEach((product) => {
      const { id, color, quantity } = product; //
      let display = document.createElement("article");
      document.getElementById("cart__items").appendChild(display);

      
      display.setAttribute("class", "cart__item");
      display.setAttribute("data-id", id);
      display.setAttribute("data-color", color);

      fetch("http://localhost:3000/api/products/" + id)
        .then((response) => response.json())
        .then((remnantElements) => {   // remnantElements = reste des elements

          const { name, altTxt, price, imageUrl } = remnantElements;  // evite d'ecrire const name = remnantElements.name,const altTxt = remnantElements.altTxt etc..
          display.innerHTML = `
          
          <div class="cart__item__img">
            <img src="${imageUrl}" alt="${altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${name}</h2>
              <p>${color}</p>
              <p>${price} €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        `;

          totalQuantity += parseInt(quantity);
          document.getElementById("totalQuantity").innerHTML = totalQuantity;  // quantite total
          totalPrice += price * quantity;
          document.getElementById("totalPrice").innerHTML = totalPrice; // prix total

          let itemQuantity = display.querySelector(".itemQuantity");
          itemQuantity.addEventListener("change", (e) => {  // modification de la quantite dans le panier 
            updateQuantity(id, color, e.target.value); 
          });

          let deleteItem = display.querySelector(".deleteItem"); // suppression produit
          deleteItem.addEventListener("click", (event) => {
            deleteProduct(id, color);
          });
        });
    });
  }
}

function updateQuantity(id, color, quantity) {
  // Trouver l'element a mettre a jour dans le panier (cartStorage)
  let elementRecherche = cartStorage.find(
    (el) => el.id == id && el.color == color
  );
  // Changer la quantité de ce dernier a la nouvelle quantité
  elementRecherche.quantity = quantity; //
  // Ensuite remplacer l'element dans le panier
  if (quantity <= 0 || quantity > 100) {
    // Si quantité non conforme
    alert("Choisissez une quantité comprise entre 1 et 100.");  // ne puisse pas depasser 100 dans le panier
  } else {  // ajout else pour que ca s'actualise pas avec une valeur negative ou superieur a 100
  localStorage.setItem("myCart", JSON.stringify(cartStorage));
  window.location.href = "cart.html";  
}}

// supprimer un produit

function deleteProduct(id, color) {
  // identifiant produit a supprimer

  cartStorage = cartStorage.filter(
    // on fait appel aux produits dans le panier
    // filtre les elements qui remplissent la condition
    (el) => el.id !== id || el.color !== color // nouveau tableau el represente chaque element du tableau, donc a l'id strictement different  || ou color
  );

  localStorage.setItem("myCart", JSON.stringify(cartStorage));  //convertit valeur en js en json

  window.location.href = "cart.html";
}

// partie formulaire

let form = document.querySelector(".cart__order__form"); // identification du formulaire

// Ecoute de la modification du nom
form.firstName.addEventListener("change", function () {
  // acces a l'input grace au name de la partie html, change = modificiation de la case
  validFirstName(this); // this = element qu'on est entrain d'ecouter
});

// Ecoute de la modification du prénom
form.lastName.addEventListener("change", function () {
  validLastName(this);
});

// Ecoute de la modification addresse
form.address.addEventListener("change", function () {
  validAddress(this);
});

// Ecoute de la modification ville
form.city.addEventListener("change", function () {
  validCity(this);
});

// Ecoute de la modification email
form.email.addEventListener("change", function () {
  validEmail(this);
});

//validation du prénom
const validFirstName = function (inputFirstName) {
  // this de ligne 106 le input de firstname
  let firstNameErrorMsg = inputFirstName.nextElementSibling; // recuperation balise suivante ds le html (p)

  if (nameCheck.test(inputFirstName.value)) {
    // regex, .test ce que l'utilisateur a saisi
    firstNameErrorMsg.innerHTML = "";
    return true; // renvoi les informations
  } else {
    firstNameErrorMsg.innerHTML = "Le champ n'est pas valide !";
    return false;
  }
};

//validation du nom
const validLastName = function (inputLastName) {
  let lastNameErrorMsg = inputLastName.nextElementSibling;

  if (nameCheck.test(inputLastName.value)) {
    lastNameErrorMsg.innerHTML = "";
    return true;
  } else {
    lastNameErrorMsg.innerHTML = "Le champ n'est pas valide !";
    return false;
  }
};

//validation de l'adresse
const validAddress = function (inputAddress) {
  let addressErrorMsg = inputAddress.nextElementSibling;

  if (addressCheck.test(inputAddress.value)) {
    addressErrorMsg.innerHTML = "";
    return true;
  } else {
    addressErrorMsg.innerHTML = "Le champ n'est pas valide !";
    return false;
  }
};

//validation de la ville
const validCity = function (inputCity) {
  let cityErrorMsg = inputCity.nextElementSibling;

  if (cityCheck.test(inputCity.value)) {
    cityErrorMsg.innerHTML = "";
    return true;
  } else {
    cityErrorMsg.innerHTML = "Le champ n'est pas valide !";
    return false;
  }
};

//validation de l'email
const validEmail = function (inputEmail) {
  let emailErrorMsg = inputEmail.nextElementSibling;

  if (emailCheck.test(inputEmail.value)) {
    emailErrorMsg.innerHTML = "";
    return true;
  } else {
    emailErrorMsg.innerHTML = "Le champ n'est pas valide !";
    return false;
  }
};

// Ajout des Regex
const emailCheck = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
); // /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
const nameCheck = new RegExp("^[a-zA-Z ,.'-]+$");
const cityCheck = new RegExp("^[a-zA-Z]+(?:[s-][a-zA-Z]+)*$");
const addressCheck = new RegExp(
  "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
);

function checkFinal() {
  const btn_commander = document.getElementById("order");

  btn_commander.addEventListener("click", (e) => {
    e.preventDefault();

    const inputName = document.getElementById("firstName");
    const inputLastName = document.getElementById("lastName");
    const inputAdress = document.getElementById("address");
    const inputCity = document.getElementById("city");
    const inputMail = document.getElementById("email");

    if (
      validLastName(inputLastName) && //si les donnees sont valider
      validFirstName(inputName) &&
      validAddress(inputAdress) &&
      validCity(inputCity) &&
      validEmail(inputMail)
    ) {
      // le tableau pour les id
      let itemId = [];
      for (let i = 0; i < cartStorage.length; i++) {
        itemId.push(cartStorage[i].id);
      }
      console.log(itemId);

      const order = {
        contact: {
          firstName: inputName.value,
          lastName: inputLastName.value,
          address: inputAdress.value,
          city: inputCity.value,
          email: inputMail.value,
        },
        products: itemId,
      };

      const options = {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          localStorage.clear();
          localStorage.setItem("orderId", data.orderId);

          document.location.href = `confirmation.html?orderId=${data.orderId}`;
        });
    } // fin du if
  }); 
}
checkFinal();
