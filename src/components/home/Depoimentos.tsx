import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "../magicui/animated-grid-pattern";
import Image from "next/image";
import { Marquee } from "../magicui/marquee";

export default function Depoimentos() {
  const depoimentos = [
    {
      nome: "Beatriz",
      texto:
        "Simplesmente amei! As pelúcias são ainda mais lindas pessoalmente.",
    },
    {
      nome: "Eduardo",
      texto: "Atendimento rápido e super atencioso. Recomendo demais!",
    },
    {
      nome: "Pedro",
      texto: "Produto de ótima qualidade. Superou minhas expectativas!",
    },
    {
      nome: "Lucas",
      texto: "Tudo chegou certinho e no prazo. Voltarei a comprar!",
    },
    {
      nome: "Matheus",
      texto: "Detalhes impecáveis nas pelúcias, fiquei encantada.",
    },
    {
      nome: "Thiago",
      texto: "Excelente serviço e produto. Muito satisfeito com a compra.",
    },
  ];

  const firstRow = depoimentos.slice(0, depoimentos.length);
  return (
    <section className="relative flex w-full items-center overflow-hidden bg-zinc-900/75 text-white backdrop-blur-md py-10">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={2}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />

      <div className="w-full z-10">
        <h2 className="text-3xl font-bold mb-10 text-center">Depoimentos</h2>
        <div className="flex justify-center items-center">
          <Marquee reverse pauseOnHover className="[--duration:20s] w-full">
            {firstRow.map((depoimentos, i) => (
              <div
                key={i}
                className="bg-zinc-800 hover:bg-zinc-800/75 backdrop-blur-md border border-amber-500 rounded-lg p-6 text-center flex flex-col items-center mx-2 shadow-md"
              >
                <p className="text-sm italic mb-4">&quot;{depoimentos.texto}&quot;</p>
                <div className="flex items-center gap-5 w-full">
                  <div className="w-16 h-16 relative rounded-full overflow-hidden border border-amber-500">
                    <Image
                      src={`https://i.pravatar.cc/150?img=${i + 10}`}
                      alt={depoimentos.nome}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="font-semibold text-amber-400">
                    {depoimentos.nome}
                  </p>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
