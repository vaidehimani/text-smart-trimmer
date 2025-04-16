import { smartTrim, SmartTrimOptions } from './index';

describe('smartTrim', () => {
  test('returns unchanged string if already shorter than maxLength', () => {
    const input = 'Hello world';
    expect(smartTrim(input, 20)).toBe(input);
  });

  test('trims string to maxLength with default options', () => {
    const input = 'This is a long sentence that needs to be trimmed';
    expect(smartTrim(input, 20)).toBe('This is a long...');
  });

  test('preserves whole words when trimming', () => {
    const input = 'This is a long sentence that needs to be trimmed';
    
    // With preserveWholeWords: true (default)
    expect(smartTrim(input, 19)).toBe('This is a long...');
    
    // With preserveWholeWords: false
    expect(smartTrim(input, 19, { preserveWholeWords: false }))
      .toBe('This is a long s...');
  });

  test('uses custom suffix when provided', () => {
    const input = 'This is a long sentence that needs to be trimmed';
    expect(smartTrim(input, 19, { suffix: ' [more]' })).toBe('This is a [more]');
  });

  test('works with empty suffix', () => {
    const input = 'This is a long sentence that needs to be trimmed';
    expect(smartTrim(input, 15, { suffix: '' })).toBe('This is a long');
  });

  test('handles punctuation preservation correctly', () => {
    const input = 'This is a sentence, Another sentence follows.';
    
    // With preservePunctuation: true (default)
    expect(smartTrim(input, 22)).toBe('This is a sentence,...');
    
    // With preservePunctuation: false
    expect(smartTrim(input, 22, { preservePunctuation: false }))
      .toBe('This is a sentence...');
  });

  test('handles very short maxLength values', () => {
    const input = 'Hello world';
    expect(smartTrim(input, 2)).toBe('..');
    expect(smartTrim(input, 1)).toBe('.');
  });

  test('works with all options specified', () => {
    const input = 'This is a longer sentence that needs trimming!';
    const options: SmartTrimOptions = {
      suffix: ' →',
      preserveWholeWords: false,
      preservePunctuation: false
    };
    expect(smartTrim(input, 15, options)).toBe('This is a lon →');
  });
  
  test('works correctly with unicode characters', () => {
    const input = '👋 Hello 🌍! This is a test with emojis.';
    expect(smartTrim(input, 15)).toBe('👋 Hello 🌍!...');
  });

  test('keeps the full word when trim length lands at word boundary', () => {
    const input = 'One two three four';
    // Trim length of 7 is exactly the length of "One two"
    expect(smartTrim(input, 10)).toBe('One two...');
    
    // Verify that it still trims correctly when cutting a word
    expect(smartTrim(input, 9)).toBe('One...');
  });
});