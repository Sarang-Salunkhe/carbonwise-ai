import { describe, it, expect } from "vitest";
import { calculateGreenScore } from "../utils/greenScore";

describe("Green Score", () => {
  it("returns score between 0 and 100", () => {
    const score = calculateGreenScore(5);

    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });
});