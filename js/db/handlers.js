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
                let tag = channels[i].tagsMask.filtered('name = "' + tags[j] + '"')[0];
                if (!tag) {
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
    let channel = getChannelById(channelId);
    realm.write(() => {
        realm.delete(channel.tagsMask);
        for (let i = 0; i < tagsMask.length; ++i) {
            channel.tagsMask.push({name: tagsMask[i].name, isChecked: tagsMask[i].isChecked});
        }
    });
}

export function getChannelTagsMask(channelId) {
    let out = [];
    let channel = getChannelById(channelId);
    for (let i = 0; i < channel.tagsMask.length; ++i) {
        out.push({
            name: channel.tagsMask[i].name,
            isChecked: channel.tagsMask[i].isChecked,
        });
    }
    return out;
}

export function editTagMask(channelId, tag, value) {
    let channel = getChannelById(channelId);
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
    let toDelete = getChannelById(id);
    realm.write(() => {
        realm.delete(toDelete);
    });
}

export function editChannel(id, url, name, faviconUrl) {
    realm.write(() => {
        let toEdit = getChannelById(id);
        toEdit.url = url;
        toEdit.name = name;
        toEdit.faviconUrl = faviconUrl || '';
    });
}

export function getChannels() {
    return realm.objects('Channel');
}

export function getChannelById(id) {
    return realm.objects('Channel').filtered('id = $0', id)[0];
}

export function getChannelsByTag(tag) {
    return realm.objects('Channel').filtered('ANY tagsMask.name = $0', tag);
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

export function addFeeds(feeds, channel) {
    realm.write(() => {
        for (feed of feeds){
            let find = realm.objects('Feed').filtered('url = $0 AND date = $1', feed.url, new Date(feed.date))[0];
            if (!find) {
                realm.create('Feed', {
                    ...feed,
                    date: new Date(feed.date),
                    channel
                });
            }
        }
    });
}

export function getFeeds(tag, channelID, onlyBookmarked) {
    if (tag) {
        return getFeedsByTag(tag, onlyBookmarked);
    }
    if (channelID) {
        return getFeedsByChannelId(channelID, onlyBookmarked);
    }
    if (onlyBookmarked) {
        return realm.objects('Feed').filtered('is_bookmarked = true').sorted("date",{ascending: false});
    }
    return realm.objects('Feed').sorted("date",{ascending: false});
}

function getFeedsByTag(tag, onlyBookmarked) {
    let feeds =  realm.objects('Feed').sorted("date",{ascending: false});;
    if (onlyBookmarked) {
         feeds = feeds.filtered('is_bookmarked = true');
    }
    let out = [];
    for (let j = 0; j < feeds.length; ++j) {
        let tagsMask = feeds[j].channel.tagsMask;
        for (let i = 0; i < tagsMask.length; ++i) {
            if (tagsMask[i].name === tag && tagsMask[i].isChecked) {
                out.push(feeds[j]);
                break;
            }
        }
    }
    return out;
}

function getFeedsByChannelId(id, onlyBookmarked) {
    if (onlyBookmarked) {
        return realm.objects('Feed').filtered('channel.id = $0 AND is_bookmarked = true', id).sorted("date",{ascending: false});
    }
    return realm.objects('Feed').filtered('channel.id = $0', id).sorted("date",{ascending: false});
}

export function getFeedById(id) {
    return realm.objects('Feed').filtered('id = $0', id)[0];
}

export function changeFeedBookmark(id) {
    realm.write(() => {
        let feed = getFeedById(id);
        feed.is_bookmarked = !feed.is_bookmarked;
    });
}

export function setFeedSeen(id) {
    realm.write(() => {
        let feed = getFeedById(id);
        feed.wasSeen = true;
    });
}

export function getFeedStat() {
   let allFeeds =  realm.objects('Feed');
   return {
       allFeedsCount: allFeeds.length,
       unseenFeedsCount: allFeeds.filtered('wasSeen = $0', false).length,
   }
}