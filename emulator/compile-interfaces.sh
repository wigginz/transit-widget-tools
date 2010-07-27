#!/bin/sh

cd idl

${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilService.xpt jilService.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilTelephony.xpt jilTelephony.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilWidget.xpt jilWidget.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilCallRecord.xpt jilCallRecord.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilCallRecordTypes.xpt jilCallRecordTypes.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilWidgetManager.xpt jilWidgetManager.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilAttachment.xpt jilAttachment.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilMessage.xpt jilMessage.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilAccount.xpt jilAccount.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilMessageQuantities.xpt jilMessageQuantities.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilMessaging.xpt jilMessaging.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilMessageFolderTypes.xpt jilMessageFolderTypes.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilMessageTypes.xpt jilMessageTypes.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilAddressBookItem.xpt jilAddressBookItem.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilAccelerometerInfo.xpt jilAccelerometerInfo.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilConfig.xpt jilConfig.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilDeviceStateInfo.xpt jilDeviceStateInfo.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilFile.xpt jilFile.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilDeviceInfo.xpt jilDeviceInfo.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilDataNetworkInfo.xpt jilDataNetworkInfo.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilDataNetworkConnectionTypes.xpt jilDataNetworkConnectionTypes.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilAccountInfo.xpt jilAccountInfo.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilRadioInfo.xpt jilRadioInfo.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilPowerInfo.xpt jilPowerInfo.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilPositionInfo.xpt jilPositionInfo.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilDevice.xpt jilDevice.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilCamera.xpt jilCamera.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilAudioPlayer.xpt jilAudioPlayer.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilVideoPlayer.xpt jilVideoPlayer.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilMultimedia.xpt jilMultimedia.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilEventRecurrenceTypes.xpt jilEventRecurrenceTypes.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilCalendarItem.xpt jilCalendarItem.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilPIM.xpt jilPIM.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilException.xpt jilException.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilExceptionTypes.xpt jilExceptionTypes.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilApplicationTypes.xpt jilApplicationTypes.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../extension/components/jilRadioSignalSourceTypes.xpt jilRadioSignalSourceTypes.idl

cd ..
