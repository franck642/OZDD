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
// // Définissez votre condition ici (true pour afficher, false pour cacher)
// var condition = false;

// // Récupérez une référence vers l'élément du bouton
// var bouton = document.getElementById("loginButton");
// var icon = document.getElementById("userIcon");

// // Vérifiez la condition et masquez ou affichez le bouton en conséquence
// if (condition== true) {
//     bouton.style.display = "block"; // Affiche le bouton
// } else {
//     bouton.style.display = "none";  // Cache le bouton
//   }

