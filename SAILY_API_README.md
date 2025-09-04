# Saily API Integration

This system provides automatic weekly updates of Saily eSIM plans data with fallback mechanisms for different environments.

## Overview

The Saily API is protected by advanced Cloudflare security measures that require special handling. This integration provides:

1. **Python Script**: Uses `cloudscraper` to bypass Cloudflare protection
2. **TypeScript Service**: Manages data files, scheduling, and metadata
3. **Automatic Scheduling**: Weekly updates every Sunday at 2:00 AM UTC
4. **Manual Update Scripts**: For on-demand updates

## Files

- `utils/sailyApiService.ts` - Main TypeScript service for data management
- `scripts/fetch-saily-data.py` - Python script for API data fetching
- `scripts/update-saily-plans.ts` - TypeScript wrapper for manual updates
- `saily_plans.json` - Output file containing the latest plans data
- `saily_metadata.json` - Metadata about updates (timestamps, status, etc.)

## Setup

### Prerequisites

1. **Node.js dependencies** (already installed):
   ```bash
   npm install node-cron axios @types/node-cron
   ```

2. **Python 3 and cloudscraper**:
   ```bash
   # Install Python 3 (if not already installed)
   # macOS: brew install python3
   # Ubuntu: sudo apt-get install python3 python3-pip
   # Windows: Download from https://www.python.org/downloads/
   
   # Install cloudscraper
   pip3 install cloudscraper
   ```

## Usage

### Method 1: Automatic TypeScript Service (Recommended)

The service automatically handles everything, including running the Python script:

```bash
# Check current status
npm run update-saily-plans -- --status

# Initialize service with weekly scheduling
npm run update-saily-plans -- --init

# Force an immediate update
npm run update-saily-plans -- --force

# Normal update (checks if update is needed)
npm run update-saily-plans
```

### Method 2: Direct Python Script

Run the Python script directly:

```bash
# Using npm script
npm run fetch-saily-data

# Or directly
python3 scripts/fetch-saily-data.py
```

### Method 3: Manual Data Update

If you have the JSON data from another source:

1. Place the JSON data in `saily_plans.json`
2. Optionally update the metadata:
   ```bash
   npm run update-saily-plans -- --status
   ```

## Integration with Your Application

### Server-Side Integration

Add to your server startup code (e.g., in `server-production.js`):

```javascript
import { initializeSailyService } from './utils/sailyApiService.js';

// Initialize the service when server starts
await initializeSailyService();
```

### Using the Data

```typescript
import { sailyApiService } from './utils/sailyApiService.js';

// Get current plans data
const plansData = await sailyApiService.getCurrentPlansData();

// Get metadata about last update
const metadata = await sailyApiService.getMetadata();

// Check file status
const fileStatus = await sailyApiService.getFileStatus();
```

## API Configuration

The API credentials are configured in `utils/sailyApiService.ts`:

```typescript
const API_CONFIG = {
  API_KEY: 'a820596678ad38f13bad61d1648f1befef597d0b8659648f4cf8b337fd6cb513',
  PARTNER_ID: 'atlasvpn',
  BASE_URL: 'https://web.saily.com/v2/partners/plans'
};
```

## Scheduling

The service automatically schedules weekly updates:
- **When**: Every Sunday at 2:00 AM UTC
- **What**: Runs the Python script to fetch fresh data
- **Fallback**: If Python script fails, logs error and maintains existing data

## Data Format

The `saily_plans.json` file contains:

```json
{
  "items": [
    {
      "id": "plan-id",
      "identifier": "plan-identifier", 
      "name": "Plan Name",
      "data_amount": 1,
      "data_unit": "GB",
      "data": "1GB",
      "validity_days": 7,
      "validity": "7 days",
      "price": {
        "amount_with_tax": 599,
        "currency": "USD"
      },
      "covered_countries": ["US"],
      "region": "North America",
      "planType": "country"
    }
  ]
}
```

## Troubleshooting

### Python Script Issues

1. **Python not found**:
   ```bash
   # Check Python installation
   python3 --version
   
   # Install if missing (macOS)
   brew install python3
   ```

2. **cloudscraper not installed**:
   ```bash
   pip3 install cloudscraper
   ```

3. **API still blocked**:
   - The API might have updated its protection
   - Try running the original Python script manually
   - Check if API credentials are still valid

### TypeScript Service Issues

1. **Service not starting**:
   ```bash
   # Check logs
   npm run update-saily-plans -- --status
   ```

2. **Weekly scheduling not working**:
   - Ensure server stays running
   - Check server logs for cron job execution

### File Issues

1. **Permission errors**:
   ```bash
   # Ensure write permissions
   chmod 644 saily_plans.json saily_metadata.json
   ```

2. **File not found**:
   - Run initial update to create files
   - Check file paths in service configuration

## Development

### Testing the Service

```bash
# Test status checking
npm run update-saily-plans -- --status

# Test Python script
npm run fetch-saily-data

# Test with existing data
cp plans-sample.json saily_plans.json
npm run update-saily-plans -- --status
```

### Modifying the Schedule

Edit the cron expression in `utils/sailyApiService.ts`:

```typescript
// Current: Every Sunday at 2:00 AM UTC
this.cronJob = cron.schedule('0 2 * * 0', async () => {

// Examples:
// Daily at 3 AM: '0 3 * * *'
// Every 6 hours: '0 */6 * * *'  
// Twice weekly: '0 2 * * 0,3' (Sunday and Wednesday)
```

## Security Notes

- API credentials are stored in code (consider environment variables for production)
- Python script has network access requirements
- Files are created with default permissions (consider restricting access)

## Support

For issues with:
- **Saily API**: Contact Saily support
- **Cloudflare blocking**: May require updating cloudscraper or using proxy
- **Integration**: Check logs and file permissions 