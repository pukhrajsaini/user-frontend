export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    countryCode: string;
    phoneNumber: string;
    profileImage: string | File;
}


export interface UserApiResponse {
    status: number;
    message: string;
    data: {
        count: number,
        list: User[],
        user: User
    }
}


