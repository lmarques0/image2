import Link from 'next/link'

interface PrimeiroComponenteProps {
    mensagem?: string
}

export const PrimeiroComponente = ({ mensagem }: PrimeiroComponenteProps) => {
    return (
        <div className="mx-auto w-full max-w-md border border-black bg-white p-8 text-left text-black">
            
            {/* Conteúdo Principal */}
            <main className="flex flex-col items-start gap-5">
                <h1 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
                    O QUE VOCÊ PRETENDE FAZER
                </h1>

                <p className="text-sm leading-relaxed text-neutral-600">
                    {mensagem ?? 'Gerencie, pesquise e filtre seus arquivos de imagem em um só lugar.'}
                </p>

                {/* Botões de Ação: Galeria e Login */}
                <div className="mt-2 flex flex-wrap items-center gap-3">
                    <Link
                        href="/galeria"
                        className="bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                    >
                        Abrir galeria →
                    </Link>

                    <Link
                        href="/login"
                        className="border border-black bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-neutral-100"
                    >
                        Fazer login
                    </Link>
                </div>
            </main>

            {/* Rodapé discreto */}
            <footer className="mt-8 border-t border-neutral-200 pt-4 text-xs text-neutral-400">
                Sistema de gerenciamento de arquivos
            </footer>
        </div>
    )
}