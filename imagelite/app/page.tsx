import Image from "next/image";
import { PrimeiroComponente } from "./components/PrimeiroComponente";

export default function Home() {
  return (
    <div>
      <main>
        <h1>BINARIO GORDON</h1>
        <PrimeiroComponente
        mensagem="Clica no botão ali vai, vai ser legal."
          mensagemBotao=" (｡ ●ω●｡)"
        />

      </main>
    </div>
  );
}