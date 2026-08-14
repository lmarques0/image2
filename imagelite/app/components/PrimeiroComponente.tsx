'use client';
interface PrimeiroComponente{
  mensagem: string;
  mensagemBotao: string;
}

export const  PrimeiroComponente = ({mensagem, mensagemBotao}:PrimeiroComponente) =>{

  //function clique() { 
   // console.log('Você clicou no botão!');
  //  alert('SOU EU, O TIRIRICA');
//  }
  const clique = () =>{
    console.log('Você clicou no botão!')
    alert(mensagemBotao);
  }

  return(
    <div> 
      <h1>Primeiro Componente</h1>
      <p>{mensagem}</p>
      <button onClick={clique}>Sou um botão clica em mim!</button>

    </div>
  );
} 