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
    var stats = 0;
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
            generarGrafico(data);
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
    //Gráfico

var hp =  personaje.stats[0].base_stat;
var atk = personaje.stats[1].base_stat;
var def = personaje.stats[2].base_stat;
var atkp = personaje.stats[3].base_stat;
var defp = personaje.stats[4].base_stat;
var spd = personaje.stats[5].base_stat;




        var options = {
            animationEnabled: true,
            
            data: [{
                type: "column",
                yValueFormatString: "#",
                dataPoints: [
                    { label: "HP", y: hp },	
                    { label: "Ataque", y: atk},	
                    { label: "Defensa", y: def },
                    { label: "Ataque +", y: atkp },	
                    { label: "Defensa +", y: defp },
                    { label: "Velocidad", y: spd }
                    
                ]
            }]
        };
        $("#grafico").CanvasJSChart(options);
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