/*--
        AFFICHER CATEGORIE
    -----------------------------------*/
// Récupérez la référence de la liste déroulante
const categoriesDropdown = document.getElementById('categorie');

// Récupérez les données depuis votre API
    fetch('http://192.168.1.25:3000/categories')
    .then(response => response.json())
    .then(data => {
        // Parcourez les données et ajoutez-les comme options dans la liste déroulante
        data.forEach(category => {
            const option = document.createElement('option');
            option.value = category._id; // Remplacez 'value' par le nom de votre champ
            option.textContent = category.categorie; // Remplacez 'label' par le nom de votre champ
            categoriesDropdown.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des catégories depuis l\'API:', error);
    });

/*--
        AFFICHER PRODUIT
    -----------------------------------*/   
document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');

    // Récupérez les données depuis votre API
    fetch('http://192.168.1.25:3000/produitsAdmin')
        .then(response => response.json())
        .then(data => {
            // Parcourez les données et ajoutez-les à la page
            data.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('col', 'max-mb-30');
                productDiv.setAttribute('data-aos', 'fade-up');
                productDiv.innerHTML = `
                            <div class="course-7 course-fluid">
                                <div class="thumbnail">
                                    <a href="product-details.html?id=${product._id}" class="image" id="image">
                                        <img src="${product.image}" alt="Course Image">
                                    </a>
                                    <div class="actions">
                                        <a href="shopping-cart.html" class="action hintT-left hintT-primary" data-hint="Ajouter au panier"><i class="fas fa-shopping-basket"></i></a>
                                    </div>
                                </div>
                                <div class="info text-center">
                                    <span class="price" id="prix">${product.prix} XOF</span>
                                    <h3 class="title" id="titre"><a href="product-details.html?id=${product._id}">${product.titre}</a></h3>
                                </div>
                            </div>
                        `;

                productsContainer.appendChild(productDiv);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des produits depuis l\'API:', error);
        });
});

/*--
        AFFICHER PRODUIT PAR CATEGORIE
    -----------------------------------*/ 
function fetchProductsByCategory() {
    // Récupérez la catégorie sélectionnée dans le menu déroulant
    var categorieId = document.getElementById("categorie").value;

    // Effectuez une requête AJAX pour récupérer les produits par catégorie
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `http://192.168.1.25:3000/produitsAdmin/categories/${categorieId}`, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Analysez la réponse JSON de votre API
            var produits = JSON.parse(xhr.responseText);

            // Obtenez une référence à la section des produits
            var productsContainer = document.getElementById("products-container");

            // Effacez le contenu actuel de la section des produits
            productsContainer.innerHTML = "";

            // Parcourez les produits récupérés et ajoutez-les à la section des produits
            produits.forEach(function (produit) {
                var productHtml = `
                    <!-- Course Start -->
                    <div class="col max-mb-30" data-aos="fade-up">
                        <div class="course-7 course-fluid">
                            <div class="thumbnail">
                                <a href="product-details.html?id=${produit._id}" class="image" id="image">
                                    <img src="${produit.image}" alt="Course Image">
                                </a>
                                <div class="actions">                                   
                                    <a href="shopping-cart.html" id="add-to-cart" class="action hintT-left hintT-primary add-to-cart" data-hint="Ajouter au panier"><i class="fas fa-shopping-basket"></i></a>                               
                                </div>
                            </div>
                            <div class="info text-center">
                                <span class="price">${produit.prix} XOF</span>
                                <h3 class="title" id="titre"><a href="product-details.html?id=${produit._id}">${produit.titre}</a></h3>
                            </div>
                        </div>
                    </div>
                    <!-- Course End -->
                `;

                // Ajoutez le produit à la section des produits
                productsContainer.innerHTML += productHtml;
            });
        }
    };

    // Envoyez la requête AJAX
    xhr.send();
}

/*--
        AFFICHER DETAILS PRODUIT
    -----------------------------------*/ 
var url = window.location.href;
var idMatch = url.match(/[?&]id=([^&]*)/);

if (idMatch) {
    var id = idMatch[1];

    // Utiliser l'ID dans la requête AJAX
    var settings = {
        "url": "http://192.168.1.25:3000/produitsAdmin/produit/" + id,
        "method": "GET",
        "timeout": 0,
    };

    // Effectuer la requête AJAX
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
} else {
    console.log("ID non trouvé dans l'URL");
}

$.ajax(settings).done(function (response) {
    // Mettez à jour les éléments HTML avec les données du produit
    $('.single-product-image img').attr('src', response.image);
    $('.single-product-content h3.title').text(response.titre);
    $('.single-product-content .price-new').text(response.prix + ' XOF');
    $('.single-product-content .meta-content').text(response.categorie.categorie);
    $('.description-list ul li:first-child').text(response.description);

    // Mettez à jour d'autres propriétés du produit si nécessaire
});



// Initialisation du panier (tableau vide)
var cart = [];

// Fonction pour mettre à jour l'affichage du panier
function updateCart() {
    var cartItems = document.getElementById("cart-items");
    var cartSubtotal = document.getElementById("cart-subtotal");
    var cartTotal = document.getElementById("cart-total");

    // Effacer le contenu actuel du panier
    cartItems.innerHTML = "";
    
    var subtotal = 0;

    // Parcourir les articles dans le panier
    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        var total = item.prix * item.quantity;
        
        subtotal += total;

        // Créer une ligne pour l'article
        var cartItemRow = document.createElement("tr");
        cartItemRow.innerHTML = `
            <td class="pro-thumbnail"><img src="${item.image}" alt="${item.titre}"></td>
            <td class="pro-title">${item.titre}</td>
            <td class="pro-price">${item.prix} XOF</td>
            <td class="pro-quantity">
                <div class="pro-qty">${item.quantity}</div>
            </td>
            <td class="pro-subtotal">${total} XOF</td>
            <td class="pro-remove">
                <a href="#" class="btSupprimer" data-product-name="${item.name}">Retirer</a>
            </td>
        `;

        // Ajouter la ligne au panier
        cartItems.appendChild(cartItemRow);
    }

    // Mettre à jour les totaux
    cartSubtotal.textContent = subtotal.toFixed(2) + " XOF";
    cartTotal.textContent = subtotal.toFixed(2) + " XOF";
}

// Gestionnaire d'événements pour ajouter un produit au panier
document.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("add-to-cart")) {
        var productName = event.target.getAttribute("data-product-name");
        var productPrice = parseFloat(event.target.getAttribute("data-product-price"));
        var productImage = event.target.getAttribute("data-product-image");

        // Vérifier si le produit est déjà dans le panier
        var existingItem = cart.find(item => item.name === productName);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            // Ajouter un nouvel article au panier
            cart.push({ name: productName, price: productPrice, image: productImage, quantity: 1 });
        }

        // Mettre à jour l'affichage du panier
        updateCart();
    }
});

// Gestionnaire d'événements pour supprimer un produit du panier
document.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("btSupprimer")) {
        var productName = event.target.getAttribute("data-product-name");

        // Trouver l'index de l'article dans le panier
        var itemIndex = cart.findIndex(item => item.name === productName);

        if (itemIndex !== -1) {
            // Supprimer l'article du panier
            cart.splice(itemIndex, 1);

            // Mettre à jour l'affichage du panier
            updateCart();
        }
    }
});

// Appel initial pour mettre à jour l'affichage du panier (au cas où des produits seraient déjà dans le panier)
updateCart();
