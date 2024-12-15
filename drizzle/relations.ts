import { relations } from "drizzle-orm/relations";
import { bike, contain, parkingArea, bikeStatus, toBeReviewed, toBeReviewedStatus, toBeReviewedProofMaterial, scheduling, usage } from "./schema";

export const containRelations = relations(contain, ({one}) => ({
	bike: one(bike, {
		fields: [contain.bikeId],
		references: [bike.bikeId]
	}),
	parkingArea: one(parkingArea, {
		fields: [contain.parkingAreaId],
		references: [parkingArea.parkingAreaId]
	}),
}));

export const bikeRelations = relations(bike, ({many}) => ({
	contains: many(contain),
	bikeStatuses: many(bikeStatus),
	toBeRevieweds: many(toBeReviewed),
	toBeReviewedStatuses: many(toBeReviewedStatus),
	toBeReviewedProofMaterials: many(toBeReviewedProofMaterial),
	schedulings: many(scheduling),
	usages: many(usage),
}));

export const parkingAreaRelations = relations(parkingArea, ({many}) => ({
	contains: many(contain),
}));

export const bikeStatusRelations = relations(bikeStatus, ({one}) => ({
	bike: one(bike, {
		fields: [bikeStatus.bikeId],
		references: [bike.bikeId]
	}),
}));

export const toBeReviewedRelations = relations(toBeReviewed, ({one}) => ({
	bike: one(bike, {
		fields: [toBeReviewed.bikeId],
		references: [bike.bikeId]
	}),
}));

export const toBeReviewedStatusRelations = relations(toBeReviewedStatus, ({one}) => ({
	bike: one(bike, {
		fields: [toBeReviewedStatus.bikeId],
		references: [bike.bikeId]
	}),
}));

export const toBeReviewedProofMaterialRelations = relations(toBeReviewedProofMaterial, ({one}) => ({
	bike: one(bike, {
		fields: [toBeReviewedProofMaterial.bikeId],
		references: [bike.bikeId]
	}),
}));

export const schedulingRelations = relations(scheduling, ({one}) => ({
	bike: one(bike, {
		fields: [scheduling.bikeId],
		references: [bike.bikeId]
	}),
}));

export const usageRelations = relations(usage, ({one}) => ({
	bike: one(bike, {
		fields: [usage.bikeId],
		references: [bike.bikeId]
	}),
}));