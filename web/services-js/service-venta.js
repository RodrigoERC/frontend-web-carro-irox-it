
const apiUrl = 'http://localhost:8081/api/';


async function obtenerVentas() {
    try {
        const api = apiUrl + 'ventas';
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

async function obtenerReporteGeneral() {
    try {
        const api = apiUrl + 'ventas/findReport';
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

async function obtenerNotificacion() {
    try {
        const api = apiUrl + 'productos/existencias';
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


function tablaVenta(data) {
    const tablaVenta = document.getElementById('tabla-ventas');
    var numero = 1;
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${numero++}</td> 
            <td>${item.idventas}</td>
            <td>${item.producto.idproductos}</td>
            <td>${item.cantidadVendida}</td>
            <td>${item.fecha}</td>
            `;
        tablaVenta.appendChild(row);
    });
}

function tablaReporteGeneral(data) {
    const tablaReporteGeneral = document.getElementById('tabla-ventas-general');
    var numero = 1;
    var verificaExistencias = '<button type="button" class="btn btn-warning" onclick="notificarProveedor()">Notificar al proveedor</button>';

    const divVentasGlobales = document.getElementById('ventas-globales');
    const divArticuloMasVendido = document.getElementById('articulo-vendido');

    const mensajeVentasGlobales = document.createElement('h5');
    const mensajeArticuloMasVendido = document.createElement('h5');


    var ventasGlobales = data[0].ventasGlobales;
    var articuloMasVendido = data[0].articuloMasVendido;

    mensajeVentasGlobales.innerHTML = ` Ventas globales: ${ventasGlobales}`;
    mensajeArticuloMasVendido.innerHTML = `Articulo más vendido: ${articuloMasVendido}`;

    divVentasGlobales.appendChild(mensajeVentasGlobales);
    divArticuloMasVendido.appendChild(mensajeArticuloMasVendido);

    data.forEach(item => {
        const row = document.createElement('tr');

        if (item.Existencias < 100) {
            row.innerHTML = `
            <td>${numero++}</td>
            <td>${item.IDProductos}</td>
            <td>${item.Titulo}</td>
            <td>${item.Existencias}</td>
            <td>${item.estado}</td>
            <td>${item.ventasPorArticulo}</td>
            <td>${item.ingresoPorArticulo}</td>
            <td>${verificaExistencias}</td>
        `;
        } else {
            row.innerHTML = `
            <td>${numero++}</td>
            <td>${item.IDProductos}</td>
            <td>${item.Titulo}</td>
            <td>${item.Existencias}</td>
            <td>${item.estado}</td>
            <td>${item.ventasPorArticulo}</td>
            <td>${item.ingresoPorArticulo}</td>
            <td></td>
        `;
        }

        tablaReporteGeneral.appendChild(row);
    });
}

function notificarProveedor() {

    const divNotificacion = document.getElementById('div-notificacion');

    obtenerNotificacion()
            .then(data => {
                if (data) {
                    data.forEach(item => {

                        const mensaje = document.createElement('div');
                        mensaje.innerHTML = `<div class="alert alert-warning">Se notificaron los siguientes productos: ${item}</div>`;
                        divNotificacion.appendChild(mensaje);
                    });

                }
            });
}

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

