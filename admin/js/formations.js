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