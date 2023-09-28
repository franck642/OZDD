  document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.querySelector(".register-form");
    // const registerButton = document.querySelector(".btn.btn-primary");
    const registerButton = document.getElementById("registerButton");


    registerButton.addEventListener("click", function (e) {
      e.preventDefault();

      const lastName = document.getElementById("lastName").value;
      const firstName = document.getElementById("firstName").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("passwordOne").value;

      // Créez un objet avec les données du formulaire
      const userData = {
        lastName: lastName,
        firstName: firstName,
        email: email,
        password: password,
      };

      // Effectuez la requête HTTP POST vers votre API
      axios
        .post("http://192.168.0.66:3000/users/sinscrire", userData)
        .then(function (response) {
          // Gérez la réponse de l'API ici (par exemple, affichez un message de réussite)
          console.log("Inscription réussie :", response.data);
        })
        .catch(function (error) {
          // Gérez les erreurs ici (par exemple, affichez un message d'erreur)
          console.error("Erreur lors de l'inscription :", error);
        });
    });
  });

