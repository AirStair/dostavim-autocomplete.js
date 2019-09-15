/*
* <dostavim-select data-name="name" data-label="label" data-json='[{"keyProperty": 1, "textProperty": "1"}]' />
*/
class DostavimSelect extends HTMLElement {
   constructor() {
        super();
   }
   connectedCallback() {   
        this.divSection = document.createElement('div');
        this.div = document.createElement('div');

        this.label = document.createElement('div');
        this.input = document.createElement('input');
        this.hiddenInput = document.createElement('input');
        this.button = document.createElement('div');
        this.icon = document.createElement('div');

        this.listSection = document.createElement('div');
        this.list = document.createElement('div');

        this.div.style.cssText = 'display:-webkit-box;display:flex';
        this.div.style.fontFamily = 'sans-serif';
        this.div.style.fontSize = '13px';

        this.label.textContent = this.getAttribute('data-label');
        this.label.style.color = 'grey';
        this.label.style.position = 'absolute';
        this.label.style.top = '20px';
        this.label.style.left = '25px';

        this.input.style.width = '100%';
        this.input.style.border = '1px solid lightgrey';
        this.input.style.borderRight = '0';
        this.input.style.borderTopLeftRadius = '5px';
        this.input.style.borderBottomLeftRadius = '5px';
        this.input.style.fontSize = '16px';
        this.input.style.padding = '30px 15px 19px 15px';

        this.hiddenInput.type = 'hidden';
        this.hiddenInput.name = this.getAttribute('data-name');

        this.button.style.width = '25px';
        this.button.style.background = 'white';
        this.button.style.border = '1px solid lightgrey';
        this.button.style.borderTopRightRadius = '5px';
        this.button.style.borderBottomRightRadius = '5px';
        this.button.style.cursor = 'pointer';
        this.button.style.padding = '16px 10px 5px 10px';

        this.icon.style.width = '10px';
        this.icon.style.height = '10px';
        this.icon.style.borderTop = '1px solid black';
        this.icon.style.borderLeft = '1px solid black';
        this.icon.style.transform = 'rotate(-135deg)';
        this.icon.style.webkitTransition = '.2s all';
        this.icon.style.transition = '.2s all';
        this.icon.style.marginTop = '10px';
        this.icon.style.marginLeft = 'auto';
        this.icon.style.marginRight = 'auto';

        this.listSection.style.fontFamily = 'sans-serif';
        this.listSection.style.position = 'relative';

        this.list.style.display = 'none';
        this.list.style.width = '100%';
        this.list.style.outline = '1px solid lightgrey';
        this.list.style.marginTop = '5px';
        this.list.style.position = 'absolute';
        this.list.style.zIndex = '1';

        this.input.addEventListener('focus', function () {
            this.list.style.display = 'block';
            this.icon.style.transform = 'rotate(45deg)';
            this.icon.style.marginTop = '15px';
        }.bind(this));

        this.button.addEventListener('click', function () {
            if (this.list.style.display === 'none') {
                this.list.style.display = 'block';
                this.icon.style.transform = 'rotate(45deg)';
                this.icon.style.marginTop = '15px';
            } else if (this.list.style.display === 'block') {
                this.list.style.display = 'none';
                this.icon.style.transform = 'rotate(-135deg)';
                this.icon.style.marginTop = '10px';
            }
        }.bind(this));

        document.addEventListener('click', function (e) {
            if (e.target !== this.input && e.target !== this.button && e.target !== this.icon && e.target !== this.list && e.target !== this.item) {
                this.list.style.display = 'none';
                this.icon.style.transform = 'rotate(-135deg)';
                this.icon.style.marginTop = '10px';
            }
        }.bind(this));

        this.data = JSON.parse(this.getAttribute('data-json'));     

        for (this.index in this.data) {
            this.item = document.createElement('div');

            this.item.style.fontSize = '16px';
            this.item.style.cursor = 'pointer';
            this.item.style.padding = '10px 15px 10px 15px';

            this.item.setAttribute('data-key-property', this.data[this.index].keyProperty);
            this.item.textContent = this.data[this.index].textProperty;

            this.item.addEventListener('click', function (e) {
                this.input.value = e.target.textContent;
                this.hiddenInput.value = e.target.getAttribute('data-key-property');

                this.list.style.display = 'none';
                this.icon.style.transform = 'rotate(-135deg)';
                this.icon.style.marginTop = '10px';
            }.bind(this));

            this.item.addEventListener('mouseover', function (e) {
                e.target.style.background = 'lightgrey';
            }.bind(this));

            this.item.addEventListener('mouseout', function (e) {
                e.target.style.background = 'white';
            }.bind(this));

            this.list.appendChild(this.item);
        }

        this.current = 0;
        this.input.addEventListener('keydown', function (e) {
            for (this.childElementIndex = 0; this.childElementIndex < this.list.childElementCount; this.childElementIndex = this.childElementIndex + 1) {
                this.list.children[this.childElementIndex].style.background = 'white';
            }
            if (e.key === 'ArrowDown' && this.current !== this.data.length) {
                e.target.value = this.data[this.current].text;
                this.hiddenInput.value = this.data[this.current].key;
                this.list.children[this.current].style.background = 'lightgrey';
                this.current = this.current + 1;

            } else if (e.key === 'ArrowUp' && this.current !== 0) {
                this.current = this.current - 1;
                e.target.value = this.data[this.current].text;
                this.hiddenInput.value = this.data[this.current].key;
                this.list.children[this.current].style.background = 'lightgrey';
            }
        }.bind(this));

        this.input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                this.list.style.display = 'none';
            }
        }.bind(this));

        this.div.appendChild(this.label);
        this.div.appendChild(this.input);
        this.button.appendChild(this.icon);
        this.div.appendChild(this.button);

        this.listSection.appendChild(this.list);

        this.appendChild(this.div);
        this.appendChild(this.hiddenInput);
        this.appendChild(this.listSection);
   }
}

customElements.define('dostavim-select', DostavimSelect);
