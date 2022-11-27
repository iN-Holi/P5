// Recuperation des produits de l'API

fetch("http://localhost:3000/api/products")
    .then((response) => response.json())  // Reponse en json 
    // ce que l'on a reçu et qui a été traité en json sera appelé Canapes
    .then((Canapes) => {
        console.table(Canapes); // donne les infos console sous forme de tableau
        showCanapes(Canapes);  // appel de la fonction d'affichage des canapes
    })
    // Si il y a une erreur 
    .catch((err) => {
        console.log("Une erreur est survenue" + err);
    });


// Fontion d'affichage des produits de l'API sur la page d'accueil

function showCanapes(Canapes) {
    let createCards = document.getElementById("items");
    // Creation d'une boucle pour chaque kanap du tableau Canapes
    for (let kanap of Canapes) {  
      createCards.innerHTML += `
          <a href="./product.html?id=${kanap._id}">
              <article>
              <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
              <h3 class="productName">${kanap.name}</h3>
              <p class="productDescription">${kanap.description}</p>
              </article>
          </a>`;
    }
  }
  