# Backend Error Fixes

## Current Error
```
MODULE_NOT_FOUND at authRoutes.js:4:26
require('../controllers/authController') - file is authcontrollers.js (lowercase)
```

## Steps (Approved Plan):
1. [ ] Fix import casing in `src/routes/authRoutes.js`
2. [ ] Convert `src/controllers/authcontrollers.js` to CommonJS and use direct model queries
3. [ ] Add static `findByEmail` and `createUser` methods to `src/models/User.js`
4. [ ] Install deps and start dev server: `cd salerywise_backend && npm install && npm run dev`
5. [ ] Test POST /api/auth/register

**Next**: Complete Step 1.

