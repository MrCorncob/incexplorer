import http from './http';

export const getNormalTx = async (page: number) => {
    // https://churn-api-coinservice.incognito.org/txs/normal?from=2021-11-12 14:15:00&to=2021-11-15 15:15:00
    let fromday = new Date();
    const inst = http('')
    return inst.get(`/txs/all?from=${fromday.toISOString().slice(0, 10)}&page=${page}`);
};
export const getDetailTx = async (hash: string) => {
    const inst = http('')
    return inst.get(`/tx/${hash}`);
};