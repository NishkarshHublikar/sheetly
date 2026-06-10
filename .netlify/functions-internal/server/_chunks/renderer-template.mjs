import { b as HTTPResponse } from "../_libs/h3.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
const rendererTemplate = () => new HTTPResponse('<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>Sheetly — Excel Automation &amp; Reporting Tool</title>\n    <meta name="description" content="Upload Excel/CSV files and instantly generate dashboards, analytics, and downloadable reports." />\n    <!--app-head-->\n  </head>\n  <body>\n    <div id="root"><!--app-html--></div>\n    <!--app-scripts-->\n  </body>\n</html>\n', { headers: { "content-type": "text/html; charset=utf-8" } });
function renderIndexHTML(event) {
  return rendererTemplate(event.req);
}
export {
  renderIndexHTML as default
};
