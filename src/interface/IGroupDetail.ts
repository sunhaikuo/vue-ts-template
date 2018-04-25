import IGroupMember from './IGroupMember'
export default interface IGroupDetail {
    groupId: number
    // 群名字
    groupName: String
    // 群成员数量
    memberCount: number
    // 群成员列表
    members: Array<IGroupMember>
}
