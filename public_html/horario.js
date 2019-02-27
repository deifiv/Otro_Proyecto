//Al cargar el contenido html llamo a la función init()
window.onload = init;

function init() {
    //Al cargar la página le pongo el id a todas las celdas correspondientes
    ponerIds();
    
    //Al dar click sobre el botón Añadir se ejecutará la función añadirAsignatura
    var boton_añadir = document.getElementById("añadir");
    boton_añadir.addEventListener("click", añadirAsignatura);

    //Cojo la primera tabla
    var tabla = document.getElementsByTagName("tbody")[0];
    //Cojo las celdas de la primera tabla
    var celdas = tabla.getElementsByTagName("td");

    for (var i = 0; i < celdas.length; i++) {
        //A todas las celdas (td), le aplicamos la función eliminarDobleClick()
        celdas[i].addEventListener("dblclick", eliminarDobleClick);
    }

    var select_copiada = document.getElementById("select_copiada");
    //Al select que se corresponde con la celda a la que queremos copiar el contenido le aplicamos la función copiarCelda()
    select_copiada.addEventListener("change", copiarCelda);
    
    //Al select que se corresponde con la celda a la que queremos movel el contenido le aplicamos la función moverCelda()
    var select_movida = document.getElementById("select_movida");
    select_movida.addEventListener("change", moverCelda);

}

function ponerIds() {
    
    /*Esta función pone ids a las celdas de la tabla que contiene el horario,
     *desde el Lunes hasta el Viernes
     *  
     */
    var tabla = document.getElementsByTagName("tbody")[0];
    var filas = tabla.getElementsByTagName("tr");
    var idDias, idHoras;
    
    //Recorro todas la filas menos la primera, ya que la primera es la del tramo horario
    for (var i = 1; i < filas.length; i++) {
        //Así la primera fila corresponde con la 1º Hora y así sucesivamente
        switch (i) {
            case 1:
                idHoras = "1º Hora";
                break;

            case 2:
                idHoras = "2º Hora";
                break;
            case 3:
                idHoras = "3º Hora";
                break;
            case 4:
                idHoras = "";
                break;
            case 5:
                idHoras = "4º Hora";
                break;
            case 6:
                idHoras = "5º Hora";
                break;
            case 7:
                idHoras = "6º Hora";
                break;

        }
        //Recorro los hijos de las filas, es decir las celdas, excepto la primera porque es la de lo que computa cada hora
        for (var j = 1; j < filas[i].children.length; j++) {
            switch (j) {
                //Así la primera celda será Lunes, la segunda Martes y así sucesivamente
                case 1:
                    idDias = "Lunes";
                    break;

                case 2:
                    idDias = "Martes";
                    break;
                case 3:
                    idDias = "Miércoles";
                    break;
                case 4:
                    idDias = "Jueves";
                    break;
                case 5:
                    idDias = "Viernes";
                    break;
            }
            //Pongo el id a las celdas correspondientes
            filas[i].children[j].id = idDias + " " + idHoras;

        }

    }

}

function añadirAsignatura() {

    var grupos = document.getElementById("grupos");
    var asignaturas = document.getElementById("asignaturas");
    var dias = document.getElementById("dias");
    var horas = document.getElementById("horas");
    
     // Obtengo la celda correspondiente a través del día y la hora
    var ids = document.getElementById(dias.value + " " + horas.value);
    
    //Creo un texto que contiene el valor del select del grupo y el valor del seclect de las asignaturas
    var texto = document.createTextNode("\n" + grupos.value + "/" + asignaturas.value + "\n");
    //Le añado a la celda el texto
    ids.appendChild(texto);



}

function copiarCelda() {
    var select_a_copiar = document.getElementById("select_a_copiar");
    var select_copiado = document.getElementById("select_copiada");
    
    //Distingo la celda que vamos a copiar con la celda a la que vamos a copiar el contenido
    //a través del valor de los selects
    var celda_a_copiar = document.getElementById(select_a_copiar.value);
    var celda_copiada = document.getElementById(select_copiado.value);
    
    //si el hijo de la celda que vamos a copiar es distinto de nulo
    if (celda_a_copiar.firstChild !== null) {
        //recorro sus hijos
        for (var i = 0; i < celda_a_copiar.childNodes.length; i++) {
            //y creo un texto que contiene el valor de cada hijo
            var contenido = document.createTextNode("\n" + celda_a_copiar.childNodes[i].nodeValue + "\n");
            //ese texto lo añado a la celda en la que queremos copiar el contenido
            celda_copiada.appendChild(contenido);
        }


    }

}

function moverCelda() {

    var select_a_mover = document.getElementById("select_a_mover");
    var select_movida = document.getElementById("select_movida");

    var celda_a_mover = document.getElementById(select_a_mover.value);
    var celda_movida = document.getElementById(select_movida.value);

    if (celda_a_mover.firstChild !== null) {

        for (var i = 0; i < celda_a_mover.childNodes.length; i++) {
            var contenido = document.createTextNode("\n" + celda_a_mover.childNodes[i].nodeValue + "\n");
            celda_movida.appendChild(contenido);

        }
    //Esta función es lo mismo que la anterior, pero borrando el contenido de la celda a la que vamos a mover su contenido
    
    //mientras la celda que vamos a mover tenga hijos (devuelva true)
        while (celda_a_mover.hasChildNodes()) {
            //eliminamos el primer hijo
            celda_a_mover.removeChild(celda_a_mover.firstChild);
        }

    }
}
function eliminarDobleClick() {
//Función que elimina todos los hijos de la celda sobre la que hacemos doble click
    while (this.hasChildNodes()) {
        this.removeChild(this.firstChild);
    }
}

