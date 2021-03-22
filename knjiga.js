var firebaseUrl = "https://deltabook-d4a86-default-rtdb.firebaseio.com";
korisnik = {};

var idKnjige = getParamValue("id");

console.log(idKnjige);

uzmiKnjigu(idKnjige);

// Funkcija koja preuzima id korisnika koje je prethodno odabran
function getParamValue(name) {
  var location = decodeURI(window.location.toString());
  var index = location.indexOf("?") + 1;
  var subs = location.substring(index, location.length);
  var splitted = subs.split("&");

  for (i = 0; i < splitted.length; i++) {
    var s = splitted[i].split("=");
    var pName = s[0];
    var pValue = s[1];
    if (pName == name) {
      console.log(pValue);
      return pValue;
    }
  }
}

function uzmiKnjigu(id) {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        knjiga = JSON.parse(request.responseText);
        console.log(knjiga);
        postaviInformacije(knjiga);
      } else {
        alert("Greška prilikom učitavanja knjiga");
      }
    }
  };

  request.open("GET", firebaseUrl + "/knjige/" + id + ".json");
  request.send();
}

function postaviInformacije(knjiga) {
  let slika = document.getElementById("slika");
  let naslov = document.getElementById("naslov");
  let autor = document.getElementById("autor");
  let izdavac = document.getElementById("izdavac");
  let godinaIzdavanja = document.getElementById("godinaIzdavanja");
  let tipPoveza = document.getElementById("tipPoveza");
  let brojStranica = document.getElementById("brojStranica");
  let pismo = document.getElementById("pismo");
  let ocjena = document.getElementById("ocjena");
  let isbn = document.getElementById("isbn");
  let jezik = document.getElementById("jezik");
  let opis = document.getElementById("opis");
  let cijena = document.getElementById("cijena");

  let izmjenaBtn = document.getElementById("izmjenaBtn");
  izmjenaBtn.setAttribute("data-id", idKnjige);
  izmjenaBtn.onclick = izmjenaKnjige;

  slika.setAttribute("src", knjiga.slika);
  naslov.innerHTML = knjiga.naziv;
  autor.innerHTML = knjiga.autor;
  izdavac.innerHTML = "Izdavacka kuća:  " + knjiga.izdavackaKuca;
  godinaIzdavanja.innerHTML = "Godina izdavanja:  " + knjiga.godinaIzdavanja;
  tipPoveza.innerHTML = "Tip poveza:  " + knjiga.tipPoveza;
  brojStranica.innerHTML = "Broj stranica:  " + knjiga.brojStranica;
  pismo.innerHTML = "Pismo:  " + knjiga.pismo;
  ocjena.innerHTML = "Ocjena:  " + knjiga.ocena;
  isbn.innerHTML = "ISBN:  " + knjiga.isbn;
  jezik.innerHTML = "Jezik na kome je knjiga napisana:  " + knjiga.jezik;
  opis.innerHTML = knjiga.opis;
  cijena.innerHTML = "Cijena:  " + knjiga.cena + " RSD";
}

function izmjenaKnjige() {
  var knjigaId = this.getAttribute("data-id");

  window.location.href = "izmjena-knjige.html?id=" + knjigaId;
}
