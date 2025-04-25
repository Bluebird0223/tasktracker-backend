const quotationService = require("../../services/quotation.service");
const getFrontPlateCost = require("../../utils/helper/calculate.front.plate");

const updateQuotation = async (request, response) => {
    try {

        const {
            id,
            MAPRooms = [], propertyType, client, mobile, address, quotationDate, lightingMotionSensor,
            blindTrack, blindMotor, curtainTrack, curtainMotor, vdpDoorSystem, gateAutomation,
            sixteenPortPoeHikvision, fourMPCamaraBulletHikvisionColour,
            sixMPPanaromicCOLORVUFixedBulletnetworkcamara, accessPointTPlink, RJ_45,
            PVCBoxes, hardDisk_2_TB, NVRHikvision_16_channel, speakerCable_90_M,
            HDMICable_10_M, subwooferCable_5_M, alexa, starPoint, lightEngineRGB,
            installation, totalProductCost, totalInstallationCost, grandTotal,
            totalNetworkingAndCCTV, totalCablesCost
        } = request.body;

        if (!Array.isArray(MAPRooms) || MAPRooms.length === 0) {
            return response.status(400).json({ status: "FAILED", message: "No room data provided" });
        }

        const roomDetails = [];

        for (const room of MAPRooms) {
            const {
                MAPRoom = '', MAPLights = 0, MAPSwitchBoard = 0, MAPModule = 4, MAPType = "Glass",
                powerSupply = 0, ON_OFF = 0, sixteen_A = 0, zemoteDimming = 0, triacDimming = 0,
                fanDimming = 0, curtain = 0, twoWaySwitchInput = 0, lightFanModule = 0,
                lightModule_2_ZemoteDimming = 0, lightModule_2_TriacDimming = 0,
                lightModule_2_NonDimming = 0, lightModule_4_NonDimming = 0,
                smartUniversalRemote = 0, smartUniversalRemoteMini = 0,
                smartUniversalRemoteWired = 0, smartUniversalRemotePlus = 0,
                smartUniversalRemotePro = 0, powerModule = 0, curtainController2 = 0,
                curtainController4 = 0, tunable_DimmableLEDDriver = 0, RGB_LEDstripController = 0,
                tewlve_V_LEDStripDimmer = 0, dryContact_NONCModule = 0,
                customizedText = "no", customizedIcon_2_perPlate = "no", customizedIcon_11_perPlate = "no",
                border_ColorCustomizationPerPlate = "no", CustomizedVeneer = "no"
            } = room;

            const backModel = (2207 * powerSupply) + (1103 * ON_OFF) + (2207 * sixteen_A) +
                (1428 * zemoteDimming) + (1817 * triacDimming) + (2142 * fanDimming) +
                (1817 * curtain) + (649 * twoWaySwitchInput) + (11151 * lightFanModule) +
                (8113 * lightModule_2_ZemoteDimming) + (8113 * lightModule_2_TriacDimming) +
                (4956 * lightModule_2_NonDimming) + (7434 * lightModule_4_NonDimming) +
                (8054 * smartUniversalRemote) + (3098 * smartUniversalRemoteMini) +
                (6195 * smartUniversalRemoteWired) + (7434 * smartUniversalRemotePlus) +
                (12390 * smartUniversalRemotePro) + (6600 * powerModule) +
                (8437 * curtainController2) + (12980 * curtainController4) +
                (3528 * tewlve_V_LEDStripDimmer) + (7080 * dryContact_NONCModule) +
                (MAPType === "Glass" && customizedText === "yes" ? 500 : 0) +
                (MAPType === "Veneer" && customizedText === "yes" ? 750 : 0) +
                (MAPType === "stone" && customizedText === "yes" ? 750 : 0) +
                (MAPType === "Glass" && customizedIcon_2_perPlate === "yes" ? 1000 : 0) +
                (MAPType === "Polycarbonate" && customizedIcon_2_perPlate === "yes" ? 1000 : 0) +
                (MAPType === "Polycarbonate" && customizedIcon_11_perPlate === "yes" ? 2000 : 0) +
                (MAPType === "Glass" && customizedIcon_11_perPlate === "yes" ? 2000 : 0) +
                (border_ColorCustomizationPerPlate === "yes" ? 5000 : 0) +
                (CustomizedVeneer === "yes" ? 1500 : 0);

            const frontPlate = await getFrontPlateCost(MAPModule, MAPType);
            const total = backModel + frontPlate;

            roomDetails.push({
                ...room,
                backModel,
                frontPlate,
                total
            });
        }

        const totalBackModel = roomDetails.reduce((sum, r) => sum + r.backModel, 0);
        const totalFrontPlate = roomDetails.reduce((sum, r) => sum + r.frontPlate, 0);
        const totalProjectCost = roomDetails.reduce((sum, r) => sum + r.total, 0);
        const totalTunable_DimmableLEDDriver = roomDetails.reduce((sum, r) => sum + r.tunable_DimmableLEDDriver, 0);
        const totalRGB_LEDstripController = roomDetails.reduce((sum, r) => sum + r.RGB_LEDstripController, 0);

        // check if quotation exist
        const isExist = await quotationService.getQuotationById(id);
        if (!isExist) {
            return response.status(404).json({
                status: "FAILED",
                message: "Quotation not found"
            });
        }

        const dataToUpdate = {
            propertyType,
            client,
            mobile,
            address,
            quotationDate,
            MAPRooms: roomDetails,
            totalBackModel,
            totalFrontPlate,
            totalProjectCost,
            totalTunable_DimmableLEDDriver,
            totalRGB_LEDstripController,

            lightingMotionSensor,
            blindTrack,
            blindMotor,
            curtainTrack,
            curtainMotor,
            totalProductCost,

            vdpDoorSystem,
            gateAutomation,

            sixteenPortPoeHikvision,
            fourMPCamaraBulletHikvisionColour,
            sixMPPanaromicCOLORVUFixedBulletnetworkcamara,
            accessPointTPlink,
            RJ_45,
            PVCBoxes,
            hardDisk_2_TB,
            NVRHikvision_16_channel,
            totalNetworkingAndCCTV,

            speakerCable_90_M,
            HDMICable_10_M,
            subwooferCable_5_M,
            totalCablesCost,

            alexa,

            starPoint,
            lightEngineRGB,
            installation,
            totalInstallationCost,

            grandTotal
        };

        const result = await quotationService.updateQuotation(id, dataToUpdate);

        if (result?.modifiedCount > 0 || result?.acknowledged) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Quotation updated successfully"
            });
        } else {
            return response.status(400).json({
                status: "FAILED",
                message: "Quotation update failed or no changes made"
            });
        }

    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message
        });
    }
};

module.exports = updateQuotation;
