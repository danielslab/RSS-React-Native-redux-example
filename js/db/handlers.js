/**
 * Created by denissamohvalov on 21.03.17.
 */

import realm from './schemas';

export function getTags() {
    let objects = realm.objects('Tag');
    let out = [];
    for (let i = 0; i < objects.length; ++i) {
        out.push(objects[i].name);
    }
    return out;
}

export function commitTags(tags) {
    console.log("Commit");
    let channels = realm.objects('Channel');
    realm.write(() => {
        for (let i = 0; i < channels.length; ++i) {
            for (let j = 0; j < tags.length; ++j) {
                let tag = channels[i].tagsMask.filtered('name = "' + tags[j] + '"')[0];
                if (!tag) {
                    console.log('GOT A TAG', tags[j]);
                    channels[i].tagsMask.push({name: tags[j], isChecked: false});
                }
            }
            let set = new Set(tags);
            let newMask = [];
            for (let j = 0; j<channels[i].tagsMask.length; ++j) {
                if (set.has(channels[i].tagsMask[j].name)) {
                    newMask.push(channels[i].tagsMask[j]);
                }
            }
            channels[i].tagsMask = newMask;
        }
        let oldTags = realm.objects('Tag');
        realm.delete(oldTags);
        for (let i = 0; i < tags.length; ++i) {
            realm.create('Tag', {name: tags[i]});
        }
    });
}

export function commitChannelTagsMask(tagsMask, channelId) {
    let channel = realm.objects('Channel').filtered('id = "' + channelId + '"')[0];
    realm.write(() => {
        realm.delete(channel.tagsMask);
        for (let i = 0; i < tagsMask.length; ++i) {
            channel.tagsMask.push({name: tagsMask[i].name, isChecked: tagsMask[i].isChecked});
        }
    });
}

export function getChannelTagsMask(channelId) {
    let out = [];
    let channel = realm.objects('Channel').filtered('id = "' + channelId + '"')[0];
    for (let i = 0; i < channel.tagsMask.length; ++i) {
        out.push({
            name: channel.tagsMask[i].name,
            isChecked: channel.tagsMask[i].isChecked,
        });
    }
    return out;
}

export function editTagMask(channelId, tag, value) {
    let channel = realm.objects('Channel').filtered('id = "' + channelId + '"')[0];
    realm.write(() => {
        for (let i = 0; i < channel.tagsMask.length; ++i) {
            if (channel.tagsMask[i].name === tag) {
                channel.tagsMask[i].isChecked = value;
            }
        }
    });
}
export function deleteChannel(id) {
    let out = [];
    let toDelete = realm.objects('Channel').filtered('id = "' + id + '"');
    realm.write(() => {
        realm.delete(toDelete);
    });
}

export function editChannel(id, url, name, faviconUrl) {
    realm.write(() => {
        let toEdit = realm.objects('Channel').filtered('id = "' + id + '"')[0];
        toEdit.url = url;
        toEdit.name = name;
        toEdit.faviconUrl = faviconUrl || '';
    });
}

export function getChannels() {
    let out = [];
    let channels = realm.objects('Channel');
    console.log("Channels", channels);
    for (let i = 0; i < channels.length; ++i) {
        out.push({
            id: channels[i].id,
            url: channels[i].url,
            name: channels[i].name,
            faviconUrl: channels[i].faviconUrl,
        });
    }
    return out;
}

export function getChannelById(id) {
    let channel = realm.objects('Channel').filtered('id = "' + id + '"')[0];
    return channel;
}

export function addChannel(id, url, name, faviconUrl) {
    realm.write(() => {
        let tags = getTags();
        let channel = realm.create('Channel', {id, url, name, faviconUrl: faviconUrl || ''});
        for (let i = 0; i < tags.length; ++i) {
            channel.tagsMask.push({name: tags[i], isChecked: false});
        }
    });
}