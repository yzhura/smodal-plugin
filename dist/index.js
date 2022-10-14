function ___$insertStyle(css) {
    if (!css || typeof window === 'undefined') {
        return;
    }
    const style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.innerHTML = css;
    document.head.appendChild(style);
    return css;
}

___$insertStyle(".modal-backdrop, .modal-wrapper {\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n}\n\n.modal-wrapper {\n  position: fixed;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-backdrop {\n  position: absolute;\n  background: rgba(0, 0, 0, 0.6);\n  z-index: 500;\n}\n.modal-container {\n  z-index: 700;\n  background: #fff;\n  max-width: 600px;\n  border-radius: 4px;\n  box-shadow: rgba(0, 0, 0, 0.2) 0px 11px 15px -7px, rgba(0, 0, 0, 0.14) 0px 24px 38px 3px, rgba(0, 0, 0, 0.12) 0px 9px 46px 8px;\n}\n.modal-header {\n  padding: 16px 24px;\n  margin: 0;\n}\n.modal-body {\n  padding: 20px 24px;\n}\n.modal-actions {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  padding: 8px;\n}");

var SModals = /** @class */ (function () {
    function SModals(selector, options) {
        var _a;
        this.selector = selector;
        this.options = options;
        if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.onlyOpenButton) {
            // TODO: add just btn option
            // const openModalBtns = document.querySelectorAll(selector)
            // console.log('openModalBtns: ', openModalBtns)
            return;
        }
        this.initRenderListeners();
    }
    SModals.prototype.initRenderListeners = function () {
        var _this = this;
        var cards = document.querySelectorAll(this.selector);
        cards.forEach(function (card) {
            var openBtn = card.querySelector('.open-modal-btn');
            openBtn
                ? openBtn.addEventListener('click', function () {
                    return _this.renderModal(card);
                })
                : card.addEventListener('click', function () {
                    return _this.renderModal(card);
                });
        });
        document.addEventListener('click', function (event) {
            if (event.target instanceof Element) {
                var target = event.target;
                var targetClasses = target.classList;
                if (targetClasses.contains('modal-button-close') ||
                    targetClasses.contains('modal-backdrop')) {
                    _this.unMountModal();
                }
            }
        });
    };
    SModals.prototype.renderModal = function (contentElement) {
        var _a, _b;
        var title = contentElement.dataset.modaltitle || ((_a = this.options) === null || _a === void 0 ? void 0 : _a.modalTitle);
        var header = title ? "<h2 class=\"modal-header\">".concat(title, "</h2>") : '';
        var imgContent = Array.from(contentElement.querySelectorAll('[data-modalimg]')).reduce(function (prev, cur) {
            console.log(cur.getAttribute('src'));
            return (prev += "\n            <div class='img-wrap'>\n                <img src=\"".concat(cur.getAttribute('src'), "\" alt=\"").concat(cur.getAttribute('alt'), "\">\n            </div>"));
        }, "");
        var textContent = Array.from(contentElement.querySelectorAll('[data-modaltext]')).reduce(function (prev, cur) {
            return (prev += "<p>".concat(cur.textContent, "</p>"));
        }, "");
        var template = "\n            <div class=\"modal-wrapper\">\n                <div class=\"modal-backdrop\"></div>\n                <div class=\"modal-container\">\n                    ".concat(header, "\n                    <div class=\"modal-body\">\n                        ").concat(imgContent, "\n                        ").concat(textContent, "\n                    </div>\n                    <div class=\"modal-actions\">\n                        <button class=\"modal-button-close\">").concat(((_b = this.options) === null || _b === void 0 ? void 0 : _b.btnCloseText) || 'Close', "</button>\n                    </div>\n                </div>\n            </div> \n        ");
        document.body.insertAdjacentHTML('beforeend', template);
    };
    SModals.prototype.unMountModal = function () {
        var _a;
        (_a = document.querySelector('.modal-wrapper')) === null || _a === void 0 ? void 0 : _a.remove();
    };
    return SModals;
}());
window.SModals = SModals;
//# sourceMappingURL=index.js.map
