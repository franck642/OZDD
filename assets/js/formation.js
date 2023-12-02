/*--------------------------
 AFFICHER FORMATION
---------------------------- */
fetch('https://ozdd.onrender.com/formations')
  .then(response => response.json())
  .then(data => {
    let formationsContainer = document.getElementById('formationsContainer');

    data.forEach(formation => {
      let date = new Date(formation.updatedAt);
      let options = { year: 'numeric', month: 'short', day: '2-digit' };
      let formattedDate = date.toLocaleDateString('en-US', options);

      let formationDiv = document.createElement('div');
      formationDiv.innerHTML = `
        <div class="col max-mb-30" data-aos="fade-up">
            <div class="course-2" style=" height: 300px;">
                <div class="thumbnail">
                    <a href="#" class="image"><img src="${formation.imagePath}" alt="Course Image"></a>
                </div>
                <div class="info">
                    <span class="price">${formation.prix}</span>
                    <span class="date">${formattedDate}</span>
                    <h3 class="title" style="font-size: 18px;"><a href="#">${formation.titre}</a></h3>
                    <div class="meta"> 
                        <div class="media">
                            <button class="share-button btn-sm mb-3">Partager</button>
                            <div class="list">
                                <a href="JavaScript:Void(0);"><i class="fab fa-facebook-f"></i></a>
                                <a href="JavaScript:Void(0);"><i class="fab fa-twitter"></i></a>                                                 
                                <a href="JavaScript:Void(0);"><i class="fab fa-instagram"></i></a>
                            </div>
                        </div>                                                     
                        <a href="${formation.documentfournirId}"><button class="download-button btn-sm">Télécharger PDF</button></a>
                    </div>
                </div>
            </div>
        </div>
      `;
      formationsContainer.appendChild(formationDiv);
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
