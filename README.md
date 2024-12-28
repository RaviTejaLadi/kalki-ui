# kalki-ui 🎨

A modern, lightweight React UI component library crafted with TypeScript, Tailwind CSS, and cutting-edge build tools. Build beautiful interfaces faster! ✨

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![NPM Version](https://img.shields.io/npm/v/kalki-ui)](https://www.npmjs.com/package/kalki-ui)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![cva](https://img.shields.io/badge/CVA-Ready-blue)](https://cva.style/docs)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/kalki-ui)](https://bundlephobia.com/result?p=kalki-ui)
[![Github Stars](https://img.shields.io/github/stars/RaviTeja884781/kalki-ui)](https://github.com/RaviTeja884781/kalki-ui)
[![Downloads](https://img.shields.io/npm/dm/kalki-ui)](https://www.npmjs.com/package/kalki-ui)
[![Lucide React](https://img.shields.io/badge/Lucide_React-Ready-blue)](https://lucide.dev/guide/packages/lucide-react)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)

## ✨ Features

- 🚀 Modern React components
- 📦 Zero-config setup
- 🎯 Type-safe with full TypeScript support
- 🎨 Customizable with Tailwind CSS
- 📱 Responsive by default
- 🔥 Hot module replacement in development
- 🛠️ Built with modern tools

## 🚀 Quick Start

### Installation

Choose your preferred package manager:

```bash
# Using npm
npm install kalki-ui

# Using yarn
yarn add kalki-ui

# Using pnpm
pnpm add kalki-ui
```

### Basic Usage

```jsx
import { Accordion } from 'kalki-ui';;
import 'kalki-ui/dist/index.css';

function App() {
  return (
    <div>
          <Accordion size="sm" className="mb-4" variant="primary">
            <Accordion.Item>
              <Accordion.Header eventKey="1">Header 1</Accordion.Header>
              <Accordion.Body eventKey="1">
                lore m ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus
                ante dapibus diam. Sed nisi. Nulla quis sem at nib
              </Accordion.Body>
              <Accordion.Header eventKey="2">Header 1</Accordion.Header>
              <Accordion.Body eventKey="2">
                lore m ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus
                ante dapibus diam. Sed nisi. Nulla quis sem at nib
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
    </div>
  );
}
```
## 📦 Available Components

| Component | Description | Status |
|-----------|-------------|---------|
| Accordion | Collapsible content sections | ✅ Ready |


## 🛠️ Development

### Prerequisites

- Node.js 16+ 📦
- pnpm/npm/yarn 🔧
- Git 📝

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/RaviTeja884781/kalki-ui
   cd kalki-ui
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start development server:
   ```bash
   pnpm dev
   ```

4. Build for production:
   ```bash
   pnpm build
   ```

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | 🔄 Start development mode with watch |
| `pnpm build` | 📦 Build library for production |
| `pnpm clean` | 🧹 Remove build artifacts |
| `pnpm lint` | 🔍 Run ESLint checks |
| `pnpm lint:fix` | 🔧 Fix ESLint issues |
| `pnpm format` | ✨ Format code with Prettier |
| `pnpm typecheck` | ✅ Run TypeScript type checks |

## 🏗️ Tech Stack

- ⚛️ React - UI Library
- 📘 TypeScript - Type Safety
- 🎨 Tailwind CSS - Styling
- 📦 Rollup - Bundling
- ⚡ Vite - Development Server
- 🔍 ESLint - Linting
- ✨ Prettier - Code Formatting
- ⚙️ Babel - JavaScript Compilation

## 📜 License

MIT © [Ravi Teja](https://github.com/RaviTeja884781) - See [LICENSE](./LICENSE) for more details.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.
