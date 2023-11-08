import RootStore from '../../RootStore/root-store'import { LoadingEnum } from '../../types/types'import { dataSearchType } from '../../../api/storesApi'import AsyncStorage from '@react-native-async-storage/async-storage'export class StoresService {	rootStore: typeof RootStore	constructor(rootStore: typeof RootStore) {		this.rootStore = rootStore	}	async getStores(): Promise<void> {		try {			await this.rootStore.StoresStore.getStores()		} catch (e) {			const redirectToLoginHandler = () => this.rootStore.AuthStore.setAuth(false)			this.rootStore.Notification.setNotification('error', true, e, redirectToLoginHandler)		} finally {		}	}	async getStore(id: string, isClearSubCategory = true) {		this.rootStore.StoresStore.getAndSetAllProduct([])		isClearSubCategory && this.rootStore.StoresStore.setChosenSubCategory(null)		this.rootStore.Notification.setIsLoading(LoadingEnum.fetching)		try {			await this.rootStore.StoresStore.getStore(id)			return true		} catch (e) {			const redirectToLoginHandler = () => this.rootStore.AuthStore.setAuth(false)			this.rootStore.Notification.setNotification('error', true, e, redirectToLoginHandler)		} finally {			this.rootStore.Notification.setIsLoading(LoadingEnum.success)		}	}	async getFavoriteStores() {		this.rootStore.StoresStore.setFavoriteStore([])		try {			return await this.rootStore.StoresStore.getFavoriteStores(this.rootStore.AuthStore.user._id)		} catch (e) {			const redirectToLoginHandler = () => this.rootStore.AuthStore.setAuth(false)			this.rootStore.Notification.setNotification('error', true, e, redirectToLoginHandler)		} finally {		}	}	async searchStores(dataSearch?: dataSearchType): Promise<void> {		this.rootStore.Notification.setIsLoading(LoadingEnum.fetching)		try {			//const currCategory = this.rootStore.StoresStore.selectedSubCategoryId			await this.rootStore.StoresStore.searchStores({				categoryId: dataSearch.categoryId,				search: dataSearch.search,			})		} catch (e) {			const redirectToLoginHandler = () => this.rootStore.AuthStore.setAuth(false)			this.rootStore.Notification.setNotification('error', true, e, redirectToLoginHandler)		} finally {			this.rootStore.Notification.setIsLoading(LoadingEnum.success)		}	}	async saveFavoriteStore(idStore: string): Promise<void> {		try {			await this.rootStore.StoresStore.saveFavoriteStore(this.rootStore.AuthStore.user._id, idStore)			const data = await this.rootStore.AuthStore.getUser(this.rootStore.AuthStore.user._id)			this.rootStore.StoresStore.setFavoriteStore(data.favoritesStores)		} catch (e) {			const redirectToLoginHandler = () => this.rootStore.AuthStore.setAuth(false)			this.rootStore.Notification.setNotification('error', true, e, redirectToLoginHandler)		} finally {		}	}	async deleteFavoriteStore(idStore: string): Promise<void> {		try {			await this.rootStore.StoresStore.deleteFavoriteStore(				this.rootStore.AuthStore.user._id,				idStore			)			await this.rootStore.StoresStore.getFavoriteStores(this.rootStore.AuthStore.user._id)		} catch (e) {			const redirectToLoginHandler = () => this.rootStore.AuthStore.setAuth(false)			this.rootStore.Notification.setNotification('error', true, e, redirectToLoginHandler)		} finally {		}	}}export default StoresService