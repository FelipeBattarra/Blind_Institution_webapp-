import {
  AbaEventosEntity,
  CalendarioEntity,
  CreateAbaEventosRequest,
  CreateCalendarioRequest,
  CreateEventosFuturosRequest,
  CreateEventosPassadosRequest,
  CreateGerentesRequest,
  EventosFuturosEntity,
  EventosPassadosEntity,
  GerentesEntity,
  UpdateAbaEventosRequest,
  UpdateCalendarioRequest,
  UpdateEventosFuturosRequest,
  UpdateEventosPassadosRequest,
  UpdateGerentesRequest
} from '@/types/eventosTypes';

const port = 3001;
const domain = "http://localhost";
const baseLink = `${domain}:${port}`;

// Aba Eventos Functions
export async function getAbaEventos(): Promise<AbaEventosEntity[]> {
  const result: AbaEventosEntity[] = await fetch(
    `${baseLink}/aba_eventos`,
    {
      method: "GET"
    }
  )
  .then(res => res.json());

  return result;
}

export async function getAbaEventosById(id: string): Promise<AbaEventosEntity> {
  const result: AbaEventosEntity = await fetch(
    `${baseLink}/aba_eventos/${id}`,
    {
      method: "GET"
    }
  )
  .then(res => res.json());

  return result;
}

export async function insertAbaEvento(newAbaEvento: CreateAbaEventosRequest): Promise<AbaEventosEntity> {
  const result: AbaEventosEntity = await fetch(
    `${baseLink}/aba_eventos`,
    {
      method: "POST",
      body: JSON.stringify(newAbaEvento)
    }
  )
  .then(res => res.json());

  return result;
}

export async function deleteAbaEventoById(id: string): Promise<AbaEventosEntity> {
  const result: AbaEventosEntity = await fetch(
    `${baseLink}/aba_eventos/${id}`,
    {
      method: "DELETE"
    }
  )
  .then(res => res.json());

  return result;
}

export async function updateAbaEventoById(id: string, updatedAbaEvento: UpdateAbaEventosRequest): Promise<AbaEventosEntity> {
  const result: AbaEventosEntity = await fetch(
    `${baseLink}/aba_eventos/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(updatedAbaEvento)
    }
  )
  .then(res => res.json());

  return result;
}

// Gerentes Functions
export async function getGerentes(): Promise<GerentesEntity[]> {
  const result: GerentesEntity[] = await fetch(
    `${baseLink}/gerentes`,
    {
      method: "GET"
    }
  )
  .then(res => res.json());

  return result;
}

export async function getGerenteById(id: string): Promise<GerentesEntity> {
  const result: GerentesEntity = await fetch(
    `${baseLink}/gerentes/${id}`,
    {
      method: "GET"
    }
  )
  .then(res => res.json());

  return result;
}

export async function insertGerente(newGerente: CreateGerentesRequest): Promise<GerentesEntity> {
  const result: GerentesEntity = await fetch(
    `${baseLink}/gerentes`,
    {
      method: "POST",
      body: JSON.stringify(newGerente)
    }
  )
  .then(res => res.json());

  return result;
}

export async function deleteGerenteById(id: string): Promise<GerentesEntity> {
  const result: GerentesEntity = await fetch(
    `${baseLink}/gerentes/${id}`,
    {
      method: "DELETE"
    }
  )
  .then(res => res.json());

  return result;
}

export async function updateGerenteById(id: string, updatedGerente: UpdateGerentesRequest): Promise<GerentesEntity> {
  const result: GerentesEntity = await fetch(
    `${baseLink}/gerentes/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(updatedGerente)
    }
  )
  .then(res => res.json());

  return result;
}

// Eventos Futuros Functions
export async function getEventosFuturos(): Promise<EventosFuturosEntity[]> {
  const result: EventosFuturosEntity[] = await fetch(
    `${baseLink}/eventos_futuros`,
    {
      method: "GET"
    }
  )
  .then(res => res.json());

  return result;
}

export async function getEventoFuturoById(id: string): Promise<EventosFuturosEntity> {
  const result: EventosFuturosEntity = await fetch(
    `${baseLink}/eventos_futuros/${id}`,
    {
      method: "GET"
    }
  )
  .then(res => res.json());

  return result;
}

