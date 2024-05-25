// Esta funcion se utiliza para ocultar y mostrar las diferentes categorias 

function showCards(sectionId) {
    // Oculta todas las secciones
    var sections = document.querySelectorAll('.cards-container');
    sections.forEach(function (section) {
        section.style.display = 'none';
    });

    // Muestra la sección seleccionada
    var selectedSection = document.getElementById(sectionId);
    selectedSection.style.display = 'flex';
}


function calculateTotal(input) {
    var card = input.closest('.card');
    var precioPorDia = parseInt(card.getAttribute('data-price'));
    var inputs = card.querySelectorAll('input[type="date"]');
    var fechaRetiroInput = inputs[0];
    var fechaEntregaInput = inputs[1];
    var fechaRetiro = new Date(fechaRetiroInput.value);
    var fechaEntrega = new Date(fechaEntregaInput.value);

    // Se comprueba que la fecha de retiro no sea mayor a la fecha de entrega, de serlo asi, cambia el contenido del texto

    if (fechaRetiro && fechaEntrega && !isNaN(fechaRetiro) && !isNaN(fechaEntrega)) {
        if (fechaRetiro > fechaEntrega) {
            card.querySelector('.total-cost').textContent = 'Fecha de retiro no puede ser mayor que fecha de entrega';
            return;
        }
        // Se resta la fecha de entrega con la fecha de retiro

        var timeDiff = fechaEntrega - fechaRetiro;
        var daysDiff = timeDiff / (1000 * 3600 * 24);

        if (daysDiff > 0) {
            var totalCost = daysDiff * precioPorDia;
            card.querySelector('.total-cost').textContent = `Costo total: $${totalCost}`;
        } else {
            card.querySelector('.total-cost').textContent = 'Tenes que seleccionar al menos 1 dia';
        }

        // Guardar daysDiff como un atributo en el elemento card
        card.dataset.daysDiff = daysDiff;


    } else {
        card.querySelector('.total-cost').textContent = 'Costo total: $0';
    }

    if (fechaRetiroInput.value) {
        fechaEntregaInput.setAttribute('min', fechaRetiroInput.value);
    }
    if (fechaEntregaInput.value) {
        fechaRetiroInput.setAttribute('max', fechaEntregaInput.value);
    }
}


// En esta funcion se genera el modal para cada auto correspondiente, se trae los parametros como carName, carPrice y daysDiff para poder mostrarlos en el modal
// Ademas estos parametros despues se pasan a otra funcion para checkear los datos y enviarlos futuramentes al servidor

function generateModal(carName, carPrice, daysDiff) {
    const modalTitle = document.getElementById('contacto');
    modalTitle.innerText = `Consulta para ${carName}`;

    const modalBody = document.querySelector('#ConsultaVehiculo .modal-body');
    modalBody.innerHTML = `
        <form>
            <div class="mb-3">
                <label for="nombreConsulta" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="nombreConsulta" placeholder="Nombre">
            </div>
            <div class="mb-3">
                <label for="numeroConsulta" class="form-label">Celular</label>
                <input type="text" class="form-control" id="numeroConsulta" placeholder="+5491100000000">
            </div>
            <div class="mb-3">
                <p>Usted selecciono el vehiculo ${carName} con un monto total de $${daysDiff ? carPrice * daysDiff : carPrice} por ${daysDiff ? daysDiff : 0} dias. </p>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                <a href="req.html" target="_blank" data-bs-toggle="tooltip" title="Tooltip">
                Acepta terminos y condiciones
                </a>
                </label>
            </div>
        </form>
    `;
    const modalFooter = document.querySelector('#ConsultaVehiculo .modal-footer');


    modalFooter.innerHTML = `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="submit" class="btn btn-primary" id="sendButton" onclick="checkConsulta('${daysDiff}', '${carPrice}', '${carName}')">Enviar</button>'
    `
}


function checkConsulta(daysDiff, carPrice, carName) {
    const checkBox = document.querySelector('#flexCheckDefault').checked;
    const nombreConsulta = document.querySelector('#nombreConsulta').value;
    const numeroConsulta = document.querySelector('#numeroConsulta').value;

    // Esto es una validacion para numeros de argentina, en lo posible celulares!!!
    const regex = /^(?:\+54|54)?(?:9|15)?\d{10}$/;

    if (nombreConsulta !== "" && regex.test(numeroConsulta) && checkBox !== false && daysDiff > 0) {

        // Utilizacion de  JQuery
        // Esto va a cambiar cuando se utilice el backend para enviar la consulta
        // Ya que se tiene que enviar todos los datos
        $('#ConsultaVehiculo').modal('hide');
        console.log(
            `
            Nombre ${nombreConsulta},
            Numero ${numeroConsulta},
            Vehiculo ${carName},
            Precio por dia ${carPrice},
            Dias elegidos ${daysDiff}
            
            `
        )
    } else
    {
        alert('Revisa los datos, ingresados.')
    }
    
    ;

}
