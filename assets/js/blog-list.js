/*--
        AFFICHER BLOG
    -----------------------------------*/
$(document).ready(function () {
    // Faites une requête GET pour récupérer les blogs depuis l'API
    $.ajax({
        url: "http://192.168.0.11:3000/blogs",
        type: "GET",
        success: function (data) {
            // Parcourez les données des blogs et affichez-les dans le conteneur
            var blogContainer = $("#blog-container");

            data.forEach(function (blog) {
                var blogHTML = `
                    <div class="blog-3 col" data-aos="fade-up">
                        <div class="row row-cols-lg-2 row-cols-1 max-mb-n30">
                            <div class="col max-mb-30">
                                <div class="thumbnail">
                                    <a href="blog-details.html?id=${blog._id}" class="image">
                                        <img src="${blog.image}" alt="Blog Image" style="width: 450px; height: 300px;">
                                    </a>
                                </div>
                            </div>
                            <div class="col max-mb-30">
                                <div class="info pt-0">
                                    <h3 class="title"><a href="blog-details.html?id=${blog._id}">${blog.titre}</a></h3>
                                    <ul class="meta">
                                        <li><i class="fas fa-calendar"></i>Apr 06, 2022</li>
                                        <li><i class="fas fa-eye"></i>70 views</li>
                                    </ul>
                                    <div class="desc">
                                        <p>${blog.apercu}</p>
                                    </div>
                                    <div class="row justify-content-between max-mt-30">
                                        <div class="col-auto">
                                            <a href="blog-details.html?id=${blog._id}" class="btn btn-primary btn-hover-secondary">En savoir plus</a>
                                        </div>
                                        <div class="col-auto">
                                            <div class="post-share">
                                                <span class="label">Partager</span>
                                                <div class="media">
                                                    <span class="icon"><i class="fas fa-share-alt"></i></span>
                                                    <div class="list">
                                                        <a href="JavaScript:Void(0);"><i class="fab fa-facebook-f"></i></a>
                                                        <a href="JavaScript:Void(0);"><i class="fab fa-twitter"></i></a>                                                 
                                                        <a href="JavaScript:Void(0);"><i class="fab fa-instagram"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                blogContainer.append(blogHTML);
            });
        },
        error: function (error) {
            console.error("Erreur lors de la récupération des blogs : " + error);
        }
    });
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
        // Mettez à jour le contenu HTML de la page avec les données du produit
        $(".blog-3.blog-details .thumbnail img").attr("src", response.image);
        $(".blog-3.blog-details .category").text(response.categorieBlog);
        $(".blog-3.blog-details .title").text(response.titre);
        // $(".blog-3.blog-details .meta li:eq(0)").html(`<i class="fas fa-calendar"></i>${response.date}`);
        // $(".blog-3.blog-details .meta li:eq(1)").html(`<i class="fas fa-eye"></i>${response.views} views`);
        $(".blog-3.blog-details .desc").html(response.description);
        // Mettez à jour d'autres propriétés du  si nécessaire
    });