import type { Request, Response } from 'express';
import ApiResponse from '@/helpers/response.helper';
import { GeminiService } from '@/service/gemini.service';

export class ParseController {
  private geminiService: GeminiService;

  constructor() {
    this.geminiService = new GeminiService();
    this.index = this.index.bind(this);
  }

  public async index(req: Request, res: Response): Promise<void> {
    const { address } = req.body;
    const generatedText = await this.geminiService.extractAddress(address);
    ApiResponse.ok(res, generatedText, "Address parsed successfully");
  }
}
