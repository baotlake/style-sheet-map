# StyleSheetMap

A StyleSheetMap instance is a Map-like object that allows adding, updating, and deleting CSS rules through key-value pairs. It provides a convenient way to manage and manipulate CSS stylesheets, simplifying the handling of dynamic styles.

## Installation
```shell
# npm
npm install style-sheet-map

# yarn
yarn add style-sheet-map

# pnpm
pnpm install style-sheet-map
```

## Usage

```javascript
import StyleSheetMap from "style-sheet-map";

// Create a new StyleSheetMap instance
const styleMap = new StyleSheetMap({
  rules: [
    ["header", "header { color: blue; }"],
    ["paragraph", "p { font-size: 16px; }"],
  ],
  onCreated: (sheet) => {
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
  },
});

// Dynamically adding new CSS rules
styleMap.set("button", "button { background-color: green; }");

// Update existing CSS rules
styleMap.set("header", "header { color: red; }");

// Deleting a CSS rule
styleMap.delete("paragraph");

// Disable the entire stylesheet
styleMap.disable = true;
```
