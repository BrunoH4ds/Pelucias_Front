import Image from "next/image";
import Link from "next/link";

export interface Image_logo_props {
  height?: number;
  width?: number;
}

export interface Image_logo_texto_props {
  textowidth?: number;
  textClassName?: string; // nova prop para classes extras no texto
}

export interface LogoProps extends Image_logo_props, Image_logo_texto_props {
  linkable?: boolean; // se deve envolver com Link ou não
}

export default function Logo({
  height = 60,
  width = 60,
  textowidth,
  textClassName = "",
  linkable = true,
}: LogoProps) {
  const content = (
    <div className="flex items-center gap-2">
      <Image src="/logo.png" height={height} width={width} alt="logo" />
      {textowidth ? (
        <Image
          src="/logo-texto.png"
          width={textowidth}
          height={40}
          alt="logo texto"
          className={textClassName} // aplica classes aqui
        />
      ) : null}
    </div>
  );

  return linkable ? <Link href="/">{content}</Link> : content;
}
