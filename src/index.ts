// import { Cdek_sdk, Login} from "./services/cdek-shipping/index";
// import { TariffList } from "./services/cdek-shipping/interface/requestData";

// async function getToken() {
//     const cdek = new Cdek_sdk();
//     const cdek_login: Login = {
//         account: "wqGwiQx0gg8mLtiEKsUinjVSICCjtTEP",
//         secret: "RmAmgvSgSl1yirlz9QupbzOJVqhCxcP5",
//     };
//     const tl: TariffList = {
//         type: 1,
//         currency: 1,
//         from_location:  {code: 270},
//         to_location: {code: 440},
//         packages: [{weight: 150}],
//     }

//     try {
//         const token: string = await cdek.getToken(cdek_login);
//         const delivery = await cdek.calculateOnTariffList(token, tl)
//         console.info("Delivery result:", delivery.data.tariff_codes[0].delivery_sum)
//     } catch (error) {
//         console.error("Error getting token:", error);
//     }
// }

// getToken();
