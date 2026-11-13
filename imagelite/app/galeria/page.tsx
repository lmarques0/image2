'use client';

import { Template, ImageCard } from '@/components';
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
      setError('Falha ao carregar imagens.');
    } finally {
      setLoading(false);
    }
  }

  async function deleteImage(image: Image) {
    if (!image.url) {
      setError('URL da imagem não identificada.');
      return;
    }

    const confirmed = window.confirm(`Excluir "${image.name}"?`);
    if (!confirmed) return;

    setDeleting(image.url);
    setError('');

    try {
      await useService.excluir(image.url);
      setImages((current) => current.filter((item) => item.url !== image.url));
    } catch (err) {
      console.error('Erro ao excluir imagem:', err);
      setError(
        err instanceof Error ? err.message : 'Falha ao excluir imagem.'
      );
    } finally {
      setDeleting(null);
    }
  }

  return (
    <Template>
      <div className="mx-auto w-full max-w-6xl bg-white px-6 py-8 text-black">
        
        {/* Cabeçalho */}
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-black pb-6">
          <h1 className="text-2xl font-bold uppercase tracking-tight">
            Galeria
          </h1>

          <button
            type="button"
            onClick={() => router.push('/uploads')}
            className="bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            + Nova imagem
          </button>
        </header>

        {/* Barra de Busca e Filtro */}
        <section className="my-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !loading) {
                void searchImages();
              }
            }}
            className="flex-1 border border-black bg-white px-4 py-2.5 text-sm text-black placeholder-neutral-400 focus:outline-none"
            placeholder="Nome do arquivo..."
            aria-label="Buscar imagens"
          />

          <select
            value={extension}
            onChange={(e) => setExtension(e.target.value)}
            className="border border-black bg-white px-4 py-2.5 text-sm text-black focus:outline-none"
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
            className="border border-black bg-black px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </section>

        {/* Mensagem de Erro */}
        {error && (
          <div
            role="alert"
            className="mb-6 border border-black bg-neutral-100 px-4 py-3 text-sm font-medium text-black"
          >
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div
            className="flex flex-col items-center justify-center gap-3 py-20"
            role="status"
            aria-live="polite"
          >
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-black" />
            <span className="text-xs uppercase tracking-widest text-neutral-500">
              Carregando
            </span>
          </div>
        ) : (
          /* Grid de Imagens */
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {images.map((image) => (
              <div
                key={image.url}
                className="flex flex-col justify-between border border-neutral-200 bg-white p-4 transition-colors hover:border-black"
              >
                <ImageCard
                  imageName={image.name}
                  imageUrl={image.url}
                  imageSize={image.size}
                  uploadDate={image.uploadDate}
                  extension={image.extension}
                />

                <button
                  type="button"
                  disabled={deleting !== null}
                  onClick={() => void deleteImage(image)}
                  className="mt-4 w-full border border-neutral-300 bg-white py-2 text-xs font-medium uppercase tracking-wider text-neutral-600 transition-colors hover:border-black hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deleting === image.url ? 'Excluindo...' : 'Excluir'}
                </button>
              </div>
            ))}

            {searched && images.length === 0 && (
              <div className="col-span-full border border-neutral-200 py-16 text-center text-sm text-neutral-500">
                Nenhum arquivo encontrado.
              </div>
            )}
          </section>
        )}
      </div>
    </Template>
  );
}