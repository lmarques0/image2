import { Image } from './image';

export class ImageService {
  baseURL: string = 'http://localhost:8080/images';

  async enviar(
    file: File,
    name: string,
    tags: string[],
  ): Promise<void> {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('name', name);

    tags.forEach((tag) => {
      formData.append('tags', tag);
    });

    const response = await fetch(this.baseURL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(
        `Falha ao enviar imagem: ${response.status} ${response.statusText}`,
      );
    }
  }

  async buscar(
    query: string = '',
    extension: string = '',
  ): Promise<Image[]> {
    const params = new URLSearchParams({
      query,
      extension,
    });

    const response = await fetch(
      `${this.baseURL}?${params.toString()}`,
    );

    if (!response.ok) {
      throw new Error(
        `Falha ao buscar imagens: ${response.status} ${response.statusText}`,
      );
    }

    return (await response.json()) as Image[];
  }

  async excluir(imageUrl: string): Promise<void> {
    // Extrai o ID do final da URL retornada pela API.
    const url = new URL(imageUrl, this.baseURL);
    const id = url.pathname.split('/').filter(Boolean).pop();

    if (!id) {
      throw new Error('Não foi possível identificar o ID da imagem.');
    }

    const response = await fetch(
      `${this.baseURL}/${encodeURIComponent(id)}`,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      const message = await response.text();

      throw new Error(
        `Falha ao excluir imagem: ${response.status} ${
          message || response.statusText
        }`,
      );
    }
  }
}

export const useImageService = () => new ImageService();