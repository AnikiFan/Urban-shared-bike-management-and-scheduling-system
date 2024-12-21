import { pgTable, check, integer, varchar, text, char, date, point, real, serial, foreignKey, primaryKey, timestamp, boolean, smallint, pgView, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const role = pgEnum("role", ['MANAGER', 'ANALYST', 'SCHEDULER'])
export const status = pgEnum("status", ['NORMAL', 'ILLEGAL_PARKING', 'LOW_BATTERY', 'IDLE', 'LUFLT', 'ABNORMAL', 'TO_MAINTAIN', 'OUTDATED', 'IN_STORAGE'])


export const spatialRefSys = pgTable("spatial_ref_sys", {
	srid: integer().primaryKey().notNull(),
	authName: varchar("auth_name", { length: 256 }),
	authSrid: integer("auth_srid"),
	srtext: varchar({ length: 2048 }),
	proj4Text: varchar({ length: 2048 }),
}, (table) => {
	return {
		spatialRefSysSridCheck: check("spatial_ref_sys_srid_check", sql`(srid > 0) AND (srid <= 998999)`),
	}
});

export const users = pgTable("users", {
	email: text().primaryKey().notNull(),
	encryptedPassword: text("encrypted_password").notNull(),
	role: role().notNull(),
});

export const bike = pgTable("bike", {
	bikeId: char("bike_id", { length: 20 }).primaryKey().notNull(),
	productionDate: date("production_date").notNull(),
	coordinate: point().notNull(),
	batteryRemainingCapacity: real("battery_remaining_capacity").notNull(),
}, (table) => {
	return {
		bikeBatteryRemainingCapacityCheck: check("bike_battery_remaining_capacity_check", sql`(battery_remaining_capacity >= (0)::double precision) AND (battery_remaining_capacity <= (1)::double precision)`),
	}
});

export const parkingArea = pgTable("parking_area", {
	parkingAreaId: serial("parking_area_id").primaryKey().notNull(),
	name: char({ length: 20 }).notNull(),
	coordinate: point().notNull(),
	radius: real().notNull(),
}, (table) => {
	return {
		parkingAreaRadiusCheck: check("parking_area_radius_check", sql`radius > (10)::double precision`),
	}
});

export const toBeReviewed = pgTable("to_be_reviewed", {
	bikeId: char("bike_id", { length: 20 }).notNull(),
	time: timestamp({ mode: 'string' }).notNull(),
}, (table) => {
	return {
		toBeReviewedBikeIdFkey: foreignKey({
			columns: [table.bikeId],
			foreignColumns: [bike.bikeId],
			name: "to_be_reviewed_bike_id_fkey"
		}),
		toBeReviewedPkey: primaryKey({ columns: [table.bikeId, table.time], name: "to_be_reviewed_pkey"}),
	}
});

export const contain = pgTable("contain", {
	bikeId: char("bike_id", { length: 20 }).notNull(),
	parkingAreaId: serial("parking_area_id").notNull(),
}, (table) => {
	return {
		containBikeIdFkey: foreignKey({
			columns: [table.bikeId],
			foreignColumns: [bike.bikeId],
			name: "contain_bike_id_fkey"
		}),
		containParkingAreaIdFkey: foreignKey({
			columns: [table.parkingAreaId],
			foreignColumns: [parkingArea.parkingAreaId],
			name: "contain_parking_area_id_fkey"
		}),
		containPkey: primaryKey({ columns: [table.bikeId, table.parkingAreaId], name: "contain_pkey"}),
	}
});

export const bikeStatus = pgTable("bike_status", {
	bikeId: char("bike_id", { length: 20 }).notNull(),
	status: status().notNull(),
}, (table) => {
	return {
		bikeStatusBikeIdFkey: foreignKey({
			columns: [table.bikeId],
			foreignColumns: [bike.bikeId],
			name: "bike_status_bike_id_fkey"
		}),
		bikeStatusPkey: primaryKey({ columns: [table.bikeId, table.status], name: "bike_status_pkey"}),
	}
});

export const toBeReviewedStatus = pgTable("to_be_reviewed_status", {
	bikeId: char("bike_id", { length: 20 }).notNull(),
	time: timestamp({ mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	status: status().notNull(),
}, (table) => {
	return {
		toBeReviewedStatusBikeIdFkey: foreignKey({
			columns: [table.bikeId],
			foreignColumns: [bike.bikeId],
			name: "to_be_reviewed_status_bike_id_fkey"
		}),
		toBeReviewedStatusPkey: primaryKey({ columns: [table.bikeId, table.time, table.status], name: "to_be_reviewed_status_pkey"}),
	}
});

export const scheduling = pgTable("scheduling", {
	bikeId: char("bike_id", { length: 20 }).notNull(),
	time: timestamp({ mode: 'string' }).notNull(),
	coordinate: point().notNull(),
	action: boolean().notNull(),
}, (table) => {
	return {
		schedulingBikeIdFkey: foreignKey({
			columns: [table.bikeId],
			foreignColumns: [bike.bikeId],
			name: "scheduling_bike_id_fkey"
		}),
		schedulingPkey: primaryKey({ columns: [table.bikeId, table.time], name: "scheduling_pkey"}),
	}
});

export const toBeReviewedProofMaterial = pgTable("to_be_reviewed_proof_material", {
	bikeId: char("bike_id", { length: 20 }).notNull(),
	time: timestamp({ mode: 'string' }).notNull(),
	no: smallint().notNull(),
	proofMaterial: text("proof_material").notNull(),
}, (table) => {
	return {
		toBeReviewedProofMaterialBikeIdFkey: foreignKey({
			columns: [table.bikeId],
			foreignColumns: [bike.bikeId],
			name: "to_be_reviewed_proof_material_bike_id_fkey"
		}),
		toBeReviewedProofMaterialPkey: primaryKey({ columns: [table.bikeId, table.time, table.no], name: "to_be_reviewed_proof_material_pkey"}),
		toBeReviewedProofMaterialNoCheck: check("to_be_reviewed_proof_material_no_check", sql`no >= 0`),
	}
});

export const usage = pgTable("usage", {
	bikeId: char("bike_id", { length: 20 }).notNull(),
	time: timestamp({ mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	coordinate: point().notNull(),
	action: boolean().notNull(),
}, (table) => {
	return {
		usageBikeIdFkey: foreignKey({
			columns: [table.bikeId],
			foreignColumns: [bike.bikeId],
			name: "usage_bike_id_fkey"
		}),
		usagePkey: primaryKey({ columns: [table.bikeId, table.time], name: "usage_pkey"}),
	}
});