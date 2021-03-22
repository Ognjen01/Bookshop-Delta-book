var firebaseUrl = "https://deltabook-d4a86-default-rtdb.firebaseio.com";

var podaci = localStorage.getItem("niz");
var nizIdKnjiga = JSON.parse(podaci);
console.log(nizIdKnjiga);
var ukupnaCijena = 0;
preuzmiKnjige(nizIdKnjiga);

async function fetchMoviesJSON(url) {
  const response = await fetch(url);
  const movies = await response.json();
  return movies;
}

function preuzmiKnjige(nizIdKnjiga) {
  nizIdKnjiga.forEach((id) => {
    fetchMoviesJSON(`${firebaseUrl}/knjige/${id}.json`).then((book) => {
      appendRow("spremljeneKnjige", id, book);
          ukupnaCijena = ukupnaCijena + parseInt(book.cena);
          console.log("Ukupna cijena knjiga: " + ukupnaCijena);
          var ukCj = document.getElementById("ukupnaCijena");
          ukCj.innerHTML = String(ukupnaCijena);
    });
  });
}

function appendRow(position, id, knjiga) {
  var knjigaRed = document.createElement("tr");

  var naziv = document.createElement("td");
  naziv.innerText = knjiga.naziv;
  knjigaRed.appendChild(naziv);

  var pisac = document.createElement("td");
  pisac.innerText = knjiga.autor;
  knjigaRed.appendChild(pisac);

  var cijena = document.createElement("td");
  cijena.innerText = knjiga.cena;
  knjigaRed.appendChild(cijena);

  var deleteBtn = document.createElement("BUTTON");
  deleteBtn.className = "btn btn-light";
  deleteBtn.innerText = "Obriši";
  deleteBtn.onclick = obrisiKnjigu;
  deleteBtn.setAttribute("data-id", id);

  var deleteTd = document.createElement("td");
  deleteTd.appendChild(deleteBtn);
  knjigaRed.appendChild(deleteTd);

  document.getElementById(position).appendChild(knjigaRed);
}

function obrisiKnjigu(){

  var idKnjige = this.getAttribute("data-id");

  for ( var i = 0; i < nizIdKnjiga.length; i++) {
    if (idKnjige === nizIdKnjiga[i]){
        nizIdKnjiga.splice(i, 1);
    }
  }

  localStorage.setItem("niz", JSON.stringify(nizIdKnjiga));
  location.reload();

}

