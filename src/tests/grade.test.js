import { describe, it, expect } from "vitest";
import { getGrade } from "../utils/greenScore";

describe("Grade Calculation", () => {
  it("returns grade object", () => {
    expect(getGrade(95).grade).toBeDefined();
  });

  it("handles low score", () => {
    expect(getGrade(20).grade).toBeDefined();
  });
});