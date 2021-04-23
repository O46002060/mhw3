let key = '21266017-28ab85e2d83e8ca9d22a76cf0';
// Aggiungo event listener al form1 per la RICERCA
const form = document.querySelector('form');
form.addEventListener('submit', search)


function search(event){
    event.preventDefault();
    const scrivo = document.querySelector('#content').value;
    if(scrivo){
      const text = encodeURIComponent(scrivo);
          console.log('Eseguo ricerca elementi riguardanti: ' + text);
  
      img_request = 'https://pixabay.com/api/?key='+ key + '&q=' + text + '&category=health';
      fetch(img_request).then(onResponse).then(onJson_img);
     } else {
    alert("Inserisci il testo per cui effettuare la ricerca");
  }
}
/*
function tornaIndietro(event){
  event.preventDefault();
  const a = document.querySelector('#album-view')
  a.innerHTML='';
  const b = event.currentTarget;
  b.classList.remove('submit2')
  b.classList.add('submit1');

}
*/

  function onJson_img(json) {
    console.log('JSON Img ricevuto');
    // Stampiamo il JSON per capire quali attributi ci servono
    console.log(json);
    // Svuotiamo la libreria
    const library = document.querySelector('#album-view');
    library.innerHTML = '';
    // Leggi il numero di risultati
    let results = json.totalHits;
    if(results == 0)
    {
      const errore = document.createElement("h1"); 
      const messaggio = document.createTextNode("Nessun risultato!"); 
      errore.appendChild(messaggio); 
      library.appendChild(errore);
    }
    for(let i=0;i<results;i++){
    {
      // Leggiamo info
      const doc = json.hits[i]
      console.log(doc)
        const immagine = doc.webformatURL;
  
       const album = document.createElement('div');
      album.classList.add('album');
      const img = document.createElement('img');
      img.src = immagine;
      
      img.addEventListener('click', apriModale);
   
      // Aggiungiamo immagine e didascalia al div
      album.appendChild(img);
     
      // Aggiungiamo il div alla libreria
      library.appendChild(album);
    }
  }
  }

  function apriModale(event) {
	//creo un nuovo elemento img
	const image = document.createElement('img');
	//setto l'ID di questo img come immagine_post, a cui attribuisco alcune caratteristiche CSS
	image.id = 'immagine_post';
	//associo all'attributo src, l'src cliccato
	image.src = event.currentTarget.src;
	//appendo quest'immagine alla view modale
	modale.appendChild(image);
	//rendo la modale visibile
	modale.classList.remove('hidden');
	//blocco lo scroll della pagina
	document.body.classList.add('no-scroll');
}


function chiudiModale(event) {
	console.log(event);
	if(event.key === 'Escape')
	{
		//aggiungo la classe hidden 
		modale.classList.add('hidden');
		//prendo il riferimento dell'immagine dentro la modale
		img = modale.querySelector('img');
		//e la rimuovo 
		img.remove();
		//riabilito lo scroll
		document.body.classList.remove('no-scroll');
	}
}

function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }

  window.addEventListener('keydown', chiudiModale);