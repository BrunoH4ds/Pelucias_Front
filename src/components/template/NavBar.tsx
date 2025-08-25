import Logo from "../shared/Logo";
import SearchBar from "../navbar/SeachBar";
import MenuLinks from "../navbar/MenuLinks";
import { getAllProdutos } from "../../api/ProdutosCrud";

export const dynamic = "force-dynamic";

export default async function NavBar() {
  const produtos = await getAllProdutos();
  return (
    <nav className="w-full bg-zinc-900 border-b border-amber-400/50 z-30 relative">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Logo + carrinho mobile */}
        <div className="flex justify-between items-center">
          <Logo textowidth={130} />
        </div>

        {/* Links */}
        <MenuLinks />

        {/* Busca + Carrinho */}
        <SearchBar produtos={produtos} />
      </div>
    </nav>
  );
}
