// ==UserScript==
// @name         更好的Steam购愿望单
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       wushuo
// @match        https://store.steampowered.com/wishlist/profiles/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=steampowered.com
// @grant        none
// ==/UserScript==

(() => {
    let content = document.querySelector('#responsive_page_template_content');
    let calculateThePriceButton = document.createElement('a');
    calculateThePriceButton.className = 'btn_green_steamui btn_medium noicon'
    calculateThePriceButton.innerHTML = '<span>计算总价格</span>'
    content.append(calculateThePriceButton)

    calculateThePriceButton.onclick = () => {
        let entries = Object.entries(document.querySelectorAll('.discount_final_price'));

        // 愿望单为空
        if (!entries.length) {
            alert('愿望单为空！')
            return;
        }

        // 获得货币符号
        let currency = entries[0][1].innerText.at(0);

        // 总价格
        let totalCost = 0;

        // 计算总价格
        entries.map(v => Number.parseFloat(v[1].innerText.substring(1).trim()))
            .forEach(v => totalCost += v)

        // 输出总价格
        alert(`${currency} ${totalCost}`)
    }

    let addCartButton = document.createElement('a');
    addCartButton.className = 'btn_green_steamui btn_medium noicon'
    addCartButton.innerHTML = '<span>全部添加至购物车</span>'
    content.append(addCartButton)

    addCartButton.onclick = () => {

        let buttons = Object.entries(document.querySelectorAll('.purchase_area')).map(v => v[1].childNodes[1])
            .filter(v => v.tagName.toLowerCase() === 'form')

        // 获取表单参数
        buttons.forEach(v => {
            let xhr = new XMLHttpRequest();
            let url = 'https://store.steampowered.com/cart/'
            xhr.open('POST', url, false, null, null)

            let formData = new FormData();
            v.childNodes.forEach(b => {
                if (!b.name) {
                    return;
                }
                formData.append(b.name, b.value);
            })
            // 发送表单
            xhr.send(formData)
        })
    }


})()