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

