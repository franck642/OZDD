/*--------------------------
 CATEGORIE BLOG
---------------------------- */	
document.addEventListener('DOMContentLoaded', () => {
    const categoriesDropdown = document.getElementById('categorieBlog');

    // Effectuez une requête AJAX pour récupérer les catégories depuis votre API
    fetch('http://192.168.0.11:3000/categoriesblog')
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
            url: "http://192.168.0.11:3000/blogs",
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

/*--------------------------
 AFFICHER BLOG
---------------------------- */
 // Fonction pour récupérer et afficher les blogs
 function getBlogs() {
    $.ajax({
        url: 'http://192.168.0.11:3000/blogs',
        type: 'GET',
        success: function (data) {
            // Manipuler les données et les ajouter au conteneur de blog
            displayBlogs(data);
        },
        error: function (error) {
            console.error('Erreur lors de la récupération des blogs:', error);
        }
    });
}

// Fonction pour afficher les blogs dans le conteneur
function displayBlogs(blogs) {
    var blogContainer = $('#blog-container');

    // Effacer le contenu actuel du conteneur
    blogContainer.empty();

    // Parcourir chaque blog et l'ajouter au conteneur
    blogs.forEach(function (blog) {
        var blogHtml = `
        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12" >
            <div class="panel-body blog-pra">
                <div class="blog-img">
                    <img src="${blog.image}" alt="" />
                    <a href="blog-details.html?id=${blog._id}">
                        <h4>${blog.titre}</h4>
                    </a>
                </div>
                <p>${blog.content}</p>
            </div>
            <div class="panel-footer">
                <span class="pull-right"><i class="fa fa-comments-o"> </i> 22 comments</span>
                <i class="fa fa-eye"> </i>142 views
            </div>
        </div>
        `;

        // Ajouter le blog au conteneur
        blogContainer.append(blogHtml);
    });
}

// Appeler la fonction pour récupérer et afficher les blogs au chargement de la page
$(document).ready(function () {
    getBlogs();
});

/*--
        AFFICHER DETAILS BLOG
    -----------------------------------*/ 
    var url = window.location.href;
    var idMatch = url.match(/[?&]id=([^&]*)/);
    
    if (idMatch) {
        var id = idMatch[1];
    
        // Utiliser l'ID dans la requête AJAX
        var settings = {
            "url": "http://192.168.0.11:3000/blogs/blog/" + id,
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
        // Mettez à jour le contenu HTML de la page avec les données du billet de blog
        $(".blog-image a img").attr("src", response.image);
        $(".blog-date .blog-day").text(response.date);
        $(".blog-details .blog-ht").text(response.titre);
        $(".blog-details p").text(response.description);
    });
    