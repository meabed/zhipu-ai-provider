import { describe, it, expect } from "vitest";
import { computeTokenUsage, emptyUsage } from "./compute-token-usage";

describe("computeTokenUsage", () => {
  it("should compute usage with all fields present", () => {
    const result = computeTokenUsage({
      prompt_tokens: 100,
      completion_tokens: 50,
      total_tokens: 150,
      prompt_tokens_details: { cached_tokens: 30 },
      completion_tokens_details: { reasoning_tokens: 10 },
    });

    expect(result).toStrictEqual({
      inputTokens: {
        total: 100,
        noCache: 70,
        cacheRead: 30,
        cacheWrite: undefined,
      },
      outputTokens: {
        total: 50,
        text: 40,
        reasoning: 10,
      },
      raw: {
        prompt_tokens: 100,
        completion_tokens: 50,
        total_tokens: 150,
        prompt_tokens_details: { cached_tokens: 30 },
        completion_tokens_details: { reasoning_tokens: 10 },
      },
    });
  });

  it("should handle missing prompt_tokens_details", () => {
    const result = computeTokenUsage({
      prompt_tokens: 20,
      completion_tokens: 10,
      total_tokens: 30,
    });

    expect(result.inputTokens).toStrictEqual({
      total: 20,
      noCache: 20,
      cacheRead: undefined,
      cacheWrite: undefined,
    });
    expect(result.outputTokens).toStrictEqual({
      total: 10,
      text: 10,
      reasoning: undefined,
    });
  });

  it("should handle null prompt_tokens and completion_tokens", () => {
    const result = computeTokenUsage({
      prompt_tokens: null,
      completion_tokens: null,
    });

    expect(result.inputTokens.total).toBe(0);
    expect(result.inputTokens.noCache).toBe(0);
    expect(result.outputTokens.total).toBe(0);
    expect(result.outputTokens.text).toBe(0);
  });

  it("should handle undefined fields", () => {
    const result = computeTokenUsage({});

    expect(result.inputTokens.total).toBe(0);
    expect(result.outputTokens.total).toBe(0);
  });

  it("should handle zero cached tokens", () => {
    const result = computeTokenUsage({
      prompt_tokens: 50,
      completion_tokens: 25,
      prompt_tokens_details: { cached_tokens: 0 },
    });

    expect(result.inputTokens.cacheRead).toBeUndefined();
    expect(result.inputTokens.noCache).toBe(50);
  });

  it("should handle zero reasoning tokens", () => {
    const result = computeTokenUsage({
      prompt_tokens: 50,
      completion_tokens: 25,
      completion_tokens_details: { reasoning_tokens: 0 },
    });

    expect(result.outputTokens.reasoning).toBeUndefined();
    expect(result.outputTokens.text).toBe(25);
  });

  it("should handle null prompt_tokens_details", () => {
    const result = computeTokenUsage({
      prompt_tokens: 50,
      completion_tokens: 25,
      prompt_tokens_details: null,
    });

    expect(result.inputTokens.cacheRead).toBeUndefined();
    expect(result.inputTokens.noCache).toBe(50);
  });

  it("should preserve raw usage data", () => {
    const usage = {
      prompt_tokens: 10,
      completion_tokens: 5,
      total_tokens: 15,
    };
    const result = computeTokenUsage(usage);

    expect(result.raw).toStrictEqual(usage);
  });
});

describe("emptyUsage", () => {
  it("should return all-zero/undefined usage", () => {
    const result = emptyUsage();

    expect(result).toStrictEqual({
      inputTokens: {
        total: 0,
        noCache: undefined,
        cacheRead: undefined,
        cacheWrite: undefined,
      },
      outputTokens: {
        total: 0,
        text: undefined,
        reasoning: undefined,
      },
      raw: undefined,
    });
  });
});
