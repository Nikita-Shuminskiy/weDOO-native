import {action, makeObservable, observable} from 'mobx';import {AssignCourierOrderType, courierApi, OrderCourierType, PayloadOrdersType} from "../../api/couierApi";import {StatusType} from "../../api/ordersApi";import io from "socket.io-client";import {BASE_URL} from "../../api/config";export class CourierOrderStore {    courierOrders: OrderCourierType[] = [] as OrderCourierType[]    takenCourierOrders: OrderCourierType[] = [] as OrderCourierType[]    selectedOrder: OrderCourierType = {} as OrderCourierType    assignOrderInfo: AssignCourierOrderType = {} as AssignCourierOrderType    setCourierOrders(orders: OrderCourierType[]): void {        this.courierOrders = orders    };    setAssignOrderInfo(orders: AssignCourierOrderType): void {        this.assignOrderInfo = orders    };    setSelectedOrder(order: OrderCourierType): void {        this.selectedOrder = order    };    setTakenCourierOrders(orders: OrderCourierType[]): void {        this.takenCourierOrders = orders    };    setClearOrders(): void {        this.courierOrders = []    };    async assignCourierOrder(courierId: string) {        const {data} = await courierApi.assignCourierOrder(this.selectedOrder._id, courierId)        this.setAssignOrderInfo(data)        return data    }    async updateOrderStatus(status: StatusType) {        const {data} = await courierApi.updateOrderStatus(this.selectedOrder._id, status)        this.setSelectedOrder(data)    }    async getCourierOrders() {        const {data} = await courierApi.getCourierOrders()        this.setCourierOrders(data.results)    }    async getTakenCourierOrders(idCourier: string, payload?: PayloadOrdersType) {        const {data} = await courierApi.getTakenCourierOrders(idCourier, payload)        console.log(data, 'data')        this.setTakenCourierOrders(data.results)    }    async connectToSocketOrder () {        const socket = io(BASE_URL);        socket.on('connect', () => {        });        socket.on(`orderStatusUpdated:${this.selectedOrder._id}`, (data: { orderId: string, status: StatusType }) => {        })    }    constructor() {        makeObservable(this, {            courierOrders: observable,            selectedOrder: observable,            takenCourierOrders: observable,            assignOrderInfo: observable,            setClearOrders: action,            connectToSocketOrder: action,            updateOrderStatus: action,            setAssignOrderInfo: action,            assignCourierOrder: action,            setTakenCourierOrders: action,            setCourierOrders: action,            getCourierOrders: action,            getTakenCourierOrders: action,            setSelectedOrder: action,        });        this.setClearOrders = this.setClearOrders.bind(this)        this.connectToSocketOrder = this.connectToSocketOrder.bind(this)        this.setTakenCourierOrders = this.setTakenCourierOrders.bind(this)        this.getTakenCourierOrders = this.getTakenCourierOrders.bind(this)        this.setAssignOrderInfo = this.setAssignOrderInfo.bind(this)        this.updateOrderStatus = this.updateOrderStatus.bind(this)        this.assignCourierOrder = this.assignCourierOrder.bind(this)        this.setSelectedOrder = this.setSelectedOrder.bind(this)        this.setCourierOrders = this.setCourierOrders.bind(this)        this.getCourierOrders = this.getCourierOrders.bind(this)    }}export default new CourierOrderStore();