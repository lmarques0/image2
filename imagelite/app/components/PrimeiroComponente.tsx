'use client';

interface PrimeiroComponenteProps {
    mensagem?: string;
    mensagemBotao?: string
}

export const PrimeiroComponente = ({ mensagem, mensagemBotao }: PrimeiroComponenteProps) => {
    const clique = () => {
        console.log("você DESTRUIU uma vila pacifica...");
        alert(mensagemBotao);
    }

    return (
        <div className="flex flex-col items-center justify-center gap-6 text-center w-full px-4 py-8">
            {/* Corrigido de text-white-500 para text-sky-950 para ficar visível */}
            <h1 className="text-2xl font-bold text-sky-950 animate-pulse">clica ali não</h1>

            {mensagem && <p className="text-zinc-600 dark:text-zinc-300 font-medium">{mensagem}</p>}

            <button
                onClick={clique}
                className="px-6 py-3 bg-red-900 hover:bg-red-500 text-white font-semibold rounded-lg shadow-md transition-all active:scale-90 duration-300"
            >
                Clique aqui vai
            </button>
        </div>
    );
}
