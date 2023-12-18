import { AccessTokenKey } from '../constants/commonConstants';
import { SetRoleResponseDto } from '../types/apiTypes';
import { User } from '../types/models';
import { AxiosInstance } from './axiosInstance';

const { axiosGet, axiosPatch} = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '');

const getUsers = async() =>
    await axiosGet('/Administration/getusers') as Array<User>;

const setUserRole = async(setRoleData: SetRoleResponseDto) => 
    await axiosPatch('/Administration/getusers', setRoleData) as void;

export const AdministrationApi = {
    getUsers,
    setUserRole
}
