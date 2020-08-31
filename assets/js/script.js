$(function () {
    $("#buscar").click(e => {
        buscarPersonaje();
    });
    $("#limpiar").click(e => {
        limpiar();
    });
    $(document).keypress(e => {
        if (e.which == 13) {
            buscarPersonaje();
        }
    })
});

function getPersonaje(id) {
    $.ajax({
        type: "GET",
        url: `https://pokeapi.co/api/v2/pokemon/${id}`,
        success: function (response) {
            console.log("response =>", response);
            //imprimir data
            generarCard(response);
            $("#card").append(generarCard(response));
        }
    });
}

function generarCard(personaje) {
    var card = `

    <div class="card mx-auto" style="width:  18rem;">
    <img src="https://pokeres.bastionbot.org/images/pokemon/${personaje.id}.png"
        class="card-img-top img-fluid" alt="...">
    <div class="circle"></div>
    <div class="card-body">
        <span class="number"># ${personaje.id}</span>
        <h5 class="name">${personaje.name}</h5>
        <div class="type">${personaje.types[0].type.name}</div>
    </div>
</div>

    `
    return card;
}

function validacion(id) {
    var expresion = /^\d{1,3}$/;
    if (!expresion.test(id)) {
        alert("Usa sólo números");
        $("input_busqueda").focus();
        return false
    }
    return true;
}

function buscarPersonaje() {
    var id_personaje = $("#input_busqueda").val();
    //validacion
    if (validacion(id_personaje)) {
        getPersonaje(id_personaje);
        $("#card").empty();
        $("#input_busqueda").val("");
        $("#input_busqueda").focus();
    }
}
function limpiar() {
    $("#card").empty();
    $("#input_busqueda").focus();

}