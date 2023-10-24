console.log("franck");
// // Crée une nouvelle formation
// document.getElementById('btnCreateFormation').addEventListener('click', async () => {
//     const titre = document.getElementById('titre').value;
//     const image = document.getElementById('image').files[0];
//     const prix = document.getElementById('prix').value;
//     const documentfournirId = document.getElementById('documentfournirId').files[0];

//     const formData = new FormData();
//     formData.append('titre', titre);
//     formData.append('image', image);
//     formData.append('prix', prix);
//     formData.append('documentfournirId', documentfournirId);
//     console.log(formData);
// });


//     try {
//         const response = await fetch('http://192.168.1.42:3000/formations', {
//             method: 'POST',
//             body: formData,
//         });

//         const data = await response.json();
//         console.log('Formation créée:', data);
//         alert('Formation créée avec succès.');
//         // Réalisez les actions nécessaires après la création de la formation (par exemple, actualisez l'affichage des formations)
//     } catch (error) {
//         console.error('Erreur lors de la création de la formation:', error);
//     }


/*--------------------------
 CREER FORMATION
---------------------------- */
$(document).ready(function () {
    $("#formFormation").click(function () {
        var titre = $("#titre").val();
        var prix = $("#prix").val();
        var documentfournirId = $("#documentfournirId")[0].files[0];
        // var categorie = $("#categorie").val();
        var image = $("#image")[0].files[0];

        // Créer un objet FormData pour envoyer les données au serveur
        var formData = new FormData();
        formData.append("titre", titre);
        formData.append("prix", prix);
        formData.append("documentfournirId", documentfournirId);
        // formData.append("categorie", categorie);
        formData.append("image", image);
        console.log(formData)
        // Empêche l'envoi du formulaire par défaut

        // Étape 2 : Créer un objet FormData
        // var formData = new FormData();

        // Étape 3 : Ajouter des données au FormData à partir du formulaire
        // formData.append("titre", $("#titre").val());
        // formData.append("prix", $("#prix").val());
        // formData.append("image", $("#image")[0].files[0]);
        // formData.append("documentfournirId", $("#documentfournirId")[0].files[0]);
        // formData.append("categorie", $("#categorie").val());

        // Étape 4 : Envoyer une requête POST en utilisant $.ajax
        $.ajax({
            url: "http://192.168.31.145:3000/formations",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                // Étape 5 : Traitez la réponse de l'API en cas de succès
                console.log("Formation enregistrée avec succès :", data);
                alert("Formation créée avec succès.");
            },
            error: function (error) {
                // Gérer les erreurs en cas de problème avec la requête
                console.error("Erreur lors de l'enregistrement de la formation : " + error);
                alert("Erreur lors de la création de la formation.");
            }
        });
    });
});
