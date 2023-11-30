import { Request, Response } from 'express';
import { fetchOneProduct } from '../../../../Área de Trabalho/rotas/products/fetch-one-product';
import { Product } from '../../model/produto';
interface MockRequest {
params: { id: string };
}
describe('Testes fetchOneProduct', () => {
 it('deve retornar o produto correto se existir', async () => {
 const mockRequest: MockRequest = {
  params: { id: '1' },
 };

  
 const mockProduct = { id: 1, nome: 'Blusa Branca', categoria: 'Blusas', preco: 200.0 };

  
 const mockResponse = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),

} as unknown as Response;

  
 
Product.findByPk = jest.fn().mockResolvedValue(mockProduct);

  

 await fetchOneProduct(mockRequest as unknown as Request, mockResponse);

   expect(Product.findByPk).toHaveBeenCalledWith('1');

expect(mockResponse.json).toHaveBeenCalledWith(mockProduct);

 });

  
 it('deve retornar um erro se o produto não existir', async () => {
 const mockRequest: MockRequest = {
 params: { id: '999' },
 };

  
 const mockResponse = {
 json: jest.fn(),
 status: jest.fn().mockReturnThis(),
 } as unknown as Response;

 Product.findByPk = jest.fn().mockResolvedValue(null);
 await fetchOneProduct(mockRequest as unknown as Request, mockResponse);
 expect(Product.findByPk).toHaveBeenCalledWith('999');
 expect(mockResponse.status).toHaveBeenCalledWith(404);
 expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Product not found' }) });
});