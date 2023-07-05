const knex = require("../database/knex");
const AppError = require('../utils/AppError');
const { hash } = require("bcryptjs")

class UsersController {
  async create (request, response) {
    const { name, email, password } = request.body;

    const hashedPassword = await hash(password, 8)

    const existingUser = await knex('users')
      .where('email', email)
      .first();

    if (existingUser) {
      throw new AppError("Email already in use")
    }

    await knex("users").insert({
      name,
      email,
      password: hashedPassword
    })

    return response.status(201).json({message: "User successfully created"})
  }

  async update (request, response) {
    const { id } = request.params;
    const { name, email } = request.body;

    // Verificar se o usuário existe no banco de dados
    const existingUser = await knex('users')
      .where('id', id)
      .first();

    if (!existingUser) {
      throw new AppError("User not found");
    }

    // Atualizar as informações do usuário
    await knex('users')
      .where('id', id)
      .update({
        name,
        email,
      });

    return response.status(200).json({ message: "User updated successfully" })

  }

  async show (request, response) {
    const { id } = request.params;

    const user = await knex('users')
      .select('name', 'email')
      .where('id', id)
      .first();

    if (!user) {
      throw new AppError('User not found');
    }

    return response.json(user);
  }
}

module.exports = UsersController;