import { describe, it, expect } from "vitest";
import { simulateFootprint } from "../utils/carbonCalculator";

describe("Simulator", () => {
  it("creates a simulated footprint", () => {
    const result = simulateFootprint(
      {
        transportation: {
          mode: "car",
          distancePerDay: 20,
          daysPerWeek: 5,
        },
        food: { diet: "mixed" },
        energy: {
          monthlyElectricity: 200,
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
      },
      {
        transportation: {
          mode: "publicTransport",
        },
      }
    );

    expect(result.totalFootprint).toBeGreaterThan(0);
  });
});