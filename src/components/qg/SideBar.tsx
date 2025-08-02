import Link from "next/link";

export default function SideBar() {
  return (
    <div className="flex flex-col items-center transition-all duration-300 ease-in-out text-white">
      <div className="flex flex-col w-full md:w-auto items-center bg-zinc-900 border-b md:border-b-0 border-b-amber-400/50">
        <h1 className="text-xl border-b border-amber-400/50 w-full text-center p-2 font-semibold">
          Painel de Administração
        </h1>
        <ul className="flex flex-col w-full p-5 space-y-2 text-center">
          <Link href="/qg/dashboard">
            <li className="border border-amber-400/50 hover:bg-zinc-800/50 rounded-md p-2 cursor-pointer">
              <span className="text-md">Home</span>
            </li>
          </Link>
          <Link href="/qg/dashboard/noticias">
            <li className="border border-amber-400/50 hover:bg-zinc-800/50 rounded-md p-2 cursor-pointer">
              <span className="text-md">Notícias</span>
            </li>
          </Link>
          <Link href="/qg/dashboard/produtos">
            <li className="border border-amber-400/50 hover:bg-zinc-800/50 rounded-md p-2 cursor-pointer">
              <span className="text-md">Produtos</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
