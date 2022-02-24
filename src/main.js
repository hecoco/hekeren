console.log($)

$('.add').on('click', (e) => {
    const url = window.prompt();
    console.log(url)
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url;
    }
})