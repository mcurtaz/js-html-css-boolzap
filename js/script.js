$(document).ready(init);


// --------------------   funzione INIT
function init(){

  // GENERALI
  showSendButton();


  // SELEZIONE CONTATTO CHAT

  selectContact();

  // INVIA MESSAGGI
  $("#send-btn").click(function(){

    if($("#new-msg").val() != ""){ // Il msg viene inviato solo se c'è scritto qualcosa. Non si inviano msg vuoti
      sendNewMsg(); // funzione che invia un nuovo Messaggio

      sendReplyMsg(); // funzione che invia una risposta automatica

    }
  }); // il click sul bottone send triggera la funzione per mandare nuovo Messaggio

  $("#new-msg").keyup(function(event){ // quando c'è focus su #new-msg che è l'input dove si scrivono i msg. e si preme il tasto con keycode 13 (invio) si avvia la funzione sendNewMsg che invia il nuovo messaggio.

    //console.log(event.which);

    if (event.which == 13 && $("#new-msg").val() != "" ) { // aggiunta la condizione per cui se il messaggio è vuoto non viene inviato
      sendNewMsg(); // funzione che invia un nuovo Messaggio

      sendReplyMsg(); // funzione che invia una risposta automatica
    }
  });

  // CANCELLA MESSAGGI

  showOptionPanel();

  deleteMessage();

  // SEARCHBAR CONTATTI


  // $("#contact-searchbar").keyup(function(event){  // Soluzione con each() e startsWith(). se invece che l'inizio del nome si vuole tener conto di un punto della stringa qualsiasi si può usare .includes()
  //
  //     activeSearchbar(); // la funzione si attiva ogni volta che viene premuto un tasto qualsiasi sulla tastiera
  // });


  $("#contact-searchbar").keyup(function(event){ // soluzione con filter
    conFilter();
  });




};


// ---------    GENERALI

// funzione per mostrare il tasto invia
function showSendButton(){

  $("#new-msg").focus(function(){
    $("#send-btn").css("opacity", "1"); // utilizzo l'opacità perchè show e hide rendono impossibile cliccare sul bottone
  });

  $("#new-msg").focusout(function(){
    $("#send-btn").css("opacity", "0");
  });

};


// ------------- SELEZIONA CONTATTO CHAT

function selectContact() {

  $("#contact-list>li>a").click(function(){ // evento sul click di un contatto

    // istruzioni sulla lista contatti

    $("#contact-list>li>a.active").removeClass("active"); // tolgo la classe active da qualsiasi contatto con classe active quindi il contatto precedentemente attivo

    $(this).addClass("active"); // aggiungo la classe active sul contatto cliccato. Nella lista la classe active cambia solo il background-color. Così rimane visualizzato quale contatto è attualmente attivo

    var idContact = $(this).find(".contact").attr("data-id"); // salvo in una variabile il valore dell'attributo data-id del contatto cliccato che avrà una corrispondenza con un div .chat nel #messages

    // istruzioni nella schermata chat

    chatChanges(idContact);

    // istruzioni per la barra sopra la chat con il contatto attualmente attivo

    var activeImg = $(this).find("img[alt=\"img profilo\"]").attr("src");

    var activeName = $(this).find(".contact-name").text();

    activeBarChanges(activeImg, activeName);

  });
}

function chatChanges(idContact) { // switch da una chat all'altra istruzione per la visualizzazione della chat

  $("#messages .chat.active").removeClass("active"); // rimuovo la classe active dalla chat attualmente attiva

  $('#messages .chat[data-id="'+idContact+'"]').addClass("active"); // do classe active alla chat con data-id corrispondente a quello cliccato nella lista contatti. la classe active cambia solo la proprietà display.
}

function activeBarChanges(activeImg, activeName){ // cambia immagine e nome visualizzate nella barra sopra la chat

  $("#active-contact #active-contact-img").attr("src", activeImg);
  $("#active-contact #active-contact-name").text(activeName);
}
// -----------     FUNZIONI CHAT - MESSAGGI

