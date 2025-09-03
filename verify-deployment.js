#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🔍 Verifying deployment setup...\n');

// Check if essential files exist
const essentialFiles = [
  'package.json',
  'vite.config.ts',
  'tsconfig.json',
  'nixpacks.toml',
  'railway.json',
  'src/entry-server.js',
  'server-production.js'
];

console.log('📁 Checking essential files:');
essentialFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} is missing`);
  }
});

// Check package.json scripts
console.log('\n📋 Checking package.json scripts:');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
const requiredScripts = ['build:railway', 'start'];

requiredScripts.forEach(script => {
  if (packageJson.scripts && packageJson.scripts[script]) {
    console.log(`✅ Script "${script}": ${packageJson.scripts[script]}`);
  } else {
    console.log(`❌ Script "${script}" is missing`);
  }
});

// Check if build directories exist after build
console.log('\n🏗️ Checking build output:');
const buildDirs = ['dist/client', 'dist/server'];

buildDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    console.log(`✅ ${dir} exists with ${files.length} files`);
  } else {
    console.log(`❌ ${dir} is missing`);
  }
});

// Check Node.js version
console.log('\n🟢 Node.js version:', process.version);
console.log('📦 NPM version:', process.env.npm_version || 'Unknown');

console.log('\n🎯 Deployment verification complete!'); 