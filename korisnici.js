// Ucitavanje korisnika u tabelu i izmjena korisnika
var firebaseUrl = "https://deltabook-d4a86-default-rtdb.firebaseio.com";

var korisnici = {};
var korisniciId = [];

uzmiKorisnike();

function uzmiKorisnike() {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        removelabelRows("sviKorisnici");
        korisniciId = [];
        korisnici = JSON.parse(request.responseText);
        console.log(korisnici);

        for (var id in korisnici) {
          var korisnik = korisnici[id];
          appendRow("sviKorisnici", id, korisnik);

          console.log(korisnik);
          korisniciId.push(id);
        }
      } else {
        alert("Greška prilikom učitavanja korisnika!");
      }
    }
  };

  request.open("GET", firebaseUrl + "/korisnici.json");
  request.send();
}

function appendRow(position, id, korisnik) {
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

  var editBtn = document.createElement("BUTTON");
  editBtn.className = "btn btn-light";
  editBtn.innerText = "Više o korisniku";
  editBtn.setAttribute("data-id", id);
  editBtn.onclick = prikaziKorisnika;

  var editTd = document.createElement("td");
  editTd.appendChild(editBtn);
  korisnikRed.appendChild(editTd);

  var deleteBtn = document.createElement("BUTTON");
  deleteBtn.className = "btn btn-light";
  deleteBtn.innerText = "Obriši";
  deleteBtn.onclick = obrisiKorisnika;
  deleteBtn.setAttribute("data-id", id);

  var deleteTd = document.createElement("td");
  deleteTd.appendChild(deleteBtn);
  korisnikRed.appendChild(deleteTd);

  document.getElementById(position).appendChild(korisnikRed);
}

function removelabelRows(tBody) {
  var tBody = document.getElementById(tBody);
  while (tBody.firstChild) {
    tBody.removeChild(tBody.lastChild);
  }
}

function prikaziKorisnika() {
  var clickedBtn = this;
  var korisnikId = this.getAttribute("data-id");

  window.location.href = "korisnik.html?id=" + korisnikId;
}

function obrisiKorisnika() {
  var clickedBtn = this;
  var korisnikId = clickedBtn.getAttribute("data-id");

  var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        uzmiKorisnike();
      } else {
        alert("Greška prilikom brisanja! ");
      }
    }
  };

  request.open(
    "DELETE",
    firebaseUrl + "/korisnici/" + korisnikId + ".json",
    true
  );
  request.send();
}

// Prosledjivanje vrijednosti id u sledecu stranicu
// Kreiranje korisnika na osnovu prosledjenog ida
