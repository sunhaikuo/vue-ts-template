import { Share } from '@mtime-node-mlibs/live-util-ts'
export default () => {
    const data = window['__INITIAL_STATE__']
    // 如果不分享, 则data.wx = false
    if (data && data.wx) {
        Share.share(data.wx)
    }
}
