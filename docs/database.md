# Base de Datos - API de Reservas Deportivas

### Tablas principales

- **Usuarios**  
  | Campo     | Tipo         | Descripción             | Restricciones           |  
  |-----------|--------------|-------------------------|------------------------|  
  | id        | SERIAL       | Identificador único     | PRIMARY KEY            |  
  | nombre    | VARCHAR(100) | Nombre del usuario      | NOT NULL               |  
  | correo    | VARCHAR(150) | Correo electrónico      | UNIQUE, NOT NULL       |  
  | telefono  | VARCHAR(20)  | Número de teléfono      | NOT NULL               |  

- **Canchas**  
  | Campo      | Tipo         | Descripción             | Restricciones           |  
  |------------|--------------|-------------------------|------------------------|  
  | id         | SERIAL       | Identificador único     | PRIMARY KEY            |  
  | nombre     | VARCHAR(100) | Nombre de la cancha     | NOT NULL               |  
  | ubicacion  | VARCHAR(150) | Ubicación física        | NOT NULL               |  
  | tipo       | VARCHAR(50)  | Tipo de cancha          | NOT NULL               |  

- **Reservas**  
  | Campo       | Tipo         | Descripción                    | Restricciones           |  
  |-------------|--------------|--------------------------------|------------------------|  
  | id          | SERIAL       | Identificador único            | PRIMARY KEY            |  
  | usuario_id  | INTEGER      | Referencia a usuario           | FOREIGN KEY -> Usuarios(id), NOT NULL |  
  | cancha_id   | INTEGER      | Referencia a cancha            | FOREIGN KEY -> Canchas(id), NOT NULL  |  
  | fecha_inicio| TIMESTAMP    | Inicio de la reserva           | NOT NULL               |  
  | fecha_fin   | TIMESTAMP    | Fin de la reserva              | NOT NULL               | 