const quotationService = require("../../services/quotation.service")

const createQuotation = async (request, response) => {
    try {
        const {
            propertyType, quotationDate, address, client, mobile,

            totalBackProjectCost,
            totalFrontProjectCost,
            lightingmotionPrice,
            lightingmotionQty,
            blindsblindQty,
            blindsblindPrice,
            totalBlindsblind,
            curtainscurtainPrice,
            curtainscurtainQty,
            driversrgbPrice,
            driversrgbQty,
            driverstunablePrice,
            driverstunableQty,
            gategatePrice,
            totalDriverstunable,
            totalGategate,
            gategateQty,
            grandTotal,
            totalCurtainscurtain,
            totalDriversrgb,
            totalblindsCost,
            totalvdpCost,


            totalAdditionalalexa,
            cablessubwooferQty,
            networking4mpPrice,
            networking4mpQty,
            additionalstarPrice,
            additionalstarQty,
            additionalalexaPrice,
            additionalalexaQty,
            cablesspeakerPrice,
            cablesspeakerQty,
            cablessubwooferPrice,
            totalAdditionalstar,
            networking16Price,
            networking16Qty,
            networkingaccessPrice,
            networkingaccessQty,
            networkinghardPrice,
            networkinghardQty,
            networkingnvrPrice,
            networkingnvrQty,
            networkingpvcPrice,
            networkingpvcQty,
            networkingrj45Price,
            networkingrj45Qty,
            totalCablesspeaker,
            totalCablessubwoofer,
            totalNetworking4mp,
            totalNetworking16,
            totalNetworkingaccess,
            totalNetworkinghard,
            totalNetworkingnvr,
            totalNetworkingpvc,
            totalNetworkingrj45,
            totalProductsCost,
            totalProjectCost,
            totalcablesCost,
            totaldriversCost,
            totallightingCost,
            totalnetworkingCost,
            networking6mpQty,
            totalBeforeInstallation,
            additionalInstallationCharges,
            networking6mpPrice,
            totalNetworking6mp,
            cableshdmiQty,
            cableshdmiPrice,
            totalCableshdmi,
            vdpvdpQty,
            vdpvdpPrice,
            generalInstallationCharges,

            MAPRooms,

            blindstrackQty,
            blindstrackPrice,
            totalBlindstrack,

            totalLightingmotion,
            totaladditionalCost,
            totalgateCost,
            totalcurtainsCost,
            productTotal,

        } = request.body

        // check if already exist with name and mobile
        const isExist = await quotationService.getQuotationByNameAndMobile(client, mobile)
        if (isExist) {
            return response.status(200).json({
                status: "FAILED",
                message: "Quotation already exist"
            })
        }


        const dataToInsert = {
            propertyType, client, mobile, quotationDate, address,

            roomDetails: MAPRooms, // Use entire array safely
            totalBackModel: totalBackProjectCost,
            totalFrontPlate: totalFrontProjectCost,
            finalTotal: totalProjectCost,

            lightingMotionSensorQuantity: lightingmotionQty,
            lightingMotionSensorUnitPrice: lightingmotionPrice,
            totalLightingMotionSensor: totallightingCost,

            blindMotorQuantity: blindsblindQty,
            blindMotorUnitPrice: blindsblindPrice,
            blindMotor: totalBlindsblind,
            totalBlindsCost: totalblindsCost,

            curtainTrackQuantity: curtainscurtainQty,
            curtainTrackUnitPrice: curtainscurtainPrice,
            curtainTrack: totalCurtainscurtain,

            curtainMotorQuantity: curtainscurtainQty,
            curtainMotorUnitPrice: curtainscurtainPrice,
            curtainMotor: totalCurtainscurtain,
            totalCurtainsCost: totalProductsCost,

            vdpDoorSystemQuantity: vdpvdpQty,
            vdpDoorSystemUnitPrice: vdpvdpPrice,
            totalVdpDoorSystem: totalvdpCost,

            gateAutomationQuantity: gategateQty,
            gateAutomationUnitPrice: gategatePrice,
            totalGateAutomation: totalGategate,

            Tunable_DimmableLEDDriverQuantity: driverstunableQty,
            Tunable_DimmableLEDDriverUnitPrice: driverstunablePrice,
            Tunable_DimmableLEDDriver: totalDriverstunable,

            RGB_LEDstripControllerQuantity: driversrgbQty,
            RGB_LEDstripControllerUnitPrice: driversrgbPrice,
            RGB_LEDstripController: totalDriversrgb,
            totalDriversCost: totaldriversCost,

            alexaQuantity: additionalalexaQty,
            alexaUnitPrice: additionalalexaPrice,
            totalAlexa: totalAdditionalalexa,

            starPointQuantity: additionalstarQty,
            starPointUnitPrice: additionalstarPrice,
            totalStarPoint: totalAdditionalstar,

            speakerCable_90_MQuantity: cablesspeakerQty,
            speakerCable_90_MUnitPrice: cablesspeakerPrice,
            totalSpeakerCable_90_M: totalCablesspeaker,

            hDMICable_10_MQuantity: cableshdmiQty,
            hDMICable_10_MUnitPrice: cableshdmiPrice,
            totalHDMICable_10_M: totalCableshdmi,

            subwooferCable_5_MQuantity: cablessubwooferQty,
            subwooferCable_5_MUnitPrice: cablessubwooferPrice,
            totalSubwooferCable_5_M: totalCablessubwoofer,
            totalCablesCost: totalcablesCost,

            sixteenPortPoeHikvisionQuantity: networking16Qty,
            sixteenPortPoeHikvisionUnitPrice: networking16Price,
            totalSixteenPortPoeHikvision: totalNetworking16,

            fourMPCamaraBulletHikvisionColourQuantity: networking4mpQty,
            fourMPCamaraBulletHikvisionColourUnitPrice: networking4mpPrice,
            totalFourMPCamaraBulletHikvisionColour: totalNetworking4mp,

            sixMPPanaromicCOLORVUFixedBulletnetworkcamaraQuantity: networking6mpQty,
            sixMPPanaromicCOLORVUFixedBulletnetworkcamaraUnitPrice: networking6mpPrice,
            totalSixMPPanaromicCOLORVUFixedBulletnetworkcamara: totalNetworking6mp,

            accessPointTPlinkQuantity: networkingaccessQty,
            accessPointTPlinkUnitPrice: networkingaccessPrice,
            totalAccessPointTPlink: totalNetworkingaccess,

            rJ_45Quantity: networkingrj45Qty,
            rJ_45UnitPrice: networkingrj45Price,
            totalRJ_45: totalNetworkingrj45,

            pVCBoxesQuantity: networkingpvcQty,
            pVCBoxesUnitPrice: networkingpvcPrice,
            totalPVCBoxes: totalNetworkingpvc,

            hardDisk_2_TBQuantity: networkinghardQty,
            hardDisk_2_TBUnitPrice: networkinghardPrice,
            totalHardDisk_2_TB: totalNetworkinghard,

            nVRHikvision_16_channelQuantity: networkingnvrQty,
            nVRHikvision_16_channelUnitPrice: networkingnvrPrice,
            totalNVRHikvision_16_channel: totalNetworkingnvr,
            totalNetworkingAndCCTV: totalnetworkingCost,

            installationChargesPercent: additionalInstallationCharges,
            totalInstallationCost: additionalInstallationCharges,
            grandTotalBefore: totalBeforeInstallation,
            grandTotal: grandTotal,
            generalInstallationChargesPercent: generalInstallationCharges,

            blindTrackQuantity: blindstrackQty,
            blindTrackUnitPrice: blindstrackPrice,
            blindTrack: totalBlindstrack,

            // lightEngineRGBQuantity,
            // lightEngineRGBUnitPrice,
            // totalLightEngineRGB,

        };

        console.log(dataToInsert)
        // return


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
