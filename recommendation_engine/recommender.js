//TODO userprofile ma vako videos ko tags haru manually add garne db ma later. else wont work


//tags is the global arrray of all tags available for the user
module.exports.getRecommendedVideos = function (userLikes, videosList, tags) {

    let normalizedVideo = []; // we add array of objects here
    let arr = [];

    let userProfile = {};

//initially normalizing the tags of the videos
    videosList.map(item => {
        let normalizedVideoObject = {};

        normalizedVideoObject['title'] = item.title;

        item.tags.map(tag => {
            normalizedVideoObject[tag] = 1 / Math.sqrt(item.tags.length);
        });
        normalizedVideo.push(normalizedVideoObject);
    });


    normalizedVideo.map(item => {
        let obj = {};

        userLikes.map(x => {
            if (x.title = item.title) {
                if (userLikes.value !== 0) {
                    obj["value"] = userLikes.value;
                    obj = x;
                }
            }
        });
        arr.push(obj);

    });


    let userProfileObj = {};
    let idf = {};
    //now calculation user profiles by dot product of userLikes and normalized video array
    // and caculating the idf for each tag
    tags.map(item => {
        let dfCount = 0;
        let temp = 0;
        arr.map(a => {
            if (a[item]) {
                temp += (a[item] * a.value);
                dfCount++;
            }

        });
        userProfileObj[item] = temp;
        idf[item] = Math.log(videosList.length / dfCount) / Math.log(10);
    });


    //now taking the dot product of all the elements and getting suggestion list
    let articlePred = [];
    normalizedVideo.map(item => {
        let articlePredObj = {};
        let pred = 0;
        for (let x of item) {
            if (x !== 'title') {
                if (!idf[x]) idf[x] = 0;
                if (!userProfileObj[x]) userProfileObj[x] = 0;
                if (!item[x]) item[x] = 0;

                pred += item[x] * idf[x] * userProfileObj[x];
            }
        }
        articlePredObj[item.title] = pred;

    });

};
