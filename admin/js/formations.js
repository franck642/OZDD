/*--------------------------
 CREER FORMATION
---------------------------- */
let form = document.querySelector('form');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  let formData = new FormData(this);

  fetch('https://ozdd.onrender.com/formations', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);

    // Remplacez l'alerte par un popup
    Swal.fire({
        title: 'Succès!',
        text: 'Formation créée avec succès!',
        icon: 'success',
        confirmButtonText: 'OK'
    }).then((result) => {
        // Actualisez la page lorsque l'utilisateur clique sur le bouton OK
        if (result.isConfirmed) {
            location.reload();
        }
    });

  })
  .catch((error) => {
    console.error('Error:', error);

    // Affichez un popup d'erreur
    Swal.fire({
        title: 'Erreur!',
        text: 'Une erreur s\'est produite lors de la création de la formation.',
        icon: 'error',
        confirmButtonText: 'OK'
    });
    location.reload();
  });
});


/*--------------------------
 AFFICHER FORMATION
---------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const productTableBody = document.getElementById('formationTableBody');

  // Récupérez les données depuis votre API
  fetch('https://ozdd.onrender.com/formations')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      // Parcourez les données et ajoutez-les au tableau
      data.forEach(formation => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td><img src="${formation.image}" alt="" /></td>
          <td>${formation.titre}</td>
          <td>${formation.pdf}</td>
          <td>${formation.prix}</td>
          <td>
            <button data-toggle="tooltip" title="Modifier" class="pd-setting-ed"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
            <button data-toggle="tooltip" title="Corbeille" id="deleteFormation" data-id="${formation._id}" class="pd-setting-ed"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
          </td>
        `;
        productTableBody.appendChild(newRow);
      });
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des produits depuis l\'API:', error);
    });
});



// $(document).on('click', '#deleteFormation', function() {
// 	var formationId = $(this).data('id');
// 	// console.log('formation ID: ' + formationId);
  
// 	// Définissez les paramètres pour la requête AJAX DELETE
// 	var settings = {
// 	  "url": "https://ozdd.onrender.com/formations/" + formationId,
// 	  "method": "DELETE",
// 	  "timeout": 0,
// 	};
  
// 	// Effectuez la requête AJAX DELETE
// 	$.ajax(settings)
// 	  .done(function(response) {
// 		console.log('formation supprimé avec succès:', response);
// 		location.reload();
// 	  })
// 	  .fail(function(error) {
// 		console.error('Erreur lors de la suppression de la formation:', error);
		
// 	  });
//   });