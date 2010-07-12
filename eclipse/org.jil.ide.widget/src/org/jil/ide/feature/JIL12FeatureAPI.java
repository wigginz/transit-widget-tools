package org.jil.ide.feature;

import java.util.ArrayList;

public class JIL12FeatureAPI extends FeatureAPI {

	public final String FEATURE_ACCOUNTINFO = "http://jil.org/jil/api/1.1/accountInfo";
	public final String FEATURE_ADDRESSBOOK = "http://jil.org/jil/api/1.1/addressbook";
	public final String FEATURE_MESSAGING = "http://jil.org/jil/api/1.1/messaging";
	public final String FEATURE_CALENDAR = "http://jil.org/jil/api/1.1/calendar";
	public final String FEATURE_CONFIG = "http://jil.org/jil/api/1.1/config";
	public final String FEATURE_DEVICEINFO = "http://jil.org/jil/api/1.1/deviceInfo";
	public final String FEATURE_URL = "http://jil.org/jil/api/1.1/url";
	public final String FEATURE_WIDGET = "http://jil.org/jil/api/1.1/widget";
	public final String FEATURE_EXCEPTION = "http://jil.org/jil/api/1.1.5/exception";
	public final String FEATURE_EXCEPTIONTYPES = "http://jil.org/jil/api/1.1.5/exceptiontypes";
	public final String FEATURE_DEVICE = "http://jil.org/jil/api/1.1/device";
	public final String FEATURE_DATANTWKINFO = "http://jil.org/jil/api/1.1.1/datanetworkinfo";
	public final String FEATURE_DATANTWKCONNTYPES = "http://jil.org/jil/api/1.1.5/datanetworkconnectiontypes";
	public final String FEATURE_DEVICESTATEINFO = "http://jil.org/jil/api/1.1/devicestateinfo";
	public final String FEATURE_ACCELEROMETERINFO = "http://jil.org/jil/api/1.1/accelerometerinfo";
	public final String FEATURE_FILE = "http://jil.org/jil/api/1.1.1/file";
	public final String FEATURE_POSITIONINFO = "http://jil.org/jil/api/1.1/positioninfo";
	public final String FEATURE_POWERINFO = "http://jil.org/jil/api/1.1/powerinfo";
	public final String FEATURE_RADIOINFO = "http://jil.org/jil/api/1.1.1/radioinfo";
	public final String FEATURE_RADIOSIGNALTYPE = "http://jil.org/jil/api/1.1.5/radiosignalsourcetypes";
	public final String FEATURE_APPTYPES = "http://jil.org/jil/api/1.1.5/applicationtypes";
	public final String FEATURE_ACCOUNT = "http://jil.org/jil/api/1.1/account";
	public final String FEATURE_ATTACHMENT = "http://jil.org/jil/api/1.1/attachment";
	public final String FEATURE_MESSAGE = "http://jil.org/jil/api/1.1/message";
	public final String FEATURE_MESSAGEFOLDER = "http://jil.org/jil/api/1.1.4/messagefoldertypes";
	public final String FEATURE_MESSAGINGQUANTITIES = "http://jil.org/jil/api/1.1/messagequantities";
	public final String FEATURE_MESSAGETYPES = "http://jil.org/jil/api/1.1/messagetypes";
	public final String FEATURE_MULTIMEDIA = "http://jil.org/jil/api/1.1/multimedia";
	public final String FEATURE_AUDIOPLAYER = "http://jil.org/jil/api/1.1/audioplayer";
	public final String FEATURE_CAMERA = "http://jil.org/jil/api/1.1.2/camera";
	public final String FEATURE_VIDEOPLAYER = "http://jil.org/jil/api/1.1.2/videoplayer";
	public final String FEATURE_PIM = "http://jil.org/jil/api/1.1.1/pim";
	public final String FEATURE_ADDRESSBOOKITEM = "http://jil.org/jil/api/1.1/addressbookitem";
	public final String FEATURE_CALENDARITEM = "http://jil.org/jil/api/1.1/calendaritem";
	public final String FEATURE_EVENTRECCURENCETYPES = "http://jil.org/jil/api/1.1/eventrecurrencetypes";
	public final String FEATURE_TELEPHONY = "http://jil.org/jil/api/1.1.1/telephony";
	public final String FEATURE_CALLRECORD = "http://jil.org/jil/api/1.1/callrecord";
	public final String FEATURE_CALLRECORDTYPES = "http://jil.org/jil/api/1.1.1/callrecordtypes";
	public final String FEATURE_WIDGETMANAGER = "http://jil.org/jil/api/1.1.1/widgetmanager";

