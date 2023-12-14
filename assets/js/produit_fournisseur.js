/*--
        AFFICHER LES FOURNISSEURS TRUE
    -----------------------------------*/ 
    var url = window.location.href;
    var idMatch = url.match(/[?&]id=([^&]*)/);
    
    
    if (idMatch) {
        var entrepriseId = idMatch[1];
    
        // Utiliser l'ID dans la requête AJAX pour récupérer les produits
        var productsSettings = {
            "url": "https://ozdd.onrender.com/produitsFournisseurs?nomEntreprise=" + entrepriseId,
            "method": "GET",
            "timeout": 0,
        };
    
        // Effectuer la requête AJAX pour récupérer les produits de l'entreprise
        $.ajax(productsSettings).done(function (products) {
            displayProducts(products);
        });
    } else {
        console.log("ID de l'entreprise non trouvé dans l'URL");
    }
    
    function displayProducts(products) {
        // Sélectionnez l'élément HTML où vous souhaitez afficher les produits
        var container = $("#productsContainer");
    
        // Parcourez les produits et générez le HTML correspondant
        products.forEach(function (product) {
            var productHtml = `
                <div class="col max-mb-30" data-aos="fade-up">
                    <div class="course-7 course-fluid">
                        <div class="thumbnail">
                            <a href="event-product-details.html?id=${product._id}" class="image">
                                <img src="${product.image}" alt="Course Image">
                            </a>
                            <div class="actions">                                   
                                <a href="shopping-cart.html" class="action hintT-left hintT-primary" data-hint="Ajouter au panier"><i class="fas fa-shopping-basket"></i></a>                                 
                            </div>
                        </div>
                        <div class="info text-center">
                            <span class="price">${product.prix} XOF</span>                              
                            <h3 class="title"><a href="event-product-details.html?id=${product._id}">${product.titre}</a></h3>                              
                        </div>
                    </div>
                </div>`;
    
            // Ajoutez le HTML du produit au conteneur
            container.append(productHtml);
        });
    }
    


/*--
        AFFICHER DETAILS PRODUIT
    -----------------------------------*/ 
    var url = window.location.href;
    var idMatch = url.match(/[?&]id=([^&]*)/);
    
    if (idMatch) {
        var id = idMatch[1];
    
        // Utiliser l'ID dans la requête AJAX
        var settings = {
            "url": "https://ozdd.onrender.com/produitsFournisseurs/produit/" + id,
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
        console.log(response)
        // Mettez à jour les éléments HTML avec les données du produit
        $('.single-product-image img').attr('src', response.image);
        $('.single-product-content h3.title').text(response.titre);
        $('.single-product-content .price-new').text(response.prix + ' XOF');
        $('.single-product-content .meta-content').text(response.nomEntreprise.nomEntreprise);
        $('.description-list ul li:first-child').text(response.description);
    
        // Mettez à jour d'autres propriétés du produit si nécessaire
    });