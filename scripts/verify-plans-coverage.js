#!/usr/bin/env node

/**
 * Plans Coverage Verification Script
 * 
 * This script verifies that all countries and regions have available plans
 * by testing the sailyPlansService filtering logic.
 */

import { sailyPlansService } from '../utils/sailyPlansService.ts';
import { COUNTRIES, REGIONS } from '../constants.ts';

async function verifyPlansCoverage() {
  console.log('🔍 Verifying Plans Coverage for All Countries and Regions...\n');
  
  try {
    // Get all normalized plans data
    const plansData = await sailyPlansService.getNormalizedPlansData();
    const totalPlans = plansData.items.length;
    const sailyPlans = plansData.items.filter(p => p.source === 'saily').length;
    const localPlans = plansData.items.filter(p => p.source === 'local').length;
    
    console.log(`📊 Total Plans Available: ${totalPlans}`);
    console.log(`   • Saily Plans: ${sailyPlans}`);
    console.log(`   • Local Plans: ${localPlans}\n`);
    
    // Test country coverage
    console.log('🌍 Testing Country Coverage:');
    console.log('================================');
    
    const countriesWithoutPlans = [];
    const countryStats = [];
    
    for (const country of COUNTRIES) {
      const countryCode = country.countryCode || country.id.toUpperCase();
      const countryPlans = await sailyPlansService.getPlansForCountry(countryCode);
      
      if (countryPlans.length === 0) {
        countriesWithoutPlans.push(`${country.name} (${countryCode})`);
      }
      
      countryStats.push({
        name: country.name,
        code: countryCode,
        plans: countryPlans.length,
        sailyPlans: countryPlans.filter(p => p.source === 'saily').length,
        localPlans: countryPlans.filter(p => p.source === 'local').length
      });
    }
    
    // Show countries with most plans
    const topCountries = countryStats
      .filter(c => c.plans > 0)
      .sort((a, b) => b.plans - a.plans)
      .slice(0, 10);
      
    console.log(`✅ Countries with Plans: ${countryStats.filter(c => c.plans > 0).length}/${COUNTRIES.length}`);
    console.log(`❌ Countries without Plans: ${countriesWithoutPlans.length}`);
    
    if (countriesWithoutPlans.length > 0) {
      console.log('\n🚨 Countries Missing Plans:');
      countriesWithoutPlans.forEach(country => console.log(`   • ${country}`));
    }
    
    console.log('\n🏆 Top 10 Countries by Plan Count:');
    topCountries.forEach(country => {
      console.log(`   • ${country.name} (${country.code}): ${country.plans} plans (${country.sailyPlans} Saily + ${country.localPlans} local)`);
    });
    
    // Test region coverage
    console.log('\n\n🌏 Testing Region Coverage:');
    console.log('============================');
    
    const regionStats = [];
    
    for (const region of REGIONS) {
      const regionPlans = await sailyPlansService.getPlansForRegion(region.id);
      
      regionStats.push({
        name: region.name,
        id: region.id,
        plans: regionPlans.length,
        sailyPlans: regionPlans.filter(p => p.source === 'saily').length,
        localPlans: regionPlans.filter(p => p.source === 'local').length
      });
    }
    
    regionStats.forEach(region => {
      console.log(`📍 ${region.name} (${region.id}): ${region.plans} plans (${region.sailyPlans} Saily + ${region.localPlans} local)`);
    });
    
    // Summary
    console.log('\n\n📋 SUMMARY:');
    console.log('============');
    console.log(`✅ Total Plans in System: ${totalPlans}`);
    console.log(`🌍 Countries with Plans: ${countryStats.filter(c => c.plans > 0).length}/${COUNTRIES.length} (${Math.round(countryStats.filter(c => c.plans > 0).length / COUNTRIES.length * 100)}%)`);
    console.log(`🌏 Regions with Plans: ${regionStats.filter(r => r.plans > 0).length}/${REGIONS.length} (${Math.round(regionStats.filter(r => r.plans > 0).length / REGIONS.length * 100)}%)`);
    
    if (countriesWithoutPlans.length === 0 && regionStats.every(r => r.plans > 0)) {
      console.log('\n🎉 SUCCESS: All countries and regions have available plans!');
    } else {
      console.log('\n⚠️  ISSUES FOUND: Some countries or regions are missing plans.');
      console.log('   This may be expected if those destinations are not supported yet.');
    }
    
  } catch (error) {
    console.error('❌ Error during verification:', error);
    process.exit(1);
  }
}

// Run the verification
verifyPlansCoverage().catch(console.error); 