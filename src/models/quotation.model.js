const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    mAPRoom: { type: String, required: true },
    mAPLights: { type: String, required: false, default: 0 },
    mAPSwitchBoard: { type: String, required: false, default: 0 },
    mAPModule: { type: String, required: false, default: 0 },
    mAPType: { type: String, required: false, default: "" },
    color: { type: String, required: false },

    powerSupply: { type: String, required: false, default: 0 },
    oN_OFF: { type: String, required: false, default: 0 },
    sixteen_A: { type: String, required: false, default: 0 },
    zemoteDimming: { type: String, required: false, default: 0 },
    triacDimming: { type: String, required: false, default: 0 },
    fanDimming: { type: String, required: false, default: 0 },
    curtain: { type: String, required: false, default: 0 },
    twoWaySwitchInput: { type: String, required: false, default: 0 },

    lightFanModule: { type: String, required: false, default: 0 },
    lightModule_2_ZemoteDimming: { type: String, required: false, default: 0 },
    lightModule_2_TriacDimming: { type: String, required: false, default: 0 },
    lightModule_2_NonDimming: { type: String, required: false, default: 0 },
    lightModule_4_NonDimming: { type: String, required: false, default: 0 },

    smartUniversalRemote: { type: String, required: false, default: 0 },
    smartUniversalRemoteMini: { type: String, required: false, default: 0 },
    smartUniversalRemoteWired: { type: String, required: false, default: 0 },
    smartUniversalRemotePlus: { type: String, required: false, default: 0 },
    smartUniversalRemotePro: { type: String, required: false, default: 0 },

    powerModule: { type: String, required: false, default: 0 },
    curtainController2: { type: String, required: false, default: 0 },
    curtainController4: { type: String, required: false, default: 0 },
    tewlve_V_LEDStripDimmer: { type: String, required: false, default: 0 },
    dryContact_NONCModule: { type: String, required: false, default: 0 },

    customizedText: { type: String, required: false, default: "no" },
    customizedIcon_2_perPlate: { type: String, required: false, default: "no" },
    customizedIcon_11_perPlate: { type: String, required: false, default: "no" },
    border_ColorCustomizationPerPlate: { type: String, required: false, default: "no" },
    CustomizedVeneer: { type: String, required: false, default: "no" },

    backModel: { type: String, default: 0 },
    frontPlate: { type: String, default: 0 },
    total: { type: String, default: 0 }
}, { _id: false });



