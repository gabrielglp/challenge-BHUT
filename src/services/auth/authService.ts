import { config } from '../../config/config';
import axios from 'axios';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export class AuthService {
  private static instance: AuthService;
  private accessToken: string | null = null;
  private tokenExpiration: Date | null = null;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login() {
    try {
      const response = await axios.post<AuthResponse>(
        `${config.api.baseUrl}/autenticacao/token`,
        {
          login: "gabriel.martins",
          senha: "d28e604e-8673-4192-9a44-9a6700fb25f2"
        }
      );

      this.accessToken = response.data.accessToken;
      this.tokenExpiration = new Date(Date.now() + response.data.expiresIn * 1000);

      return this.accessToken;
    } catch (error) {
      console.error('Erro na autenticação:', error);
      throw new Error('Falha na autenticação');
    }
  }

  async getToken(): Promise<string> {
    if (!this.accessToken || !this.tokenExpiration || this.isTokenExpired()) {
      await this.login();
    }
    return this.accessToken!;
  }

  private isTokenExpired(): boolean {
    if (!this.tokenExpiration) return true;
    return Date.now() >= this.tokenExpiration.getTime();
  }
}