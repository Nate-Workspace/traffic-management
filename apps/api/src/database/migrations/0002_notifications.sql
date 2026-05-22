DO $$ BEGIN
  CREATE TYPE "public"."notification_channel" AS ENUM('EMAIL');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."notification_delivery_status" AS ENUM('NOT_SENT', 'SENT', 'FAILED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "violations" ADD COLUMN IF NOT EXISTS "notification_status" "notification_delivery_status" DEFAULT 'NOT_SENT' NOT NULL;
ALTER TABLE "violations" ADD COLUMN IF NOT EXISTS "last_notified_at" timestamp with time zone;

CREATE TABLE IF NOT EXISTS "violation_notifications" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "violation_id" uuid NOT NULL,
  "channel" "notification_channel" DEFAULT 'EMAIL' NOT NULL,
  "delivery_status" "notification_delivery_status" DEFAULT 'NOT_SENT' NOT NULL,
  "recipient_email" varchar(255) NOT NULL,
  "subject" text NOT NULL,
  "failure_reason" text,
  "attempt_count" integer DEFAULT 1 NOT NULL,
  "sent_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

DO $$ BEGIN
  ALTER TABLE "violation_notifications" ADD CONSTRAINT "violation_notifications_violation_id_violations_id_fk" FOREIGN KEY ("violation_id") REFERENCES "public"."violations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE INDEX IF NOT EXISTS "violation_notifications_violation_id_idx" ON "violation_notifications" USING btree ("violation_id");
CREATE INDEX IF NOT EXISTS "violation_notifications_delivery_status_idx" ON "violation_notifications" USING btree ("delivery_status");
CREATE INDEX IF NOT EXISTS "violation_notifications_created_at_idx" ON "violation_notifications" USING btree ("created_at");
