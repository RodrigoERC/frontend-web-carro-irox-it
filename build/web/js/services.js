
const apiUrl = 'http://localhost:8081/api/';

async function obtenerProductos() {
    const api = apiUrl + 'productos';
    try {
        const response = await axios.get(api);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

async function obtenerVentas() {
    try {
        const api = apiUrl + 'ventas';
        const response = await axios.get(api);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

async function obtenerReporteGeneral() {
    try {
        const api = apiUrl + 'ventas/findReport';
        const response = await axios.get(api);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

function tablaProducto(data) {
    console.log(data);
    const tablaProducto = document.getElementById('tabla-productos');
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${item.idproductos}</td>
      <td>${item.titulo}</td>
      <td>${item.descripcion}</td>
      <td>${item.precioUnitario}</td>
      <td>${item.existencias}</td>
    `;
        tablaProducto.appendChild(row);
    });
}

function tablaVenta(data) {
    const tablaVenta = document.getElementById('tabla-ventas-general');
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
 <td>${item.idventas}</td>
 <td>${item.productos.idproductos}</td>
 <td>${item.cantidadVendida}</td>
 <td>${item.fecha}</td>
 `;
        tablaVenta.appendChild(row);
    });
}

function tablaReporteGeneral(data) {
    const tablaReporteGeneral = document.getElementById('tabla-ventas-general');
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
 <td>${item.IDProductos}</td>
 <td>${item.Titulo}</td>
 <td>${item.ventasGlobales}</td>
 <td>${item.Existencias}</td>
 `;
        tablaReporteGeneral.appendChild(row);
    });
}


obtenerProductos()
        .then(data => {
            if (data) {
                tablaProducto(data);
            }
        });


obtenerVentas()
        .then(data => {
            if (data) {
                tablaVenta(data);
            }
        });

obtenerReporteGeneral()
        .then(data => {
            if (data) {
                tablaReporteGeneral(data);
            }
        });
