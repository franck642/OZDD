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
          url: 'http://192.168.0.66:3000/users/sinscrire',
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
          url: 'http://192.168.0.66:3000/users/connexion',
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
function toggleUserIcon() {
  const userIcon = document.getElementById("userIcon");
  const loginButton = document.getElementById("loginButton");

  // Supposons que vous ayez les informations de l'utilisateur dans la variable "userData"
  const userData = {
      "success": true, // Remplacez ceci par la valeur appropriée
  };

  if (userData.success) {
      // L'utilisateur est connecté, affiche l'icône
      userIcon.style.display = "block";
      loginButton.style.display = "none";
  } else {
      // L'utilisateur n'est pas connecté, affiche le bouton de connexion
      userIcon.style.display = "none";
      loginButton.style.display = "inline-block";
  }
}

// Fonction pour simuler un clic sur l'icône de l'utilisateur
function toggleDropdown() {
  const userDropdown = document.getElementById("userDropdown");
  userDropdown.style.display = (userDropdown.style.display === "block") ? "none" : "block";
}

// Appel de la fonction pour afficher l'icône ou le bouton en fonction des informations de l'utilisateur
toggleUserIcon();

/*--
        AFFICHER PRODUIT
    -----------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');

    // Récupérez les données depuis votre API
    fetch('http://192.168.0.66:3000/produitsAdmin')
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
