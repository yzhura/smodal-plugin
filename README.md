# smodals-plugin

SModals-plugin render modals into your HTML code.

## Installation

Run:

```sh
npm i @yzhura/smodals
```

or link CDN into your HTML code:

```sh
<script src="https://cdn.jsdelivr.net/npm/@yzhura/smodals/dist/index.js" defer></script>
```

## Ho to use:

**If you wanna to create clickable HTML card make something similar:**

```sh
<div class="some-card" data-modal-title="Modal header">
    <div class="img-wrap">
        <img data-modal-img src="https://picsum.photos/200" alt="alt">
    </div>
    <p data-modal-text>Hi there! Click on "More details" button to open modal</p>
    <button class="open-modal-btn">More details</button>
</div>
```
- For classes I have styles already (but you can overwrite them)
- `class="some-card"` ---> this class will be bind in js file...
- `data-modal-title` ---> need to insert title into modal
- `data-modal-img` ---> need to insert image into modal
- `data-modal-text` ---> need to insert text into modal
- `class="open-modal-btn"` ---> static class to open modal (if this button not exist click will work on parent component, in our case this is "some-card")

and in your js file:

```sh
new SModals('.some-card');
```

- '.some-card' ---> ...comming from you HTML

**Or you can open your custom content.**
Create your HTML:

```sh
<div data-modal-id="modal-1" class="custom-modal">
    <div>
        Modal from HTML
        <button class="modal-button-close">Close</button>
    </div>
</div>
```
- `class="modal-button-close"` is a static class. Don't change it.

after that create button and bind it from data-attribute:

```sh
<button data-modal-id="modal-1">Open Modal</button>
```

- `data-modal-id` must be indentical 

## For more examples

clone this project and run:

```sh
npm i
npm run start
```

then open example.html