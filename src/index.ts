/**
 * Copyright (c) 2024 HuanYang. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface Options<Key = any> extends CSSStyleSheetInit {
  rules?: readonly (readonly [Key, string])[] | null;
  onCreated?: (sheet: CSSStyleSheet) => void;
}

class StyleSheetMap<Key = any> extends Map {
  public styleSheet?: CSSStyleSheet;
  public onCreatedSheet?: (sheet: CSSStyleSheet) => void;
  private styleSheetInit?: CSSStyleSheetInit;
  constructor(options: Options<Key> = {}) {
    super();
    const { onCreated, rules, ...init } = options;
    this.onCreatedSheet = onCreated;
    this.styleSheetInit = init;

    if (rules && rules.length > 0) {
      this.styleSheet = this.createSheet();
      for (let [k, v] of rules) {
        const index = this.styleSheet.insertRule(v);
        const rule = this.styleSheet.cssRules[index];
        super.set(k, rule);
      }
    }
  }

  // key to index
  private getIndex(key: Key): number {
    let index = -1;
    const rule = super.get(key);
    if (rule && this.styleSheet) {
      const cssRules = this.styleSheet.cssRules;
      for (let i = cssRules.length; i >= 0; i--) {
        if (cssRules[i] === rule) {
          index = i;
          break;
        }
      }
    }
    return index;
  }

  public set(key: Key, value: string) {
    if (!this.styleSheet) {
      this.styleSheet = this.createSheet();
    }

    let index = this.getIndex(key);
    if (index !== -1) {
      this.styleSheet.deleteRule(index);
    }
    index = this.styleSheet.insertRule(value, index === -1 ? 0 : index);
    const rule = this.styleSheet.cssRules[index];
    return super.set(key, rule);
  }

  public delete(key: Key) {
    let index = this.getIndex(key);
    if (index !== -1 && this.styleSheet) {
      this.styleSheet.deleteRule(index);
    }
    return super.delete(key);
  }

  public createSheet(init?: CSSStyleSheetInit) {
    if (this.styleSheet) {
      console.warn("StyleSheetMap already has a styleSheet");
      this.onCreatedSheet?.(this.styleSheet);
      return this.styleSheet;
    }
    init = init || this.styleSheetInit;
    this.styleSheet = new CSSStyleSheet(init);
    this.onCreatedSheet?.(this.styleSheet);
    return this.styleSheet;
  }

  public get disabled() {
    return this.styleSheet?.disabled || false;
  }

  public set disabled(value: boolean) {
    if (this.styleSheet) {
      this.styleSheet.disabled = value;
    }
  }
}

export default StyleSheetMap;
