#!/usr/bin/env node

/**
 * Standalone script to update Saily plans data
 * Can be run manually or scheduled via external cron
 */

import { initializeSailyService, updateSailyPlansNow, sailyApiService } from '../utils/sailyApiService.js';

async function main() {
  console.log('🚀 Saily Plans Update Script Started');
  console.log('=====================================');
  
  try {
    // Get current status
    const fileStatus = await sailyApiService.getFileStatus();
    const metadata = await sailyApiService.getMetadata();
    
    console.log('\n📊 Current Status:');
    console.log(`File exists: ${fileStatus.exists}`);
    if (fileStatus.exists) {
      console.log(`File size: ${Math.round((fileStatus.size || 0) / 1024)} KB`);
      console.log(`Last modified: ${fileStatus.lastModified?.toLocaleString() || 'Unknown'}`);
    }
    
    if (metadata) {
      console.log(`Last update: ${new Date(metadata.lastUpdated).toLocaleString()}`);
      console.log(`Update count: ${metadata.updateCount}`);
      console.log(`Status: ${metadata.status}`);
      if (metadata.lastError) {
        console.log(`Last error: ${metadata.lastError}`);
      }
    }
    
    // Check command line arguments
    const args = process.argv.slice(2);
    const forceUpdate = args.includes('--force') || args.includes('-f');
    const initializeOnly = args.includes('--init') || args.includes('-i');
    const statusOnly = args.includes('--status') || args.includes('-s');
    
    if (statusOnly) {
      console.log('\n✅ Status check completed');
      return;
    }
    
    if (initializeOnly) {
      console.log('\n🔧 Initializing service...');
      await initializeSailyService();
      console.log('✅ Service initialized');
      return;
    }
    
    // Perform update
    if (forceUpdate) {
      console.log('\n🔄 Force updating plans data...');
    } else {
      console.log('\n🔄 Updating plans data...');
    }
    
    const success = await updateSailyPlansNow();
    
    if (success) {
      console.log('\n✅ Update completed successfully!');
      
      // Show updated file info
      const updatedFileStatus = await sailyApiService.getFileStatus();
      const updatedMetadata = await sailyApiService.getMetadata();
      
      console.log('\n📊 Updated Status:');
      if (updatedFileStatus.exists) {
        console.log(`File size: ${Math.round((updatedFileStatus.size || 0) / 1024)} KB`);
        console.log(`Last modified: ${updatedFileStatus.lastModified?.toLocaleString() || 'Unknown'}`);
      }
      
      if (updatedMetadata) {
        console.log(`Last update: ${new Date(updatedMetadata.lastUpdated).toLocaleString()}`);
        console.log(`Next update: ${new Date(updatedMetadata.nextUpdate).toLocaleString()}`);
        console.log(`Total updates: ${updatedMetadata.updateCount}`);
      }
      
    } else {
      console.log('\n❌ Update failed');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('\n💥 Script failed:', error);
    process.exit(1);
  }
}

// Show usage if help is requested
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Saily Plans Update Script

Usage: node scripts/update-saily-plans.js [options]

Options:
  --force, -f     Force update even if data is recent
  --init, -i      Initialize service and start weekly scheduling
  --status, -s    Show current status only
  --help, -h      Show this help message

Examples:
  node scripts/update-saily-plans.js              # Normal update
  node scripts/update-saily-plans.js --force      # Force update
  node scripts/update-saily-plans.js --status     # Check status
  node scripts/update-saily-plans.js --init       # Initialize service
`);
  process.exit(0);
}

// Run the script
main().catch(error => {
  console.error('💥 Unhandled error:', error);
  process.exit(1);
}); 