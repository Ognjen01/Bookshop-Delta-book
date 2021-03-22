var firebaseUrl = "https://deltabook-d4a86-default-rtdb.firebaseio.com";

var books = {};
var booksIds = [];

getBooks();

function getBooks() {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        booksIds = [];
        var knjige = JSON.parse(request.responseText);
        console.log(knjige);

        for (var id in knjige) {
          var knjiga = knjige[id];
          prikazivanjeKnjige(knjiga, id);
          

          console.log(knjiga);
          booksIds.push(id);
        }
      }
    }
  };

  request.open("GET", firebaseUrl + "/knjige.json");
  request.send();
}

function prikazivanjeKnjige(knjiga, id) {
  let card = document.createElement("div");
  card.className = "card";
  card.style.margin = "10px";

  let cardImage = document.createElement("img");
  cardImage.className = "card-img-top";
  cardImage.setAttribute("src", knjiga.slika);

  let cardBody = document.createElement("div");
  cardBody.className = "card-body";

  let title = document.createElement("h3");
  title.innerText = knjiga.naziv;
  title.style.margin = "5px";
  title.className = "card-title";

  let pisac = document.createElement("div");
  pisac.innerText = knjiga.autor;
  pisac.className = "card-color";
  pisac.style.margin = "5px";

  let ocjena = document.createElement("div");
  ocjena.innerText = "Ocjena: " + knjiga.ocena;
  ocjena.className = "card-color";
  ocjena.style.margin = "5px";

  // Kreiranje dugmeta vise o knjizi
  let viseOKnjizi = document.createElement("BUTTON");
  viseOKnjizi.className = "btn btn-dark";
  viseOKnjizi.style.margin = "5px";
  viseOKnjizi.innerHTML = "Više o knjizi";
  viseOKnjizi.setAttribute("data-id", id);
  viseOKnjizi.onclick = prikaziKnjigu;

  //Kreiranje dugmeta dodaj u korpu
  let dodajUKorpu = document.createElement("BUTTON");
  dodajUKorpu.className = "btn btn-dark";
  dodajUKorpu.style.margin = "5px";
  dodajUKorpu.innerHTML = "Dodaj u korpu";
  dodajUKorpu.setAttribute("data-id", id);
  dodajUKorpu.onclick = spremiUStorage;

  let cijena = document.createElement("h5");
  cijena.innerText = "Cijena: " + knjiga.cena + " RSD";
  cijena.style.margin = "5px";
  cijena.className = "card-title";

  var cardContainer = document.getElementById("card-container");


  // Kreiranje 5 zvjezdica

  let rate = document.createElement('div');
  rate.className = "rate";

  for (var i = 1; i <= 5; i++){
    let zvezda = document.createElement('input');
    zvezda.setAttribute('type', 'radio');
    zvezda.setAttribute('id', "star" + i);
    zvezda.setAttribute("name", 'rate');
    zvezda.setAttribute("value", i);

    let label = document.createElement('label');
    label.setAttribute("for","star" + i);
    label.setAttribute("title","text");
    label.innerHTML = i;

    rate.appendChild(zvezda);
    rate.appendChild(label);
  }


  cardBody.appendChild(cardImage);
  cardBody.appendChild(title);
  cardBody.appendChild(pisac);
  cardBody.appendChild(ocjena);
  cardBody.appendChild(cijena);
  cardBody.appendChild(rate);
  cardBody.appendChild(viseOKnjizi);
  cardBody.appendChild(dodajUKorpu);
  card.appendChild(cardBody);
  
  card.setAttribute("class", "col-md-3 d-flex align-items-stretch");
  
  cardContainer.appendChild(card);

  document.getElementById("card-container").replaceWith(cardContainer);
}

function prikaziKnjigu() {
  var knjigaId = this.getAttribute("data-id");

  window.location.href = "knjiga.html?id=" + knjigaId;
}

function spremiUStorage() {

  var result = confirm( "Dodati knjigu u korpu?" );

if ( result ) {
         let nizKnjigaZaKorpu;
      var knjigaId = this.getAttribute("data-id");
      if (localStorage.getItem("niz") === null) {
        localStorage.setItem("niz", JSON.stringify([knjigaId]));
      } else {
        nizKnjigaZaKorpu = JSON.parse(localStorage.getItem("niz"));
        nizKnjigaZaKorpu.push(knjigaId);
        localStorage.setItem("niz", JSON.stringify(nizKnjigaZaKorpu));
  }

  var test = localStorage.getItem("niz");
} 

}

function validacijaRegistracije(){

  var email = document.getElementById("signupemail1").value;
  validateEmail(email);
  //console.log("Validacija email adrese izvrsena" + email);
  //alert("Validacija email adrese izvrsena" + email)
  	

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(re.test(String(email).toLowerCase())){
    //alert("Validacija email adrese izvrsena" + email)
    
  } else {
    alert("Niste unijeli validan email, molimo pokušajte ponovo!");
  }
}

function prijavaKorisnika()
 {
   var email = document.getElementById("emailPrijava").value;
   var lozinka = document.getElementById("lozinkaPrijava").value;
   var pronadjen = false;

   var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        
        korisnici = JSON.parse(request.responseText);
        console.log(korisnici);

        for (var id in korisnici) {
          var korisnik = korisnici[id];

          if(korisnik.email == email && korisnik.password == lozinka) {
            alert("Dobrodošli " + korisnik.ime);
            pronadjen = true;
            break;
          }

        }

          if(pronadjen == false)
          {
            alert("Nije pronađen traženi korisnik!")
          }

        
      } else {
        alert("Greška prilikom uđitavanja korisnika!");
      }
    }
  };

  request.open("GET", firebaseUrl + "/korisnici.json");
  request.send();

    }}