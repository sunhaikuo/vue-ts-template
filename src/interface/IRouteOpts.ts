export default interface IRouteOpts {
    // 静态标题可选
    title?: string
    // title
    wxShareInfo:
        | Boolean
        | {
              summary: string
              title: string
              pic: string
          }
    route?: string
}
