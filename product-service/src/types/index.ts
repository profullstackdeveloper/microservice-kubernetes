export interface OrderBook {
    asks: [number, number][];
    bids: [number, number][];
}

export interface ExchangeInterface {
    fetchOrderBook(): Promise<OrderBook>;
    calculateMidPrice(orderBook: OrderBook): number;
}

export interface PriceIndex {
    timestamp: number;
    exchanges: {
        [key: string]: {
            midPrice: number;
            orderBook: OrderBook;
        }
    };
    globalMidPrice: number;
}