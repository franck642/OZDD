/*--
        AFFICHER CATEGORIE
    -----------------------------------*/
// Récupérez la référence de la liste déroulante
const categoriesDropdown = document.getElementById('categorie');

// Récupérez les données depuis votre API
    fetch('https://ozdd.onrender.com/categories')
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
    fetch('https://ozdd.onrender.com/produitsAdmin')
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
                                        <a href="shopping-cart.html?id=${product._id}" id="addToCart" class="action hintT-left hintT-primary" data-hint="Ajouter au panier"><i class="fas fa-shopping-basket"></i></a>
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
    xhr.open("GET", `https://ozdd.onrender.com/produitsAdmin/categories/${categorieId}`, true);

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
                                    <a href="shopping-cart.html?id=${produit._id}" id="addToCart" class="action hintT-left hintT-primary add-to-cart" data-hint="Ajouter au panier"><i class="fas fa-shopping-basket"></i></a>                               
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
        "url": "https://ozdd.onrender.com/produitsAdmin/produit/" + id,
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


// const addToCartButton = productDiv.querySelector('#addToCart');
// addToCartButton.addEventListener('click', () => {
//     addToCart(product._id);
// });


// function addToCart(productId) {
//     // Vous pouvez ajuster l'URL de l'API selon vos besoins
//     const addToCartUrl = `https://ozdd.onrender.com/panier/${productId}`;

//     // Effectuez une requête POST pour ajouter le produit au panier
//     fetch(addToCartUrl, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             // Vous pouvez inclure d'autres données si nécessaire
//             quantity: 1, // par exemple, la quantité à ajouter au panier
//         }),
//     })
//         .then(response => response.json())
//         .then(data => {
//             // Manipulez la réponse de l'API si nécessaire
//             console.log('Produit ajouté au panier:', data);

//             // Mettez à jour le HTML du panier
//             updateCartView(data);
//         })
//         .catch(error => {
//             console.error('Erreur lors de l\'ajout au panier:', error);
//         });
// }


// function updateCartView(cartData) {
//     const cartItemsContainer = document.getElementById('cart-items');
//     cartItemsContainer.innerHTML = ''; // Efface le contenu actuel du panier

//     cartData.forEach(item => {
//         const cartItemRow = document.createElement('tr');
//         cartItemRow.innerHTML = `
//             <td class="pro-thumbnail"><a href="#"><img src="${item.image}" alt="Product"></a></td>
//             <td class="pro-title"><a href="#">${item.titre}</a></td>
//             <td class="pro-price"><span>${item.prix} XOF</span></td>
//             <td class="pro-quantity">
//                 <div class="pro-qty"><input type="number" value="${item.quantity}"></div>
//             </td>
//             <td class="pro-subtotal"><span>${item.total} XOF</span></td>
//             <td class="pro-remove"><a href="#" onclick="removeFromCart('${item._id}')"><i class="fas fa-trash-alt"></i></a></td>
//         `;

//         cartItemsContainer.appendChild(cartItemRow);
//     });
// }





// var shoppingCart = (function () {
//     var cart = [];
  
//     function Item(id, name, price, count) {
//         this.id = id;
//         this.name = name;
//         this.price = price;
//         this.count = count;
//     }
  
//     function saveCart() {
//         localStorage.setItem('shoppingCart', JSON.stringify(cart));
//     }
  
//     function loadCart() {
//         cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
//     }
  
//     if (localStorage.getItem("shoppingCart") != null) {
//         loadCart();
//     }
  
//     var obj = {};
  
//     obj.addItemToCart = function (id, name, price, count) {
//         for (var i in cart) {
//             if (cart[i].id === id) {
//                 cart[i].count += count;
//                 saveCart();
//                 return;
//             }
//         }
//         var item = new Item(id, name, price, count);
//         cart.push(item);
//         saveCart();
//     }
  
//     obj.removeItemFromCart = function (id) {
//         for (var i in cart) {
//             if (cart[i].id === id) {
//                 cart[i].count--;
//                 if (cart[i].count === 0) {
//                     cart.splice(i, 1);
//                 }
//                 break;
//             }
//         }
//         saveCart();
//     }
  
//     obj.removeItemFromCartAll = function (id) {
//         for (var i in cart) {
//             if (cart[i].id === id) {
//                 cart.splice(i, 1);
//                 break;
//             }
//         }
//         saveCart();
//     }
  
//     obj.clearCart = function () {
//         cart = [];
//         saveCart();
//     }
  
//     obj.totalCount = function () {
//         var totalCount = 0;
//         for (var i in cart) {
//             totalCount += cart[i].count;
//         }
//         return totalCount;
//     }
  
//     obj.totalCart = function () {
//         var totalCart = 0;
//         for (var i in cart) {
//             totalCart += cart[i].price * cart[i].count;
//         }
//         return Number(totalCart.toFixed(2));
//     }
  
//     obj.listCart = function () {
//         var cartCopy = [];
//         for (i in cart) {
//             item = cart[i];
//             itemCopy = {};
//             for (p in item) {
//                 itemCopy[p] = item[p];
//             }
//             itemCopy.total = Number(item.price * item.count).toFixed(2);
//             cartCopy.push(itemCopy)
//         }
//         return cartCopy;
//     }
  
//     return obj;
//   })();
  
//   document.addEventListener('DOMContentLoaded', () => {
//     const productsContainer = document.getElementById('products-container');
  
//     fetch('http://192.168.1.25:3000/produitsAdmin')
//         .then(response => response.json())
//         .then(data => {
//             data.forEach(product => {
//                 const productDiv = document.createElement('div');
//                 productDiv.classList.add('col', 'max-mb-30');
//                 productDiv.setAttribute('data-aos', 'fade-up');
//                 productDiv.innerHTML = `
//                             <div class="course-7 course-fluid">
//                                 <div class="thumbnail">
//                                     <a href="product-details.html?id=${product._id}" class="image" id="image">
//                                         <img src="${product.image}" alt="Course Image">
//                                     </a>
//                                     <div class="actions">
//                                         <a href="javascript:void(0);" class="action hintT-left hintT-primary add-to-cart" data-id="${product._id}" data-name="${product.titre}" data-price="${product.prix}" data-hint="Ajouter au panier"><i class="fas fa-shopping-basket"></i></a>
//                                     </div>
//                                 </div>
//                                 <div class="info text-center">
//                                     <span class="price" id="prix">${product.prix} XOF</span>
//                                     <h3 class="title" id="titre"><a href="product-details.html?id=${product._id}">${product.titre}</a></h3>
//                                 </div>
//                             </div>
//                         `;
  
//                 productsContainer.appendChild(productDiv);
//             });
  
//            // Ajouter un écouteur d'événements à chaque bouton "Ajouter au panier"
//         document.querySelectorAll('.add-to-cart').forEach(addToCartButton => {
//           addToCartButton.addEventListener('click', event => {
//             const id = event.target.dataset._id;
//             const name = event.target.dataset.titre;
//             const price = Number(event.target.dataset.prix);
//             const image = event.target.dataset.image;
  
//             shoppingCart.addItemToCart(id, name, price, 1, image);
//             displayCart(); // Mettez à jour l'affichage du panier après l'ajout d'un produit
//           });
//         });
//       });
  
//     // ... (votre code existant)
//   });




fg