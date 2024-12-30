-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."status" AS ENUM('NORMAL', 'ILLEGAL_PARKING', 'LOW_BATTERY', 'IDLE', 'LUFFL', 'ABNORMAL', 'TO_MAINTAIN', 'OUTDATED', 'IN_STORAGE');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bike" (
	"bike_id" char(20) PRIMARY KEY NOT NULL,
	"production_date" date NOT NULL,
	"coordinate" "point" NOT NULL,
	"battery_remaining_capacity" real,
	CONSTRAINT "bike_battery_remaining_capacity_check" CHECK ((battery_remaining_capacity >= (0)::double precision) AND (battery_remaining_capacity <= (1)::double precision))
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "parking_area" (
	"parking_area_id" serial PRIMARY KEY NOT NULL,
	"name" char(20) NOT NULL,
	"coordinate" "point" NOT NULL,
	"radius" real,
	CONSTRAINT "parking_area_radius_check" CHECK (radius > (10)::double precision)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bike_status" (
	"bike_id" char(20) NOT NULL,
	"status" "status" NOT NULL,
	CONSTRAINT "bike_status_pkey" PRIMARY KEY("bike_id","status")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "to_be_reviewed" (
	"bike_id" char(20) NOT NULL,
	"time" timestamp NOT NULL,
	CONSTRAINT "to_be_reviewed_pkey" PRIMARY KEY("bike_id","time")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contain" (
	"bike_id" char(20) NOT NULL,
	"parking_area_id" serial NOT NULL,
	CONSTRAINT "contain_pkey" PRIMARY KEY("bike_id","parking_area_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "to_be_reviewed_status" (
	"bike_id" char(20) NOT NULL,
	"time" timestamp NOT NULL,
	"status" "status" NOT NULL,
	CONSTRAINT "to_be_reviewed_status_pkey" PRIMARY KEY("bike_id","time","status")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "usage" (
	"bike_id" char(20) NOT NULL,
	"time" timestamp NOT NULL,
	"coordinate" "point" NOT NULL,
	"action" boolean NOT NULL,
	CONSTRAINT "usage_pkey" PRIMARY KEY("bike_id","time")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scheduling" (
	"bike_id" char(20) NOT NULL,
	"time" timestamp NOT NULL,
	"coordinate" "point" NOT NULL,
	"action" boolean NOT NULL,
	CONSTRAINT "scheduling_pkey" PRIMARY KEY("bike_id","time")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "to_be_reviewed_proof_material" (
	"bike_id" char(20) NOT NULL,
	"time" timestamp NOT NULL,
	"no" smallint NOT NULL,
	"proof_material" "bytea" NOT NULL,
	CONSTRAINT "to_be_reviewed_proof_material_pkey" PRIMARY KEY("bike_id","time","no"),
	CONSTRAINT "to_be_reviewed_proof_material_no_check" CHECK (no >= 0)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bike_status" ADD CONSTRAINT "bike_status_bike_id_fkey" FOREIGN KEY ("bike_id") REFERENCES "public"."bike"("bike_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "to_be_reviewed" ADD CONSTRAINT "to_be_reviewed_bike_id_fkey" FOREIGN KEY ("bike_id") REFERENCES "public"."bike"("bike_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contain" ADD CONSTRAINT "contain_bike_id_fkey" FOREIGN KEY ("bike_id") REFERENCES "public"."bike"("bike_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contain" ADD CONSTRAINT "contain_parking_area_id_fkey" FOREIGN KEY ("parking_area_id") REFERENCES "public"."parking_area"("parking_area_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "to_be_reviewed_status" ADD CONSTRAINT "to_be_reviewed_status_bike_id_fkey" FOREIGN KEY ("bike_id") REFERENCES "public"."bike"("bike_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "usage" ADD CONSTRAINT "usage_bike_id_fkey" FOREIGN KEY ("bike_id") REFERENCES "public"."bike"("bike_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scheduling" ADD CONSTRAINT "scheduling_bike_id_fkey" FOREIGN KEY ("bike_id") REFERENCES "public"."bike"("bike_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "to_be_reviewed_proof_material" ADD CONSTRAINT "to_be_reviewed_proof_material_bike_id_fkey" FOREIGN KEY ("bike_id") REFERENCES "public"."bike"("bike_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/