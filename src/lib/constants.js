module.exports = Object.freeze({
  ENUM_GENDER: ['Female', 'Male', 'Prefer not to say', 'Other'],
  ENUM_NATIONALITY: [
    'Afghanistan',
    'Iran',
    'Iraq',
    'Syria',
    'Turkey',
    'Ukraine',
    'Other',
  ],
  ENUM_REPORT_STATUS: ['Pending', 'Resolved'],
  ENUM_PROVIDER: ['Local', 'Google', 'Facebook'],
  ENUM_CATEGORY: [
    'Books',
    'Clothing',
    'Electronics',
    'Food',
    'Furniture',
    'Kitchenware',
    'Linens',
    'Toys',
    'Other',
  ],
  ENUM_REQUEST_STATUS: ['Requested', 'Confirmed', 'Rejected'],
  ENUM_PRODUCT_CONDITION: ['New', 'Underused', 'Overused'],
  ENUM_SHIPPING_OPTION: [
    'Meet up',
    'Drop off',
    'Free shipping',
    'Paid shipping',
    'To be determined',
  ],
  ENUM_POST_TYPE: ['Request', 'Donate'],
  ENUM_POST_STATUS: ['Published', 'Verified'],
  PUBLIC_PATHS: [
    '/api/',
    '/api/about',
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/google',
    '/api/auth/google/callback',
    '/',
  ],
  TOKEN_EXPIRATION_DURATION: ['14d'],
  COOKIE_MAX_AGE: [1000 * 60 * 60 * 24 * 14],
});
