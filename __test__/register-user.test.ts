import { Request, Response } from "express";
import { registerUser } from "../users/register-user";
import { User } from "../../model/usuario"; 
import bcrypt from 'bcrypt';

jest.mock('../../model/usuario'); 

describe('Registrar Usario', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    req = {
      body: {
        login: 'testUser',
        senha: 'testPassword',
        categoria: 'testCategory',
      },
    } as Partial<Request>;

    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnThis();

    res = {
      json: jsonMock,
      status: statusMock,
    } as Partial<Response>;
  });

  it('should create a user with hashed password', async () => {
    const hashedPassword = 'hashedPassword';
    const createMock = jest.spyOn(User, 'create').mockResolvedValue({
      id: 1,
      login: req.body.login,
      senha: hashedPassword,
      categoria: req.body.categoria,
    });

    const bcryptHashMock = jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword as never);

    await registerUser(req as Request, res as Response);
    
    expect(bcryptHashMock).toHaveBeenCalledWith(req.body.senha, 10);
    expect(createMock).toHaveBeenCalledWith({
      login: req.body.login,
      senha: hashedPassword as string, 
      categoria: req.body.categoria,
    });
    expect(jsonMock).toHaveBeenCalledWith({
      id: 1,
      login: req.body.login,
      senha: hashedPassword as string, 
      categoria: req.body.categoria,
    });
    expect(statusMock).not.toHaveBeenCalled();
    });
    
    it('should handle errors', async () => {
    const errorMessage = 'An error occurred';
    jest.spyOn(bcrypt, 'hash').mockRejectedValue(new Error(errorMessage) as never); 
    

    await registerUser(req as Request, res as Response);
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ error: errorMessage });
  });
});
