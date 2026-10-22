const path = require('path');

const ROOT = path.join(__dirname, '..', '..');

// Charge des scripts « classiques » du jeu dans un FM tout neuf.
function load(...relPaths) {
  delete globalThis.FM;
  for (const rel of relPaths) {
    const abs = path.join(ROOT, rel);
    delete require.cache[require.resolve(abs)];
    require(abs);
  }
  return globalThis.FM;
}

module.exports = { load, ROOT };
