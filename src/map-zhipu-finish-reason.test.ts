import { describe, it, expect } from "vitest";
import { mapZhipuFinishReason } from "./map-zhipu-finish-reason";

describe("mapZhipuFinishReason", () => {
  it('should map "stop" to unified "stop"', () => {
    expect(mapZhipuFinishReason("stop")).toStrictEqual({
      unified: "stop",
      raw: "stop",
    });
  });

  it('should map "length" to unified "length"', () => {
    expect(mapZhipuFinishReason("length")).toStrictEqual({
      unified: "length",
      raw: "length",
    });
  });

  it('should map "tool_calls" to unified "tool-calls"', () => {
    expect(mapZhipuFinishReason("tool_calls")).toStrictEqual({
      unified: "tool-calls",
      raw: "tool_calls",
    });
  });

  it('should map "sensitive" to unified "content-filter"', () => {
    expect(mapZhipuFinishReason("sensitive")).toStrictEqual({
      unified: "content-filter",
      raw: "sensitive",
    });
  });

  it('should map "network_error" to unified "error"', () => {
    expect(mapZhipuFinishReason("network_error")).toStrictEqual({
      unified: "error",
      raw: "network_error",
    });
  });

  it('should map unknown reasons to unified "other"', () => {
    expect(mapZhipuFinishReason("eos")).toStrictEqual({
      unified: "other",
      raw: "eos",
    });
  });

  it('should map empty string to unified "other"', () => {
    expect(mapZhipuFinishReason("")).toStrictEqual({
      unified: "other",
      raw: "",
    });
  });

  it("should handle null finish reason", () => {
    expect(mapZhipuFinishReason(null)).toStrictEqual({
      unified: "other",
      raw: undefined,
    });
  });

  it("should handle undefined finish reason", () => {
    expect(mapZhipuFinishReason(undefined)).toStrictEqual({
      unified: "other",
      raw: undefined,
    });
  });
});
