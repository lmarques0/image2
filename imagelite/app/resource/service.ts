import { Image } from "./image";
class ImageService {
  baseURL: string = 'http://localhost:8080/images';
  async buscar(): Promise<Image[]> {
    const response = await fetch(this.baseURL);
    const data = await response.json();
    return await response.json();
  }

}
export const useImage = () => new ImageService();