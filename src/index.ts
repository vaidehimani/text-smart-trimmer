/**
 * Options for the smartTrim function
 */
export interface SmartTrimOptions {
  /**
   * String to append at the end of trimmed text
   * @default "..."
   */
  suffix?: string;
  /**
   * Whether to preserve whole words when trimming
   * @default true
   */
  preserveWholeWords?: boolean;
  /**
   * Whether to preserve trailing punctuation when trimming
   * @default true
   */
  preservePunctuation?: boolean;
}

/**
 * Default options for smartTrim
 */
const DEFAULT_OPTIONS: Required<SmartTrimOptions> = {
  suffix: "...",
  preserveWholeWords: true,
  preservePunctuation: true
};

/**
 * Punctuation characters that can be removed when preservePunctuation is false
 */
const PUNCTUATION_REGEX = /[.,!?;:'")\]}]+$/;

/**
 * Trims a string to a specified maximum length while preserving whole words
 * and handling punctuation as specified.
 * 
 * @param str - The string to trim
 * @param maxLength - The maximum length of the resulting string (including suffix)
 * @param options - Options for the trimming behavior
 * @returns The trimmed string
 */
export function smartTrim(str: string, maxLength: number, options?: SmartTrimOptions): string {
  if (typeof str !== 'string') {
    throw new TypeError('First argument must be a string');
  }
  
  if (typeof maxLength !== 'number' || maxLength < 0 || !Number.isInteger(maxLength)) {
    throw new TypeError('Second argument must be a non-negative integer');
  }
  
  if (str.length <= maxLength) {
    return str;
  }
  
  const { suffix, preserveWholeWords, preservePunctuation }: Required<SmartTrimOptions> = {
    ...DEFAULT_OPTIONS,
    ...options
  };
  
  const contentLength = maxLength - suffix.length;
  
  if (contentLength <= 0) {
    return suffix.slice(0, maxLength);
  }
  
  let trimmedStr = str.slice(0, contentLength);
  
  if (preserveWholeWords) {
  const nextChar = str[contentLength];
  const isMidWord = nextChar && nextChar !== ' ';
  
  if (isMidWord) {
    const lastSpaceIndex = trimmedStr.lastIndexOf(' '); // Find a space to trim back to
    trimmedStr = lastSpaceIndex !== -1 ? trimmedStr.slice(0, lastSpaceIndex) : "";
  }
}
  
  if (!preservePunctuation) {
    trimmedStr = trimmedStr.replace(PUNCTUATION_REGEX, '');
  }
  
  return trimmedStr + suffix;
}