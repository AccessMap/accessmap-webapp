module.exports = function (api) {
  api.cache(true);

  const plugins = [
    require("@babel/plugin-proposal-class-properties"),
    require("@babel/plugin-proposal-export-default-from"),
  ];

  const presets = [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        corejs: "3.0.0",
      },
    ],
    require("@babel/preset-react"),
  ];

  return {
    plugins,
    presets,
  };
};
