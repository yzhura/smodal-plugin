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

___$insertStyle(".modal-backdrop, .modal-wrapper {\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n}\n\n[data-modal-id].hidden-content {\n  display: none;\n}\n\n.modal-wrapper {\n  position: fixed;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-wrapper.active .modal-backdrop {\n  opacity: 1;\n}\n.modal-wrapper.active .modal-container {\n  opacity: 1;\n  transform: scale(1);\n}\n.modal-backdrop {\n  position: absolute;\n  background: rgba(0, 0, 0, 0.6);\n  z-index: 500;\n  transition: 0.2s ease-out opacity;\n  opacity: 0;\n}\n.modal-container {\n  z-index: 700;\n  background: #fff;\n  max-width: 600px;\n  border-radius: 4px;\n  box-shadow: rgba(0, 0, 0, 0.2) 0px 11px 15px -7px, rgba(0, 0, 0, 0.14) 0px 24px 38px 3px, rgba(0, 0, 0, 0.12) 0px 9px 46px 8px;\n  opacity: 0;\n  transform: scale(0.8);\n  transition: 0.2s ease-out opacity, 0.2s ease-out transform;\n}\n.modal-header {\n  padding: 16px 24px;\n  margin: 0;\n}\n.modal-body {\n  padding: 20px 24px;\n}\n.modal-actions {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  padding: 8px;\n}");

var SModals = /** @class */ (function () {
    function SModals(selector, options) {
        this.modalWrapperClass = 'modal-wrapper';
        this.renderTimeoutSpeed = 200;
        this.selector = selector;
        this.options = options;
        this.renderTimeoutSpeed =
            (options === null || options === void 0 ? void 0 : options.renderTimeoutSpeed) || this.renderTimeoutSpeed;
        this.bindHtmlModals();
        if (this.selector) {
            this.initCardOpenersListeners();
        }
        this.initCloseEventListeners();
    }
    SModals.prototype.initCardOpenersListeners = function () {
        var _this = this;
        if (!this.selector) {
            throw new Error('Provide class name into constructor. Example: new SModals(".card")');
        }
        var actionItems = document.querySelectorAll(this.selector);
        actionItems.forEach(function (actionElement) {
            var openBtn = actionElement.querySelector('.open-modal-btn');
            openBtn
                ? openBtn.addEventListener('click', function () {
                    return _this.renderModal(actionElement);
                })
                : actionElement.addEventListener('click', function () {
                    return _this.renderModal(actionElement);
                });
        });
    };
    SModals.prototype.initCloseEventListeners = function () {
        var _this = this;
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
        var title = contentElement.dataset.modalTitle || ((_a = this.options) === null || _a === void 0 ? void 0 : _a.modalTitle);
        var header = title ? "<h2 class=\"modal-header\">".concat(title, "</h2>") : '';
        var imgContent = Array.from(contentElement.querySelectorAll('[data-modal-img]')).reduce(function (prev, cur) {
            return (prev += "\n            <div class='img-wrap'>\n                <img src=\"".concat(cur.getAttribute('src'), "\" alt=\"").concat(cur.getAttribute('alt'), "\">\n            </div>"));
        }, "");
        var textContent = Array.from(contentElement.querySelectorAll('[data-modal-text]')).reduce(function (prev, cur) {
            return (prev += "<p>".concat(cur.textContent, "</p>"));
        }, "");
        var template = "\n            <div class=\"".concat(this.modalWrapperClass, "\">\n                <div class=\"modal-backdrop\"></div>\n                <div class=\"modal-container\">\n                    ").concat(header, "\n                    <div class=\"modal-body\">\n                        ").concat(imgContent, "\n                        ").concat(textContent, "\n                    </div>\n                    <div class=\"modal-actions\">\n                        <button class=\"modal-button-close\">").concat(((_b = this.options) === null || _b === void 0 ? void 0 : _b.btnCloseText) || 'Close', "</button>\n                    </div>\n                </div>\n            </div> \n        ");
        document.body.insertAdjacentHTML('beforeend', template);
        this.animateModal();
    };
    SModals.prototype.unMountModal = function () {
        this.unMountAnimate();
        setTimeout(function () {
            var _a;
            (_a = document.querySelector('.modal-wrapper')) === null || _a === void 0 ? void 0 : _a.remove();
        }, this.renderTimeoutSpeed);
    };
    SModals.prototype.unMountAnimate = function () {
        var modalWrapper = document.querySelector(".".concat(this.modalWrapperClass));
        modalWrapper === null || modalWrapper === void 0 ? void 0 : modalWrapper.classList.remove('active');
    };
    SModals.prototype.animateModal = function () {
        var modalWrapper = document.querySelector(".".concat(this.modalWrapperClass));
        setTimeout(function () {
            modalWrapper === null || modalWrapper === void 0 ? void 0 : modalWrapper.classList.add('active');
        });
    };
    SModals.prototype.bindHtmlModals = function () {
        var _this = this;
        var dataModalsIds = Array.from(document.querySelectorAll('[data-modal-id]'));
        var htmlModals = dataModalsIds.filter(function (el) { return el.tagName !== 'BUTTON'; });
        htmlModals.forEach(function (el) { return el.classList.add('hidden-content'); });
        document.addEventListener('click', function (event) {
            var target = event.target;
            if (target.tagName === 'BUTTON') {
                var datasetValue = target.dataset
                    .modalId;
                if (!datasetValue)
                    return;
                var htmlModal = document.querySelector("[data-modal-id=".concat(datasetValue, "]"));
                var template = "\n                    <div class=\"".concat(_this.modalWrapperClass, "\">\n                        <div class=\"modal-backdrop\"></div>\n                        <div class=\"modal-container\">\n                            ").concat(htmlModal.innerHTML, "\n                        </div>\n                    </div> \n                ");
                document.body.insertAdjacentHTML('beforeend', template);
                _this.animateModal();
            }
        });
    };
    return SModals;
}());
window.SModals = SModals;
//# sourceMappingURL=index.js.map
