/** Localforage database instance options */
export interface LocalForageDbInstanceOptions {
  name?: string;

  storeName?: string;
}

/** Localforage static options */
export interface LocalForageOptions extends LocalForageDbInstanceOptions {
  description?: string;

  driver?: string | string[];

  size?: number;

  version?: number;
}
