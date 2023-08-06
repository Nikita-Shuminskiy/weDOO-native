import {action, makeObservable, observable} from "mobx";
import {deviceStorage} from '../../utils/storage/storage'
import {authApi, UserType} from '../../api/authApi'
import {UserRegisterDataType} from "screen/authScreens/RegisterS";
import {userApi} from "../../api/userApi";
export type fullAddressType = {
    country: string
    city: string
    street: string
    house: string
    apartment?: string
    postalCode: string
}
export type AddressType = {
    fullAddress: fullAddressType,
    location: {
        type: string
        coordinates: number[]
    }
}

export class AuthStore {
    user: UserType = {
        favoritesStores: []
    } as UserType
    isAuth: boolean = false
    currentLocation: AddressType = {} as AddressType


    setUser(userData: UserType): void {
        this.user = userData
    }

    setAuth(auth: boolean): void {
        this.isAuth = auth
    }

    async login(userData: { email: string, password: string }): Promise<void> {
        const {data} = await authApi.login(userData.email, userData.password)
        await deviceStorage.saveItem('accessToken', data.accessToken)
        await deviceStorage.saveItem('refreshToken', data.refreshToken)
        this.setAuth(true)
    }

    async checkAuth(): Promise<void> {
        const {data} = await authApi.refresh()
        await deviceStorage.saveItem('accessToken', data.accessToken)
        await deviceStorage.saveItem('refreshToken', data.refreshToken)
        this.setAuth(true)
    }

    async registration(dataUser: UserRegisterDataType) {
        const {data} = await authApi.register(dataUser)
    }

    async getMe(): Promise<void> {
        const {data} = await authApi.getMe()
        this.setUser(data)
    }

    async getUser(idUser: string): Promise<UserType> {
        const {data} = await userApi.getUser(idUser)
        this.setUser(data)
        return data
    }


    logOut() {
        this.user = null
        this.isAuth = false
        deviceStorage.removeItem('refreshToken')
        deviceStorage.removeItem('accessToken')
    }

    setLocation(data: AddressType) {
        this.currentLocation = data
    }

    constructor() {
        makeObservable(this, {
            user: observable,
            isAuth: observable,
            currentLocation: observable,
            setUser: action,
            getUser: action,
            setLocation: action,
            logOut: action,
            setAuth: action,
            getMe: action,
            login: action
        })
        this.setAuth = this.setAuth.bind(this)
        this.getMe = this.getMe.bind(this)
        this.getUser = this.getUser.bind(this)
        this.logOut = this.logOut.bind(this)

        this.setLocation = this.setLocation.bind(this)
    }
}

export default new AuthStore()