

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

___$insertStyle("body {\n  height: 100vh;\n  margin: 0;\n}\n\n.modal-backdrop, .modal-wrapper {\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n}\n\n.modal-wrapper {\n  position: fixed;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-backdrop {\n  position: absolute;\n  background: rgba(0, 0, 0, 0.6);\n  z-index: 500;\n}\n.modal-container {\n  z-index: 700;\n  background: #fff;\n  max-width: 600px;\n  border-radius: 4px;\n  box-shadow: rgba(0, 0, 0, 0.2) 0px 11px 15px -7px, rgba(0, 0, 0, 0.14) 0px 24px 38px 3px, rgba(0, 0, 0, 0.12) 0px 9px 46px 8px;\n}\n.modal-header {\n  padding: 16px 24px;\n  margin: 0;\n}\n.modal-body {\n  padding: 20px 24px;\n}\n.modal-actions {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  padding: 8px;\n}");
//# sourceMappingURL=index.js.map
