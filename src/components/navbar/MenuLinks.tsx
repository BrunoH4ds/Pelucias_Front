import Link from "next/link";

export default function MenuLinks() {
  return (
    <div className="flex gap-2 font-medium text-sm md:text-base justify-center items-center">
      <Link
        href="/"
        className="hover:text-blue-600 transition border rounded-full px-5 py-2 hover:border-blue-600"
      >
        Inicio
      </Link>
      <Link
        href="/loja"
        className="hover:text-blue-600 transition border rounded-full px-5 py-2 hover:border-blue-600"
      >
        Loja
      </Link>
      <Link
        href="/contato"
        className="hover:text-blue-600 transition border rounded-full px-5 py-2 hover:border-blue-600"
      >
        Contato
      </Link>
    </div>
  );
}
