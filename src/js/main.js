//Ejercicios para asignar
let ejercicios = [
    { nombre: "Flexiones", serie: "3 series x 10 repeticiones" },
    { nombre: "Sentadillas", serie: "3 series x 15 repeticiones" },
    { nombre: "Plancha", serie: "3 series x 30 segundos" },
    { nombre: "Abdominales", serie: "3 series x 20 repeticiones" },
    { nombre: "Cardio", serie: "30 minutos" },
];

let rutina = [];


//Ingreso de datos y despligue en pantalla


document.getElementById('formulario').addEventListener('submit', function(event) {
   
   
    if(confirm('Estan los datos correctos?')) {
       
       event.preventDefault();
    }

       // Obtener valores del formulario
      let nombre = document.getElementById("nombre").value;
      let apellido = document.getElementById("apellido").value;
      let edad = document.getElementById("edad").value;
      let sexo = document.getElementById("sexo").value;
      let altura = document.getElementById("altura").value;
      let peso = document.getElementById("peso").value;


      let DatosPersona = {
        nombre : nombre,
        apellido : apellido,
        edad : edad,
        sexo : sexo,
        altura : altura,
        peso : peso
      }
        

      
        //desplegamos los datos para mostrar al usuario los datos ingresados
        document.getElementById("datoNombre").textContent = nombre;
        document.getElementById("datoApellido").textContent = apellido;
        document.getElementById("datoEdad").textContent = edad;
        document.getElementById("datoSexo").textContent = sexo;
        document.getElementById("datoAltura").textContent = altura+ ' Cm';
        document.getElementById("datoPeso").textContent = peso+ ' Kg'; 

        document.getElementById("formulario").style.display = "none";
        document.getElementById("datosMostrar").style.display = "block";
        document.getElementById("mostrarResultados").style.display = "none";

        console.log("Datos del formulario:", DatosPersona);

        // guardamos datos en session o localstorage, convertimos el objecto con json.stringfy 
        sessionStorage.setItem('DatosUsuario', JSON.stringify(DatosPersona))
        formulario.reset();



    
});


//modificacion de datos

document.getElementById('editarDatos').addEventListener('click', function() {
    document.getElementById("formulario").style.display = "block";
    document.getElementById("datosMostrar").style.display = "none";
    document.getElementById("datosImc").style.display = "none";
    document.getElementById("Planificador").style.display = "none";
    document.getElementById("mostrarImcRutina").style.display = "none";


});


//Boton calculcar IMC
document.getElementById('calcularImc').addEventListener('click',function() {

    //obtengo los datos de la persona 
    let datosG = sessionStorage.getItem('DatosUsuario');
    let datos = JSON.parse(datosG);
    //llamo a la funcion y envio los datos.
    let  datosImc =  CalcularImc(datos);
    sessionStorage.setItem("imc", JSON.stringify(datosImc));
   

    document.getElementById("Planificador").style.display = "none";
    document.getElementById("datosImc").style.display = "block";
    document.getElementById("mostrarImcRutina").style.display = "none";
    document.getElementById("datoImc").textContent = datosImc.imc;
    document.getElementById("rangoImc").textContent = datosImc.rangoObesidad;
    document.getElementById("mostrarResultados").style.display = "inline";

  

});


//funcion calcular imc 


