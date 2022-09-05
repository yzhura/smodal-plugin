import './style/index.scss';
import { TModalOptions } from './model/modal';
export declare class SModals {
    selector: string;
    options?: TModalOptions;
    constructor(selector: string, options?: TModalOptions);
    private initRenderListeners;
    private renderModal;
    private unMountModal;
}
