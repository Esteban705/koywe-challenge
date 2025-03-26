import { Injectable } from '@nestjs/common';

@Injectable()
export class DummyExchangeRateFacade {
  async getExchangeRate(from: string, to: string): Promise<number> {
    // Retornamos un valor fijo para testing
    return 1.1;
  }
} 