CREATE TABLE Usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  password VARCHAR(150) NOT NULL,
  correo VARCHAR(150) UNIQUE NOT NULL,
  telefono VARCHAR(20) NOT NULL
);

CREATE TABLE Canchas (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) UNIQUE NOT NULL,
  ubicacion VARCHAR(150) NOT NULL,
  tipo VARCHAR(50) NOT NULL
);

CREATE TABLE Reservas (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL REFERENCES Usuarios(id),
  cancha_id INTEGER NOT NULL REFERENCES Canchas(id),
  fecha_inicio TIMESTAMP NOT NULL,
  fecha_fin TIMESTAMP NOT NULL
);


CREATE OR REPLACE FUNCTION validar_traslape()
RETURNS TRIGGER AS $$
BEGIN
	IF EXISTS (
	  SELECT 1 FROM Reservas
	  WHERE cancha_id = NEW.cancha_id
	    AND fecha_inicio < NEW.fecha_fin
	    AND fecha_fin > NEW.fecha_inicio
	) THEN
	  RAISE EXCEPTION 'Already reserved';
	END IF;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER traslape
    BEFORE INSERT
    ON public.reservas
    FOR EACH ROW
    EXECUTE FUNCTION public.validar_traslape();


CREATE OR REPLACE PROCEDURE insert_schedule(
  p_usuario_id INTEGER,
  p_cancha_id INTEGER,
  p_fecha_inicio TIMESTAMP,
  p_fecha_fin TIMESTAMP
)
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO Reservas (usuario_id, cancha_id, fecha_inicio, fecha_fin)
  VALUES (p_usuario_id, p_cancha_id, p_fecha_inicio, p_fecha_fin);
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Error when scheduling: %', SQLERRM;
END;
$$;


CREATE OR REPLACE FUNCTION validate_dates()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.fecha_inicio >= NEW.fecha_fin THEN
    RAISE EXCEPTION 'fecha_inicio must be before fecha_fin';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER valid_dates
    BEFORE INSERT
    ON public.reservas
    FOR EACH ROW
    EXECUTE FUNCTION public.validate_dates();