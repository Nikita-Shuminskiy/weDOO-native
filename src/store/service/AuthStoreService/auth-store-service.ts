import RootStore from '../../RootStore/root-store';import {LoadingEnum} from '../../types/types'import {UserRegisterDataType} from "../../../screen/authScreens/RegisterS";import AsyncStorage from "@react-native-async-storage/async-storage";import {AddressType} from "../../AuthStore/auth-store";export class AuthStoreService {    rootStore: typeof RootStore;    constructor(rootStore: typeof RootStore) {        this.rootStore = rootStore;    }    async registration(userData: UserRegisterDataType): Promise<void> {        this.rootStore.Notification.setIsLoading(LoadingEnum.fetching);        try {            await this.rootStore.AuthStore.registration(userData);            await this.rootStore.AuthStoreService.login({email: userData.email, password: userData.password});            this.rootStore.AuthStore.setLocation({} as AddressType)        } catch (e) {            console.log(e)            this.rootStore.Notification.setNotification('error', true, 'registration');        } finally {            this.rootStore.Notification.setIsLoading(LoadingEnum.success);        }    }    async login(userData: { email: string; password: string }): Promise<void> {        this.rootStore.Notification.setIsLoading(LoadingEnum.fetching);        try {            await this.rootStore.AuthStore.login({email: userData.email, password: userData.password});            await this.rootStore.AuthStore.getMe()        } catch (e) {            this.rootStore.Notification.setNotification('error', true, 'Incorrect data has been entered');        } finally {            this.rootStore.Notification.setIsLoading(LoadingEnum.success);        }    }    async updateUser(dataAddress: AddressType): Promise< boolean | void> {        this.rootStore.Notification.setIsLoading(LoadingEnum.fetching);        try {            await this.rootStore.AuthStore.updateUser(dataAddress);            this.rootStore.AuthStore.setLocation({} as AddressType)            return true        } catch (e) {            this.rootStore.Notification.setNotification('error', true, 'Incorrect data has been entered');        } finally {            this.rootStore.Notification.setIsLoading(LoadingEnum.success);        }    }    async getMe(): Promise<void> {        this.rootStore.Notification.setIsLoading(LoadingEnum.fetching);        try {            const refreshToken = await AsyncStorage.getItem('refreshToken');            if(refreshToken) {                await this.rootStore.AuthStore.getMe()            }        } catch (e) {        } finally {            this.rootStore.Notification.setIsLoading(LoadingEnum.success);        }    }}export default AuthStoreService;