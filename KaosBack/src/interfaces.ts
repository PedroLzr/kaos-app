interface IUser {
    id: number;
    userName: string;
    fullName: string;
    phone: string;
    publicProfile: boolean;
    city: string;
    status: string;
    dateofbirth: Date;
    gender: string;
    instagram: string;
    imageProfile: Date;
    nationality: string;
    coupleStatus: string;
    sexualOrientation: string;
    RoleId: number;
}

interface IRole {
    id: number;
    name: string;
}

interface ILocalType {
    id: number;
    name: string;
    description: string;
}

interface ILocal {
    id: number;
    name: string;
    city: string;
    address: string;
    coordinates: string;
    description: string;
    status: string;
    image: Date;
    capacity: number;
    LocalTypeId: number;
}

interface ILocalComment {
    id: number;
    text: string;
    LocalId: number;
    UserId: number;
}

interface IGroup {
    id: number;
    name: string;
    description: string;
    public: boolean;
}

interface IGroupComment {
    id: number;
    text: string;
    UserId: number;
    GroupId: number;
}

interface IFriend {
    userSenderId: number;
    userReceiverId: number;
    status: string;
}

interface IEvent {
    id: number;
    name: string;
    date: Date;
    startsAt: Date;
    endsAt: Date;
    description: string;
    price: number;
    status: string;
    image: Date;
    LocalId: number;
}

interface IEventComment {
    id: number;
    text: string;
    UserId: number;
    EventId: number;
}

interface IBlockedUser {
    userSenderId: number;
    userBlockedId: number;
    status: string;
}

interface IActionShot {
    userSenderId: number;
    userReceiverId: number;
    eventId: number;
    status: string;
}

interface IActionHeart {
    userSenderId: number;
    userReceiverId: number;
    eventId: number;
    status: string;
}

interface ActionDanceAttributes {
    userSenderId: number;
    userReceiverId: number;
    eventId: number;
    status: string;
}

interface IGroupUsers {
    status: string;
    GroupId: number;
    UserId: number;
}

interface IEventUsers {
    status: string;
    EventId: number;
    UserId: number;
}

interface ILocalModerator {
    status: string;
    LocalId: number;
    UserId: number;
}