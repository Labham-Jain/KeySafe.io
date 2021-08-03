module.exports = {
  pageExtensions: ["tsx"],
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push(
      ...[
        {
          test: /\.yml$/,
          type: "json",
          use: "yaml-loader",
        },
        {
          test: /\.svg$/,
          use: "@svgr/webpack",
        },
      ]
    );
    return config;
  },
  env: {
    API_KEY: "AIzaSyAOpkIDDi6Z-bNPwHTqlQSTbrMg6trrMvU",
    AUTH_DOMAIN: "keysafeio-7206c.firebaseapp.com",
    PROJECT_ID: "keysafeio-7206c",
    STORAGE_BUCKET: "keysafeio-7206c.appspot.com",
    MESSAGING_SENDER_ID: "981133853328",
    APP_ID: "1:981133853328:web:fcfc178192f32852330e15",
    MEASUREMENT_ID: "G-7D620QTVVB",
  },
  async redirects() {
    return [
      {
        source: "/login",
        destination: "/auth/login",
        permanent: true,
      },
      {
        source: "/signin",
        destination: "/auth/login",
        permanent: true,
      },
      {
        source: "/signup",
        destination: "/auth/register",
        permanent: true,
      },
      {
        source: "/register",
        destination: "/auth/register",
        permanent: true,
      },
    ];
  },
};
