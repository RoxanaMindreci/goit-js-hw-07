/* Exercițiul 1 - galeria de imagini
Creați o galerie, cu posibilitatea de a da click pe elementele sale și de a vizualiza imaginea la dimensiune completă, 
într-o fereastră modală. Urmăriți filmulețul demonstrativ al galeriei.

Îndepliniți acest task în fișierele 01-gallery.html și 01-gallery.js. Împărțiți-l în mai multe subtask-uri:

Crearea și randarea unui marcaj pe baza datelor din matricea de date galleryItems și a șablonului de articol furnizat din galerie.
Delegarea la ul.gallery și obținerea unui url a imaginii mari.
Conectarea scriptului și a stilurilor din librăria ferestrei modale basicLightbox. Folosiți CDN service jsdelivr și
 adăugați în proiect link-urile fișierelor minimizate (.min) de la librăria folosită.
Deschiderea unei ferestre modale printr-un click pe un element al galeriei. Pentru a face acest lucru, citiți documentația 
și exemple deja implementate.
Înlocuirea valorii atributului src al elementului <img> în fereastra modală înainte deschiderii. Utilizați marcajul deja existent 
pentru fereastra modală din exemplele librăriei basicLightbox.
Marcajul elementelor din galerie
Link-ul către imaginea originală va fi stocat în data-attribute source pe elementul <img> și specificat în href. Nu adăugați alte 
tag-uri HTML sau clase CSS, altele decât cele din acest șablon.

<li class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="small-image.jpg"
      data-source="large-image.jpg"
      alt="Image description"
    />
  </a>
</li>

Fiți atent la faptul că imaginea este înfășurată într-un link, ceea ce înseamnă că atunci când dați click, 
utilizatorul va fi redirecționat implicit către o altă pagină. Dezactivați acest comportament.

Închiderea imaginei de la tastatură
ATENȚIE
Această funcționalitate nu este necesară la predarea temei, dar va fi o practică suplimentară utilă.

La apăsarea tastei Escape, ferestra modală se va închide. Acest lucru trebuie să se întâmple 
doar atunci când fereastra modală este deschisă. Librăria basicLightbox are o metodă de a închide în mod programat 
o fereastră modală.*/


import { galleryItems } from './gallery-items.js';


function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>
      `;
    })
    .join('');
}

const galleryRef = document.querySelector('.gallery');
galleryRef.innerHTML = createGalleryMarkup(galleryItems);


galleryRef.addEventListener('click', onGalleryItemClick);

let currentLightboxInstance = null; 

function onGalleryItemClick(event) {
  event.preventDefault();

  const { target } = event;
  if (target.nodeName !== 'IMG') {
    return;
  }

  const largeImageUrl = target.dataset.source;

  
  if (currentLightboxInstance) {
    currentLightboxInstance.close();
    currentLightboxInstance = null;
  }

 
  currentLightboxInstance = openModal(largeImageUrl);
}

function openModal(url) {
  const instance = basicLightbox.create(`
    <img src="${url}" width="800" height="600">
  `);

  instance.show();

  
  document.addEventListener('keydown', handleKeyPress);

  function handleKeyPress(event) {
    if (event.code === 'Escape') {
      instance.close();
      document.removeEventListener('keydown', handleKeyPress); 
    }
  }

  return instance;
}

console.log(galleryItems);
