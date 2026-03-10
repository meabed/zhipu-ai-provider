import type { JSONObject, SharedV3ProviderOptions } from "@ai-sdk/provider";
import type { ZhipuProviderOptions } from "./zhipu-chat-settings";
import type { ZhipuImageProviderOptions } from "./zhipu-image-options";

/**
 * Creates properly typed `providerOptions` for Zhipu chat models.
 *
 * Since this SDK is exclusively for Zhipu AI, this helper removes the need
 * for namespace nesting — pass your options directly.
 *
 * @example
 * ```ts
 * import { zhipu, zhipuOptions } from "zhipu-ai-sdk-provider";
 *
 * const result = await generateText({
 *   model: zhipu("glm-4.7"),
 *   prompt: "Hello",
 *   providerOptions: zhipuOptions({
 *     temperature: 0.7,
 *     thinking: { type: "enabled" },
 *   }),
 * });
 * ```
 */
export function zhipuOptions(
  options: ZhipuProviderOptions,
): SharedV3ProviderOptions {
  return { zhipu: options as unknown as JSONObject };
}

/**
 * Creates properly typed `providerOptions` for Zhipu image models.
 *
 * @example
 * ```ts
 * import { zhipu, zhipuImageOptions } from "zhipu-ai-sdk-provider";
 *
 * const { image } = await generateImage({
 *   model: zhipu.imageModel("cogview-4-250304"),
 *   prompt: "A landscape",
 *   providerOptions: zhipuImageOptions({ quality: "hd" }),
 * });
 * ```
 */
export function zhipuImageOptions(
  options: ZhipuImageProviderOptions,
): SharedV3ProviderOptions {
  return { zhipu: options as unknown as JSONObject };
}
