import { describe, it, expect } from "vitest";
import { getResponseMetadata } from "./get-response-metadata";

describe("getResponseMetadata", () => {
  it("should map all fields", () => {
    const result = getResponseMetadata({
      id: "chat-123",
      model: "glm-4-flash",
      created: 1711115037,
    });

    expect(result).toStrictEqual({
      id: "chat-123",
      modelId: "glm-4-flash",
      timestamp: new Date(1711115037 * 1000),
    });
  });

  it("should handle null fields", () => {
    const result = getResponseMetadata({
      id: null,
      model: null,
      created: null,
    });

    expect(result).toStrictEqual({
      id: undefined,
      modelId: undefined,
      timestamp: undefined,
    });
  });

  it("should handle undefined fields", () => {
    const result = getResponseMetadata({
      id: undefined,
      model: undefined,
      created: undefined,
    });

    expect(result).toStrictEqual({
      id: undefined,
      modelId: undefined,
      timestamp: undefined,
    });
  });

  it("should handle created=0 as a valid timestamp", () => {
    const result = getResponseMetadata({
      id: "id",
      model: "model",
      created: 0,
    });

    expect(result.timestamp).toStrictEqual(new Date(0));
  });

  it("should handle missing optional fields", () => {
    const result = getResponseMetadata({});

    expect(result).toStrictEqual({
      id: undefined,
      modelId: undefined,
      timestamp: undefined,
    });
  });
});
