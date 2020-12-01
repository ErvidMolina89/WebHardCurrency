//Creación de Variables
var change_money_qty;
var currencyFrom;
var currencyTo;
var form_change_money;
var enteredValueName;
var enteredValue;
var calculatedValueName;
var calculatedValue;
var crrncy = {'EUR': {'COP': 4495.29, 'USD': 1.19, 'JPY': 124.27,}, 'USD': {'COP': 3789.5, 'EUR': 0.84, 'JPY': 104.76}, 'JPY': {'COP': 36.19, 'EUR': 0.0081, 'USD': 0.0096}, 'COP': {'JPY': 0.028, 'EUR': 0.000223015, 'USD': 0.0002644}}
// Escuchador de evento en el formulario
var convert = function (event, form) {
    event.preventDefault();
    //Inicialización de variables
    form_change_money = form;
    change_money_qty = form.change_money_qty.value;
    currencyFrom = form.currencyFrom.options[form.currencyFrom.selectedIndex];
    currencyTo = form.currencyTo.options[form.currencyTo.selectedIndex];
    enteredValueName = document.getElementById("enteredValueName")
    enteredValue = document.getElementById("enteredValue")
    calculatedValueName = document.getElementById("calculatedValueName")
    calculatedValue = document.getElementById("calculatedValue")
    //Variables para convertir
    var amount = change_money_qty;
    var from = currencyFrom.value;
    var to = currencyTo.value;
    var result = 0;
    //Conversión y validación de divisas
    try {
        if (from == to) { result = amount;} else {result = amount * crrncy[from][to];}
    } catch (err) {
        result = amount * (1 / crrncy[to][from]);
    }
    //Visualización de data
    enteredValueName.innerHTML = currencyFrom.text;
    enteredValue.innerHTML = change_money_qty;
    calculatedValueName.innerHTML = currencyTo.text;
    calculatedValue.innerHTML = result;
};

