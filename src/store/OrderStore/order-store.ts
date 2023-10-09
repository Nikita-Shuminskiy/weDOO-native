import { action, makeObservable, observable } from 'mobx'import {	ApiOrderType,	CourierType,	ordersApi,	OrdersResponseType,	SendDataOrderType,	StatusType,} from '../../api/ordersApi'export class OrderStore {	order: ApiOrderType = {} as ApiOrderType	orders: ApiOrderType[] = []	totalOrders: number = 0	rejectReason: string | null = null	statusOrder: StatusType | null = null	completedOrdersNum: number | null = null	setOrderData(order: ApiOrderType): void {		this.order = order	}	setCourierToOrder(courier: CourierType): void {		this.order = { ...this.order, courier: courier }	}	setStatus(status: StatusType): void {		this.statusOrder = status	}	setOrders(orders: OrdersResponseType): void {		if (this.orders.length) {			this.orders.push(...orders.results)		} else {			this.orders = orders.results		}		this.totalOrders = orders.totalCount	}	setClearOrders(): void {		this.orders = []		this.totalOrders = 0	}	setRejectReason(val: string): void {		this.rejectReason = val	}	setCompletedOrdersNum(orders: ApiOrderType[]): void {		const excludedStatuses = [StatusType.Completed, StatusType.Canceled]		const filteredOrders = orders.filter((order) => !excludedStatuses.includes(order.status))		this.completedOrdersNum = filteredOrders.length	}	async getOrders(		idUser: string,		status?: StatusType,		limit?: number,		offset?: number,		inProgressOrdersNum?: boolean	) {		const { data } = await ordersApi.getOrderUserId({ idUser, status, limit, offset })		console.log(data)		if (inProgressOrdersNum) {			this.setCompletedOrdersNum(data.results)		} else {			this.setOrders(data)		}		return data	}	async getOrder(idOrder: string) {		const { data } = await ordersApi.getOrder(idOrder)		this.setOrderData(data)		return data	}	async sendOrder(order: SendDataOrderType) {		const { data } = await ordersApi.postOrders(order)		this.setOrderData(data)		this.setStatus(data.status)	}	constructor() {		makeObservable(this, {			order: observable,			completedOrdersNum: observable,			rejectReason: observable,			orders: observable,			totalOrders: observable,			statusOrder: observable,			setOrderData: action,			setStatus: action,			setCourierToOrder: action,			setOrders: action,			sendOrder: action,			setClearOrders: action,			setCompletedOrdersNum: action,			setRejectReason: action,		})		this.setOrderData = this.setOrderData.bind(this)		this.setCompletedOrdersNum = this.setCompletedOrdersNum.bind(this)		this.setClearOrders = this.setClearOrders.bind(this)		this.setOrders = this.setOrders.bind(this)		this.setCourierToOrder = this.setCourierToOrder.bind(this)		this.setStatus = this.setStatus.bind(this)		this.setRejectReason = this.setRejectReason.bind(this)	}}export default new OrderStore()