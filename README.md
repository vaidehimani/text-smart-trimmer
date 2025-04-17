# text-smart-trimmer

A lightweight TypeScript utility library for intelligently trimming text strings. This library provides a smart way to truncate text to a specified length while preserving whole words and handling punctuation.

## Installation

```bash
npm install text-smart-trimmer
# or
yarn add text-smart-trimmer
# or
pnpm add text-smart-trimmer
```

## Usage

### ES Modules (recommended)

```typescript
import { smartTrim } from 'text-smart-trimmer';

// Basic usage with default options
smartTrim('This is a long sentence that needs to be trimmed', 20);
// Output: "This is a long..."
```

### CommonJS

```javascript
const { smartTrim } = require('text-smart-trimmer');

// Basic usage with default options
smartTrim('This is a long sentence that needs to be trimmed', 20);
// Output: "This is a long..."
```

### Examples

```typescript
// Custom suffix
smartTrim('This is a long sentence', 15, { suffix: ' [more]' });
// Output: "This is [more]"

// Disable whole word preservation
smartTrim('This is a long sentence', 12, { preserveWholeWords: false });
// Output: "This is a lo..."

// Disable punctuation preservation
smartTrim('This is a sentence, with punctuation.', 20, { preservePunctuation: false });
// Output: "This is a sentence..."
```

## API

### `smartTrim(str: string, maxLength: number, options?: SmartTrimOptions): string`

Trims a string to a specified maximum length while preserving whole words and handling punctuation as specified.

#### Parameters

- `str`: The string to trim
- `maxLength`: The maximum length of the resulting string (including suffix). Must be a non-negative integer.
- `options`: Optional configuration object

#### SmartTrimOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `suffix` | `string` | `"..."` | String to append at the end of trimmed text |
| `preserveWholeWords` | `boolean` | `true` | Whether to preserve whole words when trimming |
| `preservePunctuation` | `boolean` | `true` | Whether to preserve trailing punctuation when trimming |

## Behavior Notes

### Preserving Whole Words

When `preserveWholeWords` is `true` (default):
- The function will trim back to the last space to avoid cutting words in the middle
- If the string has no spaces (e.g., a single long word like "Supercalifragilisticexpialidocious"), only the suffix will be returned
- This ensures words are never cut in the middle

### Suffix Handling

- If `maxLength` is less than the length of the suffix, the suffix will be truncated
- If the suffix would take up the entire allowed length, only the suffix (possibly truncated) will be returned

### Punctuation

When `preservePunctuation` is `false`:
- Trailing punctuation like periods, commas, question marks, etc. will be removed before adding the suffix
- This helps avoid awkward results like "Hello world,..."

### Input Validation

The function performs strict input validation:
- `str` must be a string
- `maxLength` must be a non-negative integer (decimal values are not accepted)

## Edge Cases

- **Empty strings**: Returned unchanged
- **Single long words**: When `preserveWholeWords` is `true`, only the suffix is returned
- **Very short maxLength**: If maxLength is less than the suffix length, the suffix is truncated

## License

MIT