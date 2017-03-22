import Realm from 'realm';

const FeedSchema = {
    name: 'Feed',
    properties: {
        id: 'string',
        channel: 'Channel',
        is_bookmarked: {type: 'bool', default: false},
        date: 'date',
        title: 'string',
        description: 'string',
        faviconUrl: {type: 'string', optional: true},
        url: 'string',
        wasSeen: {type: 'bool', default: false}
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

let realm = new Realm({schema: [FeedSchema, ChannelSchema, TagMaskSchema, TagSchema], schemaVersion: 8});
export default realm;