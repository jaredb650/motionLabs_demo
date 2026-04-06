const isProd = process.env.NODE_ENV === "production";
export const basePath = isProd ? "/motionLabs_demo" : "";
export const img = (src: string) => `${basePath}${src}`;
