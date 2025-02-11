import { NextFunction, Request, Response } from 'express';
import { Log } from '../../models/log/log';

export class LogController {
    public getLogs = async (
        req: Request,
        res: Response,
        next: NextFunction
        ): Promise<void> => {
        try {
            const logs = await Log.find()
            .sort({ data_hora_criacao: -1 })
            .select('-__v')
            .lean()
            .exec();

            const formattedLogs = logs.map(log => ({
                ...log,
                data_hora_criacao: new Date(log.data_hora_criacao).toLocaleString('pt-BR'),
                data_hora_processamento: new Date(log.data_hora_processamento).toLocaleString('pt-BR')
            }));

            res.json({
                total: logs.length,
                logs: formattedLogs
            });
        } catch (error) {
            next(error);
        }
    };

    async createLog(logData: {
        car_id: string;
        data_hora_criacao: Date;
        data_hora_processamento: Date;
    }) {
        try {
            const log = new Log(logData);
            await log.save();
            return log;
        } catch (error) {
            console.error('Erro ao criar log:', error);
            throw new Error('Falha ao criar log');
        }
    }
}