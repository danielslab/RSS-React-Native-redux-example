import {DOMParser} from 'xmldom';
let sectionId = 0;

let fetch = (url) => (
    new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();

        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
                return;
            }

            if (request.status === 200) {
                resolve(request.responseText);
            } else {
                reject(e);
            }
        };

        request.open('GET', url);
        request.send();
    })
);

let parseSections = (xml) => (
    new Promise((resolve) => {
        let i;
        let items;
        result = [];
        items = xml.getElementsByTagName('item');
        i = 0;
        while (i < items.length) {
            if (items.hasOwnProperty(i)) {
                let enclosure = items[i].getElementsByTagName('enclosure')[0]
                result.push({
                    id: i,
                    title: items[i].getElementsByTagName('title')[0].textContent,
                    link: items[i].getElementsByTagName('link')[0].textContent,
                    description: items[i].getElementsByTagName('description')[0].textContent,
                    date: items[i].getElementsByTagName('pubDate')[0].textContent,
                    faviconUrl: enclosure && enclosure.getAttribute('url')
                });

                i++;
            }
        }

        resolve(result);
    })
);

let parseHeader = (xml) => (
    new Promise((resolve) => {
        let image = xml.getElementsByTagName('image')[0];
        let result = {
                id: `section-${++sectionId}`,
                title: xml.getElementsByTagName('title')[0].textContent,
                link: xml.getElementsByTagName('link')[0].textContent,
                faviconUrl: image && image.getElementsByTagName('url')[0].textContent,
        };
        resolve(result);
    })
);
let parseResult = (response) => (
    new Promise((resolve, reject) => {
        let dom = new DOMParser({
            errorHandler: {
                warning: reject,
                error: reject,
                fatalError: reject
            }
        }).parseFromString(response, 'text/xml');

        resolve(dom);
    })
);


let parseRss = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url).then(parseResult, reject).then(parseSections, reject).then(resolve, reject);
    });
};

let parseRSSHeader = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url).then(parseResult, reject).then(parseHeader, reject).then(resolve, reject);
    });
};

export {
    parseRss,
    parseRSSHeader
};

