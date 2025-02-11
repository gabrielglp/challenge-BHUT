import { Request, Response, NextFunction } from 'express';
import { CarService } from '../../services/car/carService';
import { MessageService } from '../../services/messageService';

export class CarController {
  private carService: CarService;
  private messageService: MessageService;

  constructor() {
    this.carService = new CarService();
    this.messageService = new MessageService();
  }
  
  public createCar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.messageService.sendMessage(req.body)
      res.status(201).json();
    } catch (error) {
      next(error);
    }
  };

  public getCars = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const cars = await this.carService.getAllCars();
      res.json(cars);
    } catch (error) {
      next(error);
    }
  };
}