	APIGroup API_addressbook = null;
	APIGroup API_account = null;
	APIGroup API_accountInfo = null;
	APIGroup API_accelerometerInfo = null;
	APIGroup API_addressBookItem = null;
	APIGroup API_apptypes = null;
	APIGroup API_attachment = null;
	APIGroup API_audioPlayer = null;
	APIGroup API_calendar = null;
	APIGroup API_calendarItem = null;
	APIGroup API_callRecord = null;
	APIGroup API_callRecordTypes = null;
	APIGroup API_camera = null;
	APIGroup API_config = null;
	APIGroup API_clipboard = null;
	APIGroup API_deviceInfo = null;
	APIGroup API_device = null;
	APIGroup API_dataNtwkInfo = null;
	APIGroup API_dataNtwkConnTypes = null;
	APIGroup API_deviceStateInfo = null;
	APIGroup API_eventType = null;
	APIGroup API_exception = null;
	APIGroup API_exceptionTypes = null;
	APIGroup API_file = null;
	APIGroup API_message = null;
	APIGroup API_messaging = null;
	APIGroup API_messageFolder = null;
	APIGroup API_messagingQty = null;
	APIGroup API_messageTypes = null;
	APIGroup API_multimedia = null;
	APIGroup API_pim = null;
	APIGroup API_positionInfo = null;
	APIGroup API_powerInfo = null;
	APIGroup API_radioInfo = null;
	APIGroup API_radioSignalType = null;
	APIGroup API_telephony = null;
	APIGroup API_videoPlayer = null;
	APIGroup API_widget = null;
	APIGroup API_widgetmanger = null;
	APIGroup Cons_DataNetworkInfo = null;
	APIGroup Cons_DeviceStateInfo = null;
	APIGroup Cons_RadioInfo = null;

	private static JIL12FeatureAPI featureAPI;

	public static JIL12FeatureAPI getInstance() {
		if (featureAPI == null) {
			featureAPI = new JIL12FeatureAPI();
		}
		return featureAPI;
	}

	private JIL12FeatureAPI() {

		initDeviceInfo();
		initAccountInfo();
		initConfig();
		initMessageGroup();
		initCamera();
		initPIM();
		initTelephony();
		initWidgetmanger();
		initWidget();
		initException();
		initExceptionTypes();
		initDevice();
		initDataNtwkInfo();
		initDataNtwkConnTypes();
		initDeviceStateInfo();
		initAccelerometerInfo();
		initFile();
		initPositionInfo();
		initPowerInfo();
		initRadioInfo();
		initRadioSignalType();
		initApplicationTypes();
		initAccount();
		initMessage();
		initMessageFolder();
		initMessagingQuantities();
		initMessageTypes();
		initMultimedia();
		initAudioPlayer();
		initVideoPlayer();
		initAddressBookItem();
		initCalendarItem();
		initEventType();
		initCallRecord();
		initCallRecordTypes();
		initAttachment();

		initConsDataNetworkInfo();
		initConsDeviceStateInfo();
		initConsRadioInfo();

		getApiList().add(this.API_widget);
		getApiList().add(this.API_exception);
		getApiList().add(this.API_exceptionTypes);
		getApiList().add(this.API_device);
		getApiList().add(this.API_dataNtwkInfo);
		getApiList().add(this.API_deviceStateInfo);
		getApiList().add(this.API_accelerometerInfo);
		getApiList().add(this.API_file);
		getApiList().add(this.API_positionInfo);
		getApiList().add(this.API_powerInfo);
		getApiList().add(this.API_radioInfo);
		getApiList().add(this.API_apptypes);
		getApiList().add(this.API_account);
		getApiList().add(this.API_message);
		getApiList().add(this.API_messageFolder);
		getApiList().add(this.API_messagingQty);
		getApiList().add(this.API_messageTypes);
		getApiList().add(this.API_multimedia);
		getApiList().add(this.API_audioPlayer);
		getApiList().add(this.API_videoPlayer);
		getApiList().add(this.API_addressBookItem);
		getApiList().add(this.API_calendarItem);
		getApiList().add(this.API_eventType);
		getApiList().add(this.API_callRecord);
		getApiList().add(this.API_callRecordTypes);
		getApiList().add(this.API_pim);
		getApiList().add(this.API_attachment);
		getApiList().add(this.API_messaging);
		getApiList().add(this.API_camera);
		getApiList().add(this.API_telephony);
		getApiList().add(this.API_config);
		getApiList().add(this.API_deviceInfo);
		getApiList().add(this.API_accountInfo);
		getApiList().add(this.API_widgetmanger);
		getApiList().add(this.API_dataNtwkConnTypes);
		getApiList().add(this.API_radioSignalType);

		getApiList().add(this.Cons_DataNetworkInfo);
		getApiList().add(this.Cons_DeviceStateInfo);
		getApiList().add(this.Cons_RadioInfo);

	}

