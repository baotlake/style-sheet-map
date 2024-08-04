import { CSSStyleSheet } from "./CSSStyleSheet";

Object.defineProperty(globalThis, "CSSStyleSheet", {
  writable: true,
  //   value: jest.fn().mockImplementation(function () {
  //     this.constructor = CSSStyleSheet;
  //   }),
  value: CSSStyleSheet,
});
