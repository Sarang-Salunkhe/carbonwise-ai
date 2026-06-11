import { describe, it, expect } from "vitest";
import { generateCoachMessages } from "../utils/coach";

describe("Coach", () => {
  it("returns coaching messages", () => {
    const messages = generateCoachMessages(
      {
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
            daysPerWeek: 5,
          },
          waste: {
            recycling: "never",
          },
          food: {
            diet: "mixed",
          },
        },
      },
      45
    );

    expect(Array.isArray(messages)).toBe(true);
    expect(messages.length).toBeGreaterThan(0);
  });

  it("returns welcome message when no footprint exists", () => {
    const messages = generateCoachMessages(null, 0);

    expect(messages.length).toBeGreaterThan(0);
  });

  it("handles high score users", () => {
    const messages = generateCoachMessages(
      {
        breakdown: {
          transportation: 500,
          food: 500,
          energy: 200,
          waste: 100,
          shopping: 50,
        },
        totalFootprint: 1350,
        inputs: {
          transportation: { mode: "car", daysPerWeek: 2 },
          waste: { recycling: "always" },
          food: { diet: "vegan" },
        },
      },
      90
    );

    expect(messages.length).toBeGreaterThan(0);
  });
});