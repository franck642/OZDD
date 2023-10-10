/*--
        INSCRIPTION
    -----------------------------------*/
$(document).ready(function() {
  $('#registrationForm').submit(function(event) {
      event.preventDefault(); // Empêche le rechargement de la page

      // Récupérez les valeurs des champs du formulaire
      var email = $('#email').val();
      var lastName = $('#lastName').val();
      var firstName = $('#firstName').val();
      var registerpassword = $('#registerpassword').val();

      // Validez les champs (vous pouvez ajouter des validations ici)

      // Créez un objet contenant les données du formulaire
      var formData = {
          email: email,
          lastName: lastName,
          firstName: firstName,
          password: registerpassword
      };

      // Effectuez une requête POST vers votre API
      $.ajax({
          type: 'POST',
          url: 'http://192.168.0.10:3000/users/sinscrire',
          data: JSON.stringify(formData),
          contentType: 'application/json',
          success: function(response) {
              // Gérez la réponse de l'API (par exemple, affichez un message de succès)
              console.log('Inscription réussie :', response);
              // Redirigez l'utilisateur vers la page de connexion en cas de succès
              window.location.href = 'login.html';
          },
          error: function(error) {
              // Gérez les erreurs de l'API (par exemple, affichez un message d'erreur)
              console.error('Erreur lors de l\'inscription :', error);
              alert('Erreur lors de l\'inscription. Veuillez réessayer.');
          }
      });
  });
});

/*--
        CONNEXION
    -----------------------------------*/
$(document).ready(function() {
  $('#loginForm').submit(function(event) {
      event.preventDefault(); // Empêche le rechargement de la page

      // Récupérez les valeurs des champs du formulaire
      var email = $('#email').val();     
      var password = $('#password').val();

      // Validez les champs (vous pouvez ajouter des validations ici)

      // Créez un objet contenant les données du formulaire
      var formData = {
          email: email,
          password: password
      };

      // Effectuez une requête POST vers votre API
      $.ajax({
          type: 'POST',
          url: 'http://192.168.0.10:3000/users/connexion',
          data: JSON.stringify(formData),
          contentType: 'application/json',
          success: function(response) {
              // Gérez la réponse de l'API (par exemple, affichez un message de succès)
              console.log('connexion réussie :', response);
              // Redirigez l'utilisateur vers la page de connexion en cas de succès
              window.location.href = 'index.html';
                    },
          error: function(error) {
              // Gérez les erreurs de l'API (par exemple, affichez un message d'erreur)
              console.error('Erreur lors de l\'inscription :', error);
              alert('Information Incorrete. Veuillez réessayer.');
          }
      });
  });
});

/*--
        CACHER BUTTON
    -----------------------------------*/
// Fonction pour afficher l'icône de l'utilisateur connecté ou le bouton de connexion
// function toggleUserIcon() {
//   const userIcon = document.getElementById("userIcon");
//   const loginButton = document.getElementById("loginButton");

//   // Supposons que vous ayez les informations de l'utilisateur dans la variable "userData"
//   const userData = {
//       "success": true, // Remplacez ceci par la valeur appropriée
//   };

//   if (userData.success) {
//       // L'utilisateur est connecté, affiche l'icône
//       userIcon.style.display = "block";
//       loginButton.style.display = "none";
//   } else {
//       // L'utilisateur n'est pas connecté, affiche le bouton de connexion
//       userIcon.style.display = "none";
//       loginButton.style.display = "inline-block";
//   }
// }

// // Fonction pour simuler un clic sur l'icône de l'utilisateur
// function toggleDropdown() {
//   const userDropdown = document.getElementById("userDropdown");
//   userDropdown.style.display = (userDropdown.style.display === "block") ? "none" : "block";
// }

// // Appel de la fonction pour afficher l'icône ou le bouton en fonction des informations de l'utilisateur
// toggleUserIcon();

/*--
        AFFICHER CATEGORIE
    -----------------------------------*/
// Récupérez la référence de la liste déroulante
const categoriesDropdown = document.getElementById('categorie');

// Récupérez les données depuis votre API
    fetch('http://192.168.0.10:3000/categories')
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
    fetch('http://192.168.0.10:3000/produitsAdmin')
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
                                <a href="product-details.html" class="image" id="image">
                                    <img src="${product.image}" alt="Course Image">
                                </a>
                                <div class="actions">                                   
                                    <a href="shopping-cart.html" class="action hintT-left hintT-primary" data-hint="Ajouter au panier"><i class="fas fa-shopping-basket"></i></a>                                 
                                </div>
                            </div>
                            <div class="info text-center">  
                                <span class="price" id="prix">${product.prix} XOF</span>                             
                                <h3 class="title" id="titre"><a href="product-details.html">${product.titre}</a></h3>                             
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
    xhr.open("GET", `http://192.168.0.10:3000/produitsAdmin/categories/${categorieId}`, true);

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
                                <a href="product-details.html" class="image">
                                    <img src="${produit.image}" alt="Course Image">
                                </a>
                                <div class="actions">                                   
                                    <a href="shopping-cart.html" class="action hintT-left hintT-primary add-to-cart" data-hint="Ajouter au panier"><i class="fas fa-shopping-basket"></i></a>                               
                                </div>
                            </div>
                            <div class="info text-center">
                                <span class="price">${produit.prix} XOF</span>
                                <h3 class="title"><a href="product-details.html">${produit.nom}</a></h3>
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
    // document.addEventListener('DOMContentLoaded', () => {
    //     const productLinks = document.querySelectorAll('.product-link');
    
    //     productLinks.forEach(productLink => {
    //         productLink.addEventListener('click', function (event) {
    //             event.preventDefault(); // Empêche la navigation par défaut
    
    //             const productId = this.getAttribute('data-product-id');
    
    //             // Effectuez une requête AJAX pour récupérer les détails du produit par son ID
    //             fetch(`http://192.168.0.61:3000/produitsAdmin/produit/${productId}`)
    //                 .then(response => {
    //                     response.json()
    //                     console.log("ouaissssssssssssssssssssssssssssssssssss",response);
    //                 }
                    
    //                 )
    //                 .then(productDetails => {
    //                     // Mettez à jour la page avec les détails du produit (par exemple, en remplaçant le contenu actuel)
    //                     updateProductDetails(productDetails);

    //                 })
    //                 .catch(error => {
    //                     console.error('Erreur lors de la récupération des détails du produit:', error);
    //                 });
    //         });
    //     });
    
    //     // // Fonction pour mettre à jour la page avec les détails du produit
    //     // function updateProductDetails(productDetails) {
    //     //     const productName = document.querySelector('.single-product-content h3.title');
    //     //     const productPrice = document.querySelector('.prices .price-new');
    //     //     const productImage = document.querySelector('.single-product-image img');
    //     //     const productCategory = document.querySelector('.meta-content a');
    //     //     const productDescription = document.querySelector('.description-list ul');

    //     //     // Mettez à jour les éléments avec les détails du produit
    //     //     productName.textContent = productDetails.titre;
    //     //     productPrice.textContent = productDetails.prix + ' XOF';
    //     //     productImage.src = productDetails.image;
    //     //     productCategory.textContent = productDetails.categorie;
            
    //     //     // Mettez à jour la description du produit (remplacez le contenu actuel)
    //     //     productDescription.innerHTML = `
    //     //         <li>${productDetails.description}</li>
    //     //     `;
            
    //     //     // Mettez à jour d'autres éléments si nécessaire
    //     // }
    // });
    