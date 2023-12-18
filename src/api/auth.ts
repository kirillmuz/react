import { AxiosInstance } from './axiosInstance';

interface LoginRequestDto {
    login: string;
    password: string;
}

interface LoginResponseDto {
    access_token: string;
    usename: string;
    role: string;
}

const signIn = (loginData: LoginRequestDto) => {
    return AxiosInstance.post<LoginResponseDto>('/login', loginData);
}

export const Auth = {
    signIn
}
