import Render from './render'
class BaseView {
    /**
     * 把微信分享的数据和首屏渲染的数据放到store中
     * @param viewName 组件名称
     * @param title HTML标题
     * @param shareData 要分享的数据
     * @param stateData 放到state中的业务数据
     */
    public static commitAndRender(
        viewName: string,
        title: string,
        shareData: Object,
        stateData: Object
    ) {
        return new Promise(async (resolve, reject) => {
            try {
                let html = await Render.render(viewName, {
                    title: title,
                    state: {
                        wx: shareData,
                        ...stateData
                    }
                })
                resolve(html)
            } catch (error) {
                reject(error)
            }
        })
    }
}

export default BaseView
