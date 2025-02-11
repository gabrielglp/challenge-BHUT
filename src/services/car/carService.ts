import axios from 'axios';
import { AuthService } from '../auth/authService';
import { config } from '../../config/config';


export class CarService {
  private authService: AuthService;

  constructor() {
    this.authService = AuthService.getInstance();
  }

  async getAllCars() {
    try {
      const token = await this.authService.getToken();
      const response = await axios.get(`${config.api.baseUrl}/carro`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar carros:', error);
      throw new Error('Erro ao buscar carros');
    }
  }

  async createCar(carData: any) {
    try {
      const token = await this.authService.getToken();
      const response = await axios.post(`${config.api.baseUrl}/carro`, carData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao criar carro:', error);
      throw new Error('Erro ao criar carro');
    }
  }
}