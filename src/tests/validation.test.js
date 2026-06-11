import { describe, it, expect } from "vitest";
import { validateInputs } from "../utils/validation";

describe("Validation", () => {
  it("accepts valid inputs", () => {
    const errors = validateInputs({
      transportation: {
        distancePerDay: 20,
        daysPerWeek: 5,
      },
      energy: {
        monthlyElectricity: 300,
        acHoursPerDay: 4,
        householdSize: 4,
      },
    });

    expect(Object.keys(errors)).toHaveLength(0);
  });

  it("rejects negative distance", () => {
    const errors = validateInputs({
      transportation: {
        distancePerDay: -10,
        daysPerWeek: 5,
      },
      energy: {
        monthlyElectricity: 300,
        acHoursPerDay: 4,
        householdSize: 4,
      },
    });

    expect(errors.distancePerDay).toBeDefined();
  });

  it("rejects distance above 500", () => {
    const errors = validateInputs({
      transportation: {
        distancePerDay: 600,
        daysPerWeek: 5,
      },
      energy: {
        monthlyElectricity: 300,
        acHoursPerDay: 4,
        householdSize: 4,
      },
    });

    expect(errors.distancePerDay).toBeDefined();
  });

  it("rejects days above 7", () => {
    const errors = validateInputs({
      transportation: {
        distancePerDay: 20,
        daysPerWeek: 10,
      },
      energy: {
        monthlyElectricity: 300,
        acHoursPerDay: 4,
        householdSize: 4,
      },
    });

    expect(errors.daysPerWeek).toBeDefined();
  });

  it("rejects AC hours above 24", () => {
    const errors = validateInputs({
      transportation: {
        distancePerDay: 20,
        daysPerWeek: 5,
      },
      energy: {
        monthlyElectricity: 300,
        acHoursPerDay: 30,
        householdSize: 4,
      },
    });

    expect(errors.acHoursPerDay).toBeDefined();
  });

  it("rejects household size below 1", () => {
    const errors = validateInputs({
      transportation: {
        distancePerDay: 20,
        daysPerWeek: 5,
      },
      energy: {
        monthlyElectricity: 300,
        acHoursPerDay: 4,
        householdSize: 0,
      },
    });

    expect(errors.householdSize).toBeDefined();
  });
});