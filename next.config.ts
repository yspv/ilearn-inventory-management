import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["next-auth"],
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
