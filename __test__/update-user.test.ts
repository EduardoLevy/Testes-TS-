import { Request, Response } from 'express';
import { User } from '../../model/usuario';
import { sequelize } from '../../db/conexao';
import { updateUser } from '../../../../Área de Trabalho/rotas/users/update-user'; 

describe('Update User with DB', () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  it('should update a user when user exists in the database', async () => {
    const createdUser = await User.create({ login: 'Alone', senha: '123', categoria: 'Cliente' });

    const req = { params: { id: createdUser.id.toString() }, body: { login: 'Levr', senha: '321', categoria: 'Gerente' } } as unknown as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    } as unknown as Response;

    await updateUser(req, res);

   

   
    expect(res.json).toHaveBeenCalledWith();
  });
});
