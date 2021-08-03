// Environment variables for configuration
declare var NODE_ENV: string;
declare var MAPBOX_TOKEN: string;
declare var API_SERVER: string;
declare var ROUTING_SERVER: string;
declare var TILE_SERVER: string;
declare var ANALYTICS: string;
declare var ANALYTICS_SERVER: string;
declare var ANALYTICS_KEY: string;

// File type direct imports (webpack resources)
declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.png" {
  const content: any;
  export default content;
}

declare module "*.jpg" {
  const content: any;
  export default content;
}

// Dependencies lacking type declarations
declare module "rakam-js";
