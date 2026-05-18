CREATE TYPE "public"."violation_status" AS ENUM('PENDING', 'NOTIFIED', 'REVIEWED', 'DISMISSED');--> statement-breakpoint
CREATE TYPE "public"."violation_type" AS ENUM('RED_LIGHT');--> statement-breakpoint
CREATE TABLE "drivers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(200) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone_number" varchar(32) NOT NULL,
	"national_id" varchar(64) NOT NULL,
	"plate_number" varchar(32) NOT NULL,
	"driver_license_number" varchar(64) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "violations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"driver_id" uuid NOT NULL,
	"violation_type" "violation_type" NOT NULL,
	"image_urls" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"violation_at" timestamp with time zone NOT NULL,
	"status" "violation_status" DEFAULT 'PENDING' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "violations" ADD CONSTRAINT "violations_driver_id_drivers_id_fk" FOREIGN KEY ("driver_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "drivers_email_unique" ON "drivers" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "drivers_plate_unique" ON "drivers" USING btree ("plate_number");--> statement-breakpoint
CREATE UNIQUE INDEX "drivers_national_id_unique" ON "drivers" USING btree ("national_id");--> statement-breakpoint
CREATE INDEX "drivers_full_name_idx" ON "drivers" USING btree ("full_name");--> statement-breakpoint
CREATE INDEX "drivers_phone_number_idx" ON "drivers" USING btree ("phone_number");--> statement-breakpoint
CREATE INDEX "drivers_created_at_idx" ON "drivers" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "drivers_updated_at_idx" ON "drivers" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "violations_driver_id_idx" ON "violations" USING btree ("driver_id");--> statement-breakpoint
CREATE INDEX "violations_status_idx" ON "violations" USING btree ("status");--> statement-breakpoint
CREATE INDEX "violations_type_idx" ON "violations" USING btree ("violation_type");--> statement-breakpoint
CREATE INDEX "violations_violation_at_idx" ON "violations" USING btree ("violation_at");--> statement-breakpoint
CREATE INDEX "violations_created_at_idx" ON "violations" USING btree ("created_at");