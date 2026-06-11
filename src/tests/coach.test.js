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
});