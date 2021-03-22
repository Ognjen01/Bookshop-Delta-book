var firebaseUrl = "https://deltabook-d4a86-default-rtdb.firebaseio.com";
korisnik = {};

var idKorisnika = getParamValue("id");

console.log(idKorisnika);

uzmiKorisnika(idKorisnika);

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

function uzmiKorisnika(id) {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        korisnik = JSON.parse(request.responseText);
        console.log(korisnik);

        ucitajInformacije(korisnik);
      } else {
        alert("Greška prilikom učitavanja korisnika!");
      }
    }
  };

  request.open("GET", firebaseUrl + "/korisnici/" + id + ".json");
  request.send();
}

function ucitajInformacije(korisnik) {
  var korisnikRed = document.createElement("tr");

  var korisnikIme = document.createElement("td");
  korisnikIme.innerText = korisnik.ime;
  korisnikRed.appendChild(korisnikIme);

  var korisnikPrezime = document.createElement("td");
  korisnikPrezime.innerText = korisnik.prezime;
  korisnikRed.appendChild(korisnikPrezime);

  var korisnickoIme = document.createElement("td");
  korisnickoIme.innerText = korisnik.username;
  korisnikRed.appendChild(korisnickoIme);

  var email = document.createElement("td");
  email.innerText = korisnik.email;
  korisnikRed.appendChild(email);

  var datRodj = document.createElement("td");
  datRodj.innerText = korisnik.datumRodjenja;
  korisnikRed.appendChild(datRodj);

  var adresa = document.createElement("td");
  adresa.innerText = korisnik.adresa;
  korisnikRed.appendChild(adresa);

  var telefon = document.createElement("td");
  telefon.innerText = korisnik.telefon;
  korisnikRed.appendChild(telefon);

  document.getElementById("informacije").appendChild(korisnikRed);

  let izmjenaBtn = document.getElementById("izmjenaBtn");
  izmjenaBtn.setAttribute("data-id", idKorisnika);
  izmjenaBtn.onclick = izmjenaKorisnika;
}

function izmjenaKorisnika() {
  var korisnikId = this.getAttribute("data-id");

  window.location.href = "izmjena-korisnika.html?id=" + korisnikId;
}
