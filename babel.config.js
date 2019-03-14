module.exports = function(api) {
  api.cache(true);

  const plugins = [
    require("@babel/plugin-proposal-class-properties"),
    require("@babel/plugin-proposal-export-default-from")
  ];

  const presets = [
    require("@babel/preset-env"),
    require("@babel/preset-react")
  ];

  return {
    plugins,
    presets
  };
};
