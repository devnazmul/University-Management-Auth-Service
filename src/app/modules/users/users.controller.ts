import { Request, Response } from 'express'
import userService from './users.service'

const createUser = async (req: Request, res: Response) => {
  const { user } = req.body
  try {
    const result = await userService.createUser(user)

    res.status(200).json({
      success: true,
      message: 'User created successfully.',
      data: result,
      error: [],
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create user!',
      data: [],
      error: error,
    })
  }
}

export default {
  createUser,
}
