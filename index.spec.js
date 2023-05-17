//https://dev.to/thawkin3/how-to-unit-test-html-and-vanilla-javascript-without-a-ui-framework-4io
//https://github.com/dequelabs/axe-core/commit/88d039f

import "@testing-library/jest-dom/extend-expect";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";
import * as axe from "axe-core";

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

let dom;
let container;

describe("index.html", () => {
  beforeEach(() => {
    // Constructing a new JSDOM with this option is the key
    // to getting the code in the script tag to execute.
    // This is indeed dangerous and should only be done with trusted content.
    // https://github.com/jsdom/jsdom#executing-scripts
    dom = new JSDOM(html, { runScripts: "dangerously" });
    container = dom.window.document.body;
  });

  it("renders a heading element", (done) => {
    console.log(container);
    expect(container).toBeDefined();
    axe
      .run(container)
      .then((results) => {
        expect(results.violations.length).toBe(0);
        done();
      })
      .catch(done);
  });
});
