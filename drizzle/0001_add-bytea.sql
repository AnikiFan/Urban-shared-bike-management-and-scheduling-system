CREATE TYPE "public"."role" AS ENUM('MANAGER', 'ANALYST', 'SCHEDULER');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "spatial_ref_sys" (
	"srid" integer PRIMARY KEY NOT NULL,
	"auth_name" varchar(256),
	"auth_srid" integer,
	"srtext" varchar(2048),
	"proj4Text" varchar(2048),
	CONSTRAINT "spatial_ref_sys_srid_check" CHECK ((srid > 0) AND (srid <= 998999))
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"email" text PRIMARY KEY NOT NULL,
	"encrypted_password" text NOT NULL,
	"role" "role" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bike" ALTER COLUMN "battery_remaining_capacity" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "parking_area" ALTER COLUMN "radius" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "to_be_reviewed_status" ALTER COLUMN "time" SET DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE "usage" ALTER COLUMN "time" SET DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE "public"."bike_status" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "public"."to_be_reviewed_status" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."status";--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('NORMAL', 'ILLEGAL_PARKING', 'LOW_BATTERY', 'IDLE', 'LUFLT', 'ABNORMAL', 'TO_MAINTAIN', 'OUTDATED', 'IN_STORAGE');--> statement-breakpoint
ALTER TABLE "public"."bike_status" ALTER COLUMN "status" SET DATA TYPE "public"."status" USING "status"::"public"."status";--> statement-breakpoint
ALTER TABLE "public"."to_be_reviewed_status" ALTER COLUMN "status" SET DATA TYPE "public"."status" USING "status"::"public"."status";