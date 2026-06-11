import { describe, it, expect } from "vitest";
import { getScoreColor } from "../utils/greenScore";

describe("Score Colors", () => {
  it("returns color for high score", () => {
    expect(getScoreColor(95)).toBeTruthy();
  });

  it("returns color for low score", () => {
    expect(getScoreColor(20)).toBeTruthy();
  });
});