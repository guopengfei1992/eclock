var APPID = 1313260295;

// 初始化ga上报
ga('create', 'UA-69564068-1', 'auto');
ga('send', 'pageview');

/*
* @method get uuid
* localStorage 没有则生成一个uuid
* */
var getUuid = function () {

    var uuid = localStorage && localStorage.getItem('eclock_uuid');

    if(uuid) {
        return uuid;
    }else {
        uuid = 'eclock' + new Date().getTime() + Math.round(Math.random() * Math.pow(10, 10));
        localStorage && localStorage.setItem('eclock_uuid', uuid);
    }

    return uuid;
};

/*
* @method 上报mdata 和 GA
* @param {String} eventName 事件名称
* */
module.exports = function (eventName) {
    setTimeout(function () {
        ga('send', 'event', eventName, getUuid());
        try {
            mData.push(['send', eventName, {
                appid: APPID,
                uuid : getUuid()
            }]);
        }catch (e) {
            console.log('Mdata report errors');
        }
    }, 300);
};