const quotationSchema = mongoose.Schema({
    propertyType: { type: String, required: true },
    client: { type: String, required: true },
    mobile: { type: String, required: true },
    quotationDate: { type: Date, required: true },
    address: { type: String, required: true },
    isActive: { type: Boolean,required: false, default: true },

    roomDetails: [roomSchema],

    // Totals
    totalBackModel: { type: String, required: false, default: 0 },
    totalFrontPlate: { type: String, required: false, default: 0 },
    finalTotal: { type: String, required: false, default: 0 },


    // Lighting
    lightingMotionSensorQuantity: { type: String, required: false, default: 0 },
    lightingMotionSensorUnitPrice: { type: String, required: false, default: 0 },
    totalLightingMotionSensor: { type: String, required: false, default: 0 },

    // Blinds
    blindTrackQuantity: { type: String, required: false, default: 0 },
    blindTrackUnitPrice: { type: String, required: false, default: 0 },
    blindTrack: { type: String, required: false, default: 0 },

    blindMotorQuantity: { type: String, required: false, default: 0 },
    blindMotorUnitPrice: { type: String, required: false, default: 0 },
    blindMotor: { type: String, required: false, default: 0 },

    totalBlindsCost: { type: String, required: false, default: 0 },


    // Curtains
    curtainTrackQuantity: { type: String, required: false, default: 0 },
    curtainTrackUnitPrice: { type: String, required: false, default: 0 },
    curtainTrack: { type: String, required: false, default: 0 },

    curtainMotorQuantity: { type: String, required: false, default: 0 },
    curtainMotorUnitPrice: { type: String, required: false, default: 0 },
    curtainMotor: { type: String, required: false, default: 0 },

    totalCurtainsCost: { type: String, required: false, default: 0 },


    // vdp lock
    vdpDoorSystemQuantity: { type: String, required: false, default: 0 },
    vdpDoorSystemUnitPrice: { type: String, required: false, default: 0 },
    totalVdpDoorSystem: { type: String, required: false, default: 0 },

    // gate lock
    gateAutomationQuantity: { type: String, required: false, default: 0 },
    gateAutomationUnitPrice: { type: String, required: false, default: 0 },

    totalGateAutomation: { type: String, required: false, default: 0 },

    // Drivers
    Tunable_DimmableLEDDriverQuantity: { type: String, required: false, default: 0 },
    Tunable_DimmableLEDDriverUnitPrice: { type: String, required: false, default: 0 },
    Tunable_DimmableLEDDriver: { type: String, required: false, default: 0 },

    RGB_LEDstripControllerQuantity: { type: String, required: false, default: 0 },
    RGB_LEDstripControllerUnitPrice: { type: String, required: false, default: 0 },
    RGB_LEDstripController: { type: String, required: false, default: 0 },

    totalDriversCost: { type: String, required: false, default: 0 },


    //Networking and CCTV
    sixteenPortPoeHikvisionQuantity: { type: String, required: false, default: 0 },
    sixteenPortPoeHikvisionUnitPrice: { type: String, required: false, default: 0 },
    totalSixteenPortPoeHikvision: { type: String, required: false, default: 0 },

    fourMPCamaraBulletHikvisionColourQuantity: { type: String, required: false, default: 0 },
    fourMPCamaraBulletHikvisionColourUnitPrice: { type: String, required: false, default: 0 },
    totalFourMPCamaraBulletHikvisionColour: { type: String, required: false, default: 0 },

    sixMPPanaromicCOLORVUFixedBulletnetworkcamaraQuantity: { type: String, required: false, default: 0 },
    sixMPPanaromicCOLORVUFixedBulletnetworkcamaraUnitPrice: { type: String, required: false, default: 0 },
    totalSixMPPanaromicCOLORVUFixedBulletnetworkcamara: { type: String, required: false, default: 0 },

    accessPointTPlinkQuantity: { type: String, required: false, default: 0 },
    accessPointTPlinkUnitPrice: { type: String, required: false, default: 0 },
    totalAccessPointTPlink: { type: String, required: false, default: 0 },

    rJ_45Quantity: { type: String, required: false, default: 0 },
    rJ_45UnitPrice: { type: String, required: false, default: 0 },
    totalRJ_45: { type: String, required: false, default: 0 },

    pVCBoxesQuantity: { type: String, required: false, default: 0 },
    pVCBoxesUnitPrice: { type: String, required: false, default: 0 },
    totalPVCBoxes: { type: String, required: false, default: 0 },

    hardDisk_2_TBQuantity: { type: String, required: false, default: 0 },
    hardDisk_2_TBUnitPrice: { type: String, required: false, default: 0 },
    totalHardDisk_2_TB: { type: String, required: false, default: 0 },

    nVRHikvision_16_channelQuantity: { type: String, required: false, default: 0 },
    nVRHikvision_16_channelUnitPrice: { type: String, required: false, default: 0 },
    totalNVRHikvision_16_channel: { type: String, required: false, default: 0 },

    totalNetworkingAndCCTV: { type: String, required: false, default: 0 },


    // cables
    speakerCable_90_MQuantity: { type: String, required: false, default: 0 },
    speakerCable_90_MUnitPrice: { type: String, required: false, default: 0 },
    totalSpeakerCable_90_M: { type: String, required: false, default: 0 },

    hDMICable_10_MQuantity: { type: String, required: false, default: 0 },
    hDMICable_10_MUnitPrice: { type: String, required: false, default: 0 },
    totalHDMICable_10_M: { type: String, required: false, default: 0 },

    subwooferCable_5_MQuantity: { type: String, required: false, default: 0 },
    subwooferCable_5_MUnitPrice: { type: String, required: false, default: 0 },
    totalSubwooferCable_5_M: { type: String, required: false, default: 0 },

    totalCablesCost: { type: String, required: false, default: 0 },

    // Additional Items						
    alexaQuantity: { type: String, required: false, default: 0 },
    alexaUnitPrice: { type: String, required: false, default: 0 },
    totalAlexa: { type: String, required: false, default: 0 },

    starPointQuantity: { type: String, required: false, default: 0 },
    starPointUnitPrice: { type: String, required: false, default: 0 },
    totalStarPoint: { type: String, required: false, default: 0 },

    lightEngineRGBQuantity: { type: String, required: false, default: 0 },
    lightEngineRGBUnitPrice: { type: String, required: false, default: 0 },
    totalLightEngineRGB: { type: String, required: false, default: 0 },

    installationChargesPercent: { type: String, required: false, default: 0 },
    totalInstallationCost: { type: String, required: false, default: 0 },

    // grand total
    grandTotalBefore: { type: String, required: false, default: 0 },
    generalInstallationChargesPercent: { type: String, required: false, default: 0 },
    grandTotal: { type: String, required: false, default: 0 },

}, {
    timestamps: true,
    strict: false
});

const Quotation = mongoose.model('Quotation', quotationSchema);
module.exports = Quotation;