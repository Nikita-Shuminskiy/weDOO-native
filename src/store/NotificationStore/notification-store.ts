import {action, makeObservable, observable} from 'mobx';import {LoadingEnum, NotificationType} from "../types/types";import { createAlert } from '../../components/Alert'export class NotificationStore {    isLoading: LoadingEnum = LoadingEnum.initial;    notification: NotificationType | undefined = undefined;    switcherNotification = false;    serverResponse: string | undefined = undefined;    setIsLoading = (isLoading: LoadingEnum): void => {        this.isLoading = isLoading;    };    setNotification = (        notification: NotificationType | undefined,        switcherNotification: boolean,        serverResponse: string | any,        loginRedirect?: () => void,    ): void => {        const checkResponseString = typeof serverResponse === 'string'        if(!checkResponseString && serverResponse.response.data.statusCode === 401) {           return loginRedirect()        }        this.switcherNotification = switcherNotification;        this.notification = notification;        this.serverResponse = serverResponse;        if (serverResponse) {            createAlert({                title: 'Message',                message: checkResponseString ? serverResponse : serverResponse?.response?.data?.messages,                buttons: [{text: 'Continue', style: "cancel"}]            })        }    };    constructor() {        makeObservable(this, {            isLoading: observable,            notification: observable,            switcherNotification: observable,            serverResponse: observable,            setIsLoading: action,            setNotification: action,        });        this.setIsLoading = this.setIsLoading.bind(this)        this.setNotification = this.setNotification.bind(this)    }}export default new NotificationStore();