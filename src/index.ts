import './style/index.scss'
import { TModalOptions } from './model/modal'

class SModals {
    selector: string
    options?: TModalOptions

    constructor(selector: string, options?: TModalOptions) {
        this.selector = selector
        this.options = options
        if (this.options?.onlyOpenButton) {
            // TODO: add just btn option
            // const openModalBtns = document.querySelectorAll(selector)
            // console.log('openModalBtns: ', openModalBtns)
            return
        }
        this.initRenderListeners()
    }

    private initRenderListeners() {
        const cards = document.querySelectorAll(this.selector)
        cards.forEach((card) => {
            const openBtn = card.querySelector('.open-modal-btn')
            openBtn
                ? openBtn.addEventListener('click', () =>
                      this.renderModal(card as HTMLElement)
                  )
                : card.addEventListener('click', () =>
                      this.renderModal(card as HTMLElement)
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
            contentElement.dataset.modaltitle || this.options?.modalTitle
        const header = title ? `<h2 class="modal-header">${title}</h2>` : ''
        const imgContent = Array.from(
            contentElement.querySelectorAll('[data-modalimg]')
        ).reduce((prev, cur) => {
            console.log(cur.getAttribute('src'));
            return (prev += `
            <div class='img-wrap'>
                <img src="${cur.getAttribute('src')}" alt="${cur.getAttribute(
                'alt'
            )}">
            </div>`)
        }, ``)
        const textContent = Array.from(
            contentElement.querySelectorAll('[data-modaltext]')
        ).reduce((prev, cur) => {
            return (prev += `<p>${cur.textContent}</p>`)
        }, ``)

        const template = `
            <div class="modal-wrapper">
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
        document.body.insertAdjacentHTML('beforeend', template)
    }

    private unMountModal() {
        document.querySelector('.modal-wrapper')?.remove()
    }
}

window.SModals = SModals;