import { LanguageModelV3FinishReason } from "@ai-sdk/provider";

type UnifiedFinishReason =
  | "stop"
  | "length"
  | "content-filter"
  | "tool-calls"
  | "error"
  | "other";

function mapToUnified(
  finishReason: string | null | undefined,
): UnifiedFinishReason {
  switch (finishReason) {
    case "stop":
      return "stop";
    case "length":
      return "length";
    case "tool_calls":
      return "tool-calls";
    case "sensitive":
      return "content-filter";
    case "network_error":
      return "error";
    default:
      return "other";
  }
}

export function mapZhipuFinishReason(
  finishReason: string | null | undefined,
): LanguageModelV3FinishReason {
  return {
    unified: mapToUnified(finishReason),
    raw: finishReason ?? undefined,
  };
}
