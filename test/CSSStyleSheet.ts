class MockCSSStyleSheet implements CSSStyleSheet {
  private ruleList: MockCSSRuleList;
  disabled: boolean = false;
  href: string | null = null;
  media: MediaList = { mediaText: "" } as MediaList;
  ownerNode: Element | ProcessingInstruction | null = null;
  parentStyleSheet: CSSStyleSheet | null = null;
  title: string | null = null;
  type: string = "text/css";
  readonly ownerRule: CSSRule | null = null;

  constructor() {
    this.ruleList = new MockCSSRuleList();
  }

  get cssRules(): CSSRuleList {
    return this.ruleList;
  }

  deleteRule(index: number): void {
    const rules = Array.from(this.ruleList);
    rules.splice(index, 1);
    this.ruleList = new MockCSSRuleList(rules);
  }

  insertRule(rule: string, index: number = 0): number {
    const rules = Array.from(this.ruleList);
    const newRule = { cssText: rule } as CSSRule;
    rules.splice(index, 0, newRule);
    this.ruleList = new MockCSSRuleList(rules);
    return index;
  }

  replace(text: string): Promise<CSSStyleSheet> {
    return new Promise((resolve) => {
      this.replaceSync(text);
      resolve(this);
    });
  }

  replaceSync(text: string): void {
    this.ruleList = new MockCSSRuleList([{ cssText: text } as CSSRule]);
  }

  // Deprecated methods, but still part of the interface
  addRule(selector: string, style: string, index?: number): number {
    console.warn("Method addRule() is deprecated. Use insertRule() instead.");
    return this.insertRule(`${selector} { ${style} }`, index);
  }

  removeRule(index?: number): void {
    console.warn(
      "Method removeRule() is deprecated. Use deleteRule() instead."
    );
    this.deleteRule(index || 0);
  }

  // Alias for cssRules (for backwards compatibility)
  get rules(): CSSRuleList {
    return this.cssRules;
  }
}

// The CSSRuleListMock remains the same as in the previous implementation
class MockCSSRuleList implements CSSRuleList {
  private rules: CSSRule[];

  constructor(rules: CSSRule[] = []) {
    this.rules = rules;
    rules.forEach((rule, index) => {
      Object.defineProperty(this, index, {
        get: () => rule,
        enumerable: true,
      });
    });
  }

  [Symbol.iterator](): IterableIterator<CSSRule> {
    return this.rules[Symbol.iterator]();
  }

  get length(): number {
    return this.rules.length;
  }

  item(index: number): CSSRule | null {
    return this.rules[index] || null;
  }

  [index: number]: CSSRule;
}

export { MockCSSStyleSheet as CSSStyleSheet, MockCSSRuleList as CSSRuleList };
