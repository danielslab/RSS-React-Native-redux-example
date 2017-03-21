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
    let channels = realm.objects('Channel');
    realm.write(() => {
        for (let i = 0; i < channels.length; ++i) {
            for (let j = 0; j < tags.length; ++j) {
                let tag = channels[i].tagsMask.filtered('name = "' + tags[i] + '"')
                if (!tag) {
                    channels[i].tagsMask.push({name: tags[i], isChecked: false});
                }
            }
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
    for (let i = 0; i < channel.tagsMask; ++i) {
        out.push({
            name: channel[i].name,
            isChecked: channel[i].isChecked,
        });
    }
    return out;
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