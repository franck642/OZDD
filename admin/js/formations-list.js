



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
			<td><img src="${formation.imagePath}" alt="" /></td>
			<td>${formation.titre}</td>
			<td>${formation.downloadUrl}</td>
			<td>${formation.prix}</td>
			<td>
			  <button data-toggle="tooltip" title="Modifier" class="pd-setting-ed"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
			  <button data-toggle="tooltip" title="Corbeille" class="pd-setting-ed"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
			</td>
		  `;
		  productTableBody.appendChild(newRow);
		});
	  })
	  .catch(error => {
		console.error('Erreur lors de la récupération des produits depuis l\'API:', error);
	  });
  });