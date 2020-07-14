// funzione per mostrare il tasto invia

function showSendButton(){

  $("#new-msg").focus(function(){
    $("#send-btn").css("opacity", "1"); // utilizzo l'opacità perchè show e hide rendono impossibile cliccare sul bottone
  });

  $("#new-msg").focusout(function(){
    $("#send-btn").css("opacity", "0");
  });

};


// funzione che invia un nuovo Messaggio

function sendNewMsg(){

  var msgText = $("#new-msg").val(); // salvo il messaggio scritto dall'utente

  $("#new-msg").val(""); // svuoto il form

  var newMsg = $(".template").clone(); // clono il template del messaggi

  newMsg.addClass("send").removeClass("template"); // do classe send al div.template clonato prima. la classe contiene background color green. Rimuovo la classe template in modo che al prossimo messaggio non faccia il clone anche del nuovo messaggio. (clona tutti gli elementi con classe templates)

  newMsg.find(".new-text").text(msgText); // .find() trova nei discendenti del div.template quello con classe .new-text e lo sovrascrive col messaggio dell'utente

  // Inserimento orario corretto

  newMsg.find(".time").text(getTime); // utilizzo la funzione per stampare l'ora corretta

  $("#messages").append(newMsg); // con append il messaggio clonato e modificato viene inserito nell'html

};

// funzione che manda una risposta automatica ai nuovi messaggi

function sendReplyMsg(){
  setTimeout(function(){

    var newMsg = $(".template").clone(); // clono il template del messaggi


    newMsg.addClass("received").removeClass("template"); // do classe received al div.template clonato prima. la classe contiene background color white. Rimuovo la classe template in modo che al prossimo messaggio non faccia il clone anche del nuovo messaggio. (clona tutti gli elementi con classe templates)

    newMsg.find(".new-text").text("ok!"); // .find() trova nei discendenti del div.template quello con classe .new-text e lo sovrascrive con "ok" che è la risposta standard automatica

    // Inserimento orario corretto

    newMsg.find(".time").text(getTime); // utilizzo la funzione per stampare l'ora corretta

    $("#messages").append(newMsg); // con append il messaggio clonato e modificato viene inserito nell'html

  }, 3000);
}
// funzione che restituisce l'ora

function getTime(){

  var d = new Date();

  return d.getHours() + ":" + d.getMinutes();
}




function init(){

  showSendButton();

  $("#send-btn").click(function(){

    if($("#new-msg").val() != ""){ // Il msg viene inviato solo se c'è scritto qualcosa. Non si inviano msg vuoti
      sendNewMsg(); // funzione che invia un nuovo Messaggio

      sendReplyMsg(); // funzione che invia una risposta automatica

    }
  }); // il click sul bottone send triggera la funzione per mandare nuovo Messaggio

  $("#new-msg").keyup(function(event){ // quando c'è focus su #new-msg che è l'input dove si scrivono i msg. e si preme il tasto con keycode 13 (invio) si avvia la funzione sendNewMsg che invia il nuovo messaggio.
    console.log(event.which);
    if (event.which == 13 && $("#new-msg").val() != "" ) { // aggiunta la condizione per cui se il messaggio è vuoto non viene inviato
      sendNewMsg(); // funzione che invia un nuovo Messaggio

      sendReplyMsg(); // funzione che invia una risposta automatica
    }
  });

}



$(document).ready(init);