// funzione che invia un nuovo Messaggio
function sendNewMsg(){

  var msgText = $("#new-msg").val(); // salvo il messaggio scritto dall'utente

  $("#new-msg").val(""); // svuoto il form

  var newMsg = $(".template").clone(); // clono il template del messaggi

  newMsg.addClass("send").removeClass("template"); // do classe send al div.template clonato prima. la classe contiene background color green. Rimuovo la classe template in modo che al prossimo messaggio non faccia il clone anche del nuovo messaggio. (clona tutti gli elementi con classe templates)

  newMsg.find(".new-text").text(msgText); // .find() trova nei discendenti del div.template quello con classe .new-text e lo sovrascrive col messaggio dell'utente

  // Inserimento orario corretto

  newMsg.find(".time").text(getTime); // utilizzo la funzione per stampare l'ora corretta

  $("#messages .active").append(newMsg); // con append il messaggio clonato e modificato viene inserito nell'html

};



// funzione che manda una risposta automatica ai nuovi messaggi
function sendReplyMsg(){
  setTimeout(function(){

    var newMsg = $(".template").clone(); // clono il template del messaggi


    newMsg.addClass("received").removeClass("template"); // do classe received al div.template clonato prima. la classe contiene background color white. Rimuovo la classe template in modo che al prossimo messaggio non faccia il clone anche del nuovo messaggio. (clona tutti gli elementi con classe templates)

    newMsg.find(".new-text").text("ok!"); // .find() trova nei discendenti del div.template quello con classe .new-text e lo sovrascrive con "ok" che è la risposta standard automatica

    // Inserimento orario corretto

    newMsg.find(".time").text(getTime); // utilizzo la funzione per stampare l'ora corretta

    $("#messages .active").append(newMsg); // con append il messaggio clonato e modificato viene inserito nell'html

  }, 1000);
};



// funzione che restituisce l'ora
function getTime(){

  var d = new Date();

  if(d.getMinutes()<10){ // questo if evita che l'ora sia stampata con solo 1 cifra nei minuti ( es. 15:3 diventa 15:03)
    var minutes = "0" + d.getMinutes();
  } else{
      var minutes = d.getMinutes();
  }

  return d.getHours() + ":" + d.getMinutes();
};

// -----------  FUNZIONI MENU MESSAGGI

function showOptionPanel(){
  $(document).on("click", ".msg-text .option-down", function(){
    console.log("click");
    $(this).next(".option-panel").toggle();
  });
};

function deleteMessage() {
  $(document).on("click", ".option-panel .del-btn", function(){
    $(this).parents(".message").remove();
  });
};



// ---------      FUNZIONI PER LA SEARCHBAR DEI CONTATTI

// funzione che rende dinamica la searchbar dei contatti
function activeSearchbar(){
  $(".contact-name").each(checkName); // la funzione scorre tutti gli elementi con classe contact-name e su ognuno esegue la funzione checkName che verificherà la corrispondenza tra l'input della barra e il nome del contatto
};



// la funzione controlla corrispondenza tra input della barra di ricerca contatti e i nomi contatto
function checkName(){

  var input = $("#contact-searchbar").val().toLowerCase(); // la variabile input sono i caratteri inseriti nella searchbar. .toLowerCase() ci evita problemi legati al case sensitive

  var contact = $(this).text().toLowerCase(); // girando col .each() della funzione activeSearchbar $(this) è di volta in volta un nome di contatto (sta scorrendo tutti i .contact-name).

  if(contact.startsWith(input)){ // se il nome di contatto comincia con (funzione startsWith di JS) la stringa input allora mostro (.show) il li genitore di $(this) (questo specifico elemento con classe .contact-name) altrimenti nascondo il li genitore.
    $(this).parents("li").show();

  } else {

    $(this).parents("li").hide();
  }


// Non ho bisogno di considerare il caso specifico stringa vuota all'input perchè da solo startWith restituisce true con input = stringa vuota.

console.log("input " + input);
console.log("contact " + contact);
console.log("starsWith " + contact.startsWith(input));
};



// funzione equivalente a checkName ma utilizzando Filter
function conFilter() {

  var input = $("#contact-searchbar").val().toLowerCase(); //questa variabile contiene la stringa value dell'input della searchbar

  $("#contact-list li").filter(function(){

    var name = $(this).find(".contact-name").text().toLowerCase(); // questa stringa contiene il testo messo nel div con classe contact name figlio/nipote di quello specifico li (filter fa girare tutti i li che corrispondono alla selezione $("#contact-list li"))

    $(this).toggle(name.indexOf(input) > -1); // la funzione fa il toggle sul li. la condizione è che l'indice (index of) della stringa contenuta nell'input sia maggiore di -1. indexOf restituisce -1 se non trova la stringa nell'array. altrimenti restituisce l'indice della posizione. da 0 a n.

  });

};
