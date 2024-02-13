//Array para guardar datos de persona.

const DatosPersona = [];

//Mensaje Bienvenida
alert('Bievenido a calculo de IMC .....');

//Se consulta si desea realizar el calculo de imc
if (confirm('Desea calculcar su IMC  ? ')==true){
    alert('Vamos a calcular su  imc \na continuacion ingrese sus datos.');


  //Se llama la funcion para ingresar datos   
    IngresarDatos();
    
  //Calculamos Imc

  let resultado = CalcularImc(DatosPersona);

  alert('Su IMC es de  :'+resultado.imc );
  alert('Usted se encuentra en un estado de  : '+resultado.rangoObesidad);
  console.log('Hola '+DatosPersona[0]+ ' '+DatosPersona[1]+', tus resultados fueron los siguientes:' )
  console.log('Su IMC es de  :'+resultado.imc );
  console.log('Usted se encuentra en un estado de  : '+resultado.rangoObesidad);



} else{

    alert('Adios');
    
}





//Funcion para Ingreso de datos


function IngresarDatos(){
    let nombre = prompt('Ingrese su Nombre');
    let apellido = prompt('Ingrese su Apellido');
    let  genero = prompt('Ingrese su Sexo (masculino o femenino)');
    let edad = prompt('Ingrese su Edad');
    let altura = prompt('Ingrese su Altura en CM');
    let peso = prompt('Ingrese su Peso en KG');
    let sexo =genero.toLowerCase();
    DatosPersona.push(nombre,apellido,sexo,edad,altura,peso)

    let  datos = 'Nombre: '+nombre +'\nApellido: '+apellido +'\nSexo: '+sexo +'\nEdad: '+edad +'\nAltura: '+altura +'\nPeso: '+peso;

    if (confirm('Ingreso los siguientes datos: \n' + datos + '\nEstan correctos los datos ?')==true){
    
     return;
    
    
    } else{
        while (DatosPersona.length > 0) {
            DatosPersona.pop();
          }
       alert('Ingrese nuevamente sus datos.')  
       IngresarDatos();   
    }

};


function CalcularImc(datos){
     let peso = datos[5];
     let altura = datos[4];
     let sexo = datos[2];
    console.log(datos)
    //Convertir la altura de cm a metros
    altura = altura /100;
  
   //calculamos imc

   let imc = peso /(altura * altura);

   // determinamos el rango en que se encuenta segun el sexo.


   let rangoObesidad;

   if (sexo === 'masculino') {
    if (imc < 20.7) {
        rangoObesidad = "Bajo peso";
    } else if (imc >= 20.7 && imc < 26.4) {
        rangoObesidad = "Normal";
    } else if (imc >= 26.4 && imc < 27.8) {
        rangoObesidad = "Sobrepeso";
    } else if (imc >= 27.8 && imc < 31.1) {
        rangoObesidad = "Obesidad grado 1";
    } else if (imc >= 31.1 && imc < 34.9) {
        rangoObesidad = "Obesidad grado 2";
    } else {
        rangoObesidad = "Obesidad grado 3";
    }
} else if (sexo === 'femenino') {
    if (imc < 19.1) {
        rangoObesidad = "Bajo peso";
    } else if (imc >= 19.1 && imc < 25.8) {
        rangoObesidad = "Normal";
    } else if (imc >= 25.8 && imc < 27.3) {
        rangoObesidad = "Sobrepeso";
    } else if (imc >= 27.3 && imc < 32.3) {
        rangoObesidad = "Obesidad grado 1";
    } else if (imc >= 32.3 && imc < 35.3) {
        rangoObesidad = "Obesidad grado 2";
    } else {
        rangoObesidad = "Obesidad grado 3";
    }
   }


   return {imc:imc , rangoObesidad:rangoObesidad }

}