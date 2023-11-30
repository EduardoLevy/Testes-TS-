import { Request, Response } from 'express';
import { updateProduct } from '../products/update-product';
import { Product } from '../../model/produto';

interface MockRequest {
  params: { id: string };
  body: { nome: string; categoria: string; preco: number };
}

describe('TestesupdateProduct', () => {
  it('deve lidar com um produto inexistente', async () => {
    const mockRequest: MockRequest = {
      params: { id: '069' },
      body: { nome: 'Blusa Poison', categoria: 'Blusas', preco: 200.0 },
    };

    const mockResponse = {
      json: jest.fn(),
    } as unknown as Response;

    Product.findByPk = jest.fn().mockResolvedValue(null);

    await updateProduct(mockRequest as unknown as Request, mockResponse);

    expect(Product.findByPk).toHaveBeenCalledWith('069');
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'product not found' });
  });
});
