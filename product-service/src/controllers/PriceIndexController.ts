import { Request, Response } from 'express';
import { PriceIndexService } from '../application/services/ProductService';

export class PriceIndexController {
    private priceIndexService: PriceIndexService;

    constructor(priceIndexService: PriceIndexService) {
        this.priceIndexService = priceIndexService;
    }

    async getPriceIndex(req: Request, res: Response) {
        try {
            const priceIndex = await this.priceIndexService.computePriceIndex();
            res.json(priceIndex);
        } catch (error) {
            res.status(500).json({
                error: 'Failed to fetch price index',
                details: error.message
            });
        }
    }
}