import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

// Polyfill to inject at the top of worker files
const polyfill = `// MessageChannel polyfill for Cloudflare Workers
if (typeof MessageChannel === 'undefined') {
  globalThis.MessageChannel = class MessageChannel {
    constructor() {
      this.port1 = {
        postMessage: () => {},
        onmessage: null,
        close: () => {},
        start: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true
      };
      this.port2 = {
        postMessage: () => {},
        onmessage: null,
        close: () => {},
        start: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true
      };
    }
  };
}

`;

function injectPolyfillIntoFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');

    // Skip if already has polyfill
    if (content.includes('MessageChannel polyfill')) {
      return false;
    }

    const modifiedContent = polyfill + content;
    writeFileSync(filePath, modifiedContent, 'utf-8');
    return true;
  } catch (error) {
    console.error(`  ❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function processDirectory(dirPath) {
  const entries = readdirSync(dirPath);
  let count = 0;

  for (const entry of entries) {
    const fullPath = join(dirPath, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      count += processDirectory(fullPath);
    } else if (entry.endsWith('.mjs') || entry.endsWith('.js')) {
      if (injectPolyfillIntoFile(fullPath)) {
        console.log(`  ✅ Injected into: ${fullPath.replace(process.cwd(), '')}`);
        count++;
      }
    }
  }

  return count;
}

try {
  const workerDir = join(process.cwd(), 'dist', '_worker.js');
  console.log('📝 Injecting MessageChannel polyfill into all worker files...\n');

  const count = processDirectory(workerDir);

  console.log(`\n✅ Successfully injected polyfill into ${count} file(s)!`);
} catch (error) {
  console.error('❌ Error injecting polyfill:', error.message);
  process.exit(1);
}
