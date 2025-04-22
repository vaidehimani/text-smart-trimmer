import { smartTrim, SmartTrimOptions } from "./index";

describe("smartTrim", () => {
  test("returns unchanged string if already shorter than maxLength", () => {
    const input = "Hello world";
    expect(smartTrim(input, 20)).toBe(input);
  });

  test("trims string to maxLength with default options", () => {
    const input = "This is a long sentence that needs to be trimmed";
    expect(smartTrim(input, 20)).toBe("This is a long...");
  });

  test("preserves whole words when trimming", () => {
    const input = "This is a long sentence that needs to be trimmed";

    // With preserveWholeWords: true (default)
    expect(smartTrim(input, 19)).toBe("This is a long...");

    // With preserveWholeWords: false
    expect(smartTrim(input, 19, { preserveWholeWords: false })).toBe(
      "This is a long s...",
    );
  });

  test("uses custom suffix when provided", () => {
    const input = "This is a long sentence that needs to be trimmed";
    expect(smartTrim(input, 19, { suffix: " [more]" })).toBe(
      "This is a [more]",
    );
  });

  test("works with empty suffix", () => {
    const input = "This is a long sentence that needs to be trimmed";
    expect(smartTrim(input, 15, { suffix: "" })).toBe("This is a long");
  });

  test("handles punctuation preservation correctly", () => {
    const input = "This is a sentence, Another sentence follows.";

    // With preservePunctuation: true (default)
    expect(smartTrim(input, 22)).toBe("This is a sentence,...");

    // With preservePunctuation: false
    expect(smartTrim(input, 22, { preservePunctuation: false })).toBe(
      "This is a sentence...",
    );
  });

  test("handles suffix longer than maxLength", () => {
    expect(smartTrim("Hello world", 5, { suffix: "... read more" })).toBe(
      "... r",
    );
    expect(smartTrim("Hello world", 3, { suffix: "... read more" })).toBe(
      "...",
    );
  });

  test("works with all options specified", () => {
    const input = "This is a longer sentence that needs trimming!";
    const options: SmartTrimOptions = {
      suffix: " →",
      preserveWholeWords: false,
      preservePunctuation: false,
    };
    expect(smartTrim(input, 15, options)).toBe("This is a lon →");
  });

  test("works correctly with unicode characters", () => {
    const input = "👋 Hello 🌍! This is a test with emojis.";
    expect(smartTrim(input, 15)).toBe("👋 Hello 🌍!...");
  });

  test("keeps the full word when trim length lands at word boundary", () => {
    const input = "One two three four";
    // Trim length of 7 is exactly the length of "One two"
    expect(smartTrim(input, 10)).toBe("One two...");

    // Verify that it still trims correctly when cutting a word
    expect(smartTrim(input, 9)).toBe("One...");
  });

  test("returns empty string when input is empty", () => {
    expect(smartTrim("", 10)).toBe("");
  });

  test("trims input containing only whitespace", () => {
    expect(smartTrim("     ", 3)).toBe("...");
  });

  test("handles string made of only punctuation", () => {
    expect(smartTrim("!!!???...", 5, { preservePunctuation: false })).toBe(
      "...",
    );
  });

  test("handles whitespace before punctuation correctly", () => {
    const input = "This is a , test , ";
    expect(smartTrim(input, 15, { preservePunctuation: false })).toBe(
      "This is a...",
    );
    expect(smartTrim(input, 15, { preservePunctuation: true })).toBe(
      "This is a ,...",
    );
  });

  test("handles trailing whitespace", () => {
    const input = "This is a test , ";
    expect(smartTrim(input, 13)).toBe(
      "This is a...",
    );
  });

  test("returns string unchanged when its length is exactly maxLength", () => {
    const input = "Perfect length";
    expect(smartTrim(input, input.length)).toBe(input);
  });

  test("handles strings with no spaces gracefully", () => {
    const input = "Supercalifragilisticexpialidocious";
    expect(smartTrim(input, 10)).toBe("...");
    expect(smartTrim(input, 10, { preserveWholeWords: false })).toBe(
      "Superca...",
    );
  });

  describe("input validation", () => {
    test("throws TypeError if first argument is not a string", () => {
      // @ts-expect-error - Testing runtime behavior with incorrect types
      expect(() => smartTrim(123, 10)).toThrow(TypeError);
      // @ts-expect-error - Testing runtime behavior with incorrect types
      expect(() => smartTrim(null, 10)).toThrow(TypeError);
      // @ts-expect-error - Testing runtime behavior with incorrect types
      expect(() => smartTrim(undefined, 10)).toThrow(TypeError);
      // @ts-expect-error - Testing runtime behavior with incorrect types
      expect(() => smartTrim({}, 10)).toThrow(TypeError);
      // @ts-expect-error - Testing runtime behavior with incorrect types
      expect(() => smartTrim([], 10)).toThrow(TypeError);

      expect(() => smartTrim("Valid string", 10)).not.toThrow();
    });

    test("throws TypeError if second argument is not a non-negative integer", () => {
      // @ts-expect-error - Testing runtime behavior with incorrect types
      expect(() => smartTrim("Hello", "10")).toThrow(TypeError);
      // @ts-expect-error - Testing runtime behavior with incorrect types
      expect(() => smartTrim("Hello", null)).toThrow(TypeError);
      // @ts-expect-error - Testing runtime behavior with incorrect types
      expect(() => smartTrim("Hello", undefined)).toThrow(TypeError);
      // @ts-expect-error - Testing runtime behavior with incorrect types
      expect(() => smartTrim("Hello", {})).toThrow(TypeError);
      // @ts-expect-error - Testing runtime behavior with incorrect types
      expect(() => smartTrim("Hello", [])).toThrow(TypeError);

      expect(() => smartTrim("Hello", 3.5)).toThrow(TypeError);
      expect(() => smartTrim("Hello", -1)).toThrow(TypeError);

      // Valid non-negative numbers should not throw
      expect(() => smartTrim("Hello", 0)).not.toThrow();
      expect(() => smartTrim("Hello", 10)).not.toThrow();
    });

    test("throws with correct error message", () => {
      // @ts-expect-error - Testing runtime behavior with incorrect types
      expect(() => smartTrim(123, 10)).toThrow(
        "First argument must be a string",
      );
      expect(() => smartTrim("Hello", -5)).toThrow(
        "Second argument must be a non-negative integer",
      );
      expect(() => smartTrim("Hello", 10.5)).toThrow(
        "Second argument must be a non-negative integer",
      );
    });
  });
});
