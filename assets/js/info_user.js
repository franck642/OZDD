// Récupérer les données du localStorage
// Récupérer les informations depuis le localStorage
var connUserLastName = localStorage.getItem('connUserLastName');
var connFirstname = localStorage.getItem('connFirstname');
var connEmail = localStorage.getItem('connEmail');
var conntoken = localStorage.getItem('conntoken');

// Vous pouvez maintenant utiliser ces variables comme vous le souhaitez sur cette page



// Afficher les données dans la console pour déboguer
// console.log("Données dans le localStorage :");
// console.log("Nom de famille:", connUserLastName);
// console.log("Prénom:", connFirstname);
// console.log("Email:", connEmail);
// console.log("Token:", conntoken);
var userinfoElement = document.getElementById('userinfoo');
userinfoElement.innerHTML =  connFirstname ;

// Vérifier si les données existent
if (userLastName && userFirstName && userEmail && userToken) {
    // Les données existent, vous pouvez les utiliser comme nécessaire
    console.log("Les données existent, vous pouvez les utiliser.");

    // Ajoutez votre logique ici pour utiliser les données récupérées

} else {
    // Les données n'existent pas ou ont expiré
    console.log("Aucune donnée utilisateur présente dans le localStorage ou les données ont expiré.");
}

// Afficher toutes les clés présentes dans le localStorage
console.log("Clés présentes dans le localStorage :", Object.keys(localStorage));

// Afficher l'heure actuelle pour la comparaison avec la date d'expiration
console.log("Heure actuelle :", new Date());
