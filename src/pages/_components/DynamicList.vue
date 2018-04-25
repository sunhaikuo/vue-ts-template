<template>
    <div class="dynamic-wrapper">
        <div class="dynamic-list" v-if="abstractList.length!==0">
            <div class="dynamic-list-item" v-for="item in abstractList">
                <div class="item-personinfo">
                    <div class="item-photo-wrap">
                        <div class="item-photo" @touchend="goUserDetail( item.isOwn,item.relatedId)">
                            <image-view :defalutBgType="2" :url="item.headImg"></image-view>
                        </div>
                        <i v-if="item.relatedType === 4" :class="certification(item.userCertType)"></i>
                    </div>
                    <div class="item-info">
                        <span class="item-info-name" @touchend="goUserDetail( item.isOwn,item.relatedId)">{{item.name}}</span>
                        <div class="item-info-time">
                            <span>{{item.locateDesc}}</span>
                            <em v-if="item.locateDesc" class="divide">·</em>
                            <span>{{ item.pulishTime | dateFormat }}</span>
                        </div>
                    </div>
                    <span v-if='!isFeedList' class="dynamic-follow-btn" @touchend="goFollow(item.relatedId)"></span>
                </div>
                <div class="item-maincontent" @click="goFeedDetail(item.feedId)">
                    <div class="item-maincontent-content" :class="{fixHeight:item.feedImageType!==3}">
                        <image-view v-if="item.feedImageType==4" :url='item.live.image'></image-view>
                        <image-view v-if="item.feedImageType==1 || item.feedImageType==2" :url='item.feedImages[0]'></image-view>
                        <img class="item-maincontent-videoimg" v-if="item.feedImageType==3" :src="item.video.image" alt="">
                    </div>
                    <!-- 直播模块 -->
                    <div class="item-islive" v-if="item.feedImageType==4">
                        <span class="item-islive-sign">LIVE</span>
                        <span class="item-islive-note">{{ item.live.title }}</span>
                    </div>
                    <!-- 视频模块 -->
                    <div class="item-isvideo" v-if="item.feedImageType==3">
                    </div>
                    <div class="item-isvideo-cishu" v-if="item.feedImageType==3 && item.video.playCount">
                        {{item.video.playCount}}次播放
                    </div>
                    <div class="item-isvideo-shichang" v-if="item.feedImageType==3">
                        {{item.video.length}}
                    </div>
                </div>
                <div class="item-operator">
                    <i class="like" @touchend="callApp(item.feedId)"></i>
                    <i class="chat" @touchend="goFeedDetail(item.feedId)"></i>
                </div>
                <div class="item-response">
                    <span v-show="item.praiseCount!==0" class="item-response-live">喜欢
                        <em>{{item.praiseCount | numerFormat }}</em>
                    </span>
                    <span v-show="item.commentCount!==0 && item.praiseCount!==0" class="divide">·</span>
                    <span v-show="item.commentCount!==0" class="item-response-live">评论
                        <em>{{item.commentCount | numerFormat}}</em>
                    </span>
                </div>
                <div class="item-movie-rate" v-if="item.feedType==1 || item.feedType==2 || item.feedType==3">
                    <span class="item-info-name">{{item.name}}</span>
                    <span class="item-movie-name">{{item.feed.content}}</span>
                </div>
                <div class="item-movie-rate" v-if="item.feedType==4 || item.feedType==5 || item.feedType==6">
                    <div>
                        <span class="item-info-name">{{item.name}}</span>
                        <span class="item-movie-name">{{item.feed.content}}</span>
                        <div class="item-recommend-wrapper">
                            <span class="item-recommend" v-if="item.feed.movie.recommendStatus==1">
                                <i class="recommend"></i>
                                <em>推荐</em>
                            </span>
                            <span class="item-norecommend" v-if="item.feed.movie.recommendStatus==2">
                                <i class="norecommend"></i>
                                <em>不推荐</em>
                            </span>
                        </div>
                    </div>
                    <div class="movie">
                        <img alt="" :src="item.feed.movie.img" @touchend="goMovieDetail(item.feed.movie.movieId)">
                        <p class="left">
                            <span>{{item.feed.movie.name }}（{{item.feed.movie.year}}）</span>
                            <span>{{item.feed.movie.nameEn}}</span>
                        </p>
                        <div class="right">
                            <i></i>
                            <div>
                                <p>
                                    <span>{{item.feed.movie.recommendRate}}</span>
                                    <span>%</span>
                                </p>
                                <p>推荐指数</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="line"></div>
            </div>
        </div>
        <div class="dynamic-empty" v-else>
            <img src="../_assets/images/monkey_cry.png" alt="">
            <p>{{emptyText}}</p>
        </div>
    </div>
