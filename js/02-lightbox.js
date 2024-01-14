/* Exercițiul 2 - librăria SimpleLightbox
Creați aceeași galerie ca în prima sarcină, folosind librăria SimpleLightbox, care se va ocupa de procesarea 
click-urilor pe imagini, de deschiderea și închiderea unei ferestre modale și de listarea imaginilor, folosind tastatura. 
Puteți urmări filmulețul demonstrativ al galeriei cu biblioteca conectată.

Modificați puțin aspectul cardului de galerie, folosind acest șablon.

<li class="gallery__item">
   <a class="gallery__link" href="large-image.jpg">
      <img class="gallery__image" src="small-image.jpg" alt="Image description" />
   </a>
</li>

Îndepliniți acest task în fișierele 02-lightbox.html și 02-lightbox.js. Împărțiți-l în mai multe subtask-uri:

Crearea și randarea unui marcaj pe baza datelor din matricea de date galleryItems și a șablonului de articol furnizat 
din galerie. Refolosiți codul scris din primul exercițiu.
Conectarea scriptului și a stilurilor librăriei, CDN service cdnjs. Adăugați link-urile pentru fișierele: 
simple-lightbox.min.js și simple-lightbox.min.css.
Inițializarea librăriei după ce elementele galeriei sunt create și adăugate în ul.gallery. Pentru a face acest lucru, 
citiți documentația SimpleLightbox, secțiunile "Usage" și "Markup".
Căutați în documentație secțiunea "Options" și adăugați un text sugestiv imaginei în atributul alt. 
Textul alternativ va fi poziționat în partea de jos și va apărea la 250 de milisecunde după deschiderea imaginii. */



import { galleryItems } from './gallery-items.js';
// Change code below this line


function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-alt="${description}"
            />
          </a>
        </li>
      `;
    })
    .join('');
}

const galleryRef = document.querySelector('.gallery');
galleryRef.innerHTML = createGalleryMarkup(galleryItems);

const options = {
  captions: true,            
  captionSelector: 'img',    
  captionType: 'data',      
  captionsData: 'alt',      
  captionPosition: 'bottom', 
  captionDelay: 250,          
};

window.onload = function () {
  lightbox = new SimpleLightbox('.gallery a', options);
};


console.log(galleryItems);
