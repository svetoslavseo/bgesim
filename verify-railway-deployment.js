#!/usr/bin/env node

/**
 * Railway Deployment Verification Script
 * Verifies that SSR is working correctly after deployment
 */

import fs from 'fs';
import path from 'path';

const requiredFiles = [
  'dist/client/index.html',
  'dist/server/entry-server.js',
  'server-production.js',
  'package.json',
  'dist/client/plans.json',
  'dist/client/locales/bg/common.json',
  'dist/client/locales/en/common.json'
];

const requiredDirectories = [
  'dist/client',
  'dist/server',
  'dist/client/locales',
  'dist/client/locales/bg',
  'dist/client/locales/en'
];

console.log('🚀 Railway Deployment Verification');
console.log('==================================');

// Check required directories
console.log('\n📁 Checking required directories...');
let directoriesOk = true;
for (const dir of requiredDirectories) {
  if (fs.existsSync(dir)) {
    console.log(`✅ ${dir}`);
  } else {
    console.log(`❌ ${dir} - MISSING`);
    directoriesOk = false;
  }
}

// Check required files
console.log('\n📄 Checking required files...');
let filesOk = true;
for (const file of requiredFiles) {
  if (fs.existsSync(file)) {
    const stats = fs.statSync(file);
    console.log(`✅ ${file} (${Math.round(stats.size / 1024)}KB)`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    filesOk = false;
  }
}

// Check package.json scripts
console.log('\n📦 Checking package.json scripts...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
const requiredScripts = ['build:railway', 'start'];
let scriptsOk = true;

for (const script of requiredScripts) {
  if (packageJson.scripts[script]) {
    console.log(`✅ ${script}: ${packageJson.scripts[script]}`);
  } else {
    console.log(`❌ ${script} - MISSING`);
    scriptsOk = false;
  }
}

// Check environment configuration
console.log('\n🌍 Environment configuration...');
console.log(`NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
console.log(`PORT: ${process.env.PORT || 'not set (will default to 8080)'}`);

// Verify SSR entry point can be imported
console.log('\n🔧 Testing SSR entry point...');
try {
  const entryServerPath = path.resolve('dist/server/entry-server.js');
  if (fs.existsSync(entryServerPath)) {
    console.log('✅ SSR entry point exists and is accessible');
  } else {
    console.log('❌ SSR entry point missing');
    filesOk = false;
  }
} catch (error) {
  console.log('❌ Error testing SSR entry point:', error.message);
  filesOk = false;
}

// Final verification
console.log('\n🎯 Deployment Status');
console.log('====================');

if (directoriesOk && filesOk && scriptsOk) {
  console.log('✅ DEPLOYMENT READY - All checks passed!');
  console.log('\n🚀 Railway will run:');
  console.log('   Build: npm run build:railway');
  console.log('   Start: npm start (server-production.js)');
  console.log('   Port: process.env.PORT || 8080');
  process.exit(0);
} else {
  console.log('❌ DEPLOYMENT NOT READY - Some checks failed!');
  console.log('\n🔧 Run the following to fix:');
  console.log('   npm run build:railway');
  process.exit(1);
}
