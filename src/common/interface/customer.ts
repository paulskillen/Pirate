export enum CustomerTitle {
    Mr = "Mr",
    Mrs = "Mrs",
    Miss = "Miss",
    Ms = "Ms",
}

export interface ICustomer {
    id: string;
    updatedAt: Date;
    createdAt: Date;
    avatar: string;
    customerNo: string;
    title: CustomerTitle;
    fullName: string;
    firstName: string;
    lastName: string;
    nickname: string;
    gender: string;
    birthDay: Date;
    phoneCode: string;
    phone: string;
    email: string;
    lineId: string;
    instagram: string;
    facebook: string;
    socialId: string;
}
