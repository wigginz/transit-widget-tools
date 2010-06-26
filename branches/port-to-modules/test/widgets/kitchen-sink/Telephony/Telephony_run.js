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

var flag = "";
function clickItResult() {
    switch (flag) {
    case "clickinitiateVoiceCall":
    	clickinitiateVoiceCall();
        break;
    case "clickgetCallRecordCnt":
        clickgetCallRecordCnt();
        break;
    case "clickfindCallRecords":
        clickfindCallRecords();
        break;
    case "clickgetCallRecord":
        clickgetCallRecord();
        break;
    case "clickdeleteCallRecord":
        clickdeleteCallRecord();
        break;
    case "clickdeleteAllCallRecords":
        clickdeleteAllCallRecords();
        break;
    case "onCallRecordsFoundAction":
    	onCallRecordsFoundAction();
        break;
    case "clickTelephonycallback":
        clickTelephonycallback();
        break;
    case "clickTelephonyexception":
        clickTelephonyexception();
        break;
    case "RECEIVEDAction":
    	RECEIVEDAction();
        break;
    case "OUTGOINGAction":
    	OUTGOINGAction();
        break;
    case "MISSEDAction":
    	MISSEDAction();
        break;
    case "callRecordAddressAction":
    	callRecordAddressAction();
        break;
    case "callRecordIdAction":
    	callRecordIdAction();
        break;
    case "callRecordNameAction":
    	callRecordNameAction();
        break;
    case "callRecordTypeAction":
    	callRecordTypeAction();
        break;
    case "durationSecondsAction":
    	durationSecondsAction();
        break;
    case "startTimeAction":
    	startTimeAction();
        break;
    default:
        break;
    }
}
