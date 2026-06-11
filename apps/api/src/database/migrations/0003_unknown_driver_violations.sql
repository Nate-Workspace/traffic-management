ALTER TABLE "violations" ADD COLUMN IF NOT EXISTS "plate_number" text;

UPDATE "violations" v
SET "plate_number" = d."plate_number"
FROM "drivers" d
WHERE v."driver_id" = d."id" AND v."plate_number" IS NULL;

UPDATE "violations"
SET "plate_number" = 'unknown'
WHERE "plate_number" IS NULL;

ALTER TABLE "violations" ALTER COLUMN "plate_number" SET NOT NULL;
ALTER TABLE "violations" ALTER COLUMN "driver_id" DROP NOT NULL;

DO $$ BEGIN
  ALTER TABLE "violations" DROP CONSTRAINT IF EXISTS "violations_driver_id_fkey";
EXCEPTION
  WHEN undefined_object THEN null;
END $$;

DO $$ BEGIN
  ALTER TABLE "violations"
    ADD CONSTRAINT "violations_driver_id_fkey"
    FOREIGN KEY ("driver_id") REFERENCES "public"."drivers"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE INDEX IF NOT EXISTS "violations_plate_number_idx" ON "violations" USING btree ("plate_number");