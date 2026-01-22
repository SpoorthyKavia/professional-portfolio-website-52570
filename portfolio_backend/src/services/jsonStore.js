const fs = require('fs');
const path = require('path');

/**
 * Simple JSON file store for small demo apps.
 * Uses atomic write (write temp then rename) to reduce corruption risk.
 */
class JsonStore {
  constructor(filePath) {
    this.filePath = filePath;
  }

  _ensureDirExists() {
    const dir = path.dirname(this.filePath);
    fs.mkdirSync(dir, { recursive: true });
  }

  readJson(defaultValue) {
    try {
      const raw = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(raw);
    } catch (e) {
      return defaultValue;
    }
  }

  writeJson(value) {
    this._ensureDirExists();
    const tmpPath = `${this.filePath}.tmp`;
    fs.writeFileSync(tmpPath, JSON.stringify(value, null, 2), 'utf8');
    fs.renameSync(tmpPath, this.filePath);
  }
}

module.exports = JsonStore;
