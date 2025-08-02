import NavBar from "./NavBar";
import Footer from "./Footer";

export interface MainProps {
  className?: string;
  children: React.ReactNode;
  semCabecalho?: boolean;
  semRodape?: boolean;
}

export default function Main(props: MainProps) {
  return (
    <div
      className="flex flex-1 flex-col min-h-screen bg-zinc-950 bg-center bg-cover"
      style={{backgroundImage: `url("/background2.png")`}}
    >
      {/* Cabeçalho */}
      {!props.semCabecalho && <NavBar />}

      {/* Conteúdo principal */}
      <main
        className={`flex-1 flex flex-col text-black
          ${props.className ?? ""}
        `}
      >
        {props.children}
      </main>

      {/* Rodapé */}
      {!props.semRodape && <Footer />}
    </div>
  );
}
