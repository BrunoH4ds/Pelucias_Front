import Link from "next/link";

export default function LinksRapidos() {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-3">Navegação</h3>
      <ul className="text-sm space-y-1">
        <li>
          <Link href="/" className="hover:text-blue-600 transition">
            Início
          </Link>
        </li>
        <li>
          <Link href="/loja" className="hover:text-blue-600 transition">
            Loja
          </Link>
        </li>
        <li>
          <Link href="/contato" className="hover:text-blue-600 transition">
            Contato
          </Link>
        </li>
      </ul>
    </div>
  );
}
