/*--------------------------
 CATEGORIE BLOG
---------------------------- */	
// document.addEventListener('DOMContentLoaded', () => {
//     const categoriesDropdown = document.getElementById('categorieBlog');

//     // Effectuez une requête AJAX pour récupérer les catégories depuis votre API
//     fetch('https://ozdd.onrender.com/categoriesblog')
//         .then(response => response.json())
//         .then(data => {
//             // Parcourez les catégories récupérées et ajoutez-les au menu déroulant
//             data.forEach(category => {
//                 const option = document.createElement('option');
//                 option.value = category.id; // Assurez-vous que vous avez un champ "id" dans vos catégories
//                 option.textContent = category.categorieBlog; // Assurez-vous que vous avez un champ "categorieBlog" dans vos catégories
//                 categoriesDropdown.appendChild(option);
//                 console.log(data);
//             });
//         })
//         .catch(error => {
//             console.error('Erreur lors de la récupération des catégories de blogs depuis l\'API:', error);
//         });
// });



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
        // var categorieBlog = $("#categorieBlog").val();
        var image = $("#image")[0].files[0];

        // Créer un objet FormData pour envoyer les données au serveur
        var formData = new FormData();
        formData.append("titre", titre);
        formData.append("apercu", apercu);
        formData.append("description", description);
        // formData.append("categorieBlog", categorieBlog);
        formData.append("image", image);

        // Envoyer une requête POST vers l'API pour enregistrer le blog
        $.ajax({
            url: "https://ozdd.onrender.com/blogs",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                // Le blog a été enregistré avec succès, effectuez ici les actions nécessaires
                console.log("Blog enregistré avec succès");

                // Remplacez l'alerte par un popup
                Swal.fire({
                    title: 'Succès!',
                    text: 'Blog Créer avec succès.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    // Actualisez la page lorsque l'utilisateur clique sur le bouton OK
                    if (result.isConfirmed) {
                        location.reload();
                    }
                });

            },
            error: function (error) {
                // Gérer les erreurs en cas de problème avec la requête
                console.error("Erreur lors de l'enregistrement du blog : " + error);

                // Affichez un popup d'erreur
                Swal.fire({
                    title: 'Erreur!',
                    text: 'Une erreur s\'est produite lors de l\'enregistrement du blog.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
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
        url: 'https://ozdd.onrender.com/blogs',
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
        var decodedBlogImage6 = decodeBase64ToImage(blog.image);
        var blogHtml = `
        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12" >
            <div class="panel-body blog-pra">
                <div class="blog-img">
                    <img src="${decodedBlogImage6}" alt="" />
                    <a href="blog-details.html?id=${blog._id}">
                        <h4>${blog.titre}</h4>
                    </a>
                </div>
                <p>${blog.createdAt}</p>
            </div>
            <div class="panel-footer">
                <span class="pull-right"><i class="fa fa-comments-o"> </i> 22 comments</span>
                <button data-toggle="tooltip" title="Corbeille" id="deleteBlog" data-id="${blog._id}"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
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
            "url": "https://ozdd.onrender.com/blogs/blog/" + id,
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
        var decodedBlogImage5 = decodeBase64ToImage(response.image.data);
        // Mettez à jour le contenu HTML de la page avec les données du billet de blog
        $(".blog-image a img").attr("src", decodedBlogImage5);
        $(".blog-date .blog-day").text(response.date);
        $(".blog-details .blog-ht").text(response.titre);
        $(".blog-details p").text(response.description);
    });
    


    $(document).on('click', '#deleteBlog', function() {
        var blogId = $(this).data('id');
        // console.log('product ID: ' + productId);
      
        // Définissez les paramètres pour la requête AJAX DELETE
        var settings = {
          "url": "https://ozdd.onrender.com/blogs/blog/" + blogId,
          "method": "DELETE",
          "timeout": 0,
        };
      
        // Effectuez la requête AJAX DELETE
        $.ajax(settings)
          .done(function(response) {
            console.log('blog supprimé avec succès:', response);
            location.reload();
          })
          .fail(function(error) {
            console.error('Erreur lors de la suppression du blog:', error);
            
          });
      });