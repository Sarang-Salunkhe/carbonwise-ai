import { describe, it, expect } from "vitest";
import {
  calculateGreenScore,
  getGrade,
  getScoreColor,
} from "../utils/greenScore";

describe("Green Score", () => {
  it("returns score between 0 and 100", () => {
    const score = calculateGreenScore(5);

    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it("returns A+ grade", () => {
    expect(getGrade(95).grade).toBeDefined();
  });

  it("returns B grade", () => {
    expect(getGrade(75).grade).toBeDefined();
  });

  it("returns low grade", () => {
    expect(getGrade(20).grade).toBeDefined();
  });

  it("returns green color", () => {
    expect(getScoreColor(95)).toBe("#10b981");
  });

  it("returns yellow color", () => {
    expect(getScoreColor(50)).toBe("#f59e0b");
  });

  it("returns red color", () => {
    expect(getScoreColor(20)).toBe("#ef4444");
  });

  it("calculates green score", () => {
    const score = calculateGreenScore({
      transportation: 500,
      food: 1000,
      energy: 300,
      waste: 100,
      shopping: 100,
    });

    expect(score).toBeGreaterThan(0);
  });
});