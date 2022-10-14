import './style/index.scss'
import { TModalOptions } from './model/modal'

class SModals {
    selector: string
    options?: TModalOptions
    private modalWrapperClass: string = "modal-wrapper";
    private renderTimeoutSpeed: number = 200;

    constructor(selector: string, options?: TModalOptions) {
        this.selector = selector;
        this.options = options;
        this.renderTimeoutSpeed = options?.renderTimeoutSpeed || this.renderTimeoutSpeed;
        this.bindHtmlModals()
        this.initRenderListeners()
    }

    private initRenderListeners() {
        const actionItems = document.querySelectorAll(this.selector)
        actionItems.forEach((actionElement) => {
            const openBtn = actionElement.querySelector('.open-modal-btn')
            openBtn
                ? openBtn.addEventListener('click', () =>
                      this.renderModal(actionElement as HTMLElement)
                  )
                : actionElement.addEventListener('click', () =>
                      this.renderModal(actionElement as HTMLElement)
                  )
        })
        document.addEventListener('click', (event) => {
            if (event.target instanceof Element) {
                const { target } = event
                const { classList: targetClasses } = target
                if (
                    targetClasses.contains('modal-button-close') ||
                    targetClasses.contains('modal-backdrop')
                ) {
                    this.unMountModal()
                }
            }
        })
    }

    private renderModal(contentElement: HTMLElement) {
        const title =
            contentElement.dataset.modalTitle || this.options?.modalTitle;
        const header = title ? `<h2 class="modal-header">${title}</h2>` : ''
        const imgContent = Array.from(
            contentElement.querySelectorAll('[data-modal-img]')
        ).reduce((prev, cur) => {
            return (prev += `
            <div class='img-wrap'>
                <img src="${cur.getAttribute('src')}" alt="${cur.getAttribute(
                'alt'
            )}">
            </div>`)
        }, ``)
        const textContent = Array.from(
            contentElement.querySelectorAll('[data-modal-text]')
        ).reduce((prev, cur) => {
            return (prev += `<p>${cur.textContent}</p>`)
        }, ``)

        const template = `
            <div class="${this.modalWrapperClass}">
                <div class="modal-backdrop"></div>
                <div class="modal-container">
                    ${header}
                    <div class="modal-body">
                        ${imgContent}
                        ${textContent}
                    </div>
                    <div class="modal-actions">
                        <button class="modal-button-close">${
                            this.options?.btnCloseText || 'Close'
                        }</button>
                    </div>
                </div>
            </div> 
        `
        document.body.insertAdjacentHTML('beforeend', template);

        this.animateModal();
    }

    private unMountModal() {
        this.unMountAnimate();

        setTimeout(() => {
            document.querySelector('.modal-wrapper')?.remove();
        }, this.renderTimeoutSpeed)
    }

    private unMountAnimate() {
        const modalWrapper = document.querySelector(`.${this.modalWrapperClass}`);
        modalWrapper?.classList.remove('active');
    }

    private animateModal() {
        const modalWrapper = document.querySelector(`.${this.modalWrapperClass}`);
        setTimeout(() => {
            modalWrapper?.classList.add('active');
        })
    }

    private bindHtmlModals() {
        const dataModalsIds = Array.from(document.querySelectorAll('[data-modal-id]'))
        const htmlModals = dataModalsIds.filter((el) => el.tagName !== 'BUTTON');
        htmlModals.forEach((el) => el.classList.add('hidden-content'))

        document.addEventListener('click', (event) => {
            const target = event.target;
            if((target as HTMLButtonElement).tagName === 'BUTTON') {
                const datasetValue = (target as HTMLButtonElement).dataset.modalId
                const htmlModal = document.querySelector(`[data-modal-id=${datasetValue}]`) as HTMLElement;
                const template = `
                    <div class="${this.modalWrapperClass}">
                        <div class="modal-backdrop"></div>
                        <div class="modal-container">
                            ${htmlModal.innerHTML}
                        </div>
                    </div> 
                `;
                document.body.insertAdjacentHTML('beforeend', template);
                this.animateModal();
            }
        })
    }
}

window.SModals = SModals;