console.log("fffffffffffffff")
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
      fetch('http://192.168.0.53:3000/fournisseurs', {
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
    $(document).ready(function() {
      $.ajax({
          url: 'http://192.168.0.53:3000/fournisseurs/valides',
          type: 'GET',
          dataType: 'json',
          success: function(data) {
              // Loop over the data
              data.forEach(function(fournisseur) {
                  // Create a new grid item for each fournisseur
                  var gridItem = `
                      <div class="col-lg-3 col-md-6 col-sm-6 max-mb-50">
                          <div class="grid-item ">
                              <div class="ht-team-member">
                                  <div class="team-image">
                                      <a href="event-product.html">
                                          <img class="img-fluid" src="${fournisseur.logoEntreprise}" alt="">
                                      </a>
                                      <div class="social-networks">
                                          <div class="inner">
                                              <a target="_blank" href="${fournisseur.facebook}" class=" hint--bounce hint--top hint--theme-two" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                                              <a target="_blank" href="${fournisseur.twitter}" class=" hint--bounce hint--top hint--theme-two" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                                              <a target="_blank" href="${fournisseur.instagram}" class=" hint--bounce hint--top hint--theme-two" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                                              <a target="_blank" href="${fournisseur.youtube}" class=" hint--bounce hint--top hint--theme-two" aria-label="Youtube"><i class="fab fa-youtube"></i></a>
                                          </div>
                                      </div>
                                  </div>
                                  <div class="team-info text-center">
                                      <h6 class="name">${fournisseur.nomEntreprise}</h6>
                                      <div class="position">${fournisseur.pays}</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  `;
  
                  // Append the new grid item to the container
                  $('#fournisseurs-container').append(gridItem);
              });
          },
          error: function(error) {
              console.log('Error when retrieving valid suppliers', error);
          }
      });
  });
  