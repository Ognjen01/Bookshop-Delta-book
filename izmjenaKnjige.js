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
        alert("Greška prilikom učitavanja knjiga!");
      }
    }
  };

  request.open("GET", firebaseUrl + "/knjige/" + id + ".json");
  request.send();
}

function postaviInformacije(knjiga) {
  let slika = document.getElementById("slika");
  slika.setAttribute("src", knjiga.slika);

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

  naslov.setAttribute("placeholder", knjiga.naziv);
  autor.setAttribute("placeholder", knjiga.autor);
  izdavac.setAttribute("placeholder", knjiga.izdavackaKuca);
  godinaIzdavanja.setAttribute("placeholder", knjiga.godinaIzdavanja);
  tipPoveza.setAttribute("placeholder", knjiga.tipPoveza);
  brojStranica.setAttribute("placeholder", knjiga.brojStranica);
  pismo.setAttribute("placeholder", knjiga.pismo);
  ocjena.setAttribute("placeholder", knjiga.ocena);
  isbn.setAttribute("placeholder", knjiga.isbn);
  jezik.setAttribute("placeholder", knjiga.jezik);
  opis.setAttribute("placeholder", knjiga.opis);
  cijena.setAttribute("placeholder", knjiga.cena);
}


function potvrdiIzmjeneKnjige() {

  var result = confirm( "Podvrditi izmjene knjige?" );


  // ---------- KOD ZA IZMJENU KNJIGE U BAZI ALI NE RADI IZ NEPOZNATOG RZLOGA -----------

  if(result) {
    alert("Uspješno ste izmjenili informacije knjige  '" + knjiga.naziv + "'")
  }

```
if ( result ) {
       // Pribavljanje vrijednosti iz unosa
       // Provjera unosa odnosno validacija unosa
       // Sacuvavanje unosa u varijable
       // Sacuvavanje objekta u firebase
       

       try{

       var naslov = document.getElementById('naslov').value;
       var autor = document.getElementById('autor').value;
       var izdavac = document.getElementById('izdavac').value;
       var godinaIzdavanja = document.getElementById('godinaIzdavanja').valu;
       var tipPoveza = document.getElementById('tipPoveza').value;
       var pismo = document.getElementById('pismo').value;
       var jezik = document.getElementById('jezik').value;
       var cijena =  document.getElementById('cijena').value;
       var opis = document.getElementById('opis').value;
       var ocjena = document.getElementById('ocjena').value;
       var brojStr = Number(document.getElementById('brojStranica').value);

      if (naslov == ""){
        //naslov = knjiga.naziv;
      } else {
        knjiga.naziv = naslov;
        console.log(naslov);
        console.log(knjiga.naziv);
      }
      if(autor == ""){
       // autor = knjiga.autor;
      }else {
        knjiga.autor = autor;
        console.log(autor);
        console.log(knjiga.autor);
      }
      if(brojStr = ""){
        //brojStranica = knjiga.brojStranica;
      }else {
        knjiga.brojStranica = brojStr;
        console.log(brojStr);
        console.log(knjiga.brojStranica);
      }
      if(cijena == ""){
        //cijena = knjiga.cena;
      }else {
        knjiga.cena = cijena
      }
      if(godinaIzdavanja = ""){
        //godinaIzdavanja = knjiga.godinaIzdavanja;
      }else {
        knjiga.godinaIzdavanja = godinaIzdavanja;
        console.log(godinaIzdavanja);
        console.log(knjiga.godinaIzdavanja);
      }
      if(isbn = "") {
        //isbn = knjiga.isbn;
      }else {
        knjiga.isbn = isbn;
      }
      if(izdavackaKuca = ""){
        //izdavac = knjiga.izdavackaKuca;
      }else {
        knjiga.izdavackaKuca = izdavac
      }
      if(jezik = "") {
        //jezik = knjiga.jezik;
      }else {
        knjiga.jezik = jezik;
      }
      if (ocjena = "") {
        //ocjena = knjiga.ocena;
      }else {
        knjiga.ocena = ocjena;
      }
      if(opis = "") {
        //opis = knjiga.opis;
      }else {
        knjiga.opis = opis;
      }
      if(pismo = ""){
        //pismo = knjiga.pismo;
      }else {
        knjiga.pismo = pismo;
      }
      if(tipPoveza = "") {
        //tipPoveza = knjiga.tipPoveza;
      }else {
        knjiga.tipPoveza = tipPoveza;
      }

      var putRequest = new XMLHttpRequest();

      putRequest.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
           window.location.href = "index.html";
            
          } else {
            alert("Greska prilikom izmjene knjige");
          }
        }
      };

      putRequest.open("PUT", firebaseUrl + "/knjige/" + idKnjige + ".json");
      putRequest.send(JSON.stringify(knjiga));
      console.log(idKnjige);
      console.log(knjiga);






      // Provjera da li su godine, stranice, cijena ili ocjena brojevi 
      // Iz nekog razloga ovaj dio koda ne radi iako je sintaksicki dobar
      if(!(isNaN(brojStranica))) {
        alert("Broj stranica mora biti broj");
      }
      if(!isNaN(cijena)) {
        alert("Cijena mora biti broj!")
      }
      if(!isNaN(ocjena)){
        alert("Ocjena mora biti broj")
      }



    } catch(err) {
      alert("Doslo je do greske prilikom izmjene informacija, molimo pokusajte kasnije!");
      console.log(err);
    }

      } 

      alert("Izmjena izvrsena")

```

}