export async function insertEventoFuturo(newEventoFuturo: CreateEventosFuturosRequest): Promise<EventosFuturosEntity> {
  const result: EventosFuturosEntity = await fetch(
    `${baseLink}/eventos_futuros`,
    {
      method: "POST",
      body: JSON.stringify(newEventoFuturo)
    }
  )
  .then(res => res.json());

  return result;
}

export async function deleteEventoFuturoById(id: string): Promise<EventosFuturosEntity> {
  const result: EventosFuturosEntity = await fetch(
    `${baseLink}/eventos_futuros/${id}`,
    {
      method: "DELETE"
    }
  )
  .then(res => res.json());

  return result;
}

export async function updateEventoFuturoById(id: string, updatedEventoFuturo: UpdateEventosFuturosRequest): Promise<EventosFuturosEntity> {
  const result: EventosFuturosEntity = await fetch(
    `${baseLink}/aba_eventos/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(updatedEventoFuturo)
    }
  )
  .then(res => res.json());

  return result;
}

// Eventos Passados Functions
export async function getEventosPassados(): Promise<EventosPassadosEntity[]> {
  const result: EventosPassadosEntity[] = await fetch(
    `${baseLink}/eventos_passados`,
    {
      method: "GET"
    }
  )
  .then(res => res.json());

  return result;
}

export async function getEventoPassadoById(id: string): Promise<EventosPassadosEntity> {
  const result: EventosPassadosEntity = await fetch(
    `${baseLink}/eventos_passados/${id}`,
    {
      method: "GET"
    }
  )
  .then(res => res.json());

  return result;
}

export async function insertEventoPassado(newEventoPassado: CreateEventosPassadosRequest): Promise<EventosPassadosEntity> {
  const result: EventosPassadosEntity = await fetch(
    `${baseLink}/eventos_passados`,
    {
      method: "POST",
      body: JSON.stringify(newEventoPassado)
    }
  )
  .then(res => res.json());

  return result;
}

export async function deleteEventoPassadoById(id: string): Promise<EventosPassadosEntity> {
  const result: EventosPassadosEntity = await fetch(
    `${baseLink}/eventos_passados/${id}`,
    {
      method: "DELETE"
    }
  )
  .then(res => res.json());

  return result;
}

export async function updateEventoPassadoById(id: string, updatedEventoPassado: UpdateEventosPassadosRequest): Promise<EventosPassadosEntity> {
  const result: EventosPassadosEntity = await fetch(
    `${baseLink}/eventos_passados/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(updatedEventoPassado)
    }
  )
  .then(res => res.json());

  return result;
}

// Calendario Functions
export async function getCalendario(): Promise<CalendarioEntity[]> {
  const result: CalendarioEntity[] = await fetch(
    `${baseLink}/calendario`,
    {
      method: "GET"
    }
  )
  .then(res => res.json());

  return result;
}

export async function getCalendarioById(id: string): Promise<CalendarioEntity> {
  const result: CalendarioEntity = await fetch(
    `${baseLink}/calendario/${id}`,
    {
      method: "GET"
    }
  )
  .then(res => res.json());

  return result;
}

export async function insertCalendario(newCalendario: CreateCalendarioRequest): Promise<CalendarioEntity> {
  const result: CalendarioEntity = await fetch(
    `${baseLink}/calendario`,
    {
      method: "POST",
      body: JSON.stringify(newCalendario)
    }
  )
  .then(res => res.json());

  return result;
}

export async function deleteCalendarioById(id: string): Promise<CalendarioEntity> {
  const result: CalendarioEntity = await fetch(
    `${baseLink}/calendario/${id}`,
    {
      method: "DELETE"
    }
  )
  .then(res => res.json());

  return result;
}

export async function updateCalendarioById(id: string, updatedCalendario: UpdateCalendarioRequest): Promise<CalendarioEntity> {
  const result: CalendarioEntity = await fetch(
    `${baseLink}/calendario/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(updatedCalendario)
    }
  )
  .then(res => res.json());

  return result;
}