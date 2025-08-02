import { IconMail } from "@tabler/icons-react";
import Link from "next/link";
import RedesSociais from "./RedesSociais";

export default function Contato() {
  return (
    <div className="flex flex-col items-center lg:items-start">
      <h3 className="text-lg font-semibold mb-3">Contato</h3>
      <div className="flex items-center gap-2 mb-2">
        <IconMail size={20} />
        <Link
          href="mailto:contato@ursinhosfofos.com"
          className="hover:text-blue-600 transition text-sm"
        >
          contato@ursinhosfofos.com
        </Link>
      </div>

      <RedesSociais />
    </div>
  );
}
