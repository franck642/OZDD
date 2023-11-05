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
 // Fonction pour récupérer les fournisseurs depuis l'API
//  function getFournisseurs() {
//   fetch("http://192.168.31.147:3000/fournisseurs/valides")
//     .then(response => response.json())
//     .then(data => {
//       // Traitement des données reçues de l'API
//       if (data && data.length > 0) {
//         data.forEach(function (fournisseur) {
//           var fournisseurElement = `
//             <div class="col-lg-3 col-md-6 col-sm-6 max-mb-50">
//               <div class="grid-item">
//                 <div class="ht-team-member">
//                   <div class="team-image">
//                     <a href="event-product.html">
//                       <img class="img-fluid" src="${fournisseur.image_url}" alt="">
//                     </a>
//                     <div class="social-networks">
//                       <div class="inner">
//                         <a target="_blank" href="${fournisseur.facebook_url}" class="hint--bounce hint--top hint--theme-two" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
//                         <a target="_blank" href="${fournisseur.twitter_url}" class="hint--bounce hint--top hint--theme-two" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
//                         <a target="_blank" href="${fournisseur.instagram_url}" class="hint--bounce hint--top hint--theme-two" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
//                         <a target="_blank" href="${fournisseur.youtube_url}" class="hint--bounce hint--top hint--theme-two" aria-label="Youtube"><i class="fab fa-youtube"></i></a>
//                       </div>
//                     </div>
//                   </div>
//                   <div class="team-info text-center">
//                     <h6 class="name">${fournisseur.name}</h6>
//                     <div class="position">${fournisseur.location}</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           `;

//           // Ajouter l'élément du fournisseur au conteneur
//           document.getElementById("fournisseurs-container").innerHTML += fournisseurElement;
//         });
//       }
//     })
//     .catch(error => {
//       console.error("Une erreur s'est produite lors de la récupération des fournisseurs :", error);
//     });
// }

// // Appeler la fonction pour afficher les fournisseurs
// getFournisseurs();


