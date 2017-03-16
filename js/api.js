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

let parseXML = (xml) => (
    new Promise((resolve) => {
        let i;
        let items;
        let result = {
            header: {
                id: `section-${++sectionId}`,
                title: xml.getElementsByTagName('title')[0].textContent,
                link: xml.getElementsByTagName('link')[0].textContent
            },
            sections: []
        };

        items = xml.getElementsByTagName('item');
        i = 0;

        while (i < items.length) {
            if (items.hasOwnProperty(i)) {
                result.sections.push({
                    id: i,
                    title: items[i].getElementsByTagName('title')[0].textContent,
                    link: items[i].getElementsByTagName('link')[0].textContent,
                    description: items[i].getElementsByTagName('description')[0].textContent
                });

                i++;
            }
        }

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
        fetch(url).then(parseResult, reject).then(parseXML, reject).then(resolve, reject);
    });
};

export {parseRss};

