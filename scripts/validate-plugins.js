import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const schemaPath = join(__dirname, '../schema/plugin.schema.json');
const pluginsDir = join(__dirname, '../plugins');

const schema = JSON.parse(readFileSync(schemaPath, 'utf-8'));
const validate = ajv.compile(schema);

let hasErrors = false;

console.log('🔍 Validating plugin files...\n');

const pluginFiles = readdirSync(pluginsDir).filter(f => f.endsWith('.plugin.json'));

if (pluginFiles.length === 0) {
  console.error('❌ No plugin files found in /plugins directory');
  process.exit(1);
}

const pluginNames = new Set();

for (const file of pluginFiles) {
  const filePath = join(pluginsDir, file);
  
  try {
    const pluginData = JSON.parse(readFileSync(filePath, 'utf-8'));
    
    const valid = validate(pluginData);
    
    if (!valid) {
      hasErrors = true;
      console.error(`❌ ${file} - INVALID`);
      console.error('Errors:');
      for (const error of validate.errors) {
        console.error(`  - ${error.instancePath} ${error.message}`);
      }
      console.error('');
    } else {
      const expectedFilename = `${pluginData.name}.plugin.json`;
      if (file !== expectedFilename) {
        hasErrors = true;
        console.error(`❌ ${file} - Filename mismatch`);
        console.error(`  Expected: ${expectedFilename}`);
        console.error(`  Got: ${file}\n`);
      } else if (pluginNames.has(pluginData.name)) {
        hasErrors = true;
        console.error(`❌ ${file} - Duplicate plugin name: ${pluginData.name}\n`);
      } else {
        pluginNames.add(pluginData.name);
        console.log(`✅ ${file} - Valid`);
      }
    }
  } catch (error) {
    hasErrors = true;
    console.error(`❌ ${file} - JSON parse error: ${error.message}\n`);
  }
}

console.log(`\n📊 Summary: ${pluginFiles.length} files checked`);

if (hasErrors) {
  console.error('\n❌ Validation failed');
  process.exit(1);
} else {
  console.log('\n✅ All plugins are valid!');
  process.exit(0);
}
