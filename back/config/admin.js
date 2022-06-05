module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'bff5f42a0b0a6f6ba41eb451bf6e9540'),
  },
});
