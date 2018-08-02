//TODO userprofile ma vako videos ko tags haru manually add garne db ma later. else wont work

// let userLikes=[
//     {title:'article1',value:1},
//     {title:'article2',value:-1},
//     {title:'article3',value:0},
//     {title:'article4',value:0},
//     {title:'article5',value:0},
//     {title:'article6',value:1}];
//
// let videoList=[
//     {title:'article1',tags:['BigData','Python','Learning']}
//     ,{title:'article2',tags:['R','Python','Machine Learning']}
//     ,{title:'article3',tags:['Machine Learning','Learning']}
//     ,{title:'article4',tags:['Python','Machine Learning']}
//     ,{title:'article5',tags:['R']}
//     ,{title:'article6',tags:['BigData','Machine Learning']}
// ];



//global namespace of tag is ecxlicaity defeined
//this is only  temporary
 let tags=['bigdata','python','learning','r','machine_learning','samsung','node.js','bitcoin','football','programming','javascript'];

//tags is the global arrray of all tags available for the user
module.exports.getRecommendedVideos = function (userLikes, videosList) {

    let normalizedVideo = []; // we add array of objects here
    let arr = [];


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
            if (x.title === item.title) {

                obj = item;
                obj['value'] = x.value;
            }
        });
        if (obj.title) {
            arr.push(obj);
        }
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
        for (let x in item) {
            if (x !== 'title') {
                if (!idf[x]) idf[x] = 0;
                if (!userProfileObj[x]) userProfileObj[x] = 0;
                if (!item[x]) item[x] = 0;

                pred += item[x] * idf[x] * userProfileObj[x];
            }
        }
        articlePredObj[item.title] = pred;
        articlePred.push(articlePredObj);

    });
    return articlePred;
};


//Testing file of the recommender Engine
//
// let userLikes=[
//     {title:'article1',value:1},
//     {title:'article2',value:-1},
//     {title:'article3',value:0},
//     {title:'article4',value:0},
//     {title:'article5',value:0},
//     {title:'article6',value:1}];
//
// let videoList=[
//     {title:'article1',tags:['BigData','Python','Learning']}
//     ,{title:'article2',tags:['R','Python','Machine Learning']}
//     ,{title:'article3',tags:['Machine Learning','Learning']}
//     ,{title:'article4',tags:['Python','Machine Learning']}
//     ,{title:'article5',tags:['R']}
//     ,{title:'article6',tags:['BigData','Machine Learning']}
// ];
// let tags=['BigData','Python','Learning','R','Machine Learning'];
// //tags is the global arrray of all tags available for the user
//
//
// let normalizedVideo = []; // we add array of objects here
// let arr = [];
//
// let userProfile = {};
//
// //initially normalizing the tags of the videos
//
// videoList.map(item => {
//     let normalizedVideoObject = {};
//
//     normalizedVideoObject['title'] = item.title;
//
//     item.tags.map(tag => {
//         normalizedVideoObject[tag] = 1 / Math.sqrt(item.tags.length);
//     });
//     normalizedVideo.push(normalizedVideoObject);
// });
//
// console.log(normalizedVideo);
//
// normalizedVideo.map(item => {
//     let obj = {};
//
//     userLikes.map(x => {
//         if (x.title === item.title) {
//
//
//             obj = item;
//             obj['value'] = x.value;
//
//         }
//     });
//     if(obj.title){
//         arr.push(obj);
//     }
// });
// console.log(arr);
//
//
// let userProfileObj = {};
// let idf = {};
// //now calculation user profiles by dot product of userLikes and normalized video array
// // and caculating the idf for each tag
// tags.map(item => {
//     let dfCount = 0;
//     let temp = 0;
//     arr.map(a => {
//         if (a[item]) {
//             temp += (a[item] * a.value);
//             dfCount++;
//         }
//
//     });
//     userProfileObj[item] = temp;
//     console.log(dfCount+'   '+item  );
//     idf[item] = Math.log(videoList.length / dfCount) / Math.log(10);
// });
// console.log(userProfileObj);
// console.log(idf);
//
//
// //now taking the dot product of all the elements and getting suggestion list
// let articlePred = [];
// normalizedVideo.map(item => {
//     let articlePredObj = {};
//     let pred = 0;
//
//     for (let x in item) {
//         if (x !== 'title') {
//             if (!idf[x]) idf[x] = 0;
//             if (!userProfileObj[x]) userProfileObj[x] = 0;
//             if (!item[x]) item[x] = 0;
//
//             pred += item[x] * idf[x] * userProfileObj[x];
//         }
//     }
//     articlePredObj[item.title] = pred;
//     articlePred.push(articlePredObj);
//
// });
// console.log( articlePred);
//
//
//
