const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    MAPRoom: { type: String, required: true },
    MAPLights: { type: Number, default: 0 },
    MAPSwitchBoard: { type: Number, default: 0 },
    MAPModule: { type: Number, default: 0 },
    MAPType: { type: String, default: "" },

    powerSupply: { type: Number, default: 0 },
    ON_OFF: { type: Number, default: 0 },
    sixteen_A: { type: Number, default: 0 },
    zemoteDimming: { type: Number, default: 0 },
    triacDimming: { type: Number, default: 0 },
    fanDimming: { type: Number, default: 0 },
    curtain: { type: Number, default: 0 },
    twoWaySwitchInput: { type: Number, default: 0 },

    lightFanModule: { type: Number, default: 0 },
    lightModule_2_ZemoteDimming: { type: Number, default: 0 },
    lightModule_2_TriacDimming: { type: Number, default: 0 },
    lightModule_2_NonDimming: { type: Number, default: 0 },
    lightModule_4_NonDimming: { type: Number, default: 0 },

    smartUniversalRemote: { type: Number, default: 0 },
    smartUniversalRemoteMini: { type: Number, default: 0 },
    smartUniversalRemoteWired: { type: Number, default: 0 },
    smartUniversalRemotePlus: { type: Number, default: 0 },
    smartUniversalRemotePro: { type: Number, default: 0 },

    powerModule: { type: Number, default: 0 },
    curtainController2: { type: Number, default: 0 },
    curtainController4: { type: Number, default: 0 },
    tunable_DimmableLEDDriver: { type: Number, default: 0 },
    RGB_LEDstripController: { type: Number, default: 0 },
    tewlve_V_LEDStripDimmer: { type: Number, default: 0 },
    dryContact_NONCModule: { type: Number, default: 0 },

    customizedText: { type: String, default: "no" },
    customizedIcon_2_perPlate: { type: String, default: "no" },
    customizedIcon_11_perPlate: { type: String, default: "no" },
    border_ColorCustomizationPerPlate: { type: String, default: "no" },
    CustomizedVeneer: { type: String, default: "no" },

    backModel: { type: Number, default: 0 },
    frontPlate: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
}, { _id: false });



const quotationSchema = mongoose.Schema({
    propertyType: { type: String, required: true },
    client: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
    quotationDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },

    roomDetails: [roomSchema],

    // Totals
    totalBackModel: { type: Number, default: 0 },
    totalFrontPlate: { type: Number, default: 0 },
    totalProjectCost: { type: Number, default: 0 },
    totalTunable_DimmableLEDDriver: { type: Number, default: 0 },
    totalRGB_LEDstripController: { type: Number, default: 0 },

    // productDetails
    lightingMotionSensor: { type: Number, default: 0 },
    blindTrack: { type: Number, default: 0 },
    blindMotor: { type: Number, default: 0 },
    curtainTrack: { type: Number, default: 0 },
    curtainMotor: { type: Number, default: 0 },
    totalProductCost: { type: Number, default: 0 },

    // vdp lock
    vdpDoorSystem: { type: Number, default: 0 },

    // gate lock
    gateAutomation: { type: Number, default: 0 },

    //Networking and CCTV
    sixteenPortPoeHikvision: { type: Number, default: 0 },
    fourMPCamaraBulletHikvisionColour: { type: Number, default: 0 },
    sixMPPanaromicCOLORVUFixedBulletnetworkcamara: { type: Number, default: 0 },
    accessPointTPlink: { type: Number, default: 0 },
    RJ_45: { type: Number, default: 0 },
    PVCBoxes: { type: Number, default: 0 },
    hardDisk_2_TB: { type: Number, default: 0 },
    NVRHikvision_16_channel: { type: Number, default: 0 },
    totalNetworkingAndCCTV: { type: Number, default: 0 },

    // cables
    speakerCable_90_M: { type: Number, default: 0 },
    HDMICable_10_M: { type: Number, default: 0 },
    subwooferCable_5_M: { type: Number, default: 0 },
    totalCablesCost: { type: Number, default: 0 },

    // MultiAudio /Automation							
    alexa: { type: Number, default: 0 },

    // installation
    starPoint: { type: Number, default: 0 },
    lightEngineRGB: { type: Number, default: 0 },
    installation: { type: Number, default: 0 },
    totalInstallationCost: { type: Number, default: 0 },

    // grand total
    grandTotal: { type: Number, default: 0 },

}, {
    timestamps: true,
    strict: false
});

const Quotation = mongoose.model('Quotation', quotationSchema);
module.exports = Quotation;