const quotationService = require("../../services/quotation.service");
// const getFrontPlateCost = require("../../utils/helper/calculate.front.plate");

const createQuotation = async (request, response) => {
    try {
        const {
            propertyType, client, mobile, quotationDate, address, roomDetails,

            totalBackModel, totalFrontPlate, finalTotal,

            lightingMotionSensorQuantity, lightingMotionSensorUnitPrice, totalLightingMotionSensor,

            blindTrackQuantity, blindTrackUnitPrice, blindTrack,
            blindMotorQuantity, blindMotorUnitPrice, blindMotor,
            totalBlindsCost,

            curtainTrackQuantity, curtainTrackUnitPrice, curtainTrack,
            curtainMotorQuantity, curtainMotorUnitPrice, curtainMotor,
            totalCurtainsCost,

            vdpDoorSystemQuantity, vdpDoorSystemUnitPrice, totalVdpDoorSystem,
            gateAutomationQuantity, gateAutomationUnitPrice, totalGateAutomation,

            Tunable_DimmableLEDDriverQuantity, Tunable_DimmableLEDDriverUnitPrice, Tunable_DimmableLEDDriver,
            RGB_LEDstripControllerQuantity, RGB_LEDstripControllerUnitPrice, RGB_LEDstripController,
            totalDriversCost,

            sixteenPortPoeHikvisionQuantity, sixteenPortPoeHikvisionUnitPrice, totalSixteenPortPoeHikvision,
            fourMPCamaraBulletHikvisionColourQuantity, fourMPCamaraBulletHikvisionColourUnitPrice, totalFourMPCamaraBulletHikvisionColour,
            sixMPPanaromicCOLORVUFixedBulletnetworkcamaraQuantity, sixMPPanaromicCOLORVUFixedBulletnetworkcamaraUnitPrice, totalSixMPPanaromicCOLORVUFixedBulletnetworkcamara,
            accessPointTPlinkQuantity, accessPointTPlinkUnitPrice, totalAccessPointTPlink,
            rJ_45Quantity, rJ_45UnitPrice, totalRJ_45,
            pVCBoxesQuantity, pVCBoxesUnitPrice, totalPVCBoxes,
            hardDisk_2_TBQuantity, hardDisk_2_TBUnitPrice, totalHardDisk_2_TB,
            nVRHikvision_16_channelQuantity, nVRHikvision_16_channelUnitPrice, totalNVRHikvision_16_channel,
            totalNetworkingAndCCTV,

            speakerCable_90_MQuantity, speakerCable_90_MUnitPrice, totalSpeakerCable_90_M,
            hDMICable_10_MQuantity, hDMICable_10_MUnitPrice, totalHDMICable_10_M,
            subwooferCable_5_MQuantity, subwooferCable_5_MUnitPrice, totalSubwooferCable_5_M,
            totalCablesCost,

            alexaQuantity, alexaUnitPrice, totalAlexa,
            starPointQuantity, starPointUnitPrice, totalStarPoint,
            lightEngineRGBQuantity, lightEngineRGBUnitPrice, totalLightEngineRGB,

            installationChargesPercent, totalInstallationCost,
            grandTotalBefore, generalInstallationChargesPercent, grandTotal
        } = request.body


        const dataToInsert = {
            propertyType, client, mobile, quotationDate, address,

            roomDetails, // Use entire array safely

            totalBackModel, totalFrontPlate, finalTotal,

            lightingMotionSensorQuantity, lightingMotionSensorUnitPrice, totalLightingMotionSensor,

            blindTrackQuantity, blindTrackUnitPrice, blindTrack,
            blindMotorQuantity, blindMotorUnitPrice, blindMotor,
            totalBlindsCost,

            curtainTrackQuantity, curtainTrackUnitPrice, curtainTrack,
            curtainMotorQuantity, curtainMotorUnitPrice, curtainMotor,
            totalCurtainsCost,

            vdpDoorSystemQuantity, vdpDoorSystemUnitPrice, totalVdpDoorSystem,
            gateAutomationQuantity, gateAutomationUnitPrice, totalGateAutomation,

            Tunable_DimmableLEDDriverQuantity, Tunable_DimmableLEDDriverUnitPrice, Tunable_DimmableLEDDriver,
            RGB_LEDstripControllerQuantity, RGB_LEDstripControllerUnitPrice, RGB_LEDstripController,
            totalDriversCost,

            sixteenPortPoeHikvisionQuantity, sixteenPortPoeHikvisionUnitPrice, totalSixteenPortPoeHikvision,
            fourMPCamaraBulletHikvisionColourQuantity, fourMPCamaraBulletHikvisionColourUnitPrice, totalFourMPCamaraBulletHikvisionColour,
            sixMPPanaromicCOLORVUFixedBulletnetworkcamaraQuantity, sixMPPanaromicCOLORVUFixedBulletnetworkcamaraUnitPrice, totalSixMPPanaromicCOLORVUFixedBulletnetworkcamara,
            accessPointTPlinkQuantity, accessPointTPlinkUnitPrice, totalAccessPointTPlink,
            rJ_45Quantity, rJ_45UnitPrice, totalRJ_45,
            pVCBoxesQuantity, pVCBoxesUnitPrice, totalPVCBoxes,
            hardDisk_2_TBQuantity, hardDisk_2_TBUnitPrice, totalHardDisk_2_TB,
            nVRHikvision_16_channelQuantity, nVRHikvision_16_channelUnitPrice, totalNVRHikvision_16_channel,
            totalNetworkingAndCCTV,

            speakerCable_90_MQuantity, speakerCable_90_MUnitPrice, totalSpeakerCable_90_M,
            hDMICable_10_MQuantity, hDMICable_10_MUnitPrice, totalHDMICable_10_M,
            subwooferCable_5_MQuantity, subwooferCable_5_MUnitPrice, totalSubwooferCable_5_M,
            totalCablesCost,

            alexaQuantity, alexaUnitPrice, totalAlexa,
            starPointQuantity, starPointUnitPrice, totalStarPoint,
            lightEngineRGBQuantity, lightEngineRGBUnitPrice, totalLightEngineRGB,

            installationChargesPercent, totalInstallationCost,
            grandTotalBefore, generalInstallationChargesPercent, grandTotal
        };

        const result = await quotationService.createQuotation(dataToInsert);
        if (result?._id) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Quotation created successfully"
            })
        } else {
            return response.status(400).json({
                status: "FAILED",
                message: "Quotation creation failed"
            })
        }

    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = createQuotation;
