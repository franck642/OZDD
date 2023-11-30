/*--
        CONNEXION
    -----------------------------------*/   
    // Fonction pour récupérer des données depuis un cookie
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
          var date = new Date();
          date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
          expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + JSON.stringify(value) + expires + "; path=/";
      }
      
      // Fonction pour récupérer des données depuis un cookie
      function getCookie(name) {
        var nameEQ = name + "=";
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i];
          while (cookie.charAt(0) === " ") {
            cookie = cookie.substring(1, cookie.length);
          }
          if (cookie.indexOf(nameEQ) === 0) {
            return JSON.parse(cookie.substring(nameEQ.length, cookie.length));
          }
        }
        return null;
      }
      
      var connDataResult = getCookie("connDataResult");
      
      if (connDataResult) {
        // Utilisez connDataResult comme vous le souhaitez
        var userDataDiv = document.getElementById("userData");
        userDataDiv.innerHTML = connDataResult.firstName;
      }
      
      $(document).ready(function () {
        $("#loginForm").submit(function (event) {
          event.preventDefault(); // Empêche le rechargement de la page
          // Récupérez les valeurs des champs du formulaire
          var email = $("#email").val();
          var password = $("#password").val();
          // Validez les champs (vous pouvez ajouter des validations ici)
          // Créez un objet contenant les données du formulaire
          var formData = {
            email: email,
            password: password,
          };
      
          // Effectuez une requête POST vers votre API
          $.ajax({
            type: "POST",
            url: "https://ozdd.onrender.com/users/connexion",
            data: JSON.stringify(formData),
            contentType: "application/json",
            success: function (response) {
              // Gérez la réponse de l'API (par exemple, affichez un message de succès)
              connUserLastName= response.user.lastName;
              connFirstname= response.user.firstName;
              connEmail= response.user.email;
              conntoken = response.token;
              // Stockez connDataResult dans un cookie
              localStorage.setItem("userLastName", connUserLastName) // 30 jours d'expiration
              localStorage.setItem("userFirstName", connFirstname)
              localStorage.setItem("useremail", connEmail)
              localStorage.setItem("usertoken", conntoken)
      
              // Redirigez l'utilisateur vers la page de connexion en cas de succès
              //const tok = localStorage.getItem("userLastName");
              //const tok1 = localStorage.getItem("userFirstName");
              //console.log(tok1);
              // Vérifiez le statut admin
                if (response.user.admin) {
                    // Redirigez l'utilisateur vers la page index.html si admin est true
                    window.location.href = 'admin/index-2.html';
                } else {
                    // Redirigez l'utilisateur vers la page Admin/index-2.html si admin est false                    
                    window.location.href = 'index.html';
                }
            },
            error: function (error) {
              // Gérez les erreurs de l'API (par exemple, affichez un message d'erreur)
              console.error("Erreur lors de la connexion :", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur lors de la connexion',
                    text: 'Informations incorrectes. Veuillez réessayer.',
                    confirmButtonText: 'OK'
                });
            },
          });
        });
      });
      
      const deconnect = document.getElementById('deconnect');
      
      function deconn() {
        localStorage.removeItem("usertoken");
        localStorage.removeItem("userLastName");
        localStorage.removeItem("userFirstName");
        localStorage.removeItem("useremail");
        window.location.href = 'login.html';
      } 
      
      deconnect.addEventListener("click", function(e) {
          e.preventDefault();
          deconn();
      })
    


    // $(document).ready(function() {
    //     $('#loginForm').submit(function(event) {
    //         event.preventDefault(); // Empêche le rechargement de la page
      
    //         // Récupérez les valeurs des champs du formulaire
    //         var email = $('#email').val();     
    //         var password = $('#password').val();
      
    //         // Validez les champs (vous pouvez ajouter des validations ici)
      
    //         // Créez un objet contenant les données du formulaire
    //         var formData = {
    //             email: email,
    //             password: password
    //         };
      
    //         // Effectuez une requête POST vers votre API
    //         $.ajax({
    //             type: 'POST',
    //             url: 'https://ozdd.onrender.com/users/connexion',
    //             data: JSON.stringify(formData),
    //             contentType: 'application/json',
    //             success: function(response) {
    //                 // Gérez la réponse de l'API (par exemple, affichez un message de succès)
    //                 console.log('connexion réussie :', response);
    //                 connDataResult = response.user;
    //                 userName = connDataResult.firstName;
    //                 var strongElement = document.getElementById("theusername");
    //                 strongElement.innerHTML = userName;

    //                 console.log(connDataResult);
    //                 // Affichez un message de succès avec SweetAlert
    //                 Swal.fire({
    //                     icon: 'success',
    //                     title: 'Connexion réussie',
    //                     text: 'Bienvenue, ' + userName + '!',
    //                     confirmButtonText: 'OK'
    //                 }).then((result) => {
    //                     if (result.isConfirmed) {
    //                         // Redirigez l'utilisateur vers la page de connexion en cas de succès
    //                         window.location.replace('index.html');
    //                     }
    //                 });
    //             },
    //             error: function(error) {
    //                 // Gérez les erreurs de l'API (par exemple, affichez un message d'erreur)
    //                 console.error('Erreur lors de l\'inscription :', error);
                    
    //                 // Affichez un message d'erreur avec SweetAlert
    //                 Swal.fire({
    //                     icon: 'error',
    //                     title: 'Erreur lors de la connexion',
    //                     text: 'Informations incorrectes. Veuillez réessayer.',
    //                     confirmButtonText: 'OK'
    //                 });
    //             }
    //         });
    //     });
    // });
      
      /*--
              CACHER BUTTON
          -----------------------------------*/
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
      
      
      // Fonction pour basculer le menu déroulant
      function toggleDropdown() {
        var userDropdown = document.getElementById("userDropdown");
        userDropdown.classList.toggle("show");
      }
      
      // Vérifier l'état de connexion
      var isConnected = localStorage.getItem("usertoken") !== null;
      
      // Cibler les éléments
      var loginButton = document.getElementById("loginButton");
      var userIcon = document.getElementById("userIcon");
      
      // Modifier la visibilité en fonction de l'état de connexion
      if (isConnected) {
        loginButton.style.display = "none"; // Cacher le bouton de connexion
        userIcon.style.display = "inline-block"; // Afficher l'icône d'utilisateur
      } else {
        loginButton.style.display = "inline-block"; // Afficher le bouton de connexion
        userIcon.style.display = "none"; // Cacher l'icône d'utilisateur
      }
      