</template>
<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import imageView from 'Component/ImageView.vue'
import { Prop } from 'vue-property-decorator'
@Component({
    components: {
        imageView
    }
})
export default class DynamicList extends Vue {
    @Prop({
        default: () => {
            return []
        }
    })
    abstractList: Array<any>

    // 是否feed列表
    @Prop({
        default: false
    })
    isFeedList: boolean

    // 是否feed列表
    @Prop({
        default: '还没有任何动态哦'
    })
    emptyText: String

    // 根据类型显示认证logo
    certification(certType) {
        if (certType === 2) {
            return 'personal'
        } else if (certType === 3) {
            return 'official'
        } else {
            return ''
        }
    }

    goFeedDetail(feedId) {
        location.href = 'https://feed-party-m.mtime.cn/feed/detail/' + feedId
    }
    goUserDetail(isOwn, userId) {
        if (this.isFeedList && isOwn) {
            return
        }
        location.href = 'https://party.mtime.cn/userDetail?userId=' + userId
    }
    goFollow(userId) {
        location.href = 'https://applink-party.mtime.cn/mtlf?p=userdetail&userid=' + userId
    }
    goMovieDetail(movieId) {
        location.href = 'https://feed-party-m.mtime.cn/movie/detail/' + movieId
    }
    callApp(id) {
        location.href = 'https://applink-party.mtime.cn/mtlf?p=feeddetail&feedid=' + id
    }
}
</script>
<style lang='less' scoped>
.dynamic-list {
    .dynamic-list-item {
        padding-top: 40px;
        background: white;
        &:first-child {
            margin-top: 0px;
        }
    }
    .item-personinfo {
        padding: 0px 30px;
        font-size: 0px;
        display: flex;
        justify-content: space-between;
        height: 80px;
        .item-photo-wrap {
            height: 80px;
            width: 80px;
            position: relative;
            i {
                height: 26px;
                width: 26px;
                position: absolute;
                right: 0;
                bottom: 0;
            }
            .official {
                background: url('../_assets/images/official_small.png') no-repeat;
                background-size: 100%;
            }
            .personal {
                background: url('../_assets/images/personal_small.png') no-repeat;
                background-size: 100%;
            }
        }
        .item-photo {
            height: 80px;
            width: 80px;
            border-radius: 40px;
            overflow: hidden;
            flex-shrink: 0;
        }
        .item-info {
            margin-left: 20px;
            margin-right: 20px;
            flex: 1;
            min-width: 300px;
        }
        .item-info-name {
            font-size: 30px;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
        }
        .item-info-time {
            margin-top: 5px;
            width: 100%;
            color: #999999;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 24px;
            .divide {
                padding: 0px 10px;
            }
        }
        .dynamic-follow-btn {
            width: 90px;
            height: 50px;
            background: url('../_assets/images/follow.png') no-repeat;
            background-size: contain;
            flex-shrink: 0;
            &:active {
                opacity: 0.5;
            }
            margin-top: 15px;
        }
    }
    .item-maincontent {
        margin-top: 30px;
        font-size: 0px;
        position: relative;
        .item-maincontent-content {
            min-height: 300px;
        }
        .fixHeight {
            height: 750px;
        }
        .item-maincontent-videoimg {
            display: inline-block;
            width: 100%;
            min-height: 300px;
            background: url('../_assets/images/logo.png') no-repeat;
            background-color: #f2f2f2;
            background-position: center;
        }
        .item-islive {
            position: absolute;
            bottom: 0px;
            height: 100px;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.4);
            line-height: 100px;
            padding: 0 30px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .item-islive-sign {
            width: 64px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background-color: #ff454f;
            border-radius: 6px;
            font-size: 23px;
            color: white;
            font-weight: lighter;
        }
        .item-islive-note {
            flex: 1;
            margin-left: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: white;
            min-width: 500px;
            font-size: 30px;
            font-weight: lighter;
        }
        .item-isvideo {
            position: absolute;
            height: 100px;
            width: 100px;
            top: 50%;
            left: 50%;
            margin-top: -50px;
            margin-left: -50px;
            border-radius: 50px;
            text-align: center;
            background: url('../_assets/images/play.png') no-repeat;
            background-size: contain;
        }
        .item-isvideo-cishu,
        .item-isvideo-shichang {
            position: absolute;
            bottom: 15px;
            color: white;
            font-size: 26px;
        }
        .item-isvideo-cishu {
            left: 30px;
        }
        .item-isvideo-shichang {
            right: 30px;
        }
    }
    .item-operator {
        padding: 0px 30px;
        margin-top: 30px;
        font-size: 0;
        .item-like,
        .item-reply {
            color: #47403b;
            font-weight: bolder;
            &:active {
                opacity: 0.5;
            }
        }
        .item-reply {
            margin-left: 40px;
        }
        i {
            height: 44px;
            width: 44px;
            display: inline-block;
            margin-right: 38px;
        }
        .like {
            background: url('../_assets/images/like.png') no-repeat;
            background-size: 100%;
        }
        .like_1 {
            background: url('../_assets/images/like_yes.png') no-repeat;
            background-size: 100%;
        }
        .chat {
            background: url('../_assets/images/chat.png') no-repeat;
            background-size: 100%;
        }
    }
    .item-response {
        padding: 0px 30px;
        margin-top: 25px;
        font-size: 26px;
        em {
            font-style: normal;
        }
        .divide {
            padding: 0px 10px;
        }
    }
    .item-movie-rate {
        padding: 0px 30px;
        margin-top: 15px;
        font-size: 26px;
        font-weight: lighter;
        word-wrap: break-word;
        word-break: break-all;
        .item-info-name {
            font-weight: bolder;
            margin-right: 10px;
        }
        .item-movie-name {
            margin-right: 10px;
        }
        i {
            display: inline-block;
            width: 40px;
            height: 40px;
        }
        .item-recommend-wrapper {
            display: inline-block;
            vertical-align: middle;
        }
        .item-recommend,
        .item-norecommend {
            em {
                font-style: normal;
                font-weight: lighter;
                display: inline-block;
                vertical-align: super;
            }
        }
        .item-recommend em {
            color: #fe6935;
        }
        .item-norecommend em {
            color: #9fc48e;
        }
        .recommend {
            background: url('../_assets/images/recommend.png') no-repeat;
            background-size: cover;
        }
        .norecommend {
            background: url('../_assets/images/norecommend.png') no-repeat;
            background-size: cover;
        }
        .movie {
            background-color: #f6f6f6;
            height: 120px;
            margin-top: 20px;
            display: flex;
            align-items: center;
            img {
                width: 80px;
                height: 120px;
            }
            .left {
                width: 500px;
                margin-left: 20px;
                display: inline-block;
                height: 80px;
                span {
                    display: block;
                    width: 96%;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    font-weight: 300;
                }
                span:first-of-type {
                    color: #47403b;
                    font-size: 30px;
                    img {
                        margin-left: 10px;
                    }
                }
                span:last-of-type {
                    color: #999999;
                    font-size: 26px;
                    margin-top: 8px;
                }
            }
            .right {
                width: 150px;
                display: flex;
                align-items: center;
                i {
                    display: inline-block;
                    height: 40px;
                    width: 2px;
                    background-color: #e3e3e3;
                }
                div {
                    margin: 0 20px;
                    display: inline-block;
                    text-align: center;
                    p:first-of-type {
                        color: #47403b;
                        font-size: 50px;
                        span:last-of-type {
                            font-size: 20px;
                        }
                    }
                    p:last-of-type {
                        color: #999999;
                        font-size: 20px;
                    }
                }
            }
        }
    }
}

.dynamic-empty {
    padding: 40px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    background-color: white;
    p {
        margin-top: 40px;
        font-size: 28px;
        color: #888482;
        opacity: 0.5;
    }
    img {
        width: 149px;
        height: 182px;
    }
}
.line {
    width: 100%;
    height: 20px;
    margin-top: 40px;
    background-color: #f2f2f2;
}
</style>
