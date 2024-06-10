
const apiUrl = 'http://localhost:8081/api/';

async function obtenerProductos() {
    const api = apiUrl + 'productos';
    try {
        const response = await axios.get(api);
        return response.data;
    } catch (error) {
        const divError = document.getElementById('div-error');
        const mensaje = document.createElement('div');
        mensaje.innerHTML = `<div class="alert alert-warning">No hay registros en el sistema!</div>`;
        divError.appendChild(mensaje);
        return null;
    }
}

function tablaProducto(data) {
    console.log(data);
    const tablaProducto = document.getElementById('tabla-productos');
    var numero = 1;
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${numero++}</td>
      <td>${item.idproductos}</td>
      <td>${item.titulo}</td>
      <td>${item.descripcion}</td>
      <td>${item.precioUnitario}</td>
      <td>${item.existencias}</td>
    `;
        tablaProducto.appendChild(row);
    });
}

obtenerProductos()
        .then(data => {
            if (data) {
                tablaProducto(data);
            }
        });
