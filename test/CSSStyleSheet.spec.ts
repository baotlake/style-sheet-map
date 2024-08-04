import { CSSStyleSheet } from "./CSSStyleSheet";

describe("CSSStyleSheetMock", () => {
  let sheet: CSSStyleSheet;

  beforeEach(() => {
    sheet = new CSSStyleSheet();
  });

  test("initial state", () => {
    expect(sheet.disabled).toBe(false);
    expect(sheet.href).toBeNull();
    expect(sheet.media.mediaText).toBe("");
    expect(sheet.ownerNode).toBeNull();
    expect(sheet.parentStyleSheet).toBeNull();
    expect(sheet.title).toBeNull();
    expect(sheet.type).toBe("text/css");
    expect(sheet.ownerRule).toBeNull();
    expect(sheet.cssRules.length).toBe(0);
  });

  test("insertRule", () => {
    const index = sheet.insertRule("body { background: red; }");
    expect(index).toBe(0);
    expect(sheet.cssRules.length).toBe(1);
    expect(sheet.cssRules[0].cssText).toBe("body { background: red; }");

    const index2 = sheet.insertRule("p { color: blue; }", 0);
    expect(index2).toBe(0);
    expect(sheet.cssRules.length).toBe(2);
    expect(sheet.cssRules[0].cssText).toBe("p { color: blue; }");
    expect(sheet.cssRules[1].cssText).toBe("body { background: red; }");
  });

  test("deleteRule", () => {
    sheet.insertRule("body { background: red; }");
    sheet.insertRule("p { color: blue; }");
    sheet.deleteRule(0);
    expect(sheet.cssRules.length).toBe(1);
    expect(sheet.cssRules[0].cssText).toBe("body { background: red; }");
  });

  test("replaceSync", () => {
    sheet.insertRule("body { background: red; }");
    sheet.replaceSync("p { color: blue; }");
    expect(sheet.cssRules.length).toBe(1);
    expect(sheet.cssRules[0].cssText).toBe("p { color: blue; }");
  });

  test("replace", async () => {
    sheet.insertRule("body { background: red; }");
    await sheet.replace("p { color: blue; }");
    expect(sheet.cssRules.length).toBe(1);
    expect(sheet.cssRules[0].cssText).toBe("p { color: blue; }");
  });

  test("deprecated addRule", () => {
    const consoleSpy = jest.spyOn(console, "warn").mockImplementation();
    const index = sheet.addRule("body", "background: red;");
    expect(consoleSpy).toHaveBeenCalledWith(
      "Method addRule() is deprecated. Use insertRule() instead."
    );
    expect(index).toBe(0);
    expect(sheet.cssRules.length).toBe(1);
    expect(sheet.cssRules[0].cssText).toBe("body { background: red; }");
    consoleSpy.mockRestore();
  });

  test("deprecated removeRule", () => {
    const consoleSpy = jest.spyOn(console, "warn").mockImplementation();
    sheet.insertRule("body { background: red; }");
    sheet.insertRule("p { color: blue; }");
    sheet.removeRule(0);
    expect(consoleSpy).toHaveBeenCalledWith(
      "Method removeRule() is deprecated. Use deleteRule() instead."
    );
    expect(sheet.cssRules.length).toBe(1);
    expect(sheet.cssRules[0].cssText).toBe("body { background: red; }");
    consoleSpy.mockRestore();
  });
});
