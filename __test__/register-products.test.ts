import { Request, Response } from 'express';
import { registerProduct } from '../products/register-product';
import { Product } from '../../model/produto';

describe('Teste registerProduct', () => {
  it('deve registrar um produto corretamente', async () => {
    const mockRequest = {
      body: { nome: 'Blusa poison', categoria: 'Blusas', preco: 200.0 },
    } as Request;

    const mockResponse = {
      json: jest.fn(),
    } as unknown as Response;

   
    Product.create = jest.fn().mockResolvedValue({ id: 1, ...mockRequest.body });

    await registerProduct(mockRequest, mockResponse);

    expect(Product.create).toHaveBeenCalledWith(mockRequest.body);
    expect(mockResponse.json).toHaveBeenCalledWith({ id: 1, ...mockRequest.body });
  });

  it('deve lidar com erros ao registrar um produto', async () => {
    const mockRequest = {
      body: { nome: 'Blusa poison', categoria: 'Blusas', preco: 200.0 },
    } as Request;

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockError = new Error('Erro ao registrar o produto');
    jest.spyOn(Product, 'create').mockRejectedValue(mockError);

    await registerProduct(mockRequest, mockResponse);

    expect(Product.create).toHaveBeenCalledWith(mockRequest.body);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Erro ao registrar o produto' });
  });
});
