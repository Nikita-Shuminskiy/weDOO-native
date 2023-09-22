import RootStore from '../../RootStore/root-store';import {LoadingEnum} from '../../types/types'export class CategoriesService {    rootStore: typeof RootStore;    constructor(rootStore: typeof RootStore) {        this.rootStore = rootStore;    }    async getCategories(): Promise<void> {        try {            await this.rootStore.CategoriesStore.getCategories()            await this.rootStore.AuthStore.getBanners()        } catch (e) {            const redirectToLoginHandler = () => this.rootStore.AuthStore.setAuth(false)            this.rootStore.Notification.setNotification('error', true, e, redirectToLoginHandler)        } finally {        }    }}export default CategoriesService;