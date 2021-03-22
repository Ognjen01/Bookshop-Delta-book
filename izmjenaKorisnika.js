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
        var prostorZaIme = document.getElementById('imeKorisnika');
        prostorZaIme.innerHTML = "Vršite izmjenu korisnika: " + korisnik.username;
      } else {
        alert("Greska prilikom ucitavanja korisnika");
      }
    }
  };

  request.open("GET", firebaseUrl + "/korisnici/" + id + ".json");
  request.send();
}


function potvrdiIzmjeneKorisnika() {

  var result = confirm( "Podvrditi izmjene korisnika?" );
  //alert(" Trenutni id korisnika je --> " + idKorisnika + " <--");

if ( result ) {
    
      let ime = document.getElementById("ime").value;
      let prezime = document.getElementById('prezime').value;
      let korisnickoIme = document.getElementById("korisnickoIme").value;
      let email = document.getElementById('email').value;
      let datumRodjenja = document.getElementById('datumRodjenja').value;
      let adresa = document.getElementById('adresa').value;
      let telefon = document.getElementById('telefon').value;

      console.log(ime);

      if (ime == "" || 
          prezime == "" ||
          korisnickoIme == "" ||
          email == "" || 
          datumRodjenja == "" ||
          adresa == "" ||
          telefon == ""){

            alert("Neko od polja nije popunjeno, molimo poputine sva polja!");

          } else {

            // Pokrenuti zahtjev za za izmjenu korisnika na osnovu id
            validateEmail(email);
            validateDateOfBirth(datumRodjenja);
            validatePhone(telefon);
           

          } 
          


      } else {
        //Odgadjanje akcije
        alert("Otkazali ste izmjenu!");  }


}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(re.test(String(email).toLowerCase())){
    //alert("Validacija email adrese izvrsena" + email)
  } else {
    alert("Niste unijeli validan email, molimo pokušajte ponovo");
  }
}

function validateDateOfBirth(date) {
  const re = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  if(re.test(String(date).toLowerCase())){
    //alert("Validacija email adrese izvrsena" + email)
  } else {
    alert("Niste unijeli validan datum rođenja, molimo pokušajte ponovo");
  }
}

function validatePhone(phone) {
  const re = /^[0-9]*$/;
  if(re.test(String(phone).toLowerCase())){
    //alert("Validacija email adrese izvrsena" + email)
  } else {
    alert("Niste unijeli validan broj telefona, molimo pokušajte ponovo");
  }
}