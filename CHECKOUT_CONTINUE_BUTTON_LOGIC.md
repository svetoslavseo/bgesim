# Checkout Continue Button External Link Logic

## Overview

The Continue button on the checkout page redirects users to an external payment system through a multi-step URL construction process. This document explains the complete logic and business reasoning behind this implementation.

## Button Location and Trigger

- **File**: `pages/checkout.tsx`
- **Location**: Sticky checkout bar at the bottom of the checkout page (lines 273-279)
- **Trigger**: Calls `handleProceedToPayment` function when clicked
- **Styling**: Prominent yellow gradient design with hover effects and arrow icon

## URL Construction Logic

The `handleProceedToPayment` function (lines 125-146) constructs a complex external URL through these steps:

### Step 1: Build Saily Checkout URL

```typescript
const sailyCheckoutUrl = `https://saily.com/en/checkout/?planId=${plan.priceIdentifier}&aff_transaction_id={transaction_id}&aff_offer_id={offer_id}&aff_id={aff_id}`;
```

**Key Components:**
- **Standard URL**: Uses English version (`/checkout/`) for all users (or `/zh/checkout/` for Chinese users)
- **Plan Identifier**: Uses the plan's price identifier (base64-like) from the checkout data
- **Affiliate Parameters**: Includes placeholder affiliate tracking parameters:
  - `{transaction_id}` - Transaction tracking ID
  - `{offer_id}` - Offer identification
  - `{aff_id}` - Affiliate identification

### Step 2: Wrap with Affiliate Tracking URL

```typescript
const finalUrl = `https://go.saily.site/aff_c?offer_id=101&aff_id=8080&url=${encodeURIComponent(sailyCheckoutUrl)}`;
```

**Key Components:**
- **Affiliate System**: Uses `go.saily.site` as an affiliate tracking service
- **Hardcoded Affiliate ID**: 
  - `aff_id=8080` - Hardcoded affiliate identifier
  - `offer_id=101` - Hardcoded offer identifier
- **URL Encoding**: The Saily checkout URL is URL-encoded and passed as a parameter

## Business Logic

This setup indicates several important business relationships:

### 1. Affiliate Partnership
- The website acts as an affiliate partner of Saily (the eSIM provider)
- All references to Saily throughout the codebase confirm this partnership
- The website serves as a marketing platform for Saily's eSIM products

### 2. Revenue Tracking
- The affiliate parameters (`aff_id=8080`, `offer_id=101`) track sales for commission purposes
- This allows the website to earn revenue from successful eSIM sales
- The tracking system ensures proper attribution of sales to this affiliate

### 3. External Payment Processing
- All actual payments are processed by Saily's system, not this website
- The website doesn't handle sensitive payment information
- Users are redirected to Saily's secure checkout environment

### 4. Standardized URL
- Uses a single English checkout URL for all users
- All users are directed to `saily.com/en/checkout/`
- Simplified URL structure without language-specific routing

## Error Handling

The function includes comprehensive error handling for:

```typescript
const planIdForCheckout = plan.priceIdentifier;
if (!planIdForCheckout) {
  setError(t('errors.no_plan_identifier'));
  return;
}
```

- **Missing Plan Identifier**: Validates that a plan with UUID identifier is selected before proceeding
- **URL Construction Failures**: Catches and logs any errors during URL building
- **General Redirect Errors**: Provides user-friendly error messages

## User Experience Flow

1. **User Selection**: User selects an eSIM plan on country/region pages
2. **Checkout Page**: User is redirected to `/checkout?plan={encodedPlanData}`
3. **Plan Display**: Checkout page displays plan details and pricing
4. **Continue Button**: User clicks the prominent Continue button
5. **External Redirect**: User is immediately redirected to Saily's payment system
6. **Payment Processing**: All payment and eSIM fulfillment handled by Saily

## Technical Implementation Details

### Plan Data Structure
```typescript
interface Plan {
  country: string;
  flag: string;
  data: string;
  validity: string;
  price: number;
  currency: string;
  identifier: string; // Critical for checkout URL (UUID format)
  priceIdentifier?: string; // Optional price identifier (not used for checkout)
}
```

### Navigation Sources
The checkout page can be reached from multiple sources:
- **Country Pages**: `CountryPage.tsx` (lines 421-443)
- **Region Pages**: `RegionPage.tsx` (lines 502-520)
- **Global Plans**: `RegionsPage.tsx` (lines 189-207)

### URL Encoding
Plan data is encoded as URL parameters:
```typescript
const encodedPlan = encodeURIComponent(JSON.stringify(planData));
navigateTo(`/checkout?plan=${encodedPlan}`);
```

## Security Considerations

- **No Payment Data**: The website never handles sensitive payment information
- **External Processing**: All payment processing is delegated to Saily's secure systems
- **URL Encoding**: Proper encoding prevents injection attacks
- **HTTPS**: All external URLs use secure HTTPS connections

## Maintenance Notes

- **Hardcoded Values**: Affiliate IDs (`aff_id=8080`, `offer_id=101`) are hardcoded and may need updates
- **Placeholder Parameters**: The `{transaction_id}`, `{offer_id}`, `{aff_id}` placeholders in the Saily URL may need dynamic values
- **Standardized URL**: All users use the same English checkout URL, simplifying maintenance

## Related Files

- `pages/checkout.tsx` - Main checkout implementation
- `pages/CountryPage.tsx` - Country-specific plan selection
- `pages/RegionPage.tsx` - Regional plan selection
- `pages/RegionsPage.tsx` - Global plan selection
- `public/locales/*/checkout.json` - Checkout page translations
- `utils/chineseUtils.tsx` - Chinese language utilities

## Conclusion

This architecture allows the website to function as a marketing/affiliate site while delegating all payment processing and eSIM fulfillment to Saily's established infrastructure. The external redirect ensures users have a secure, professional payment experience while maintaining proper affiliate tracking for revenue purposes.
