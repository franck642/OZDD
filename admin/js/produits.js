/*--------------------------
 CATEGORIE PRODUIT
---------------------------- */	
document.addEventListener('DOMContentLoaded', () => {
	// Récupérez la référence de la liste déroulante
	const selectElement = document.getElementById('categorie');
	// Récupérez les données depuis votre API
	fetch('http://192.168.31.147:3000/categories')
		.then(response => response.json())
		.then(data => {
			// Parcourez les données et ajoutez-les comme options dans la liste déroulante
			data.forEach(category => {
				const option = document.createElement('option');
				option.value = category._id; // Remplacez 'value' par le nom de votre champ
				option.textContent = category.categorie; // Remplacez 'label' par le nom de votre champ
				selectElement.appendChild(option);
				console.log(data)
			});
		})
		
		.catch(error => {
			console.error('Erreur lors de la récupération des catégories depuis l\'API:', error);
		});
});

/*--------------------------
 CREER PRODUIT
---------------------------- */	
document.getElementById('btnCreateProduct').addEventListener('click', async () => {
    const titre = document.getElementById('titre').value;
    const description = document.getElementById('description').value;
    const prix = parseFloat(document.getElementById('prix').value);
    const apercu = document.getElementById('apercu').value;
    const categorie = document.getElementById('categorie').value;
    const image = document.getElementById('image').files[0]; // Récupère le fichier d'image

    const formData = new FormData();
    formData.append('titre', titre);
    formData.append('description', description);
    formData.append('prix', prix);
    formData.append('apercu', apercu);
    formData.append('categorie', categorie);
    formData.append('image', image); // Ajoute le fichier d'image à FormData
	console.log("zzzzzzzzzzzzzzzz", formData)
    try {
        const response = await fetch('http://192.168.31.147:3000/produitsAdmin', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        console.log('Produit créé:', data);

        // Remplacez l'alerte par un popup
        Swal.fire({
            title: 'Succès!',
            text: 'Produit Créer avec succès.',
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

/*--------------------------
 AFFICHER PRODUIT
---------------------------- */
document.addEventListener('DOMContentLoaded', () => {
	const productTableBody = document.getElementById('productTableBody');

	// Récupérez les données depuis votre API
	fetch('http://192.168.31.145:3000/produitsAdmin')
		.then(response => response.json())
		.then(data => {
			console.log(data)
			// Parcourez les données et ajoutez-les au tableau
			data.forEach(product => {
				const newRow = document.createElement('tr');
				newRow.innerHTML = `
					<td><img src="${product.image}" alt="" /></td>
					<td>${product.titre}</td>				
					<td>${product.prix}</td>
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


