/*--------------------------
 CATEGORIE BLOG
---------------------------- */	
document.addEventListener('DOMContentLoaded', () => {
	console.log("toni");
    const categoriesDropdown = document.getElementById('categorieBlog');

    // Effectuez une requête AJAX pour récupérer les catégories depuis votre API
    fetch('http://192.168.0.10:3000/categoriesblog')
        .then(response => response.json())
        .then(data => {
            // Parcourez les catégories récupérées et ajoutez-les au menu déroulant
            data.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id; // Assurez-vous que vous avez un champ "id" dans vos catégories
                option.textContent = category.categorieBlog; // Assurez-vous que vous avez un champ "categorieBlog" dans vos catégories
                categoriesDropdown.appendChild(option);
                console.log(data);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des catégories de blogs depuis l\'API:', error);
        });
});



/*--------------------------
 CREER BLOG
---------------------------- */
$(document).ready(function () {
    // Gestionnaire de clic pour le bouton "Enregistrer"
    $("#btnCreateBlog").click(function () {
        // Récupérer les données du formulaire
        var titre = $("#titre").val();
        var apercu = $("#apercu").val();
        var description = $("#description").val();
        var categorieBlog = $("#categorieBlog").val();
        var image = $("#image")[0].files[0];

        // Créer un objet FormData pour envoyer les données au serveur
        var formData = new FormData();
        formData.append("titre", titre);
        formData.append("apercu", apercu);
        formData.append("description", description);
        formData.append("categorieBlog", categorieBlog);
        formData.append("image", image);

        // Envoyer une requête POST vers l'API pour enregistrer le blog
        $.ajax({
            url: "http://192.168.0.10:3000/blogs",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                // Le blog a été enregistré avec succès, effectuez ici les actions nécessaires
                console.log("Blog enregistré avec succès");
                alert('Blog Créer avec succès.');
            },
            error: function (error) {
                // Gérer les erreurs en cas de problème avec la requête
                console.error("Erreur lors de l'enregistrement du blog : " + error);
            }
        });
    });

    // Vous pouvez ajouter d'autres gestionnaires d'événements pour éditer et supprimer des blogs.
});