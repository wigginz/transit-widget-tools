## JIL API Coverage ##

Unless otherwise noted here, all JIL APIs for the 1.1r4 and 1.2.2 specs are fully supported in the emulator as of build 1.2.2.20100812. This information is also included in the Getting Started document available on the Project Home page.

| **JIL API** | **Limitation or Note** |
|:------------|:-----------------------|
| Widget.Device.findFiles | Only searching the "fileName" field. Currently working to include all other fields. <font color='green'>Completed API Included in build 20100812</font>|
| Widget.PIM.findAddressBookItems | Only searching the "fullName" field. Currently working to include all other fields. <font color='green'>Completed API Included in build 20100812</font>|
| Widget.PIM.onVCardExportingFinish | Not yet implemented.   |
| Widget.PIM.AddressBookItem.setAttributeValue | Not setting attributes that are defined as fields of the AddressBookItem object. The requirement is not clear in the JIL specification whether this should work or not. Currently requesting clarification of the requirement from JIL. |
| Widget.Device.File.createDate | File create date is not available through the Mozilla nsIFile interface, currently setting the value to the same as the file's lastModifiedDate field value. |
| Widget.Multimedia.Camera.captureImage | Camera integration has been implemented yet. Currently working to integrate a connected webcam if available. |
| Widget.Multimedia.Camera.startVideoCapture | Camera integration has been implemented yet. Currently working to integrate a connected webcam if available. |
| Widget.Multimedia.Camera.stopVideoCapture | Camera integration has been implemented yet. Currently working to integrate a connected webcam if available. |
| Widget.PIM.exportAsVCard | Not yet implemented.   |
| Widget.PIM.findCalendarItems | Only searching the "name" field. Currently working to include all other fields. <font color='green'>Completed API Included in build 20100812</font>|
| Widget.PIM.onCalendarItemAlert | Calendar alert events are not triggered by an actual clock. Alarms must be triggered manually through the "API Events" interface. |
| Widget.Messaging.Message.saveAttachment | Currently works as a copy operation, taking the file referenced in the attachment and copying it to the specified file location. |
| Widget.Messaging.createFolder | When creating a folder, the folder defaults to "INBOX" folder type. |
| Widget.Messaging.findMessages | Only searching the "subject" field. Currently working to include all other fields. <font color='green'>Completed API Included in build 20100812</font>|
| Widget.Messaging.getMessage | The "index" field is treated as the position of the message in the folder sorted by message date, descending. |
| Widget.Multimedia.Camera.setWindow | Camera integration has been implemented yet. Currently working to integrate a connected webcam if available. |

JIL API Security restrictions are applied to widgets with the Transit emulator, see the section Advanced Features in this document. Currently only functions are being monitored by the security manager and not API properties (Widget.Device.AccountInfo.phoneMSISDN, etc).