import { Request, Response } from 'express';
import { fetchAllProducts } from '../products/fetch-product'
import { Product } from '../../model/produto'
describe('Testes fetch one Products', () => {
    it('deve retornar todos os produtos corretamente', async () => {
      const mockProducts = [
        { id: 1, nome: 'Camisa Branca poison', categoria: 'Blusas', preco: 199.90 },
        { id: 2, nome: 'Casaco Gola Alta', categoria: 'Moletons', preco: 200.0 },
      ];
  
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
  
      Product.findAll = jest.fn().mockResolvedValue(mockProducts);
  
      await fetchAllProducts({} as Request, mockResponse);
  
      expect(mockResponse.json).toHaveBeenCalledWith(mockProducts);
    });
  
    it('deve lidar com erros ao buscar produtos', async () => {
      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;
  
      Product.findAll = jest.fn().mockRejectedValue(new Error('Erro ao buscar produtos'));
  
      await fetchAllProducts({} as Request, mockResponse);
  
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Erro ao buscar produtos' });
    });
  });