console.log("ttttttttttoooooootototototototototoofranck")
/*--------------------------
 AFFICHER FOURNISSEURS
---------------------------- */
$(document).ready(function() {

    function getFournisseurs() {
        $.ajax({
            url: 'https://ozdd.onrender.com/fournisseurs',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                console.log(data)
                var fournisseurList = $('.list-group');

                fournisseurList.empty();

                data.forEach(function(fournisseur) {
                    var listItem;
                    function decodeBase64ToImage(base64) {
                        var binaryString = atob(base64);
                        var len = binaryString.length;
                        var bytes = new Uint8Array(len);
    
                        for (var i = 0; i < len; ++i) {
                            bytes[i] = binaryString.charCodeAt(i);
                        }
    
                        var blob = new Blob([bytes], { type: "image/jpeg" }); // Assurez-vous de définir le type correct selon votre image
                        var imageUrl = URL.createObjectURL(blob);
    
                        return imageUrl;
                    }
    
                    // Décodez l'image base64 du blog
                    var decodedEventImage = decodeBase64ToImage(fournisseur.logoEntreprise);

                    if (fournisseur.fournisseur) {
                        listItem = `
                            <li class="list-group-item">
                                <div class="media">
                                    <img class="rounded-circle mr-3" src="${decodedEventImage}" />
                                    <div class="media-body align-self-center">
                                        <strong><a href="fournisseur detail.html?id=${fournisseur._id}">${fournisseur.nomEntreprise}</a></strong>
                                        <div class="text-muted">${fournisseur.pays}</div>
                                    </div>
                                    <div class="ml-auto">
                                        <span class="text-success">Compte approuvé</span>
                                    </div>
                                </div>
                            </li>
                        `;
                    } else {
                        listItem = `
                            <li class="list-group-item">
                                <div class="media">
                                    <img class="rounded-circle mr-3" src="${decodedEventImage}" />
                                    <div class="media-body align-self-center">
                                        <strong><a href="fournisseur detail.html?id=${fournisseur._id}">${fournisseur.nomEntreprise}</a></strong>
                                        <div class="text-muted">${fournisseur.pays}</div>
                                    </div>
                                    <div class="ml-auto">
                                        <button class="btn btn-primary" id="fournisseurButton" data-id="${fournisseur._id}">Approuver</button>
                                    </div>
                                </div>
                            </li>
                        `;
                    }

                    fournisseurList.append(listItem);
                });
            },
            error: function(error) {
                console.log('Error when retrieving suppliers', error);
            }
        });
    }

    getFournisseurs();
});



/*--------------------------
 CHANGER L'ETAT FOURNISSEURS
---------------------------- */
$(document).on('click', '#fournisseurButton', function() {
    var fournisseurId = $(this).data('id');
    // console.log('Fournisseur ID: ' + fournisseurId);
   
    var settings = {
      "url": "https://ozdd.onrender.com/fournisseurs/update/" + fournisseurId,
      "method": "PUT",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify({
        "fournisseur": true
      }),
    };
   
    var button = $(this); // Store a reference to the button
   
    $.ajax(settings).done(function (response) {
      console.log(response);
      button.hide(); // Hide the button after the AJAX request is successful
    });
   });
   



/*--------------------------
 DETAILS FOURNISSEURS
---------------------------- */
if (idMatch) {
    var id = idMatch[1];

    // Utiliser l'ID dans la requête AJAX
    var settings = {
        "url": "https://ozdd.onrender.com/fournisseurs/" + id, 
        "method": "GET",
        "timeout": 0,
    };

    // Effectuer la requête AJAX
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
} else {
    console.log("ID non trouvé dans l'URL");
}
$.ajax(settings).done(function (response) {
    // Mettre à jour les éléments HTML avec les informations du fournisseur
    $(".numeroTel").text(response.numeroTel);
    $(".nomEntreprise").text(response.nomEntreprise);
    $(".logo").attr("src", response.logoEntreprise); // Assure-toi que response.logoUrl contient l'URL du logo
    $(".pieceIdentite").attr("src", response.pieceIdentite);
    $(".pays").text(response.pays);
});





/*--
        AFFICHER LES NOM DE ENTREPRISE DES FOURNISSEURS VALIDES
    -------------------------------------------------------------------*/ 
document.addEventListener('DOMContentLoaded', () => {
    // Récupérez la référence de la liste déroulante
    const selectElement = document.getElementById('nomEntreprise');
  
    // Récupérez les données depuis l'API des fournisseurs validés
    fetch('https://ozdd.onrender.com/fournisseurs/valides')
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
            const response = await fetch('https://ozdd.onrender.com/produitsFournisseurs', {
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


