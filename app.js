const criptoOptions = async () => {
  const url ="https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

  const respuesta = await fetch (url);
  const resultado = await respuesta.json();

  let selectCripto = document.querySelector("#criptomoneda");
  let opcionesHTML=`<option value=""> Selecciona </option>`;

  resultado.Data.map(opcion => {
    opcionesHTML += `<option value="${opcion.CoinInfo.Name}">${opcion.CoinInfo.FullName}</option>`;
  });

  selectCripto.innerHTML=opcionesHTML;
};

const cotizarMoneda = () => {
  const moneda=document.querySelector("#moneda").value;
  const cripto=document.querySelector("#criptomoneda").value;

  if (moneda === '' || cripto === '') {
    mostrarError("#msj-error","DEBES ESCOGER DOS OPCIONES PARA COMPARAR");
    return;
  }

  cotizar(moneda, cripto);
}

const cotizar = async (moneda, cripto) => {
  const url= `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`
  
  const respuesta = await fetch (url);
  let resultado = await respuesta.json();

  resultado = resultado.DISPLAY[cripto][moneda];
  // console.log(resultado)

  let divResultado=document.querySelector('#divResultado');

  divResultado.innerHTML = `<div style="text-align:center"><img src="assets/loading.gif" width=50 height=50></div>`;

  setTimeout(() => {
    divResultado.innerHTML= `<div class="precio"> El precio es <span>${resultado.PRICE}</span></div>
    <div class="info"> El precio más alto del día es: <span>${resultado.HIGHDAY}</span></div>
    <div class="info"> El precio más bajo del día es: <span>${resultado.LOWDAY}</span></div>
    <div class="info"> Variación últimas 24 horas: <span>${resultado.CHANGEPCT24HOUR}</span></div>
    <div class="info"> Última actualización: <span>${resultado.LASTUPDATE}</span></div>
    `;
  },2000);
}

const mostrarError = (elemento, mensaje) => {
  divError = document.querySelector(elemento);
  divError.innerHTML=`<p class="red darken-4 error">${mensaje}</p>`;
  setTimeout(() => { divError.innerHTML=``;},2000);
}