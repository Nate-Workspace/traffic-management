import { ConflictException } from "@nestjs/common";

type PgError = {
  code?: string;
  detail?: string;
  constraint?: string;
};

export const handleDatabaseError = (error: unknown): never => {
  const pgError = error as PgError;

  if (pgError?.code === "23505") {
    throw new ConflictException({
      code: "unique_violation",
      message: "Duplicate value violates a unique constraint",
      details: pgError.detail ?? pgError.constraint,
    });
  }

  throw error;
};
