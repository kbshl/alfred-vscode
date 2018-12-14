module.exports = {
  hooks: {
    "pre-commit": "npm test",
    "commit-msg": "npm run lint:cm",
  },
};
