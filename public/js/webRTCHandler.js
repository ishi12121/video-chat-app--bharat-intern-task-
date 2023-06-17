import * as wss from "./wss.js";
import * as constants from "./constants.js";
import * as ui from "./ui.js";


export const sendPreOffer = (callType, calleePersonalCode) => {
    const data = {
        callType,
        calleePersonalCode
    }

    wss.sendPreOffer(data);

};

export const handlePreOffer = (data) => {
    console.log("pre-offer came webRTC handler");
    console.log(data);
};
