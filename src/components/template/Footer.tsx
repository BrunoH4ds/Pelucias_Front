import Logo from "../shared/Logo";
import LinksRapidos from "../footer/LinksRapidos";
import Contato from "../footer/Contato";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-zinc-900 border-t border-amber-400/50 shadow-md p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start max-w-7xl mx-auto">
        {/* Coluna 1: Logo */}
        <div className="flex flex-col items-center lg:items-start">
          <Logo width={150} textowidth={200} textClassName="hidden sm:flex" />
        </div>

        {/* Coluna 2: Links Rápidos */}
        <LinksRapidos />

        {/* Coluna 3: Contato */}
        <Contato />
      </div>

      {/* Rodapé inferior */}
      <div className="flex flex-col justify-between items-center lg:flex-row mt-6 pt-4 border-t border-amber-400/50">
        <p>
          O <strong>X</strong> é uma plataforma de venda a trazer carinho e conforto por meio de pelúcias variadas.
        </p>
        <p className="mt-2">&copy; {year} Ursinhos Fofos. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
