const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last');
const x = localStorage.getItem('x')
const xObject = JSON.parse(x);
// let matcht = /([0-9a-z.]+)?/i;
// let matcht = /([0-9a-zA-z.]+)/
window.hasMap = xObject || [
    { logo: 'B', url: 'https://www.bilibili.com/' }
]
const render = () => {
    $siteList.find('li:not(.last)').remove()//找到siteList下面的所有li除了last
    hasMap.forEach((node, index) => {
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${removeX(node.url)}</div>
                <div class="close"><svg class="icon">
                <use xlink:href="#icon-close"></use>
              </svg></div>
    </li>`).insertBefore($lastLi);
        $li.on('click', (e) => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation();//阻止冒泡
            hasMap.splice(index, 1)
            render();
        })
        $('.link').css('text-overflow', 'ellipsis')
    })
}
const removeX = (url) => {
    return url.replace('http://', '').replace('https://', '').replace('www.', '').replace(/\/.*/, '')
}

render();

$('.add').on('click', (e) => {
    let url = window.prompt();
    url = url.trim();//去空格
    console.log(typeof url)
    console.log(url.indexOf('http'))
    console.log(url)
    if (url !== '') {//url没有填写的话不是undefined,而是''
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url;
        }
        hasMap.push({ logo: removeX(url)[0], url: url })
    }
    console.log("hasMap")

    render();
})

//用户关闭时
window.onbeforeunload = () => {
    const string = JSON.stringify(hasMap)
    localStorage.setItem('x', string)
}

$(document).on('keypress', (e) => {
    const { key } = e;
    for (let i = 0; i < hasMap.length; i++) {
        if (hasMap[i].logo.toLowerCase() === key) {
            window.open(hasMap[i].url)
        }
    }
})

//parcel build src/index.html --no-optimize --public-url https://hecoco.github.io/hekeren/dist/