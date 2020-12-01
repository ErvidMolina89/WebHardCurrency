//inicialización de campos
var btn_search              = document.getElementById('btn_search');
var input_idSearch          = document.getElementById('input_idSearch');
var input_identification    = document.getElementById('input_identification');
var input_name              = document.getElementById('input_name');
var input_address           = document.getElementById('input_address');
var input_type              = document.getElementById('input_type');
var input_email             = document.getElementById('input_email');
var input_phone             = document.getElementById('input_phone');
var input_tarjeta_debito    = document.getElementById('input_tarjeta_debito');
var input_tarjeta_credito   = document.getElementById('input_tarjeta_credito');
var input_cuenta_ahorro     = document.getElementById('input_cuenta_ahorro');
var input_status            = document.getElementById('input_status');
var btn_update              = document.getElementById('btn_update');
var btn_delete              = document.getElementById('btn_delete');
var clientSelect;
var clientServer;
//Metodo que crea los clientes
//Retorna: cadena creada para cada cliente
function Client(Cedula, Nombre, Direccion, TipoID, Tipo, Correo, Celular, AhorroID, Ahorro, CuentaID, Cuenta, TarjetasC, TarjetasD){
    this.Cedula    = Cedula;
    this.Nombre    = Nombre; 
    this.Direccion = Direccion;
    this.Tipo      = Tipo;
    this.TipoID    = TipoID;
    this.Correo    = Correo;
    this.Celular   = Celular;
    this.Ahorro    = Ahorro;
    this.AhorroID  = AhorroID;
    this.Cuenta    = Cuenta;
    this.CuentaID  = CuentaID;
    this.TarjetasC = TarjetasC;
    this.TarjetasD = TarjetasD;
  }
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
//escuchadores de los botones.
btn_search.addEventListener('click', methodPaintClient);
btn_update.addEventListener('click', methodUpdateClient);
btn_delete.addEventListener('click', methodDeleteClient);
//Metodo que escucha el form 
//Parametro: rRecibe un evento, escuchamos el formulario
var list_default = function (event) {
    event.preventDefault();
}
//Metodo que pinta el cliente, verificando la existencia del mismo
function methodPaintClient(){
    var identification = input_idSearch.value;
    //Verificamos que se ingreso un valor en el input
    if(identification != ""){
        getClientForId(identification);
    } else {
        // Mostramos mensaje de campo Vacio
        alert("Ingresa un valor en la identificación");
    }
}
//metodo que visualiza la data en los input
function methodVisualizeClient(resultClient){
    if(resultClient.length == 1){
        clientSelect = new Client(resultClient[0].Cedula, resultClient[0].Nombre, resultClient[0].Direccion, resultClient[0].TipoID, resultClient[0].Tipo, resultClient[0].Correo, 
            resultClient[0].Celular, resultClient[0].AhorroID, resultClient[0].Ahorro, resultClient[0].CuentaID, resultClient[0].Cuenta, resultClient[0].Tarjetas, "");
            fillTextFields(clientSelect);
    }else {
        tarjetaC = "";
        tarjetaD = ""; 
        count = 0;
        for (var i=0; i<resultClient.length; i++) {
            if(count == 0){
                tarjetaC = resultClient[i].Tarjetas;
            } else {
                tarjetaD = resultClient[i].Tarjetas;
            }
            count += 1;
        }
        clientSelect = new Client(resultClient[0].Cedula, resultClient[0].Nombre, resultClient[0].Direccion, resultClient[0].TipoID, resultClient[0].Tipo, resultClient[0].Correo, 
            resultClient[0].Celular, resultClient[0].AhorroID, resultClient[0].Ahorro, resultClient[0].CuentaID, resultClient[0].Cuenta, tarjetaC, tarjetaD);
            fillTextFields(clientSelect);
    }
}
function fillTextFields(result){
    input_identification.value  = result.Cedula;
    input_name.value            = result.Nombre;
    input_address.value         = result.Direccion;
    input_type.value            = result.Tipo;
    input_email.value           = result.Correo;
    input_phone.value           = result.Celular;
    input_tarjeta_debito.value  = result.TarjetasD;
    input_tarjeta_credito.value = result.TarjetasC;
    input_cuenta_ahorro.value   = result.Ahorro;
    input_status.value          = result.Cuenta;
}
//metodo que actualiza la información del cliente visualizado
function methodUpdateClient(){
    //Verificamos que se ha seleccionado un cliente
    if(clientSelect == null || clientSelect.Cedula == null || clientSelect.Cedula == ""){
        alert("No ha seleccionado ningun Cliente");
    } else {
        //Actualizamos la información del cliente seleccionado
        methodUpdateClientSelect();
    }
}
//Metodo que actualiza la información del cliente seleccionado
function methodUpdateClientSelect(){
    clientServer             = new ClientServer();
    clientServer.id          = clientSelect.Cedula;
    clientServer.name        = input_name.value;
    clientServer.mail        = input_email.value;
    clientServer.addres      = input_address.value;
    clientServer.phone       = input_phone.value;
    clientServer.accountStID = clientSelect.CuentaID;
    clientServer.savingsD    = clientSelect.AhorroID;
    clientServer.typeID      = clientSelect.TipoID;
    putClient(clientServer);
}
//Metodo que elimina el cliente seleccionado
function methodDeleteClient(){
    //Verificamos que se ha seleccionado un cliente
    if(clientSelect == null || clientSelect.Cedula == null || clientSelect.Cedula == ""){
        alert("No ha seleccionado ningun Cliente");
    } else {
        deleteClientForId(clientSelect.Cedula);
        methodEmptyInput();
    }
}
// Metodo que limpia los input
function methodEmptyInput(){
    input_identification.value  = "";
    input_idSearch.value        = "";
    input_name.value            = "";
    input_address.value         = "";
    input_type.value            = "";
    input_email.value           = "";
    input_phone.value           = "";
    clientSelect = null;
}
//get (Obtener) Client server
function getClientForId(idClient){
    $.ajax({
        url: "http://localhost:3000/client/" + idClient,
        type: 'GET',
        success: function( result ) {
            console.log(result);
            if(result.length !=0){
                methodVisualizeClient(result);
                alert("Se obtuvo la información")
            }else alert("No se obtuvo la información revisa la identificación")
        },
        error: function() {
            console.log("No se ha podido obtener la información");
        }
      });
}
//put (Actualizar) Client server
function putClient(Client){
    var data1 = JSON.stringify(Client);
    $.ajax({
        data: data1,
        dataType: "json",
        contentType: "application/json",
        url: "http://localhost:3000/client/"+ Client.id,
        method : 'PUT',
        success: function( result ) {
            console.log(result);
            alert("La información relacionada al usuario: ");
        },
        error: function() {
            console.log("No se ha podido actualizar la información");
        }
      });
}
//delete (Borrar) client server
function deleteClientForId(idClient){
    $.ajax({
        url: "http://localhost:3000/client/" + idClient,
        type: 'DELETE',
        success: function( result ) {
            console.log(result);
            alert(result);
        },
        error: function() {
            console.log("No se ha podido obtener la información");
        }
      });
}
