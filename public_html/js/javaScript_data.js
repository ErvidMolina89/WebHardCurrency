//inicialización de campos
var input_ident             = document.getElementById('input_identification');
var input_name              = document.getElementById('input_name');
var input_address           = document.getElementById('input_address');
var select_type             = document.getElementById('type');
var input_email             = document.getElementById('input_email');
var input_phone             = document.getElementById('input_phone');
var select_tarj_dc          = document.getElementById('tarjet_credit');
var select_tarj_cc          = document.getElementById('tarjet_debit');
var select_status           = document.getElementById('status');
var btn_save                = document.getElementById('btn_save');
var clientServer;

//Metodo que crea los clientes
function ClientServer(id, name, mail, addres, phone, typeID, accountStID, savingsD){
    this.id          = id;
    this.name        = name; 
    this.mail        = mail;
    this.addres      = addres;
    this.phone       = phone;
    this.typeID      = typeID;
    this.accountStID = accountStID;
    this.savingsD    = savingsD;
}

//Metodo que crea los clientes
function ClientCard(idClient, idCard){
    this.idClient = idClient;
    this.idCard   = idCard; 
}

//escuchadores de los botones.
btn_save.addEventListener('click', methodSaveClient);

//Metodo que escucha el form 
//Parametro: rRecibe un evento
var list_default = function (event) {
    event.preventDefault();
    
}
//Metodo que pinta el cliente, verificando la existencia del mismo
function methodSaveClient(){
    if(input_ident.value != "" && input_name.value != "" && input_email.value != "" && input_phone.value != ""){
        methodValidateFields();
        /**
        
            postClient(clientServer);*/
    } else {
        // Mostramos mensaje de campo Vacio
        alert("Ingresa los valores obligatorios");
    }
}
function methodValidateFields() {
    clientServer = new ClientServer(
        input_ident.value,
        input_name.value,
        input_email.value,
        input_address.value,
        input_phone.value,
        select_type.options[select_type.selectedIndex].value,
        select_status.options[select_status.selectedIndex].value,
        8);
        postClient(clientServer)
}
// Metodo que limpia los input
function methodEmptyInput(){
    input_identification.value  = "";
    input_name.value            = "";
    input_address.value         = "";
    input_type.value            = "";
    input_email.value           = "";
    input_phone.value           = "";
    clientSelect = null;
}
function postClient(Client){
    var data1 = JSON.stringify(Client);
    $.ajax({
        data: data1,
        dataType: "json",
        contentType: "application/json",
        url: "http://localhost:3000/client/",
        method : 'POST',
        
        success: function( result ) {
            console.log(result);
            if(select_tarj_cc.options[select_tarj_cc.selectedIndex].value != "-1"){
                tarj1 = new ClientCard(
                    clientServer.id,
                    select_tarj_cc.options[select_tarj_cc.selectedIndex].value
                );
                tarjetClient(tarj1);
            }
            if(select_tarj_dc.options[select_tarj_dc.selectedIndex].value != "-1"){
                tarj2 = new ClientCard(
                    clientServer.id,
                    select_tarj_dc.options[select_tarj_dc.selectedIndex].value
                );
                tarjetClient(tarj2);
            }
        },
        error: function() {
            console.log("No se ha podido insertar la información");
        }
      });
}

function tarjetClient(cardClient){
    var data2 = JSON.stringify(cardClient);
    $.ajax({
        data: data2,
        dataType: "json",
        contentType: "application/json",
        url: "http://localhost:3000/newClient/",
        method : 'POST',
        
        success: function( result ) {
            console.log(result);
            alert("La información relacionada del usuario. Fue Insertada");
        },
        error: function() {
            console.log("No se ha podido insertar la información");
        }
      });
}
