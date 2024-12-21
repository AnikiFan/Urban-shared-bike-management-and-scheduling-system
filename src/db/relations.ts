import { relations } from "drizzle-orm/relations";
import { bike, toBeReviewed, contain, parkingArea, bikeStatus, toBeReviewedStatus, scheduling, toBeReviewedProofMaterial, usage } from "./schema";

export const toBeReviewedRelations = relations(toBeReviewed, ({one}) => ({
	bike: one(bike, {
		fields: [toBeReviewed.bikeId],
		references: [bike.bikeId]
	}),
}));

export const bikeRelations = relations(bike, ({many}) => ({
	toBeRevieweds: many(toBeReviewed),
	contains: many(contain),
	bikeStatuses: many(bikeStatus),
	toBeReviewedStatuses: many(toBeReviewedStatus),
	schedulings: many(scheduling),
	toBeReviewedProofMaterials: many(toBeReviewedProofMaterial),
	usages: many(usage),
}));

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

export const parkingAreaRelations = relations(parkingArea, ({many}) => ({
	contains: many(contain),
}));

export const bikeStatusRelations = relations(bikeStatus, ({one}) => ({
	bike: one(bike, {
		fields: [bikeStatus.bikeId],
		references: [bike.bikeId]
	}),
}));

export const toBeReviewedStatusRelations = relations(toBeReviewedStatus, ({one}) => ({
	bike: one(bike, {
		fields: [toBeReviewedStatus.bikeId],
		references: [bike.bikeId]
	}),
}));

export const schedulingRelations = relations(scheduling, ({one}) => ({
	bike: one(bike, {
		fields: [scheduling.bikeId],
		references: [bike.bikeId]
	}),
}));

export const toBeReviewedProofMaterialRelations = relations(toBeReviewedProofMaterial, ({one}) => ({
	bike: one(bike, {
		fields: [toBeReviewedProofMaterial.bikeId],
		references: [bike.bikeId]
	}),
}));

export const usageRelations = relations(usage, ({one}) => ({
	bike: one(bike, {
		fields: [usage.bikeId],
		references: [bike.bikeId]
	}),
}));