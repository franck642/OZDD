/*--------------------------
 AFFICHER FOURNISSEURS
---------------------------- */
$(document).ready(function() {
    // Function to get suppliers from the API
    function getFournisseurs() {
        $.ajax({
            url: 'http://192.168.0.53:3000/fournisseurs',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                var fournisseurList = $('.list-group');

                fournisseurList.empty(); // Remove old elements

                data.forEach(function(fournisseur) {
                    var listItem = `
                        <li class="list-group-item">
                            <div class="media">
                                <img class="rounded-circle mr-3" src="${fournisseur.logoEntreprise}" />
                                <div class="media-body align-self-center">
                                    <strong><a href="fournisseur detail.html">${fournisseur.nomEntreprise}</a></strong>
                                    <div class="text-muted">${fournisseur.pays}</div>
                                </div>
                                <div class="ml-auto"> <!-- This "ml-auto" class will align the button to the right -->
                                <button class="btn btn-primary" onclick="changerStatut('${fournisseur._id}')">Changer Statut</button>
                            </div>
                            </div>
                        </li>
                    `;

                    fournisseurList.append(listItem);
                });
            },
            error: function(error) {
                console.log('Error when retrieving suppliers', error);
            }
        });
    }

    // // Function to change the status of a supplier
    // function changerStatut(id) {
    //     $.ajax({
    //         url: 'http://192.168.0.53:3000/fournisseurs/update/' + id,
    //         type: 'PUT',
    //         data: {
    //             statut: true
    //         },
    //         success: function(response) {
    //             // Hide the button after successful update
    //             $('button[onclick="changerStatut(\'' + id + '\')"]').hide();
    //             // Refresh the list
    //             getFournisseurs();
    //         },
    //         error: function(error) {
    //             console.log('Error updating status', error);
    //         }
    //     });
    // }

    // Call the function to get the suppliers when the page loads
    getFournisseurs();
});
