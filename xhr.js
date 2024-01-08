const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');

const sendHttpRequest = (method, url, data) => {
    
    //usamos promesa, amigable con la programación asíncrona
    const promise = new Promise((resolve, reject) => {
        //viene con js
        const xhr = new XMLHttpRequest();
        //no abre, sino que prepara una solicitud http
        //con dos argumentos: el tipo de petición y la url
        xhr.open(method, url);

        //en lugar de parsear, lo predefinimos aquí
        xhr.responseType = 'json';

        if (data) {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        };

        
        xhr.onerror = () => {
            reject('Algo salió mal :(');
        };

        //esta es la que finalmente envía la solicitud
        xhr.send(JSON.stringify(data));
    });
    return promise;
};

// Función para actualizar la tabla con los datos recibidos
const updateTable = (data) => {
    const tableBody = document.getElementById('data-body');
    tableBody.innerHTML = ''; // Limpiar la tabla antes de actualizarla

    // Crear una fila para cada conjunto de datos
    const row = document.createElement('tr');

    // Crear celdas para cada propiedad
    const compraCell = document.createElement('td');
    const ventaCell = document.createElement('td');
    const casaCell = document.createElement('td');
    const nombreCell = document.createElement('td');
    const monedaCell = document.createElement('td');
    const fechaActualizacionCell = document.createElement('td');

    // Asignar valores a las celdas
    compraCell.textContent = data.compra;
    ventaCell.textContent = data.venta;
    casaCell.textContent = data.casa;
    nombreCell.textContent = data.nombre;
    monedaCell.textContent = data.moneda;
    fechaActualizacionCell.textContent = data.fechaActualizacion;

    // Adjuntar celdas a la fila
    row.appendChild(compraCell);
    row.appendChild(ventaCell);
    row.appendChild(casaCell);
    row.appendChild(nombreCell);
    row.appendChild(monedaCell);
    row.appendChild(fechaActualizacionCell);

    // Adjuntar la fila al cuerpo de la tabla
    tableBody.appendChild(row);
};

const getData = () => {
    sendHttpRequest('GET', 'https://dolarapi.com/v1/dolares/blue').then(responseData => {
        console.log(responseData);
        updateTable(responseData); // Llama a la función para actualizar la tabla
    });
};

getBtn.addEventListener('click', getData);
