export type PostgresError = {
  message: string;
  details?: string;
  hint?: string;
  code?: string;
};