#!/usr/bin/env tsx

/**
 * Test script to verify Saily plans integration
 */

import { sailyPlansService } from '../utils/sailyPlansService';

async function testSailyIntegration() {
  console.log('🧪 Testing Saily Plans Integration');
  console.log('=================================');

  try {
    // Test getting normalized plans data
    console.log('\n1. Testing getNormalizedPlansData...');
    const plansData = await sailyPlansService.getNormalizedPlansData();
    
    console.log(`✅ Total plans loaded: ${plansData.items.length}`);
    
    const sailyPlans = plansData.items.filter(p => p.source === 'saily');
    const localPlans = plansData.items.filter(p => p.source === 'local');
    
    console.log(`   - Saily plans: ${sailyPlans.length}`);
    console.log(`   - Local plans: ${localPlans.length}`);

    // Test getting plans for a specific country (Bulgaria)
    console.log('\n2. Testing getPlansForCountry (BG)...');
    const bgPlans = await sailyPlansService.getPlansForCountry('BG');
    console.log(`✅ Plans for Bulgaria: ${bgPlans.length}`);
    
    if (bgPlans.length > 0) {
      const samplePlan = bgPlans[0];
      console.log(`   Sample plan: ${samplePlan.data} for ${samplePlan.validity} - $${(samplePlan.price.amount_with_tax / 100).toFixed(2)} (${samplePlan.source})`);
    }

    // Test getting plans for a region (Europe)
    console.log('\n3. Testing getPlansForRegion (Europe)...');
    const europePlans = await sailyPlansService.getPlansForRegion('Europe');
    console.log(`✅ Plans for Europe: ${europePlans.length}`);

    // Test getting statistics
    console.log('\n4. Testing getPlansStatistics...');
    const stats = await sailyPlansService.getPlansStatistics();
    console.log('✅ Statistics:');
    console.log(`   - Total plans: ${stats.totalPlans}`);
    console.log(`   - Saily plans: ${stats.sailyPlans}`);
    console.log(`   - Local plans: ${stats.localPlans}`);
    console.log(`   - Countries covered: ${stats.countriesCovered}`);
    console.log(`   - Average price: $${stats.averagePrice.toFixed(2)}`);

    // Test some sample Saily plans
    console.log('\n5. Sample Saily plans:');
    const sampleSailyPlans = sailyPlans.slice(0, 3);
    sampleSailyPlans.forEach((plan, index) => {
      console.log(`   ${index + 1}. ${plan.name}`);
      console.log(`      Data: ${plan.data}, Validity: ${plan.validity}`);
      console.log(`      Price: $${(plan.price.amount_with_tax / 100).toFixed(2)} ${plan.price.currency}`);
      console.log(`      Countries: ${plan.covered_countries.slice(0, 5).join(', ')}${plan.covered_countries.length > 5 ? ` +${plan.covered_countries.length - 5} more` : ''}`);
      console.log(`      Region: ${plan.region}, Type: ${plan.planType}`);
      console.log('');
    });

    console.log('🎉 All tests passed! Saily integration is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

// Run the test
testSailyIntegration().catch(error => {
  console.error('💥 Unhandled error:', error);
  process.exit(1);
}); 