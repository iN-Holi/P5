// Recuperation id de l'url

const url = new URL(window.location.href);
const idProduct = url.searchParams.get("id");  // recuperation de la partie id de l'url
console.log(idProduct);

// requete get pour demander a l'api un produit en particulier

fetch("http://localhost:3000/api/products/" + idProduct)

    // récuperation de la promise 
    .then(function(response){
        if (response.ok) {      // https://developer.mozilla.org/fr/docs/Web/API/Response/ok 
            return response.json();
        }
    })

    // affichage du JSON dans la console 
    .then(function(characteristics){
        console.log(characteristics);
        showCharacteristics(characteristics)  // appelle de la fonction characteristics du produit 
    })

// déclaration de la fonction pour afficher les details du produit

function showCharacteristics(value) {
    document.querySelector('article div.item__img').innerHTML = `<img src="${value.imageUrl}" alt="${value.altTxt}">`;
    document.getElementById('description').innerText = value.description;
    document.getElementById('title').innerText = value.name;
    document.getElementById('price').innerText = value.price;

// création d'une boucle pour afficher les couleurs 
    for (let color of  value.colors) {
        document.getElementById('colors').innerHTML += 
        `<option value="${color}">${color}</option>`;
        console.log(color); // couleur dispo pour le produit
}};

// Sélection du bouton 'Ajouter au panier'
let btn = document.querySelector("#addToCart");
// evenement d'écoute au bouton ajout panier
btn.addEventListener("click", () => {
  let choiceQuantity = document.querySelector("#quantity").value; // Selection du choix de la quantité
  let choiceColor = document.querySelector("#colors").value; // choix de la couleur

  if ((choiceQuantity <= 0 || choiceQuantity > 100) && choiceColor == "") {
    alert("Choisissez une couleur !");    // message type pop up
    alert("Choisissez une quantité comprise entre 1 et 100.");
  } else if (choiceQuantity <= 0 || choiceQuantity > 100) {
    // Si quantité non conforme
    alert("Choisissez une quantité comprise entre 1 et 100.");
  } else if (choiceColor == "") {
    // Si choix couleur non sélectionné
    alert("Choisissez une couleur !");
  } else {
    let myProduct = {
      // récupération des données à stocker dans le panier
      id: idProduct,
      color: choiceColor,
      quantity: Number(choiceQuantity),
    };

    let cartStorage = JSON.parse(localStorage.getItem("myCart")); // récupère panier si présent dans le localStorage

    if (cartStorage) {
      //controle si article dans panier pour ajouter quantité
      const getProductStorage = cartStorage.find(
        (p) => p.id == myProduct.id && p.color == myProduct.color
      );
      // si produit déja présent dans le panier
      if (getProductStorage) {
        getProductStorage.quantity += myProduct.quantity;
        localStorage.setItem("myCart", JSON.stringify(cartStorage)); // Sauvegarde et sérialise
        alert("panier mis à jour !");
       return; // Sors de  l'instruction pour éviter de push en doublons
      }
      cartStorage.push(myProduct);
    } else {
      cartStorage = [];
      cartStorage.push(myProduct);
    }
    localStorage.setItem("myCart", JSON.stringify(cartStorage)); // Sauvegarde et sérialise
    alert("panier mis à jour !"); 
  }
});

