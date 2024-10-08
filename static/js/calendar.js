document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    // Função para buscar pontos da API
    function fetchPoints(origin, destination) {
        var apiUrl = `/api/points?origin=${origin}&destination=${destination}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Converter os dados em eventos para o FullCalendar
                var events = data.map(function (item) {
                    return {
                        title: item.points + ' Pontos', // Exibir os pontos no título
                        start: item.date, // Data associada
                        allDay: true, // Não mostrar como all-day
                        extendedProps: { verifiedOn: item.verified_on } // Adiciona verified_on como propriedade
                    };
                });

                // Inicializar o calendário
                var calendar = new FullCalendar.Calendar(calendarEl, {
                    initialView: 'dayGridMonth',
                    events: events,
                    eventMouseEnter: function(info) {
                        // Cria uma tooltip para mostrar verified_on
                        var tooltip = document.createElement('div');
                        tooltip.innerHTML = 'Verificado em: ' + info.event.extendedProps.verifiedOn;
                        tooltip.style.position = 'absolute';
                        tooltip.style.backgroundColor = 'white';
                        tooltip.style.border = '1px solid black';
                        tooltip.style.padding = '5px';
                        tooltip.style.zIndex = '1000';
                        document.body.appendChild(tooltip);

                        // Posiciona a tooltip
                        tooltip.style.left = info.jsEvent.clientX + 'px';
                        tooltip.style.top = info.jsEvent.clientY + 'px';

                        // Remove a tooltip ao sair
                        info.el.addEventListener('mouseleave', function() {
                            document.body.removeChild(tooltip);
                        });
                    }
                });

                // Renderizar o calendário
                calendar.render();
            })
            .catch(error => {
                console.error('Erro ao buscar os pontos:', error);
            });
    }

    // Chama a função fetchPoints apenas se houver valores de origem e destino
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    if (origin && destination) {
        fetchPoints(origin, destination);
    }
});
