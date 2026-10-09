import { PrimeiroComponente } from './components/PrimeiroComponente';
import { Template } from './components/Template';

export default function Home() {
  return (
    // Mudamos flex-1 para min-h-screen para a tela ocupar 100% da altura do monitor
    <Template>
      {/* Corrigimos py-50 para py-20, que é uma classe válida do Tailwind */}
      <div className="min-h-screen bg-gradient-to-b from-olive-50 via-olive-300 to-olive-600 flex flex-col items-center justify-center p-6">
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-md text-center border border-olive-100">
                <h1 className="text-3xl font-bold text-olive-950 mb-4">salve salve</h1>
                <p className="text-olive-900">O que você pretende fazer? </p>
                <PrimeiroComponente mensagemBotao="KAAAAAAAAAAAAAAAAAAAAAAAABBBBBBBBBOOOOOOOOOOOOOOOOOOOOMMMMMMMMMMMM você DESTRUIU uma vila pacifica SEU MONSTRO"/> 
            </div>
        </div>
    </Template>
  );
} 