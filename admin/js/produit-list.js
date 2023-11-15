/*--------------------------
 AFFICHER PRODUIT
---------------------------- */
document.addEventListener('DOMContentLoaded', () => {
	const productTableBody = document.getElementById('productTableBody');

	// Récupérez les données depuis votre API
	fetch('https://ozdd.onrender.com/produitsAdmin')
		.then(response => response.json())
		.then(data => {
			console.log(data)
			// Parcourez les données et ajoutez-les au tableau
			data.forEach(product => {
				const newRow = document.createElement('tr');
				newRow.innerHTML = `
					<td><img src="${product.image}" alt="" /></td>
					<td><a href="product-detail.html?id=${product._id}">${product.titre}</a></td>				
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


/*--
        AFFICHER DETAILS PRODUIT
    -----------------------------------*/ 
var url = window.location.href;
var idMatch = url.match(/[?&]id=([^&]*)/);

if (idMatch) {
    var id = idMatch[1];

    // Utiliser l'ID dans la requête AJAX
    var settings = {
        "url": "https://ozdd.onrender.com/produitsAdmin/produit/" + id,
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
    // Mettez à jour les éléments HTML avec les données du produit
    $('#myTabContent1 .product-tab-list img').attr('src', response.image);
    $('.single-product-details h1').text(response.titre);
    $('.single-pro-price .single-regular').text(response.prix + ' XOF');
    $('#description .review-content-section').text(response.description);
    $('.single-pro-cn p').text(response.apercu);

    // Mettez à jour d'autres propriétés du produit si nécessaire
});


