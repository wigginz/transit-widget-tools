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
 * @fileoverview: This file is to be used for testing all functions and properties of 
 * JavaScript objects AccountInfo. 
 */

function showAccountInfotest() {
    var AccountInfotest = document.getElementById("AccountInfotest");
    AccountInfotest.style.display = "block";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "none";
}

function showDetail_AccountInfo()
{
    var AccountInfotest = document.getElementById("AccountInfotest");
    AccountInfotest.style.display = "none";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "block";
}

function clickItphoneMSISDN() {
    showDetail_AccountInfo();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field phoneMSISDN";
    document.getElementById("textdivshowExplanation").innerHTML = " This is the mobile phone number associated with the account. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g. var v = Widget.Device.AccountInfo.phoneMSISDN;";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : Need test on phone.";
    flag = "phoneMSISDNAction";
}

function phoneMSISDNAction() {
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + Widget.Device.AccountInfo.phoneMSISDN;
}

function clickItphoneOperatorName() {
    showDetail_AccountInfo();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field phoneOperatorName";
    document.getElementById("textdivshowExplanation").innerHTML = " This is the name of the operator hosting the user account.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g. var v = Widget.Device.AccountInfo.phoneOperatorName; ";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : Need test on phone. ";
    flag = "phoneOperatorNameAction";
}

function phoneOperatorNameAction() {
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + Widget.Device.AccountInfo.phoneOperatorName;
}

function clickItphoneUserUniqueId() {
    showDetail_AccountInfo();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field phoneUserUniqueId";
    document.getElementById("textdivshowExplanation").innerHTML = " This is a value guaranteed to be unique to the user account.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g. var v = Widget.Device.AccountInfo.phoneUserUniqueId; ";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : Need test on phone. ";
    flag = "phoneUserUniqueIdAction";
}

function phoneUserUniqueIdAction() {
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + Widget.Device.AccountInfo.phoneUserUniqueId;
}


function clickUserAccountBalance() {
    showDetail_AccountInfo();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field userAccountBalance";
    document.getElementById("textdivshowExplanation").innerHTML = "This is the financial account balance in the default currency for the user account.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g. var v = Widget.Device.AccountInfo.userAccountBalance; ";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : This field should be double value, and is expected to use network resources. ";
    flag = "userAccountBalanceAction";
}

function userAccountBalanceAction() {
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + Widget.Device.AccountInfo.userAccountBalance;
}

function clickUserSubscriptionType() {
    showDetail_AccountInfo();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field userSubscriptionType";
    document.getElementById("textdivshowExplanation").innerHTML = "This indicates the type of billing for the account.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g. var v = Widget.Device.AccountInfo.userSubscriptionType; ";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : This is expected to use network resources. ";
    flag = "userSubscriptionTypeAction";
}

function userSubscriptionTypeAction() {
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + Widget.Device.AccountInfo.userSubscriptionType;
}