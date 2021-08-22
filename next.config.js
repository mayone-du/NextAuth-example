// const withPWA = require("next-pwa");
// module.exports = withPWA({
//   env: {
//     API_ENDPOINT: process.env.API_ENDPOINT,
//     GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
//     GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
//   },
//   pwa: {
//     dest: "public/pwa/sw",
//   },
//   pageExtensions: ["page.tsx"],
// });
module.exports = {
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },
  // pwa: {
  //   dest: "public/pwa/sw",
  // },
  pageExtensions: ["page.tsx", "page.ts"],
};