	private void initMessageGroup() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.Messaging.createMessage");
		apiList.add("Widget.Messaging.deleteAllMessages");
		apiList.add("Widget.Messaging.deleteMessage");
		apiList.add("Widget.Messaging.findMessages");
		apiList.add("Widget.Messaging.getMessage");
		apiList.add("Widget.Messaging.getMessageQuantities");
		apiList.add("Widget.Messaging.sendMessage");
		apiList.add("Widget.Messaging.moveMessageToFolder");
		apiList.add("Widget.Messaging.getFolderNames");
		apiList.add("Widget.Messaging.deleteFolder");
		apiList.add("Widget.Messaging.copyMessageToFolder");
		apiList.add("Widget.Messaging.createFolder");
		apiList.add("Widget.Messaging.getEmailAccounts");
		apiList.add("Widget.Messaging.deleteEmailAccount");
		apiList.add("Widget.Messaging.getCurrentEmailAccount");
		apiList.add("Widget.Messaging.setCurrentEmailAccount");
		apiList.add("Widget.Messaging.onMessageArrived");
		apiList.add("Widget.Messaging.onMessageSendingFailure");
		apiList.add("Widget.Messaging.onMessagesFound");
		this.API_messaging = new APIGroup(apiList, FEATURE_MESSAGING,
				FeatureCategory.SILVER);
	}

	private void initAttachment() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.Messaging.getMessage");
		apiList.add("Widget.Message.attachments");
		apiList.add("Widget.Messaging.Attachment.fileName");
		apiList.add("Widget.Messaging.Attachment.MIMEType");
		apiList.add("Widget.Messaging.Attachment.size");
		this.API_attachment = new APIGroup(apiList, FEATURE_ATTACHMENT,
				FeatureCategory.GOLD);
	}

	private void initPIM() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.PIM.addAddressBookItem");
		apiList.add("Widget.PIM.deleteAddressBookItem");
		apiList.add("Widget.PIM.findAddressBookItems");
		apiList.add("Widget.PIM.getAddressBookItem");
		apiList.add("Widget.PIM.getAddressBookItemsCount");
		apiList.add("Widget.PIM.createAddressBookGroup");
		apiList.add("Widget.PIM.exportAsVCard");
		apiList.add("Widget.PIM.getAvailableAddressGroupNames");
		apiList.add("Widget.PIM.getAddressBookGroupMembers");
		apiList.add("Widget.PIM.deleteAddressBookGroup");
		apiList.add("Widget.PIM.createAddressBookItem");
		apiList.add("Widget.PIM.deleteAddressBookGroup");
		apiList.add("Widget.PIM.onAddressBookItemsFound");
		apiList.add("Widget.PIM.onVCardExportingFinish");
		apiList.add("Widget.PIM.EventRecurrenceTypes");
		apiList.add("Widget.PIM.CalendarItem.update");
		apiList.add("Widget.PIM.addCalendarItem");
		apiList.add("Widget.PIM.deleteCalendarItem");
		apiList.add("Widget.PIM.findCalendarItems");
		apiList.add("Widget.PIM.getCalendarItem");
		apiList.add("Widget.PIM.getCalendarItems");
		apiList.add("Widget.PIM.onCalendarItemAlert");
		apiList.add("Widget.PIM.onCalendarItemsFound");

		this.API_pim = new APIGroup(apiList, FEATURE_PIM, FeatureCategory.GOLD);
	}

	private void initCamera() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.Multimedia.Camera.captureImage");
		apiList.add("Widget.Multimedia.Camera.startVideoCapture");
		apiList.add("Widget.Multimedia.Camera.stopVideoCapture");
		apiList.add("Widget.Multimedia.Camera.onCameraCaptured");
		apiList.add("Widget.Multimedia.Camera.setWindow");

		this.API_camera = new APIGroup(apiList, FEATURE_CAMERA,
				FeatureCategory.SILVER);
	}

	private void initTelephony() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.Telephony.deleteAllCallRecords");
		apiList.add("Widget.Telephony.deleteCallRecord");
		apiList.add("Widget.Telephony.findCallRecords");
		apiList.add("Widget.Telephony.getCallRecordCnt");
		apiList.add("Widget.Telephony.initiateVoiceCall");
		apiList.add("Widget.Telephony.CallRecordTypes");
		apiList.add("Widget.Telephony.getCallRecord");
		apiList.add("Widget.Telephony.onCallEvent");
		apiList.add("Widget.Telephony.onCallRecordsFound");
		apiList.add("Widget.Telephony.CallRecord");
		apiList.add("Widget.Telephony.CallRecordTypes");
		this.API_telephony = new APIGroup(apiList, FEATURE_TELEPHONY,
				FeatureCategory.GOLD);
	}

	private void initConfig() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.Device.DeviceStateInfo.Config");
		apiList.add("Widget.Device.DeviceStateInfo.Config.msgRingtoneVolume");
		apiList.add("Widget.Device.DeviceStateInfo.Config.ringtoneVolume");
		apiList.add("Widget.Device.DeviceStateInfo.Config.setAsWallpaper");
		apiList.add("Widget.Device.DeviceStateInfo.Config.setDefaultRingtone");
		apiList.add("Widget.Device.DeviceStateInfo.Config.vibrationSetting");
		this.API_config = new APIGroup(apiList, FEATURE_CONFIG,
				FeatureCategory.GOLD);
	}

	private void initDeviceInfo() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.Device.DeviceInfo");
		apiList.add("Widget.Device.DeviceInfo.ownerInfo");
		apiList.add("Widget.Device.DeviceInfo.phoneColorDepthDefault");
		apiList.add("Widget.Device.DeviceInfo.phoneFirmware");
		apiList.add("Widget.Device.DeviceInfo.phoneManufacturer");
		apiList.add("Widget.Device.DeviceInfo.phoneModel");
		apiList.add("Widget.Device.DeviceInfo.phoneOS");
		apiList.add("Widget.Device.DeviceInfo.phoneSoftware");
		apiList.add("Widget.Device.DeviceInfo.phoneScreenHeightDefault");
		apiList.add("Widget.Device.DeviceInfo.phoneScreenWidthDefault");
		apiList.add("Widget.Device.DeviceInfo.totalMemory");
		this.API_deviceInfo = new APIGroup(apiList, FEATURE_DEVICEINFO,
				FeatureCategory.SILVER);
	}

	private void initAccountInfo() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.Device.AccountInfo");
		apiList.add("Widget.Device.AccountInfo.phoneMSISDN");
		apiList.add("Widget.Device.AccountInfo.userSubscriptionType");
		apiList.add("Widget.Device.AccountInfo.userAccountBalance");
		apiList.add("Widget.Device.AccountInfo.phoneUserUniqueId");
		apiList.add("Widget.Device.AccountInfo.phoneOperatorName");
		this.API_accountInfo = new APIGroup(apiList, FEATURE_ACCOUNTINFO,
				FeatureCategory.GOLD);
	}

	private void initWidgetmanger() {
		/*
		 * ArrayList apiList = new ArrayList();
		 * apiList.add("WidgetManager.checkWidgetInstallationStatus");
		 * this.API_widgetmanger = new APIGroup(apiList, FEATURE_WIDGETMANAGER,
		 * );
		 */
	}

	private void initWidget() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.onFocus");
		apiList.add("Widget.onMaximize");
		apiList.add("Widget.onRestore");
		apiList.add("Widget.onWakeup");
		apiList.add("Widget.preferenceForKey");
		apiList.add("Widget.setPreferenceForKey");
		apiList.add("Widget.openURL");
		this.API_widget = new APIGroup(apiList, FEATURE_WIDGET,
				FeatureCategory.SILVER);
	}

	private void initException() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.Exception.message");
		apiList.add("Widget.Exception.type");
		this.API_exception = new APIGroup(apiList, FEATURE_EXCEPTION,
				FeatureCategory.BRONZE);
	}

	private void initExceptionTypes() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.ExceptionTypes.INVALID_PARAMETER");
		apiList.add("Widget.ExceptionTypes.SECURITY");
		apiList.add("Widget.ExceptionTypes.UNKNOWN");
		apiList.add("Widget.ExceptionTypes.UNSUPPORTED");

		this.API_exceptionTypes = new APIGroup(apiList, FEATURE_EXCEPTION,
				FeatureCategory.BRONZE);
	}

	private void initDevice() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.Device.AccountInfo");
		apiList.add("Widget.Device.ApplicationTypes");
		apiList.add("Widget.Device.DataNetworkInfo");
		apiList.add("Widget.Device.DeviceInfo");
		apiList.add("Widget.Device.DeviceStateInfo");
		apiList.add("Widget.Device.File");
		apiList.add("Widget.Device.PositionInfo");
		apiList.add("Widget.Device.PowerInfo");
		apiList.add("Widget.Device.RadioInfo");

		apiList.add("Widget.Device.widgetEngineName");
		apiList.add("Widget.Device.widgetEngineProvider");
		apiList.add("Widget.Device.widgetEngineVersion");
		apiList.add("Widget.Device.getFile");
		apiList.add("Widget.Device.copyFile");
		apiList.add("Widget.Device.getDirectoryFileNames");
		apiList.add("Widget.Device.moveFile");
		apiList.add("Widget.Device.createFile");
		apiList.add("Widget.Device.deleteFile");
		apiList.add("Widget.Device.findFiles");
		apiList.add("Widget.Device.onFilesFound");
		apiList.add("Widget.Device.getFileSystemSize");
		apiList.add("Widget.Device.setRingtone");
		apiList.add("Widget.Device.vibrate");
		apiList.add("Widget.Device.getAvailableApplications");
		apiList.add("Widget.Device.launchApplication");
		apiList.add("Widget.Device.getFileSystemRoots");
		apiList.add("Widget.Device.clipboardString");

		this.API_device = new APIGroup(apiList, FEATURE_DEVICE,
				FeatureCategory.GOLD);
	}

	private void initDataNtwkInfo() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.Device.DataNetworkInfo.isDataNetworkConnected");
		apiList.add("Widget.Device.DataNetworkInfo.networkConnectionType");
		apiList.add("Widget.Device.DataNetworkInfo.onNetworkConnectionChanged");
		apiList.add("Widget.Device.DataNetworkInfo.getNetworkConnectionName");

		this.API_dataNtwkInfo = new APIGroup(apiList, FEATURE_DATANTWKINFO,
				FeatureCategory.SILVER);
	}

	private void initDataNtwkConnTypes() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.Device.DataNetworkInfo.networkConnectionType");
		apiList
				.add("Widget.Device.DataNetworkInfo.DataNetworkConnectionTypes.BLUETOOTH");
		apiList
				.add("Widget.Device.DataNetworkInfo.DataNetworkConnectionTypes.EDGE");
		apiList
				.add("Widget.Device.DataNetworkInfo.DataNetworkConnectionTypes.EVDO");
		apiList
				.add("Widget.Device.DataNetworkInfo.DataNetworkConnectionTypes.GPRS");
		apiList
				.add("Widget.Device.DataNetworkInfo.DataNetworkConnectionTypes.IRDA");
		apiList
				.add("Widget.Device.DataNetworkInfo.DataNetworkConnectionTypes.WIFI");
		apiList
				.add("Widget.Device.DataNetworkInfo.DataNetworkConnectionTypes.LTE");
		apiList
				.add("Widget.Device.DataNetworkInfo.DataNetworkConnectionTypes.ONEXRTT");

		this.API_dataNtwkConnTypes = new APIGroup(apiList,
				FEATURE_DATANTWKCONNTYPES, FeatureCategory.SILVER);
	}

	private void initDeviceStateInfo() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.Device.DeviceStateInfo");
		apiList.add("Widget.Device.DeviceStateInfo.Config");
		apiList.add("Widget.Device.DeviceStateInfo.AccelerometerInfo");
		apiList.add("Widget.Device.DeviceStateInfo.requestPositionInfo");
		apiList.add("Widget.Device.DeviceStateInfo.onPositionRetrieved");
		apiList.add("Widget.Device.DeviceStateInfo.availableMemory");
		apiList.add("Widget.Device.DeviceStateInfo.language");
		apiList.add("Widget.Device.DeviceStateInfo.onScreenChangeDimensions");
		apiList.add("Widget.Device.DeviceStateInfo.onFlipEvent");
		apiList.add("Widget.Device.DeviceStateInfo.keypadLightOn");
		apiList.add("Widget.Device.DeviceStateInfo.backLightOn");
		apiList
				.add("Widget.Device.DeviceStateInfo.processorUtilizationPercent");
		apiList.add("Widget.Device.DeviceStateInfo.audioPath");

		this.API_deviceStateInfo = new APIGroup(apiList,
				FEATURE_DEVICESTATEINFO, FeatureCategory.SILVER);
	}

	private void initAccelerometerInfo() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.Device.DeviceStateInfo.AccelerometerInfo");
		apiList.add("Widget.Device.DeviceStateInfo.AccelerometerInfo.xAxis");
		apiList.add("Widget.Device.DeviceStateInfo.AccelerometerInfo.yAxis");
		apiList.add("Widget.Device.DeviceStateInfo.AccelerometerInfo.zAxis");

		this.API_accelerometerInfo = new APIGroup(apiList,
				FEATURE_ACCELEROMETERINFO, FeatureCategory.SILVER);
	}

	private void initFile() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.Device.File");
		apiList.add("Widget.Device.getFile");
		apiList.add("Widget.Device.File.createDate");
		apiList.add("Widget.Device.File.fileName");
		apiList.add("Widget.Device.File.filePath");
		apiList.add("Widget.Device.File.fileSize");
		apiList.add("Widget.Device.File.isDirectory");
		apiList.add("Widget.Device.File.lastModifyDate");

		this.API_file = new APIGroup(apiList, FEATURE_FILE,
				FeatureCategory.SILVER);
	}

	private void initPositionInfo() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.Device.PositionInfo");
		apiList.add("Widget.Device.DeviceStateInfo.onPositionRetrieved");
		apiList.add("Widget.Device.PositionInfo.latitude");
		apiList.add("Widget.Device.PositionInfo.longitude");
		apiList.add("Widget.Device.PositionInfo.altitude");
		apiList.add("Widget.Device.PositionInfo.cellID");
		apiList.add("Widget.Device.PositionInfo.accuracy");
		apiList.add("Widget.Device.PositionInfo.altitudeAccuracy");
		apiList.add("Widget.Device.PositionInfo.timeStamp");

		this.API_positionInfo = new APIGroup(apiList, FEATURE_POSITIONINFO,
				FeatureCategory.SILVER);
	}

	private void initPowerInfo() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.Device.PowerInfo");
		apiList.add("Widget.Device.PowerInfo.isCharging");
		apiList.add("Widget.Device.PowerInfo.percentRemaining");
		apiList.add("Widget.Device.PowerInfo.onChargeStateChange");
		apiList.add("Widget.Device.PowerInfo.onLowBattery");
		apiList.add("Widget.Device.PowerInfo.onChargeLevelChange");

		this.API_powerInfo = new APIGroup(apiList, FEATURE_POWERINFO,
				FeatureCategory.GOLD);
	}

	private void initRadioInfo() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.Device.RadioInfo");
		apiList.add("Widget.Device.RadioInfo.isRoaming");
		apiList.add("Widget.Device.RadioInfo.radioSignalStrengthPercent");
		apiList.add("Widget.Device.RadioInfo.onSignalSourceChange");
		apiList.add("Widget.Device.RadioInfo.isRadioEnabled");
		apiList.add("Widget.Device.RadioInfo.radioSignalSource");

		this.API_radioInfo = new APIGroup(apiList, FEATURE_RADIOINFO,
				FeatureCategory.GOLD);
	}

	private void initRadioSignalType() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.Device.RadioInfo.radioSignalSource");
		apiList.add("Widget.Device.RadioInfo.RadioSignalSourceTypes.CDMA");
		apiList.add("Widget.Device.RadioInfo.RadioSignalSourceTypes.GSM");
		apiList.add("Widget.Device.RadioInfo.RadioSignalSourceTypes.LTE");
		apiList.add("Widget.Device.RadioInfo.RadioSignalSourceTypes.TDSCDMA");
		apiList.add("Widget.Device.RadioInfo.RadioSignalSourceTypes.WCDMA");

		this.API_radioSignalType = new APIGroup(apiList,
				FEATURE_RADIOSIGNALTYPE, FeatureCategory.GOLD);
	}

	private void initApplicationTypes() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.Device.ApplicationTypes");
		apiList.add("Widget.Device.launchApplication");
		apiList.add("Widget.Device.ApplicationTypes.ALARM");
		apiList.add("Widget.Device.ApplicationTypes.BROWSER");
		apiList.add("Widget.Device.ApplicationTypes.CALCULATOR");
		apiList.add("Widget.Device.ApplicationTypes.CALENDAR");
		apiList.add("Widget.Device.ApplicationTypes.CAMERA");
		apiList.add("Widget.Device.ApplicationTypes.CONTACTS");
		apiList.add("Widget.Device.ApplicationTypes.FILES");
		apiList.add("Widget.Device.ApplicationTypes.GAMES");
		apiList.add("Widget.Device.ApplicationTypes.MEDIAPLAYER");
		apiList.add("Widget.Device.ApplicationTypes.MESSAGING");
		apiList.add("Widget.Device.ApplicationTypes.MAIL");
		apiList.add("Widget.Device.ApplicationTypes.PHONECALL");
		apiList.add("Widget.Device.ApplicationTypes.PICTURES");
		apiList.add("Widget.Device.ApplicationTypes.PROG_MANAGER");
		apiList.add("Widget.Device.ApplicationTypes.SETTINGS");
		apiList.add("Widget.Device.ApplicationTypes.TASKS");
		apiList.add("Widget.Device.ApplicationTypes.WIDGETMANAGER");

		this.API_apptypes = new APIGroup(apiList, FEATURE_APPTYPES,
				FeatureCategory.SILVER);
	}

	private void initAccount() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.Messaging.getCurrentEmailAccount");
		apiList.add("Widget.Messaging.Account.accountId");
		apiList.add("Widget.Messaging.Account.accountName");

		this.API_account = new APIGroup(apiList, FEATURE_ACCOUNT,
				FeatureCategory.GOLD);
	}

	private void initMessage() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.Messaging.getMessage");
		apiList.add("Widget.Messaging.createMessage");
		apiList.add("Widget.Message.attachments");
		apiList.add("Widget.Message.bccAddress");
		apiList.add("Widget.Message.body");
		apiList.add("Widget.Message.callbackNumber");
		apiList.add("Widget.Message.ccAddress");
		apiList.add("Widget.Message.destinationAddress");
		apiList.add("Widget.Message.isRead");
		apiList.add("Widget.Message.messageId");
		apiList.add("Widget.Message.messagePriority");
		apiList.add("Widget.Message.messageType");
		apiList.add("Widget.Message.sourceAddress");
		apiList.add("Widget.Message.subject");
		apiList.add("Widget.Message.time");
		apiList.add("Widget.Message.validityPeriodHours");
		apiList.add("Widget.Message.addAddress");
		apiList.add("Widget.Message.addAttachment");
		apiList.add("Widget.Message.deleteAddress");
		apiList.add("Widget.Message.deleteAttachment");
		apiList.add("Widget.Message.saveAttachment");

		this.API_message = new APIGroup(apiList, FEATURE_MESSAGE,
				FeatureCategory.SILVER);
	}

	private void initMessageFolder() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.Messaging.MessageFolderTypes.DRAFTS");
		apiList.add("Widget.Messaging.MessageFolderTypes.INBOX");
		apiList.add("Widget.Messaging.MessageFolderTypes.OUTBOX");
		apiList.add("Widget.Messaging.MessageFolderTypes.SENTBOX");

		this.API_messageFolder = new APIGroup(apiList, FEATURE_MESSAGEFOLDER,
				FeatureCategory.GOLD);
	}

	private void initMessagingQuantities() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.Messaging.getMessageQuantities");
		apiList.add("Widget.Messaging.MessageQuantities.totalMessageCnt");
		apiList.add("Widget.Messaging.MessageQuantities.totalMessageReadCnt");
		apiList.add("Widget.Messaging.MessageQuantities.totalMessageUnreadCnt");

		this.API_messagingQty = new APIGroup(apiList,
				FEATURE_MESSAGINGQUANTITIES, FeatureCategory.GOLD);
	}

	private void initMessageTypes() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.Messaging.MessageTypes.EmailMessage");
		apiList.add("Widget.Messaging.MessageTypes.MMSMessage");
		apiList.add("Widget.Messaging.MessageTypes.SMSMessage");

		this.API_messageTypes = new APIGroup(apiList, FEATURE_MESSAGETYPES,
				FeatureCategory.GOLD);
	}

	private void initMultimedia() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.Multimedia.isAudioPlaying");
		apiList.add("Widget.Multimedia.isVideoPlaying");
		apiList.add("Widget.Multimedia.getVolume");
		apiList.add("Widget.Multimedia.stopAll");

		this.API_multimedia = new APIGroup(apiList, FEATURE_MULTIMEDIA,
				FeatureCategory.GOLD);
	}

	private void initAudioPlayer() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.Multimedia.AudioPlayer");
		apiList.add("Widget.Multimedia.AudioPlayer.onStateChange");
		apiList.add("Widget.Multimedia.AudioPlayer.open");
		apiList.add("Widget.Multimedia.AudioPlayer.pause");
		apiList.add("Widget.Multimedia.AudioPlayer.play");
		apiList.add("Widget.Multimedia.AudioPlayer.resume");
		apiList.add("Widget.Multimedia.AudioPlayer.stop");

		this.API_audioPlayer = new APIGroup(apiList, FEATURE_AUDIOPLAYER,
				FeatureCategory.SILVER);
	}

	private void initVideoPlayer() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.Multimedia.VideoPlayer");
		apiList.add("Widget.Multimedia.VideoPlayer.onStateChange");
		apiList.add("Widget.Multimedia.VideoPlayer.open");
		apiList.add("Widget.Multimedia.VideoPlayer.pause");
		apiList.add("Widget.Multimedia.VideoPlayer.play");
		apiList.add("Widget.Multimedia.VideoPlayer.resume");
		apiList.add("Widget.Multimedia.VideoPlayer.stop");
		apiList.add("Widget.Multimedia.VideoPlayer.setWindow");

		this.API_videoPlayer = new APIGroup(apiList, FEATURE_VIDEOPLAYER,
				FeatureCategory.GOLD);
	}

	private void initAddressBookItem() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.Device.DeviceInfo.ownerInfo");
		apiList.add("Widget.PIM.createAddressBookItem()");
		apiList.add("Widget.PIM.AddressBookItem");
		apiList.add("Widget.PIM.AddressBookItem.address");
		apiList.add("Widget.PIM.AddressBookItem.addressBookItemId");
		apiList.add("Widget.PIM.AddressBookItem.company");
		apiList.add("Widget.PIM.AddressBookItem.eMail");
		apiList.add("Widget.PIM.AddressBookItem.fullName");
		apiList.add("Widget.PIM.AddressBookItem.homePhone");
		apiList.add("Widget.PIM.AddressBookItem.mobilePhone");
		apiList.add("Widget.PIM.AddressBookItem.title");
		apiList.add("Widget.PIM.AddressBookItem.workPhone");
		apiList.add("Widget.PIM.AddressBookItem.getAddressGroupNames");
		apiList.add("Widget.PIM.AddressBookItem.getAttributeValue");
		apiList.add("Widget.PIM.AddressBookItem.getAvailableAttributes");
		apiList.add("Widget.PIM.AddressBookItem.setAddressGroupNames");
		apiList.add("Widget.PIM.AddressBookItem.setAttributeValue");
		apiList.add("Widget.PIM.AddressBookItem.update");
		apiList.add("Widget.PIM.getAddressBookItem");
		this.API_addressBookItem = new APIGroup(apiList,
				FEATURE_ADDRESSBOOKITEM, FeatureCategory.SILVER);
	}

	private void initCalendarItem() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.PIM.CalendarItem");
		apiList.add("Widget.PIM.CalendarItem.alarmDate");
		apiList.add("Widget.PIM.CalendarItem.alarmed");
		apiList.add("Widget.PIM.CalendarItem.calendarItemId");
		apiList.add("Widget.PIM.CalendarItem.eventEndTime");
		apiList.add("Widget.PIM.CalendarItem.eventName");
		apiList.add("Widget.PIM.CalendarItem.eventNotes");
		apiList.add("Widget.PIM.CalendarItem.eventRecurrence");
		apiList.add("Widget.PIM.CalendarItem.eventStartTime");
		apiList.add("Widget.PIM.CalendarItem.update");
		apiList.add("Widget.PIM.getCalendarItem");

		this.API_calendarItem = new APIGroup(apiList, FEATURE_CALENDARITEM,
				FeatureCategory.GOLD);
	}

	private void initEventType() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.PIM.CalendarItem.eventRecurrence");
		apiList.add("Widget.PIM.EventRecurrenceTypes");
		apiList.add("Widget.PIM.EventRecurrenceTypes.DAILY");
		apiList.add("Widget.PIM.EventRecurrenceTypes.EVERY_WEEKDAY");
		apiList.add("Widget.PIM.EventRecurrenceTypes.MONTHLY_ON_DAY");
		apiList.add("Widget.PIM.EventRecurrenceTypes.MONTHLY_ON_DAY_COUNT");
		apiList.add("Widget.PIM.EventRecurrenceTypes.NOT_REPEAT");
		apiList.add("Widget.PIM.EventRecurrenceTypes.WEEKLY_ON_DAY");
		apiList.add("Widget.PIM.EventRecurrenceTypes.YEARLY");

		this.API_eventType = new APIGroup(apiList,
				FEATURE_EVENTRECCURENCETYPES, FeatureCategory.GOLD);
	}

	private void initCallRecord() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.Telephony.CallRecord.callRecordAddress");
		apiList.add("Widget.Telephony.CallRecord.callRecordId");
		apiList.add("Widget.Telephony.CallRecord.callRecordName");
		apiList.add("Widget.Telephony.CallRecord.durationSeconds");
		apiList.add("Widget.Telephony.CallRecord.startTime");
		apiList.add("Widget.Telephony.getCallRecord");
		apiList.add("Widget.Telephony.CallRecord");

		this.API_callRecord = new APIGroup(apiList, FEATURE_CALLRECORD,
				FeatureCategory.GOLD);
	}

	private void initCallRecordTypes() {
		ArrayList apiList = new ArrayList();
		apiList.add("Widget.Telephony.CallRecordTypes");
		apiList.add("Widget.Telephony.CallRecordTypes.MISSED");
		apiList.add("Widget.Telephony.CallRecordTypes.OUTGOING");
		apiList.add("Widget.Telephony.CallRecordTypes.RECEIVED");

		this.API_callRecordTypes = new APIGroup(apiList,
				FEATURE_CALLRECORDTYPES, FeatureCategory.GOLD);
	}

	private void initConsDataNetworkInfo() {
		/*
		 * ArrayList featureList = new ArrayList();
		 * featureList.add("http://jil.org/jil/api/1.1.1/datanetworkinfo");
		 * featureList
		 * .add("http://jil.org/jil/api/1.1.5/datanetworkconnectiontypes");
		 * this.Cons_DataNetworkInfo = new
		 * APIGroup("Widget.Device.DataNetworkInfo()", featureList);
		 */
	}

	private void initConsDeviceStateInfo() {
		/*
		 * ArrayList featureList = new ArrayList();
		 * featureList.add("http://jil.org/jil/api/1.1/devicestateinfo");
		 * featureList.add("http://jil.org/jil/api/1.1/accelerometerinfo");
		 * featureList.add("http://jil.org/jil/api/1.1/config");
		 * this.Cons_DeviceStateInfo = new
		 * APIGroup("Widget.Device.DeviceStateInfo()", featureList);
		 */
	}

	private void initConsRadioInfo() {
		/*
		 * ArrayList featureList = new ArrayList();
		 * featureList.add("http://jil.org/jil/api/1.1.1/radioinfo");
		 * featureList
		 * .add("http://jil.org/jil/api/1.1.5/radiosignalsourcetypes");
		 * this.Cons_RadioInfo = new APIGroup("Widget.Device.RadioInfo()",
		 * featureList);
		 */
	}

}
