import {
  IconBrandInstagram,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import Link from "next/link";

export default function RedesSociais() {
  return (
    <div className="flex gap-4 mt-4">
      <Link
        href="https://instagram.com/peluciasdosheik"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="text-amber-500 hover:text-amber-400 transition"
      >
        <IconBrandInstagram size={24} />
      </Link>
      <Link
        href="https://wa.me/5511999990000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="text-amber-500 hover:text-amber-400 transition"
      >
        <IconBrandWhatsapp size={24} />
      </Link>
    </div>
  );
}
