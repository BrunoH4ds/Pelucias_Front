import { IconHeartHandshake } from '@tabler/icons-react'
import type { Produto } from "@/types/product";
import Link from 'next/link';

export interface BannerCompraProps {
    produto: Produto
}

export default function BannerCompra(props: BannerCompraProps) {
    const { produto } = props

    return (
        <div className="flex justify-between">
            <div className="flex flex-col pr-5">
                <div className="line-through text-amber-500">de R$ {produto?.precoBase}</div>
                <div className="text-2xl font-semibold">
                    <span className="text-base text-white">por</span>{' '}
                    <span className="text-blue-600">R$ {produto?.precoPromocional}</span>{' '}
                    <span className="text-base text-white">à vista</span>
                </div>
            </div>
            
            <div className="flex gap-2 items-center justify-end">
                <Link href={produto.contato} target='_blank'>
                    <button className="flex items-center gap-2 p-3 rounded-full text-white border border-amber-500 hover:bg-amber-600 cursor-pointer transition">
                        <IconHeartHandshake size={20} />
                        <span>Negocie Conosco</span>
                    </button>
                </Link>
            </div>
        </div>
    )
}
