import Realm from 'realm';

const FeedSchema = {
    name: 'Feed',
    properties: {
        id: 'string',
        channel: 'Channel',
        is_bookmarked: 'bool',
        date: 'date',
        title: 'string',
        subtitle: 'string',
        faviconUrl: 'string'
    }
};

const ChannelSchema = {
    name: 'Channel',
    properties: {
        id: 'string',
        feeds: {
            type: 'list',
            objectType: 'Feed',
        },
        tagsMask: {
            type: 'list',
            objectType: 'TagMask'
        },
        url: 'string',
        faviconUrl: {type: 'string', optional: true},
        name: 'string',
    }
};

const TagMaskSchema = {
    name: 'TagMask',
    properties: {
        name: 'string',
        isChecked: 'bool',
    }
};

const TagSchema = {
    name: 'Tag',
    properties: {
        name: 'string',
    }
};

let realm = new Realm({schema: [FeedSchema, ChannelSchema, TagMaskSchema, TagSchema], schemaVersion: 4});
export default realm;