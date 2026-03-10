import { describe, it, expect } from "vitest";
import { sizeSchema } from "./zhipu-image-options";

describe("sizeSchema", () => {
  it("should accept valid size", () => {
    const result = sizeSchema.safeParse({ width: 1024, height: 1024 });
    expect(result.success).toBe(true);
  });

  it("should accept minimum valid size", () => {
    const result = sizeSchema.safeParse({ width: 512, height: 512 });
    expect(result.success).toBe(true);
  });

  it("should accept maximum valid size", () => {
    const result = sizeSchema.safeParse({ width: 2048, height: 1024 });
    expect(result.success).toBe(true);
  });

  it("should reject width below 512", () => {
    const result = sizeSchema.safeParse({ width: 256, height: 1024 });
    expect(result.success).toBe(false);
  });

  it("should reject height below 512", () => {
    const result = sizeSchema.safeParse({ width: 1024, height: 256 });
    expect(result.success).toBe(false);
  });

  it("should reject width above 2048", () => {
    const result = sizeSchema.safeParse({ width: 4096, height: 1024 });
    expect(result.success).toBe(false);
  });

  it("should reject height above 2048", () => {
    const result = sizeSchema.safeParse({ width: 1024, height: 4096 });
    expect(result.success).toBe(false);
  });

  it("should reject width not divisible by 16", () => {
    const result = sizeSchema.safeParse({ width: 1000, height: 1024 });
    expect(result.success).toBe(false);
  });

  it("should reject height not divisible by 16", () => {
    const result = sizeSchema.safeParse({ width: 1024, height: 1000 });
    expect(result.success).toBe(false);
  });

  it("should reject total pixels exceeding 2^21", () => {
    // 2048 * 2048 = 4194304, which is > 2^21 = 2097152
    const result = sizeSchema.safeParse({ width: 2048, height: 2048 });
    expect(result.success).toBe(false);
  });

  it("should accept size at exactly 2^21 pixels", () => {
    // 2048 * 1024 = 2097152 = 2^21
    const result = sizeSchema.safeParse({ width: 2048, height: 1024 });
    expect(result.success).toBe(true);
  });
});
