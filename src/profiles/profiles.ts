export interface SyncableProfile {
  uphillMax: number;
  downhillMax: number;
  avoidCurbs: boolean;
}

export interface Profile extends SyncableProfile {
  name: string;
  id: string;
  label: string;
  icon: string;
  speed: number;
}

let customProfile: Profile = {
  name: "Custom",
  id: "custom",
  label: "Custom profile",
  icon: "person-pin",
  speed: 0.8,
  uphillMax: 0.08,
  downhillMax: -0.1,
  avoidCurbs: true,
};

const wheelchairProfile: Profile = {
  name: "Manual wheelchair",
  id: "wheelchair",
  label: "Manual wheelchair",
  icon: "wheelchair",
  speed: 0.8,
  uphillMax: 0.08,
  downhillMax: -0.1,
  avoidCurbs: true,
};

const poweredProfile: Profile = {
  name: "Powered wheelchair",
  id: "powered",
  label: "Powered wheelchair",
  icon: "wheelchair-powered",
  speed: 2,
  uphillMax: 0.12,
  downhillMax: -0.12,
  avoidCurbs: true,
};

const caneProfile: Profile = {
  name: "Walk / Cane User",
  id: "cane",
  label: "Walk / Cane User",
  speed: 1,
  icon: "cane-user",
  uphillMax: 0.14,
  downhillMax: -0.14,
  avoidCurbs: false,
};

const defaultProfiles = {
  Wheelchair: wheelchairProfile,
  Powered: poweredProfile,
  Cane: caneProfile,
  Custom: customProfile,
};

export { customProfile, defaultProfiles };
