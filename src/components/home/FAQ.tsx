import Link from "next/link";
import { RainbowButton } from "../magicui/rainbow-button";

export default function FAQ() {
  const faqs = [
    {
      pergunta: "Quais são as formas de pagamento?",
      resposta: "Cartão, Pix, Boleto e Parcelamento em até 12x.",
    },
    {
      pergunta: "Quanto tempo leva para chegar?",
      resposta:
        "O prazo médio é de 2 a 7 dias úteis, dependendo da sua região.",
    },
    {
      pergunta: "Vocês têm loja física?",
      resposta:
        "Atualmente somos 100% online para oferecer os melhores preços!",
    },
  ];

  return (
    <section className="bg-zinc-900/50 backdrop-blur-md px-6 py-16 text-white text-center">
      <h2 className="text-3xl font-bold mb-8">Perguntas Frequentes</h2>
      <div className="space-y-6 max-w-3xl mx-auto text-left">
        {faqs.map((faq, i) => (
          <div key={i}>
            <h3 className="font-semibold text-amber-400">{faq.pergunta}</h3>
            <p className="text-sm">{faq.resposta}</p>
          </div>
        ))}
        <Link href="/loja"><RainbowButton size={"sm"}>Comprar Conosco</RainbowButton></Link>
      </div>
    </section>
  );
}
