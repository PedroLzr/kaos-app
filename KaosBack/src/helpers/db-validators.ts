// import Event from "../models/event";
// import Local from "../models/local";
// import LocalType from "../models/localtype";
// import Role from "../models/role";

// export const checkExistRole = async(role: string) => {
//     const existRole = await Role.findOne({
//         where: {
//             name: role
//         }
//     });

//     if(!existRole){
//         throw new Error(`El rol ${ role } no existe en la bd`);
//     }
// }

// export const checkExistLocalType = async(localType: string) => {
//     const existLocalType = await LocalType.findOne({
//         where: {
//             name: localType
//         }
//     });

//     if(!existLocalType){
//         throw new Error(`El tipo de local ${ localType } no existe en la bd`);
//     }
// }

// export const checkExistLocal = async(local: string) => {
//     const existLocal = await Local.findOne({
//         where: {
//             name: local
//         }
//     });

//     if(!existLocal){
//         throw new Error(`El Local ${ local } no existe en la bd`);
//     }
// }

// export const checkExistEvent = async(event: string) => {
//     const existEvent = await Event.findOne({
//         where: {
//             name: event
//         }
//     });

//     if(!existEvent){
//         throw new Error(`El Event ${ event } no existe en la bd`);
//     }
// }