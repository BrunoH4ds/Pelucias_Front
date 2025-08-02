import {
  IconMail,
  IconPhoneCall,
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconMessage2,
  IconHeartHandshake,
} from "@tabler/icons-react";

export default function InformacoesContato() {
  return (
    <section className="relative bg-zinc-900 text-white px-6 py-16 overflow-hidden">
      {/* Ícones decorativos flutuando ao fundo */}
      <IconMessage2
        className="absolute -translate-y-1/2 -left-6 text-amber-600 opacity-10 animate-spin-slow"
        size={400}
      />
      <IconHeartHandshake
        className="absolute -bottom-30 -rotate-45 -right-20 text-amber-500 opacity-10 animate-pulse"
        size={300}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold mb-4 text-amber-500">
          Fale Conosco
        </h2>
        <p className="text-zinc-400 mb-10">
          Estamos sempre prontos para te atender. Veja como nos encontrar:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
          <div className="flex items-start gap-4">
            <IconMail size={28} className="text-amber-500" />
            <div>
              <h4 className="font-semibold text-lg">E-mail</h4>
              <p className="text-zinc-300">contato@peluciasdosheik.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <IconPhoneCall size={28} className="text-amber-500" />
            <div>
              <h4 className="font-semibold text-lg">Telefone</h4>
              <p className="text-zinc-300">(11) 99999-0000</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <IconBrandInstagram size={28} className="text-amber-500" />
            <div>
              <h4 className="font-semibold text-lg">Instagram</h4>
              <p className="text-zinc-300">@peluciasdosheik</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <IconBrandWhatsapp size={28} className="text-amber-500" />
            <div>
              <h4 className="font-semibold text-lg">WhatsApp</h4>
              <p className="text-zinc-300">(11) 98888-7777</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
