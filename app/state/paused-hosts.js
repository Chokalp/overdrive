// Browser hosts are paused, except Vikingfile, while each one is tested on the console on its own
// (2026-10-16): a source that needs the console's browser is left out of every game when the
// game's sources load, its host out of Browse's host filter, and a game left with no other host
// out of the catalog (state/catalog.js). Nothing is removed from the catalog data; false brings
// every one of them back. Archive.org stays, its /details/ pages too.

import { sourceKind, webURL } from './download-sources.js';
import { vikingLinkPage } from './viking-capture.js';

  var PAUSE_BROWSER_HOSTS = true;
  // Taken out of the pause one at a time, as each is tested (2026-10-16: DataNodes and FileKeeper,
  // then DataVaults and Buzzheavier). FileKeeper's own pages need no browser since:
  // download-sources.js resolves them.
  var TESTING = ["datanodes.to", "datanodes.co", "datavaults.co", "buzzheavier.com"];
  // The same hosts behind a LinkVault vault, named by the mirror the link picks (#DataNodes), or by
  // the label's suffix when the link names none ("Fpkg - DataNodes"; FileKeeper's reads "Filek").
  var TESTING_MIRRORS = ["DataNodes", "FileKeeper", "Filek", "DataVaults"];
  function testing(release) {
    try {
      const url = release.browserUrl || release.url;
      const host = webURL(url).host.replace(/^www\./, "");
      if (host === "link-vault.org") return TESTING_MIRRORS.includes(url.split("#")[1] || (release.label || "").split(" - ").pop());
      return TESTING.some((domain) => host === domain || host.endsWith(`.${domain}`));
    } catch {
      return false;
    }
  }
  // The catalog's own host keys (game.providers) whose every source needs the browser.
  var PAUSED_FILTERS = /* @__PURE__ */ new Set([
    "1fichier", "gofile", "rapidgator", "filecrypt",
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
    if (kind === "vikingfile" || vikingLinkPage(release) || /archive\.org$/i.test(release.provider || "") || testing(release)) return false;
    return kind === "browser" || kind === "datanodes" || kind === "buzzheavier";
  }
  var pausedFilter = (host) => PAUSE_BROWSER_HOSTS && PAUSED_FILTERS.has(host);

export { pausedFilter, pausedSource };
