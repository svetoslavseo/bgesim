#!/usr/bin/env python3
"""
Saily API Data Fetcher

This script uses cloudscraper to bypass Cloudflare protection and fetch
plans data from the Saily API, then saves it to a JSON file.

Usage:
    python3 scripts/fetch-saily-data.py
"""

import cloudscraper
import json
import sys
from datetime import datetime

# API Configuration
API_KEY = 'a820596678ad38f13bad61d1648f1befef597d0b8659648f4cf8b337fd6cb513'
PARTNER_ID = 'atlasvpn'
BASE_URL = 'https://web.saily.com/v2/partners/plans'

# File paths
OUTPUT_FILE = 'saily_plans.json'
METADATA_FILE = 'saily_metadata.json'

def fetch_saily_data():
    """Fetch plans data from Saily API using cloudscraper."""
    print('🔄 Fetching plans from Saily API...')
    
    headers = {
        'x-api-key': API_KEY,
        'x-partner-id': PARTNER_ID,
        'Accept': 'application/json'
    }
    
    # Create cloudscraper instance
    scraper = cloudscraper.create_scraper()
    
    try:
        # Make the request
        response = scraper.get(BASE_URL, headers=headers, timeout=30)
        response.raise_for_status()
        
        # Parse JSON response
        data = response.json()
        
        if not data or not isinstance(data, dict):
            raise ValueError('Invalid response format from API')
        
        print(f'✅ Successfully fetched {len(data.get("items", []))} plans from Saily API')
        return data
        
    except Exception as e:
        print(f'❌ Error fetching from Saily API: {e}')
        raise

def save_data_to_file(data, filename=OUTPUT_FILE):
    """Save data to JSON file."""
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f'✅ Data saved to {filename}')
        return True
    except Exception as e:
        print(f'❌ Error saving data to {filename}: {e}')
        return False

def update_metadata(status='success', error=None):
    """Update metadata file with fetch information."""
    now = datetime.utcnow()
    next_week = datetime.utcfromtimestamp(now.timestamp() + 7 * 24 * 60 * 60)
    
    # Try to read existing metadata
    metadata = {
        'lastUpdated': '',
        'nextUpdate': '',
        'updateCount': 0,
        'status': 'pending'
    }
    
    try:
        with open(METADATA_FILE, 'r', encoding='utf-8') as f:
            existing_metadata = json.load(f)
            metadata.update(existing_metadata)
    except (FileNotFoundError, json.JSONDecodeError):
        pass
    
    # Update metadata
    metadata.update({
        'lastUpdated': now.isoformat() + 'Z',
        'nextUpdate': next_week.isoformat() + 'Z',
        'updateCount': metadata['updateCount'] + 1,
        'status': status
    })
    
    if error:
        metadata['lastError'] = str(error)
    elif 'lastError' in metadata:
        del metadata['lastError']
    
    try:
        with open(METADATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(metadata, f, ensure_ascii=False, indent=2)
        print(f'✅ Metadata updated in {METADATA_FILE}')
    except Exception as e:
        print(f'⚠️ Warning: Could not update metadata: {e}')

def main():
    """Main function to fetch and save Saily data."""
    print('🚀 Saily Data Fetcher Started')
    print('=' * 50)
    
    try:
        # Fetch data from API
        data = fetch_saily_data()
        
        # Save to file
        if save_data_to_file(data):
            update_metadata('success')
            print('\n✅ Success! Saily plans data has been updated.')
            print(f'📊 Fetched {len(data.get("items", []))} plans')
            return 0
        else:
            update_metadata('error', 'Failed to save data to file')
            print('\n❌ Failed to save data to file')
            return 1
            
    except Exception as e:
        update_metadata('error', e)
        print(f'\n💥 Script failed: {e}')
        return 1

if __name__ == '__main__':
    sys.exit(main()) 