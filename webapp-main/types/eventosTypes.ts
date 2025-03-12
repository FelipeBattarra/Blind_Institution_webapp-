// Read Models
export type AbaEventosEntity = {
  gerentes_senha: number
}

export type GerentesEntity = {
  senha: number,
  cpf: string,
  email: string
}

export type EventosFuturosEntity = {
  id_eventos_futuros: number,
  stats_eventos_futuros: string
}

export type CalendarioEntity = {
  id_eventos: number,
  nmr_eventos: number,
  data_eventos: Date
}

export type EventosPassadosEntity = {
  id_eventos: number,
  calendario_id_eventos: number,
  status_eventos: number
}

// Create Models
export type CreateAbaEventosRequest = {
  gerentes_senha: number
}

export type CreateGerentesRequest = {
  senha: number,
  cpf: string,
  email: string
}

export type CreateEventosFuturosRequest = {
  id_eventos_futuros: number,
  stats_eventos_futuros: string
}

export type CreateCalendarioRequest = {
  id_eventos: number,
  nmr_eventos: number,
  data_eventos: Date
}

export type CreateEventosPassadosRequest = {
  id_eventos: number,
  calendario_id_eventos: number,
  status_eventos: number
}

// Update Models
export type UpdateAbaEventosRequest = {
  gerentes_senha?: number
}

export type UpdateGerentesRequest = {
  senha?: number,
  cpf?: string,
  email?: string
}

export type UpdateEventosFuturosRequest = {
  id_eventos_futuros?: number,
  stats_eventos_futuros?: string
}

export type UpdateCalendarioRequest = {
  id_eventos?: number,
  nmr_eventos?: number,
  data_eventos?: Date
}

export type UpdateEventosPassadosRequest = {
  id_eventos?: number,
  calendario_id_eventos?: number,
  status_eventos?: number
}