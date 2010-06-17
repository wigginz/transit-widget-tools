/*
 * Copyright by JIL, 2009.  
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * @fileoverview: This file is set as the Widget of testing all classes of
 * JavaScript API.
 */
var flag = "";
function clickItResult(){
    switch (flag) {
       case "getInboxType1":
           getInboxType1();
           break;
       case "getOutboxType1":
           getOutboxType1();
           break;
       case "getSentboxType1":
    	   getSentboxType1();
           break;
       case "getDraftboxType1":
           getDraftboxType1();
           break;
       case "addSourceAddess1":
           addSourceAddess1();
           break;
       case "Activesetattachments":
           Activesetattachments();
           break;
       case "addDestinationAddress1":
           addDestinationAddress1();
           break;
       case "deleteDestinationAddress1":
           deleteDestinationAddress1();
           break;
       case "addAttchment1":
           addAttchment1();
           break;
       case "ActivegetMMSMessage":
           ActivegetMMSMessage();
           break;

       case "deleteAttchment1":
           deleteAttchment1();
           break;
       case "ActiveSaveAttchment":
    	   ActiveSaveAttchment();
           break;
       case "ActiveCreateSMSMessage":
	     ActiveCreateSMSMessage();
	  break;
       case "ActiveCreateEmailMessage":
	ActiveCreateEmailMessage();
	 break;
       case "ActiveSendSMSMessage":
	ActiveSendSMSMessage();
	  break;
       case "ActivecreateMMSMessage":
	ActivecreateMMSMessage();
	  break;
       case "ActivesendMMSMessage":
	ActivesendMMSMessage();
	  break;
       case "ActivedeleteAllMMSMessages":
	ActivedeleteAllMMSMessages();
	  break;
       case "ActivegetSMSMessage":
		ActivegetSMSMessage();
	 break;
       case "ActivegetEmailMessage":
		ActivegetEmailMessage();
	  break;
       case "ActivedeleteAllSMSMessages":
		ActivedeleteAllSMSMessages();
	  break;
       case "ActivedeleteAllEmailMessages":
		ActivedeleteAllEmailMessages();

	 break;
	case "ActivedeleteOneSMSMessage":
		ActivedeleteOneSMSMessage();
	break;
	case "ActivedeleteOneMMSMessage":
		ActivedeleteOneMMSMessage();
	break;
	case "ActivecreateMMSFolder":
		ActivecreateMMSFolder();
	break;
	case "ActivedeleteOneEmailMessage":
		ActivedeleteOneEmailMessage();
	break;
	case "ActivecopySMSMessageToFolder":
		ActivecopySMSMessageToFolder();
	break;
	case "ActivecopyMmsMessageToFolder":
		ActivecopyMmsMessageToFolder();
	break;
	case "ActivegetSMSMessageQuantities":
		ActivegetSMSMessageQuantities();
	break;
	case "ActivegetMmsMessageQuantities":
		ActivegetMmsMessageQuantities();
	break;
	case "ActivegetEmailMessageQuantities":
		ActivegetEmailMessageQuantities();
	break;
	case "ActivemoveSMSMessageToFolder":
		ActivemoveSMSMessageToFolder();
	break;
	case "ActivemoveMmsMessageToFolder":
		ActivemoveMmsMessageToFolder();
	break;
	case "ActivegetMMSFolderNames":
		ActivegetMMSFolderNames();
	break;
	case "ActivemoveEmailMessageToFolder":
		ActivemoveEmailMessageToFolder();
	break;
	case "ActivefindSMSMessage" :
		ActivefindSMSMessage();
	break;
	case "ActivefindEmailMessage" :
		ActivefindEmailMessage();
	break;
	case "ActiveonSmsMessagesFound" :
		ActiveonSmsMessagesFound();
	break;
	case "ActiveonEmailMessagesFound" :
		ActiveonEmailMessagesFound();
	break;

	case "ActivecopyEmailMessageToFolder" :
		ActivecopyEmailMessageToFolder();
	break;
case "ActivegetTMessagecnt" :
	ActivegetTMessagecnt();
break;
case "ActivegetTMRCnt" :
	ActivegetTMRCnt();
break;
case "ActivegetTMURCnt" :
	ActivegetTMURCnt();
break;
case "ActivegetAccountId" :
ActivegetAccountId();
break;
case "ActivegetAccountName":
ActivegetAccountName();
break;

case "ActivesetbccAddress":
ActivesetbccAddress();
break;

case "Activesetbody":
Activesetbody();
break;
case "ActivesetcallbackNumber":
ActivesetcallbackNumber();
break;
case "ActivesetccAddress":
ActivesetccAddress();
break;
case "ActivesetdestinationAddress":
ActivesetdestinationAddress();
break;
case "ActivesetisRead":
ActivesetisRead();
break;
case "ActivesetmessageId":
ActivesetmessageId();
break;
case "ActivesetmessagePriority":
ActivesetmessagePriority();
break;
case "ActivesetmessageType":
ActivesetmessageType();
break;
case "Activesetsubject":
Activesetsubject();
break;
case "ActivesetvalidityPeriodHours":
ActivesetvalidityPeriodHours();
break;
case "ActivecreateSMSFolder":
ActivecreateSMSFolder();
break;
case "ActiDeleteMMSFolder":
ActiDeleteMMSFolder();
break;


case "ActivecreateEmailFolder":
ActivecreateEmailFolder();
break;
case "ActivedeleteSMSFolder":
ActivedeleteSMSFolder();
break;
case "ActivedeleteEmailFolder":
ActivedeleteEmailFolder();
break;
case "ActivegetSMSFolderNames":
ActivegetSMSFolderNames();
break;
case "ActivegetEmailFolderNames":
ActivegetEmailFolderNames();
break;
case "ActivesendSMSMessage":
ActivesendSMSMessage();
break;
case "ActivesendEmailMessage":
ActivesendEmailMessage();
break;
case "ActiveonMessageArrived":
ActiveonMessageArrived();
break;
case "ActiveonMessageSendingFailure":
ActiveonMessageSendingFailure();
break;
case "ActiveonMessagesFound":
ActiveonMessagesFound();
break;














       case "setMessageDate1":
           setMessageDate1();
           break;
       case "getSMSMessageType1":
           getSMSMessageType1();
           break;
       case "getMMSMessageType1":
           getMMSMessageType1();
           break;
       case "getEmailMessageType1":
           getEmailMessageType1();
           break;  
       case "setFileName1":
           setFileName1();
           break;
       case "setMIMEType1":
           setMIMEType1();
           break;
       case "setSize1":
           setSize1();
	   break;
       case "ActivegetAllEmailAccounts":
    	   ActivegetAllEmailAccounts();
	    break;
       case "ActivegetCurrentEmailAccount":
    	   ActivegetCurrentEmailAccount();
	    break;
       case "ActivesetCurrentEmailAccount":
    	   ActivesetCurrentEmailAccount();
	   break;
       case "ActivedeleteEmailAccount":
    	   ActivedeleteEmailAccount();
           break;
        default:
            break;
    }
}
