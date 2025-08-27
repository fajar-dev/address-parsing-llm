import type { Request, Response } from 'express'
import ApiResponse from '@/helpers/response'

async function index(req: Request, res: Response): Promise<void> {
  try {
    // const users = getUsers()
    ApiResponse.internalServerError(res, 'ddad')
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message })
  }
}

export {
  index,
}