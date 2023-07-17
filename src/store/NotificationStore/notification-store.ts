import {action, makeObservable, observable} from 'mobx';import {LoadingEnum, NotificationType} from "../types/types";import { createAlert } from '../../components/Alert'export class NotificationStore {    isLoading: LoadingEnum = LoadingEnum.initial;    notification: NotificationType | undefined = undefined;    switcherNotification = false;    serverResponse: string | undefined = undefined;    setIsLoading = (isLoading: LoadingEnum): void => {        this.isLoading = isLoading;    };    setNotification = (        notification: NotificationType | undefined,        switcherNotification: boolean,        serverResponse: string | undefined,    ): void => {        this.switcherNotification = switcherNotification;        this.notification = notification;        this.serverResponse = serverResponse;        if (serverResponse) {            createAlert({                title: 'Message',                message: serverResponse ?? 'Try later',                buttons: [{text: 'Continue', style: "cancel"}]            })        }    };    constructor() {        makeObservable(this, {            isLoading: observable,            notification: observable,            switcherNotification: observable,            serverResponse: observable,            setIsLoading: action,            setNotification: action,        });        this.setIsLoading = this.setIsLoading.bind(this)    }}export default new NotificationStore();