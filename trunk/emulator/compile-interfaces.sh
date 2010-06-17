#!/bin/sh

cd idl

${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilService.xpt jilService.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilTelephony.xpt jilTelephony.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilWidget.xpt jilWidget.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilCallRecord.xpt jilCallRecord.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilCallRecordTypes.xpt jilCallRecordTypes.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilWidgetManager.xpt jilWidgetManager.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilAttachment.xpt jilAttachment.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilMessage.xpt jilMessage.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilAccount.xpt jilAccount.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilMessageQuantities.xpt jilMessageQuantities.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilMessaging.xpt jilMessaging.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilMessageFolderTypes.xpt jilMessageFolderTypes.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilMessageTypes.xpt jilMessageTypes.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilAddressBookItem.xpt jilAddressBookItem.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilAccelerometerInfo.xpt jilAccelerometerInfo.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilConfig.xpt jilConfig.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilDeviceStateInfo.xpt jilDeviceStateInfo.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilFile.xpt jilFile.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilDeviceInfo.xpt jilDeviceInfo.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilDataNetworkInfo.xpt jilDataNetworkInfo.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilDataNetworkConnectionTypes.xpt jilDataNetworkConnectionTypes.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilAccountInfo.xpt jilAccountInfo.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilRadioInfo.xpt jilRadioInfo.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilPowerInfo.xpt jilPowerInfo.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilPositionInfo.xpt jilPositionInfo.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilDevice.xpt jilDevice.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilCamera.xpt jilCamera.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilAudioPlayer.xpt jilAudioPlayer.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilVideoPlayer.xpt jilVideoPlayer.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilMultimedia.xpt jilMultimedia.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilEventRecurrenceTypes.xpt jilEventRecurrenceTypes.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilCalendarItem.xpt jilCalendarItem.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilPIM.xpt jilPIM.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilException.xpt jilException.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilExceptionTypes.xpt jilExceptionTypes.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilApplicationTypes.xpt jilApplicationTypes.idl
${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilRadioSignalSourceTypes.xpt jilRadioSignalSourceTypes.idl

${1}/bin/xpidl -m typelib -w -v -I ${1}/idl -e ../components/jilEmulatedWidget.xpt jilEmulatedWidget.idl

cd ..
