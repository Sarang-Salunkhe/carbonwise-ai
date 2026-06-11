import { describe, it, expect } from "vitest";
import { generateRecommendations } from "../utils/recommendations";

describe("Recommendations", () => {
  it("returns recommendation array", () => {
    const recommendations = generateRecommendations({
      breakdown: {
        transportation: 1500,
        food: 2500,
        energy: 800,
        waste: 400,
        shopping: 300,
      },
      totalFootprint: 5500,
      inputs: {
        transportation: {
          mode: "car",
          distancePerDay: 20,
          daysPerWeek: 5,
        },
        food: {
          diet: "mixed",
        },
        energy: {
          acHoursPerDay: 5,
        },
        waste: {
          recycling: "never",
          plastic: "high",
          composting: "none",
        },
      },
    });

    expect(Array.isArray(recommendations)).toBe(true);
    expect(recommendations.length).toBeGreaterThan(0);
  });
});