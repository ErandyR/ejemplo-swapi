var cargarPagina = function() {
  cargarPersonajes();
  $(document).on("click", ".personaje", mostrarDetallePersonaje);
};

var cargarPersonajes = function () {
  var url = 'http://swapi.co/api/people/';
  $.getJSON(url, function(response){
      var personajes = response.results;
      var total = response.count;
      mostrarTotalPersonajes(total);
      mostrarPersonajes(personajes);
  });
};

var mostrarTotalPersonajes = function (total) {
  $("#total").text(total);
}

var mostrarPersonajes = function (personajes) {
  var $ul = $("#personajes");
  personajes.forEach(function(personaje){
    var $li = $("<li />");
    $li.addClass("personaje");
    $li.attr("data-url", personaje.homeworld);
    $li.text(personaje.name + "-" + personaje.height + "cm");
    $ul.append($li);
  });

}

var plantillaPlaneta = '<h2>Planeta:</h2>' +
'<p><strong>Nombre: </strong> __nombre__</p>' +
'<p><strong>Clima: </strong> __clima__</p>';

var mostrarDetallePersonaje = function () {
  var url = $(this).data("url");
  var $planetaContenedor = $("#planeta");
  $.getJSON(url, function (response) {
    $planetaContenedor.html(
        plantillaPlaneta.replace('__nombre__', response.name)
          .replace('__clima__', response.climate);
    );
  });
};

$(document).ready(cargarPagina);
