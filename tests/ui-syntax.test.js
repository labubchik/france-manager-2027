const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { ROOT } = require('./helpers/load');

// Les écrans ne sont pas exécutés par les autres tests : on vérifie au moins qu'ils se lisent.
test('every script referenced by index.html parses', () => {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]);
  for (const s of scripts) {
    assert.doesNotThrow(() => new Function(fs.readFileSync(path.join(ROOT, s), 'utf8')), s);
  }
});
