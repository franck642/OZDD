console.log("fffffffffffffff")
/*--
        AFFICHER LES FOURNISSEURS TRUE
    -----------------------------------*/ 

var settings = {
  "url": "https://ozdd.onrender.com/fournisseurs/valides",
  "method": "GET",
  "timeout": 0,
};

$.ajax(settings).done(function (response) {
  // Utilisez directement response.responseJSON au lieu de response
  var fournisseurs = response;

  // Assurez-vous que la réponse est un tableau
  if (Array.isArray(fournisseurs)) {
    var cardContainer = $("#card-container");

    // Parcourez le tableau de fournisseurs et créez une carte pour chaque fournisseur
    fournisseurs.forEach(function (fournisseur) {
      // Créer une carte pour le fournisseur
      var cardHtml = `
      <div class="col-lg-3 col-md-6 col-sm-6 max-mb-50"> 
          <div class="grid-item">
              <div class="team-member-card">
                  <div class="member-image-container">
                      <a href="product-details.html?id=${fournisseur._id}">
                          <img class="member-image img-fluid" src="${fournisseur.logoEntreprise}" alt="">
                      </a>
                      <div class="social-icons">
                          <div class="icons-container">
                              <a target="_blank" href="JavaScript:Void(0);" class="social-icon hint--bounce hint--top hint--theme-two" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                              <a target="_blank" href="JavaScript:Void(0);" class="social-icon hint--bounce hint--top hint--theme-two" aria-label="Twitter"><i class="fab fa-twitter"></i></a>                                          
                          </div>
                      </div>
                  </div>
                  <div class="member-info text-center">
                      <h6 class="member-name">${fournisseur.nomEntreprise}</h6>
                      <div class="member-position">${fournisseur.pays}</div>
                      <div><a href="event-product.html?id=${fournisseur._id}" data-id="${fournisseur._id}" class="services-button">Services</a>
                      </div>
                  </div>
              </div>
          </div>
      </div> 
  `;
  
  // Utilisez la variable cardHtml comme nécessaire, par exemple, en l'ajoutant à un conteneur sur votre page.
  
      // Ajouter la carte au conteneur
      cardContainer.append(cardHtml);
    });
  } else {
    console.log("La réponse n'est pas un tableau de fournisseurs.");
  }
});




/*--
        CREER FOURNISSEUR
    -----------------------------------*/ 
    const form = document.getElementById('billing-form');
    form.addEventListener('click', function(event) {
      event.preventDefault(); // Empêche la soumission par défaut du formulaire
    
      // Récupérez les valeurs des champs
      const numeroTel = document.getElementById('numeroTel').value;
      const nomEntreprise = document.getElementById('nomEntreprise').value;
      const logoEntreprise = document.getElementById('logoEntreprise').files[0];
      const pays = document.getElementById('pays').value;
      const pieceIdentite = document.getElementById('pieceIdentite').files[0];
    
      // Vérifiez que tous les champs sont remplis
      if (!numeroTel || !nomEntreprise || !logoEntreprise || !pays || !pieceIdentite) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Veuillez remplir tous les champs.',
        });
        return;
      }
    
      // Créez un objet FormData pour envoyer les données en tant que formulaire multipart
      const formData = new FormData();
      formData.append('numeroTel', numeroTel);
      formData.append('nomEntreprise', nomEntreprise);
      formData.append('logoEntreprise', logoEntreprise);
      formData.append('pays', pays);
      formData.append('pieceIdentite', pieceIdentite);
      console.log(formData);
    
      // Effectuez une requête POST vers l'API
      fetch('https://ozdd.onrender.com/fournisseurs', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (response.status === 200) {
          // Le fournisseur a été ajouté avec succès
          Swal.fire({
              icon: 'success',
              title: 'Succès',
              text: 'Fournisseur ajouté avec succès !',
          }).then(() => {
              // Réinitialisez le formulaire ici si nécessaire
              form.reset();
              location.reload();
          });
      } else {
          Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Erreur lors de l\'ajout du fournisseur.',
          });
      }
    })
      .catch(error => {
        console.error('Une erreur s\'est produite : ', error);
      });
    });

    
/*--
        AFFICHER LES FOURNISSEURS TRUE
    -----------------------------------*/ 
    var url = window.location.href;
    var idMatch = url.match(/[?&]id=([^&]*)/);
    
    if (idMatch) {
        var entrepriseId = idMatch[1];
    
        // Utiliser l'ID dans la requête AJAX pour récupérer les produits
        var productsSettings = {
            "url": "https://ozdd.onrender.com/produitsFournisseurs?nomEntreprise=" + entrepriseId,
            "method": "GET",
            "timeout": 0,
        };
    
        // Effectuer la requête AJAX pour récupérer les produits de l'entreprise
        $.ajax(productsSettings).done(function (products) {
            console.log(products);
    
            // Manipuler la réponse ici et afficher les produits dans votre HTML
            displayProducts(products);
        });
    } else {
        console.log("ID de l'entreprise non trouvé dans l'URL");
    }
    
    function displayProducts(products) {
        // Sélectionnez l'élément HTML où vous souhaitez afficher les produits
        var container = $("#productsContainer");
    
        // Parcourez les produits et générez le HTML correspondant
        products.forEach(function (product) {
            var productHtml = `
                <div class="col max-mb-30" data-aos="fade-up">
                    <div class="course-7 course-fluid">
                        <div class="thumbnail">
                            <a href="product-details.html" class="image">
                                <img src="${product.image}" alt="Course Image">
                            </a>
                            <div class="actions">                                   
                                <a href="shopping-cart.html" class="action hintT-left hintT-primary" data-hint="Ajouter au panier"><i class="fas fa-shopping-basket"></i></a>                                 
                            </div>
                        </div>
                        <div class="info text-center">
                            <span class="price">${product.prix} XOF</span>                              
                            <h3 class="title"><a href="product-details.html">${product.titre}</a></h3>                              
                        </div>
                    </div>
                </div>`;
    
            // Ajoutez le HTML du produit au conteneur
            container.append(productHtml);
        });
    }
    
    