function CalcularImc(datos){
    console.log(datos)
    let peso = datos.peso;
    let altura = datos.altura;
    let sexo = datos.sexo;
  
   //Convertir la altura de cm a metros
   altura = altura /100;
 
  //calculamos imc

  let imc = peso /(altura * altura);

  // determinamos el rango en que se encuenta segun el sexo.


  let rangoObesidad;

  if (sexo === 'hombre') {
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
} else if (sexo === 'mujer') {
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

     
  
  
  

  return {imc:  parseInt(imc) , rangoObesidad:rangoObesidad }

}


//boton crear RUTINAS
document.getElementById('crearRutina').addEventListener('click',function() {
    
    document.getElementById("datosImc").style.display = "none";
    document.getElementById("Planificador").style.display = "block";
    document.getElementById("mostrarImcRutina").style.display = "none";
   


    
    //llamamos la funcion de rutinas 
    mostrarEjercicios();

});


//mostrar los ejercicios disponibles 
function mostrarEjercicios() {
    let listaEjercicios = document.getElementById("listaEjercicios");
    let ejerciciosGuardados = obtenerEjerciciosGuardados();

    // Limpiar la lista de ejercicios
    listaEjercicios.innerHTML = "";

    // ejercicios no guardados en sessionStorage
    ejercicios.forEach(function(ejercicio) {
        if (!ejercicioGuardado(ejercicio, ejerciciosGuardados)) {
            var listItem = document.createElement("li");
            listItem.textContent = ejercicio.nombre + " - " + ejercicio.serie;

            // Botón para agregar el ejercicio a la rutina
            var botonAgregar = document.createElement("button");
            botonAgregar.textContent = "Agregar";
            botonAgregar.addEventListener("click", function() {
                agregarEjercicioRutina(ejercicio);
                listaEjercicios.removeChild(listItem);
            });

            listItem.appendChild(botonAgregar);
            listaEjercicios.appendChild(listItem);
        }
    });
}

 function ejercicioGuardado(ejercicio, ejerciciosGuardados) {
    return ejerciciosGuardados.some(function(ejercicioGuardado) {
        return ejercicioGuardado.nombre === ejercicio.nombre;
    });
}

function obtenerEjerciciosGuardados() {
    var rutinaGuardada = sessionStorage.getItem("rutina");
    return rutinaGuardada ? JSON.parse(rutinaGuardada) : [];
}



// agregar un ejercicio a la rutina
function agregarEjercicioRutina(ejercicio) {
    let listaRutina = document.getElementById("listaRutina");

    // elemento lista para el ejercicio
    let listItem = document.createElement("li");
    listItem.textContent = ejercicio.nombre + " - " + ejercicio.serie;

    // quitar el ejercicio de la rutina
    let botonQuitar = document.createElement("button");
    botonQuitar.textContent = "Quitar";
    botonQuitar.addEventListener("click", function() {
        listaRutina.removeChild(listItem);
        rutina.splice(rutina.indexOf(ejercicio), 1);

        // agregar el ejercicio a la lista de ejercicios disponibles
        agregarEjercicioDisponible(ejercicio);    });

    listItem.appendChild(botonQuitar);
    listaRutina.appendChild(listItem);
    // Agregar ejercicio a la rutina
    rutina.push(ejercicio);
}

function agregarEjercicioDisponible(ejercicio) {
    let listaEjercicios = document.getElementById("listaEjercicios");
    let listItem = document.createElement("li");
    listItem.textContent = ejercicio.nombre + " - " + ejercicio.serie;

    // Boton para agregar el ejercicio a la rutina
    let botonAgregar = document.createElement("button");
    botonAgregar.textContent = "Agregar";
    botonAgregar.addEventListener("click", function() {
        agregarEjercicioRutina(ejercicio);
        listaEjercicios.removeChild(listItem);
    });

    listItem.appendChild(botonAgregar);
    listaEjercicios.appendChild(listItem);
}


   //Guardar rutina en sessionStorage

document.getElementById("guardarRutina").addEventListener("click", function() {
    sessionStorage.setItem("rutina", JSON.stringify(rutina));
    alert("La rutina se ha guardado en sessionStorage.");
});



document.getElementById("mostrarResultados").addEventListener("click", function() {
   
   //obtengo los datos de la persona 
   let datosU = sessionStorage.getItem('DatosUsuario');
   let persona = JSON.parse(datosU);
   
   //datos rutina
   let datosR = sessionStorage.getItem('rutina');
   let rutina = JSON.parse(datosR);
 
   //llamo a la funcion y envio los datos.
   
   let datosI = sessionStorage.getItem('imc');
   let imc = JSON.parse(datosI);
  
 
   document.getElementById("Planificador").style.display = "none";
   document.getElementById("datosImc").style.display = "none";
   document.getElementById("mostrarImcRutina").style.display = "block";


   document.getElementById("u-nombre").textContent = persona.nombre;
   document.getElementById("u-imc").textContent = imc.imc;
   document.getElementById("u-rangoImc").textContent = imc.rangoObesidad;


   let listaRutina = document.getElementById("rutinaElegida");
   listaRutina.innerHTML = "";

   rutina.forEach(function(ejercicio) {
       let listItem = document.createElement("li");
       listItem.textContent = ejercicio.nombre + " - " + ejercicio.serie;
       rutinaElegida.appendChild(listItem);
   });









});



