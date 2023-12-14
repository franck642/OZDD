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
              console.log(response);
              // Gérez la réponse de l'API (par exemple, affichez un message de succès)
              connUserLastName= response.user.lastName;
              connFirstname= response.user.firstName;
              connEmail= response.user.email;
              conntoken = response.token;
              
              // Stockez connDataResult dans un cookie
             // Stocker les informations dans le localStorage
              localStorage.setItem('connUserLastName', connUserLastName);
              localStorage.setItem('connFirstname', connFirstname);
              localStorage.setItem('connEmail', connEmail);
              localStorage.setItem('conntoken', conntoken);

              
       
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
        
          var conntoken = localStorage.getItem("conntoken");
          if (conntoken) {
            $("#loginButton").hide();
            $("#userIcon").show();
          } else {
            // Si l'utilisateur n'est pas connecté, masquer l'icône et le menu utilisateur
            $("#userIcon").hide();
          }

          // Déconnexion
            $("#deconnect").click(function(e) {
              e.preventDefault();
              deconn();
          });

          function deconn() {
              localStorage.removeItem("conntoken");
              localStorage.removeItem("connUserLastName");
              localStorage.removeItem("connFirstname");
              localStorage.removeItem("connEmail");
              window.location.href = 'login.html';
          }
      });
      

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
      
      