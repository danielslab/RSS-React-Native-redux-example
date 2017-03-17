let Realm = require('realm');

const FeedSchema = {
    name: 'Feed',
    properties: {
        id: 'string',
        is_bookmarked: 'bool',
        title: 'string',
        subtitle: 'string',
        faviconUrl: 'string'
    }
};

let realm = new Realm({schema: [FeedSchema], schemaVersion: 1});
export default realm;