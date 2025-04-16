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

```typescript
import { smartTrim } from 'text-smart-trimmer';

// Basic usage with default options
smartTrim('This is a long sentence that needs to be trimmed', 20);
// Output: "This is a long..."

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
- `maxLength`: The maximum length of the resulting string (including suffix)
- `options`: Optional configuration object

#### SmartTrimOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `suffix` | `string` | `"..."` | String to append at the end of trimmed text |
| `preserveWholeWords` | `boolean` | `true` | Whether to preserve whole words when trimming |
| `preservePunctuation` | `boolean` | `true` | Whether to preserve trailing punctuation when trimming |

## License

MIT