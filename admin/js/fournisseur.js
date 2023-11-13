/*--------------------------
 AFFICHER FOURNISSEURS
---------------------------- */
$(document).ready(function() {
    // Function to get suppliers from the API
    function getFournisseurs() {
        $.ajax({
            url: 'http://192.168.31.146:3000/fournisseurs',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                var fournisseurList = $('.list-group');

                fournisseurList.empty(); // Remove old elements

                data.forEach(function(fournisseur) {
                    var listItem = `
                        <li class="list-group-item">
                            <div class="media">
                                <img class="rounded-circle mr-3" src="${fournisseur.logoEntreprise}" />
                                <div class="media-body align-self-center">
                                    <strong><a href="fournisseur detail.html">${fournisseur.nomEntreprise}</a></strong>
                                    <div class="text-muted">${fournisseur.pays}</div>
                                </div>
                                <div class="ml-auto"> <!-- This "ml-auto" class will align the button to the right -->
                                <button class="btn btn-primary" onclick="changerStatut('${fournisseur._id}')">Changer Statut</button>
                            </div>
                            </div>
                        </li>
                    `;

                    fournisseurList.append(listItem);
                });
            },
            error: function(error) {
                console.log('Error when retrieving suppliers', error);
            }
        });
    }

    // Call the function to get the suppliers when the page loads
    getFournisseurs();
});


/*--
        AFFICHER LES NOM DE ENTREPRISE DESFOURNISSEURS TRUE
    -------------------------------------------------------------------*/ 
document.addEventListener('DOMContentLoaded', () => {
    // Récupérez la référence de la liste déroulante
    const selectElement = document.getElementById('nomEntreprise');
  
    // Récupérez les données depuis l'API des fournisseurs validés
    fetch('http://192.168.31.146:3000/fournisseurs/valides')
      .then(response => response.json())
      .then(data => {
        // Parcourez les données et ajoutez-les comme options dans la liste déroulante
        data.forEach(fournisseur => {
          const option = document.createElement('option');
          option.value = fournisseur._id; // Remplacez 'value' par le nom de votre champ
          option.textContent = fournisseur.nomEntreprise; // Remplacez 'label' par le nom de votre champ
          selectElement.appendChild(option);
        });
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des fournisseurs validés depuis l\'API:', error);
      });
  });


  /*--
        CREER LES PRODUITS FOURNISSEURS TRUE
    ----------------------------------------------*/ 
    document.getElementById('btnCreateProductFournisseur').addEventListener('click', async () => {
        const titre = document.getElementById('titre').value;
        const description = document.getElementById('description').value;
        const prix = parseFloat(document.getElementById('prix').value);
        const apercu = document.getElementById('apercu').value;
        const nomEntreprise = document.getElementById('nomEntreprise').value;
        const image = document.getElementById('image').files[0]; // Récupère le fichier d'image
    
        const formData = new FormData();
        formData.append('titre', titre);
        formData.append('description', description);
        formData.append('prix', prix);
        formData.append('apercu', apercu);
        formData.append('nomEntreprise', nomEntreprise);
        formData.append('image', image); // Ajoute le fichier d'image à FormData
        console.log("hhhhhhhhhhhhhhhhhhhhh", formData)
        try {
            const response = await fetch('http://192.168.31.146:3000/produitsFournisseurs', {
                method: 'POST',
                body: formData
            });
    
            const data = await response.json();
            console.log('Produit créé:', data);
    
            // Remplacez l'alerte par un popup
            Swal.fire({
                title: 'Succès!',
                text: 'Produit fournisseur Créer avec succès.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                // Actualisez la page lorsque l'utilisateur clique sur le bouton OK
                if (result.isConfirmed) {
                    location.reload();
                }
            });
    
        } catch (error) {
            console.error('Erreur lors de la création du produit:', error);
    
            // Affichez un popup d'erreur
            Swal.fire({
                title: 'Erreur!',
                text: 'Une erreur s\'est produite lors de la création du produit.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });