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
});