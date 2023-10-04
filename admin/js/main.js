(function ($) {
 "use strict";

	/*----------------------------
	 jQuery MeanMenu
	------------------------------ */
	jQuery('nav#dropdown').meanmenu();	
	/*----------------------------
	 jQuery myTab
	------------------------------ */
	$('#myTab a').click(function (e) {
		  e.preventDefault()
		  $(this).tab('show')
		});
		$('#myTab3 a').click(function (e) {
		  e.preventDefault()
		  $(this).tab('show')
		});
		$('#myTab4 a').click(function (e) {
		  e.preventDefault()
		  $(this).tab('show')
		});

	  $('#single-product-tab a').click(function (e) {
		  e.preventDefault()
		  $(this).tab('show')
		});
	
	$('[data-toggle="tooltip"]').tooltip(); 
	
	$('#sidebarCollapse').on('click', function () {
                     $('#sidebar').toggleClass('active');
                     
                 });
		// Collapse ibox function
			$('#sidebar ul li').on('click', function () {
				var button = $(this).find('i.fa.indicator-mn');
				button.toggleClass('fa-plus').toggleClass('fa-minus');
				
			});
	/*-----------------------------
			Menu Stick
		---------------------------------*/
		$(".sicker-menu").sticky({topSpacing:0});
			
		$('#sidebarCollapse').on('click', function () {
			$("body").toggleClass("mini-navbar");
			SmoothlyMenu();
		});
		$(document).on('click', '.header-right-menu .dropdown-menu', function (e) {
			  e.stopPropagation();
			});
 
	
/*----------------------------
 wow js active
------------------------------ */
 new WOW().init();
 
/*----------------------------
 owl active
------------------------------ */  
  $("#owl-demo").owlCarousel({
      autoPlay: false, 
	  slideSpeed:2000,
	  pagination:false,
	  navigation:true,	  
      items : 4,
	  /* transitionStyle : "fade", */    /* [This code for animation ] */
	  navigationText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
      itemsDesktop : [1199,4],
	  itemsDesktopSmall : [980,3],
	  itemsTablet: [768,2],
	  itemsMobile : [479,1],
  });

/*----------------------------
 price-slider active
------------------------------ */  
	  $( "#slider-range" ).slider({
	   range: true,
	   min: 40,
	   max: 600,
	   values: [ 60, 570 ],
	   slide: function( event, ui ) {
		$( "#amount" ).val( "£" + ui.values[ 0 ] + " - £" + ui.values[ 1 ] );
	   }
	  });
	  $( "#amount" ).val( "£" + $( "#slider-range" ).slider( "values", 0 ) +
	   " - £" + $( "#slider-range" ).slider( "values", 1 ) );  
	   
/*--------------------------
 scrollUp
---------------------------- */	
	$.scrollUp({
        scrollText: '<i class="fa fa-angle-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    }); 	   
 
})(jQuery); 

/*--------------------------
 image
---------------------------- */	
const imageUpload = document.getElementById("image");
    const previewImage = document.getElementById("preview-image");

    imageUpload.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = function (event) {
                previewImage.src = event.target.result;
            };

            reader.readAsDataURL(file);
        }
    });

/*--------------------------
 CATEGORIE
---------------------------- */	
document.addEventListener('DOMContentLoaded', () => {
	// Récupérez la référence de la liste déroulante
	const selectElement = document.getElementById('categorie');
	// Récupérez les données depuis votre API
	fetch('http://192.168.0.66:3000/categories')
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
$(document).ready(function() {
    $("#btnCreateProduct").click(function() {
        // Récupérer les données depuis les champs du formulaire
        var titre = $("#titre").val();
        var description = $("#description").val();
        var image = $("#image").val();
        var prix = $("#prix").val();
        var apercu = $("#apercu").val();
        var categorie = $("#categorie").val();

        // Créer l'objet de données à envoyer
        var data = {
            titre: titre,
            description: description,
            image: image,
            prix: prix,
            apercu: apercu,
            categorie: categorie
        };
			console.log(data)
        // Envoyer la requête POST vers votre API
        $.ajax({
            url: "http://192.168.0.66:3000/produitsAdmin",
            type: "POST",
            data: JSON.stringify(data), // Convertir les données en format JSON
            contentType: "application/json",
            success: function(response) {
                // Gérer la réponse de l'API ici
                console.log("Réponse de l'API :", response);
            },
            error: function(error) {
                // Gérer les erreurs ici
                console.error("Erreur lors de la requête à l'API :", error);
            }
        });
    });
});