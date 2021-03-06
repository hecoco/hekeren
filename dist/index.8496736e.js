const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.last');
const x = localStorage.getItem('x');
const xObject = JSON.parse(x);
// let matcht = /([0-9a-z.]+)?/i;
// let matcht = /([0-9a-zA-z.]+)/
window.hasMap = xObject || [
    {
        logo: 'B',
        url: 'https://www.bilibili.com/'
    }
];
const render = ()=>{
    $siteList.find('li:not(.last)').remove() //找到siteList下面的所有li除了last
    ;
    hasMap.forEach((node, index)=>{
        const $li = $(`<li>\n            <div class="site">\n                <div class="logo">${node.logo}</div>\n                <div class="link">${removeX(node.url)}</div>\n                <div class="close"><svg class="icon">\n                <use xlink:href="#icon-close"></use>\n              </svg></div>\n    </li>`).insertBefore($lastLi);
        $li.on('click', (e)=>{
            window.open(node.url);
        });
        $li.on('click', '.close', (e)=>{
            e.stopPropagation(); //阻止冒泡
            hasMap.splice(index, 1);
            render();
        });
        $('.link').css('text-overflow', 'ellipsis');
    });
};
const removeX = (url)=>{
    return url.replace('http://', '').replace('https://', '').replace('www.', '').replace(/\/.*/, '');
};
render();
$('.add').on('click', (e)=>{
    let url = window.prompt();
    url = url.trim();
    console.log(typeof url);
    console.log(url.indexOf('http'));
    console.log(url);
    if (url !== '') {
        if (url.indexOf('http') !== 0) url = 'https://' + url;
        hasMap.push({
            logo: removeX(url)[0],
            url: url
        });
    }
    console.log("hasMap");
    render();
});
//用户关闭时
window.onbeforeunload = ()=>{
    const string = JSON.stringify(hasMap);
    localStorage.setItem('x', string);
};
$(document).on('keypress', (e)=>{
    const { key  } = e;
    for(let i = 0; i < hasMap.length; i++)if (hasMap[i].logo.toLowerCase() === key) window.open(hasMap[i].url);
}) //parcel build src/index.html --no-optimize --public-url https://hecoco.github.io/hekeren/dist/
;

//# sourceMappingURL=index.8496736e.js.map
