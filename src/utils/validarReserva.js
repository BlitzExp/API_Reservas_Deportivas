function Traslape(nuevaReserva, reservasExistentes) {
  return reservasExistentes.some((reserva) => {
    return (
      reserva.cancha_id === nuevaReserva.cancha_id &&
      reserva.fecha_inicio < nuevaReserva.fecha_fin &&
      reserva.fecha_fin > nuevaReserva.fecha_inicio
    );
  });
}

module.exports = { Traslape };
