import { AxiosInstance } from './axiosInstance';

const {axiosPost} = AxiosInstance();

interface LoginRequestDto {
    login: string;
    password: string;
}

interface LoginResponseDto {
    access_token: string;
    usename: string;
    role: string;
}

interface RegistrationRequestDto {
    login: string;
    password: string;
}

const signIn = async(loginData: LoginRequestDto) => 
    await axiosPost('/login', loginData) as LoginResponseDto;

const signUp = async(registrationData: RegistrationRequestDto) => 
    await axiosPost('/register', registrationData) as void;

export const Auth = {
    signIn,
    signUp
}
