import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "images.tcdn.com.br" },
      { protocol: "https", hostname: "bumerangbrinquedos.vteximg.com.br" },
      { protocol: "https", hostname: "www.lojastedy.com.br" },
      { protocol: "https", hostname: "cdn.awsli.com.br" },
      { protocol: "https", hostname: "down-br.img.susercontent.com" },
      { protocol: "https", hostname: "conceitos.com" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "s.calendarr.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
    ],
  },
};

export default nextConfig;
