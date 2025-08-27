import type { Request, Response } from "express";

async function index(req: Request, res: Response): Promise<void> {
  try {
    // const users = getUsers();
    res.json({ success: true, data: null });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export {
  index,
};