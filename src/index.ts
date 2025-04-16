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
 * Trims a string to a specified maximum length while preserving whole words
 * and handling punctuation as specified.
 * 
 * @param str - The string to trim
 * @param maxLength - The maximum length of the resulting string (including suffix)
 * @param options - Options for the trimming behavior
 * @returns The trimmed string
 */
export function smartTrim(str: string, maxLength: number, options?: SmartTrimOptions): string {
  // Return immediately if string is already shorter than maxLength
  if (str.length <= maxLength) {
    return str;
  }
  
  const finalOptions: Required<SmartTrimOptions> = {
    ...DEFAULT_OPTIONS,
    ...options
  };
  
  // Calculate the actual trim length (accounting for suffix)
  const suffixLength = finalOptions.suffix.length;
  const trimLength = maxLength - suffixLength;
  
  // If trimLength is negative or zero, maxLength is too small
  if (trimLength <= 0) {
    return finalOptions.suffix.substring(0, maxLength);
  }
  
  // Get initial substring
  let trimmedStr = str.substring(0, trimLength);
  
  // Handle word preservation if enabled
  if (finalOptions.preserveWholeWords) {
    // Only trim to the last space if we cut a word in the middle
    // Check if the original string has a space or end of string right after our trimmed portion
    const nextCharInOriginal = str.charAt(trimLength);
    const isWordCutInMiddle = nextCharInOriginal !== '' && nextCharInOriginal !== ' ';
    
    if (isWordCutInMiddle) {
      // Find the last space to preserve whole words
      const lastSpaceIndex = trimmedStr.lastIndexOf(' ');
      if (lastSpaceIndex !== -1) {
        trimmedStr = trimmedStr.substring(0, lastSpaceIndex);
      }
    }
  }
  
  // Handle punctuation preservation if enabled
  if (!finalOptions.preservePunctuation) {
    // Remove trailing punctuation
    trimmedStr = trimmedStr.replace(/[.,!?;:'")\]}]+$/, '');
  }
  
  // Add suffix and return
  return trimmedStr + finalOptions.suffix;
}