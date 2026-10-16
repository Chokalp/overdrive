// Browser hosts are paused, except Vikingfile, while each one is tested on the console on its own
// (2026-10-16): a source that needs the console's browser is left out of every game when the
// game's sources load, its host out of Browse's host filter, and a game left with no other host
// out of the catalog (state/catalog.js). Nothing is removed from the catalog data; false brings
// every one of them back. Archive.org stays, its /details/ pages too.

import { sourceKind } from './download-sources.js';
import { vikingLinkPage } from './viking-capture.js';

  var PAUSE_BROWSER_HOSTS = true;
  // The catalog's own host keys (game.providers) whose every source needs the browser.
  var PAUSED_FILTERS = /* @__PURE__ */ new Set([
    "1fichier", "datanodes", "filekeeper", "datavaults", "buzzheavier", "gofile", "rapidgator", "filecrypt",
    "ranoz", "transfer", "mega", "urlvanish", "fileditchfiles", "tinyurl", "fuckingfast", "akirabox", "rootz.so",
    "1024terabox"
  ]);
  function pausedSource(release) {
    if (!PAUSE_BROWSER_HOSTS) return false;
    let kind;
    try {
      kind = sourceKind(release);
    } catch {
      return false;
    }
    if (kind === "vikingfile" || vikingLinkPage(release) || /archive\.org$/i.test(release.provider || "")) return false;
    return kind === "browser" || kind === "datanodes" || kind === "buzzheavier";
  }
  var pausedFilter = (host) => PAUSE_BROWSER_HOSTS && PAUSED_FILTERS.has(host);

export { pausedFilter, pausedSource };
