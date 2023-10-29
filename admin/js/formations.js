/*--------------------------
 CREER FORMATION
---------------------------- */
let form = document.querySelector('form');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  let formData = new FormData(this);

  fetch('http://192.168.0.28:3000/formations', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    alert('Formation créée avec succès!');
    location.reload();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});

/*--------------------------
 AFFICHER FORMATION
---------------------------- */
// Fonction pour récupérer les formations depuis l'API
// function getFormations() {
//     fetch('http://192.168.31.147:3000/formations')
//       .then(response => response.json())
//       .then(data => {
//         // Mettre à jour les cartes de formation avec les données récupérées
//         const kanbanList = document.querySelector('.kanban-list');
//         kanbanList.innerHTML = '';
  
//         data.forEach(formation => {
//           const card = document.createElement('div');
//           card.classList.add('card');
  
//           const image = document.createElement('img');
//           image.src = formation.image;
//           image.alt = formation.titre;
//           card.appendChild(image);
  
//           const title = document.createElement('h3');
//           title.textContent = formation.titre;
//           card.appendChild(title);
  
//           const price = document.createElement('p');
//           price.textContent = 'Prix : ' + formation.prix;
//           card.appendChild(price);
  
//           const pdfLink = document.createElement('a');
//           pdfLink.href = formation.pdf;
//           pdfLink.target = '_blank';
//           pdfLink.rel = 'noopener noreferrer';
//           pdfLink.textContent = 'PDF';
//           card.appendChild(pdfLink);
  
//           const deleteButton = document.createElement('button');
//           deleteButton.classList.add('delete-button');
//           deleteButton.textContent = 'Supprimer';
//           deleteButton.addEventListener('click', () => deleteFormation(formation.id));
//           card.appendChild(deleteButton);
  
//           kanbanList.appendChild(card);
//         });
//       })
//       .catch(error => {
//         console.error('Une erreur s\'est produite lors de la récupération des formations :', error);
//       });
//   }
  
//   // Fonction pour supprimer une formation via l'API
//   function deleteFormation(formationId) {
//     fetch(`http://192.168.31.147:3000/formations/${formationId}`, {
//       method: 'DELETE'
//     })
//       .then(response => {
//         if (response.ok) {
//           // Formation supprimée avec succès, mettre à jour les cartes de formation
//           getFormations();
//         } else {
//           console.error('Une erreur s\'est produite lors de la suppression de la formation.');
//         }
//       })
//       .catch(error => {
//         console.error('Une erreur s\'est produite lors de la suppression de la formation :', error);
//       });
//   }
  
//   // Appeler la fonction pour récupérer les formations au chargement de la page
//   getFormations();
  