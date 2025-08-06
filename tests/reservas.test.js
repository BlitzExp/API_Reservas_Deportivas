const { Traslape } =  require('../src/utils/validarReserva');

describe('Lógica de colisión de Reservas', () => {
    const existingReservations = [
        {
            cancha_id: 1,
            fecha_inicio: new Date('2025-08-06T10:00:00'),
            fecha_fin: new Date('2025-08-06T11:00:00')
        }
    ];

    test('Debe detectar traslape si se cruza con reserva existente', () => {
        const newReservation = {
            cancha_id: 1,
            fecha_inicio: new Date('2025-08-06T10:30:00'),
            fecha_fin: new Date('2025-08-06T11:30:00')
        };

        expect(Traslape(newReservation, existingReservations)).toBe(true);
    });

    test('No debe detectar traslape si no hay cruce de horarios', () => {
        const newReservation = {
            cancha_id: 1,
            fecha_inicio: new Date('2025-08-06T11:00:00'),
            fecha_fin: new Date('2025-08-06T12:00:00')
        };

        expect(Traslape(newReservation, existingReservations)).toBe(false);
    });

    test('No debe detectar traslape si no tienen el mismo id de cancha', () => {
        const newReservation = {
            cancha_id: 2,
            fecha_inicio: new Date('2025-08-06T10:30:00'),
            fecha_fin: new Date('2025-08-06T11:30:00')
        };

        expect(Traslape(newReservation, existingReservations)).toBe(false);
    });

});