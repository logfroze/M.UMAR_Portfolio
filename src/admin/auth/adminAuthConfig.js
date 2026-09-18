/**
 * Centralized Admin Authentication Configuration
 * All answers are stored as cryptographic SHA-256 hashes to prevent exposing plaintext credentials in frontend bundles.
 */

const ALLOWED_HASHES = {
  primaryEmail: [
    '843b7bd59c94b21e6e93263fcdf6e8b340ad215c136981654faeb15b5d1af06b', // logfrozeofficialgmail.com
    'e9b93335b66620ef3b00c0c35a8d5def246f54ee4afb0833cf80bacac1bd1b99', // logfrozeofficial@gmail.com
  ],
  secondaryEmail: [
    'f92dd33fc0851f5636a91d44cfffc7bebaf7b6dbd35644af1946823ddcecd458', // alanhanma1817@gmail.com
  ],
  fullName: [
    'c8431b553d2909ef2779b534aa4f9bc9869fbbe5477d890ac5d2ddff149e9a5a', // MUHAMMAD UMAR
    '9f6aa5300d4766f441efe52eb0fa55f6e9f81e723d14643067d4cdfe5f642094', // muhammad umar
  ],
  nickname: [
    'dba0fb335319bba3db31e5592f4445b39a1d30752c685737bdf5d462256c59f3', // ALAN HANMA
    '772739a8c33c8016a5d7d5d7c6d960a535fdbf6b63eea44c4053a165351ad395', // alan hanma
  ],
  pin: [
    '8bf1caff5905d790c053fa9fcc889476c5975269654677869ba92401fac586b3', // 211817
  ],
  dob: [
    '51077c2c61dc50bc7ae28e08a6375936323dd1ceaa3add7ae8922b66270296f3', // 2004-03-20
    '451a01e6388f0d7fb2c0261a094ea9bb3a470123ed7ff2f51cd44aa4f9178775', // 20 March, 2004
    'fb8be56cd19d2f8d640585b9f04e16560b3e1e70a265d2e2b5354927f9bdc8ba', // 20 March 2004
  ],
  femaleCat: [
    'd9d45b5b54f9ae54cdd4495190b4ce3c4a73453263bbd27dd3673f3ba15b2649', // OREO
    '19706b9b7cde7d294853e6b9cca8e6aaf7187bdfce75cf19aa891b1573daa28c', // oreo
  ],
  maleCat: [
    '83df8115aa2f323fb3f4b1dcf92717e4283859f415d2d6ea66eaa506593b93c8', // SIMBA
    '5986bde91db988ebf22bc8ab401d83af9bfc9714ef4afe2415ad8b02c8a98743', // simba
  ],
  favFood: [
    'adaaf732bac2359edd8f9e1f9242c80b2448a99c0d88c4d8f6785e5cc9d1bb66', // EGGS
    '46da674b5b0987431bdb496e4982fadcd400abac99e7a977b43f216a98127721', // eggs
  ],
};

const PIN_HASH = '8bf1caff5905d790c053fa9fcc889476c5975269654677869ba92401fac586b3';

/**
 * Computes SHA-256 hash using native browser Web Crypto API
 */
export async function sha256(str) {
  const normalized = (str || '').trim();
  const buffer = new TextEncoder().encode(normalized);
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Validates all required credentials against the secure hashes
 */
export async function verifyAdminCredentials(fields) {
  const errors = {};
  const requiredKeys = [
    'primaryEmail',
    'secondaryEmail',
    'fullName',
    'nickname',
    'pin',
    'dob',
    'femaleCat',
    'maleCat',
    'favFood',
  ];

  for (const key of requiredKeys) {
    const rawVal = fields[key];
    if (!rawVal || !rawVal.trim()) {
      errors[key] = 'Field is required';
      continue;
    }

    const trimmed = rawVal.trim();
    const hashExact = await sha256(trimmed);
    const hashLower = await sha256(trimmed.toLowerCase());
    const hashUpper = await sha256(trimmed.toUpperCase());

    // Also try ISO date normalization if key === 'dob'
    let hashDobIso = null;
    if (key === 'dob') {
      const parsed = Date.parse(trimmed);
      if (!isNaN(parsed)) {
        const d = new Date(parsed);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        hashDobIso = await sha256(`${y}-${m}-${day}`);
      }
    }

    const allowed = ALLOWED_HASHES[key] || [];
    const matched =
      allowed.includes(hashExact) ||
      allowed.includes(hashLower) ||
      allowed.includes(hashUpper) ||
      (hashDobIso && allowed.includes(hashDobIso));

    if (!matched) {
      errors[key] = 'Incorrect value';
    }
  }

  const isValid = Object.keys(errors).length === 0;
  return {
    success: isValid,
    errors,
  };
}

/**
 * Validates PIN code for logout
 */
export async function verifyPin(inputPin) {
  if (!inputPin) return false;
  const hash = await sha256(inputPin.trim());
  return hash === PIN_HASH;
}
