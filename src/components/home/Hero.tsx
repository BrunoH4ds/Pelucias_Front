import { AuroraText } from "@/components/magicui/aurora-text";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Meteors } from "@/components/magicui/meteors";
import Link from "next/link";
import { IconCaretDownFilled } from "@tabler/icons-react";

export default function Hero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center overflow-hidden bg-zinc-900/50 backdrop-blur-md"
      style={{ height: "calc(100vh - 94px)" }}
    >
      <Meteors number={40} />
      <h1 className="text-7xl text-white font-bold md:text-9xl tracking-tighter">
        Boas-<AuroraText colors={["#f59e0b", "#2563eb"]}>Vindas</AuroraText>
      </h1>
      <div className="mt-8 flex flex-wrap justify-center gap-5 ">
        <Link href="/loja">
          <ShimmerButton
            shimmerColor="#18181b"
            background="oklch(76.9% 0.188 70.08)"
            className="shadow-2xl"
          >
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-zinc-900 lg:text-lg">
              Ir Para a Loja
            </span>
          </ShimmerButton>
        </Link>
        <Link href="/contato">
          <ShimmerButton background="#155dfc" className="shadow-2xl">
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
              Entre em contato conosco
            </span>
          </ShimmerButton>
        </Link>
      </div>
      <div className="absolute bottom-0 left-0 w-full flex flex-col pb-5 items-center justify-end h-55 bg-gradient-to-t from-zinc-900/75 to-transparent text-white pointer-events-none">
        <IconCaretDownFilled size={50} className="animate-bounce" />
      </div>
    </section>
  );
}
