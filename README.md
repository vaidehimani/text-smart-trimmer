# 📝 text-smart-trimmer

A lightweight TypeScript utility library for intelligently trimming text strings. This library provides an easy way to trim text to specified lengths while preserving whole words or cutting mid-word, and handling punctuation. Perfect for summaries, previews, and UI components where clean text presentation matters.

[![npm](https://img.shields.io/npm/v/text-smart-trimmer)](https://www.npmjs.com/package/text-smart-trimmer)
[![build](https://img.shields.io/github/actions/workflow/status/vaidehimani/text-smart-trimmer/ci.yml?branch=main)](https://github.com/vaidehimani/text-smart-trimmer/actions)
[![license](https://img.shields.io/github/license/vaidehimani/text-smart-trimmer)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-supported-blue?logo=typescript)](tsconfig.json)
[![codecov](https://codecov.io/gh/vaidehimani/text-smart-trimmer/branch/main/graph/badge.svg)](https://codecov.io/gh/vaidehimani/text-smart-trimmer)


📦 [View on npm](https://www.npmjs.com/package/text-smart-trimmer)

## ⚡ Installation

Choose your package manager:

```bash
npm install text-smart-trimmer
```

```bash
yarn add text-smart-trimmer
```

```bash
pnpm add text-smart-trimmer
```

## 🚀 Usage

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

## 💡 Examples

```typescript
// Returns original string if shorter than maxLength
smartTrim('Short text', 20); // "Short text"

// Custom suffix
smartTrim('This is a long sentence', 15, { suffix: ' [more]' });
// Output: "This is [more]"

// Cut words in the middle (disable whole word preservation)
smartTrim('This is a long sentence', 15, { preserveWholeWords: false });
// Output: "This is a lo..."

// Remove trailing punctuation
smartTrim('This is a sentence, with punctuation.', 22, { preservePunctuation: false });
// Output: "This is a sentence..."
```

## 📋 API

### smartTrim(str, maxLength, options?)

```typescript
function smartTrim(
  str: string,
  maxLength: number,
  options?: SmartTrimOptions
): string
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `str` | `string` | The text to trim |
| `maxLength` | `number` | Maximum character length (including suffix) |
| `options` | `SmartTrimOptions` | Optional configuration |

#### SmartTrimOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `suffix` | `string` | `"..."` | Text to append after trimming |
| `preserveWholeWords` | `boolean` | `true` | Keep words intact or cut mid-word |
| `preservePunctuation` | `boolean` | `true` | Keep or remove trailing punctuation |

## ✨ Key Features

- **Smart word handling**: Automatically trims at word boundaries (configurable)
- **Customizable suffix**: Use any string as the truncation indicator
- **Punctuation awareness**: Intelligently handles trailing punctuation
- **Thoroughly tested**: Handles all edge cases reliably
- **Zero dependencies**: Lightweight and efficient
- **TypeScript ready**: Full type definitions included

## 🧩 Behavior Details

- Returns the original string if it's already shorter than `maxLength`
- Truncates the suffix if `maxLength` is smaller than the suffix length
- When `preserveWholeWords` is enabled with very long words, returns only the suffix
- Strict input validation ensures predictable behavior

## 📦 Why Use This Library?

While text trimming seems simple, handling all the edge cases correctly can be tricky:

- What if there are no spaces?
- How should punctuation be handled?
- What if the max length is very small?

This library has been thoroughly tested against dozens of edge cases so you don't have to worry about them.

## 📄 License

MIT