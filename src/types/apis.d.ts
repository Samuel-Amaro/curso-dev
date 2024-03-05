export interface TypeAPIStatus {
  updated_at: string
  dependencies: {
    database: {
      version: string
      max_connections: number
      oppened_connections: string
    }
  }
}