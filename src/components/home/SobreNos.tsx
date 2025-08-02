import Image from "next/image";
import { FlickeringGrid } from "../magicui/flickering-grid";

export default function SobreNos() {
  return (
    <section className="relative overflow-hidden w-full bg-zinc-900/75 backdrop-blur-md text-white p-10">
      <FlickeringGrid
        className="absolute inset-0 z-0 size-full"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.1}
        height={800}
        width={1980}
      />
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-10">
        <div className="md:w-1/2 text-center md:text-left z-10">
          <h2 className="text-4xl font-bold mb-4">Sobre Nós</h2>
          <p className="text-lg">
            Somos apaixonados por pelúcias e qualidade! Desde o início, buscamos
            trazer os melhores produtos com carinho e exclusividade para nossos
            clientes. Cada pelúcia é escolhida com cuidado pensando em conforto,
            estilo e originalidade.
          </p>
        </div>

        <div className="relative w-full max-w-xs h-48 md:w-1/2 md:h-64">
          <Image
            src="/logo.png"
            alt="Logo da loja"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
