export const ImageCard: React.FC = () => {
  return (
    <div className="card relative bg-white rounded-md shadow-md transition-transform ease-in duration-300 transform hover:shadow-lg hover:-translate-y-1">
      <img src="Link" alt="Imagem" className="h-56 w-full object-cover rounded-md" />
      <div className="card-body p-4" >
        <h1 className="text-x1 font-semibold mb-2 text-gray-600">Nome da Imagem</h1>
        <p className="text-x1 font-semibold mb-2 text-gray-600">Tamanho</p>
        <p className="text-x1 font-semibold mb-2 text-gray-600">Data Upload</p>
      </div>
    </div>
  );
};
