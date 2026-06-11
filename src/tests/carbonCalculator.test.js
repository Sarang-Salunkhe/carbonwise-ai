import { describe, it, expect } from "vitest";
import { calculateFootprint } from "../utils/carbonCalculator";

describe("Carbon Calculator", () => {
  it("calculates a footprint", () => {
    const result = calculateFootprint({
      transportation: {
        mode: "car",
        distancePerDay: 20,
        daysPerWeek: 5,
      },
      food: {
        diet: "mixed",
      },
      energy: {
        monthlyElectricity: 300,
        acHoursPerDay: 4,
        householdSize: 4,
      },
      waste: {
        recycling: "sometimes",
        plastic: "medium",
        composting: "none",
      },
      shopping: {
        clothing: "moderate",
        electronics: "moderate",
      },
    });

    expect(result.totalFootprint).toBeGreaterThan(0);
  });
});