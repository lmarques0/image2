
'use client';

import { Template, ImageCard, Button } from '@/components';
import { useImageService } from '@/resource/service';
import { Image } from '@/resource/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Galeria() {
  const useService = useImageService();
  const router = useRouter();

  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState('');
  const [extension, setExtension] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  async function searchImages() {
    setLoading(true);
    setError('');
    setSearched(true);

    try {
      const result = await useService.buscar(query, extension);
      setImages(result);
    } catch (err) {
      console.error('Erro ao buscar imagens:', err);
      setError(
        'Não foi possível carregar as imagens. Verifique a conexão com a API.',
      );
    } finally {
      setLoading(false);
    }
  }

  async function deleteImage(image: Image) {
    if (!image.url) {
      setError('Não foi possível identificar a URL da imagem.');
      return;
    }

    const confirmed = window.confirm(
      `Tem certeza que deseja excluir a imagem "${image.name}"?`,
    );

    if (!confirmed) return;

    setDeleting(image.url);
    setError('');

    try {
      await useService.excluir(image.url);

      setImages((currentImages) =>
        currentImages.filter((item) => item.url !== image.url),
      );
    } catch (err) {
      console.error('Erro ao excluir imagem:', err);

      setError(
        err instanceof Error
          ? err.message
          : 'Não foi possível excluir a imagem. Tente novamente.',
      );
    } finally {
      setDeleting(null);
    }
  }

  return (
    <Template>
      <section className="my-5 flex flex-col items-center justify-center">
        <div className="flex flex-wrap items-center justify-center gap-4 p-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !loading) {
                void searchImages();
              }
            }}
            className="rounded-lg border px-4 py-2 text-gray-900"
            placeholder="Buscar imagens..."
            aria-label="Buscar imagens"
          />

          <select
            value={extension}
            onChange={(e) => setExtension(e.target.value)}
            className="rounded-lg border px-4 py-2 text-gray-900"
            aria-label="Filtrar por formato"
          >
            <option value="">Todos os formatos</option>
            <option value="JPG">JPG</option>
            <option value="PNG">PNG</option>
            <option value="JPEG">JPEG</option>
            <option value="GIF">GIF</option>
          </select>

          <button
            type="button"
            disabled={loading}
            onClick={() => void searchImages()}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>

          <Button
            type="button"
            variant="danger"
            onClick={() => router.push('/uploads')}
          >
            Adicionar nova
          </Button>
        </div>
      </section>

      {error && (
        <div
          role="alert"
          className="mx-6 my-4 rounded-lg bg-red-100 p-3 text-red-700"
        >
          {error}
        </div>
      )}

      {loading ? (
        <div
          className="flex flex-col items-center justify-center gap-3 py-12"
          role="status"
          aria-live="polite"
        >
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
          <p className="text-gray-600">Carregando imagens...</p>
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((image) => (
            <div
              key={image.url}
              className="flex flex-col gap-3 rounded-lg border p-4 shadow-sm"
            >
              <ImageCard
                imageName={image.name}
                imageUrl={image.url}
                imageSize={image.size}
                uploadDate={image.uploadDate}
                extension={image.extension}
              />

              <Button
                type="button"
                variant="danger"
                disabled={deleting !== null}
                onClick={() => void deleteImage(image)}
              >
                {deleting === image.url
                  ? 'Excluindo...'
                  : 'Excluir imagem'}
              </Button>
            </div>
          ))}

          {searched && images.length === 0 && (
            <p className="col-span-full py-8 text-center text-gray-500">
              Nenhuma imagem encontrada.
            </p>
          )}
        </section>
      )}
    </Template>
  );
}
