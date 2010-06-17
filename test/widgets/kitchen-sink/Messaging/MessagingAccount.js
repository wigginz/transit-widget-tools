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
 * JavaScript objects Messagingattachment. 
 */

function showMessagingAccount() {
    var MessagingAccount = document.getElementById("MessagingattAccount");
    MessagingAccount.style.display = "block";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "none"; 
}
 
function showDetail_Account()
{
    var MessagingAccount = document.getElementById("MessagingattAccount");
    MessagingAccount.style.display = "none";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "block";      
}
 
function getAccountId() {
    showDetail_Account();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field accountId";
    document.getElementById("textdivshowExplanation").innerHTML = "The id of the account.  ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var account = Widget.Messaging.getCurrentEmailAccount();<br>var storeId = account.accountId;"

    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice :  n/a";
    flag = "ActivegetAccountId";
}

function ActivegetAccountId() {
    var account = Widget.Messaging.getCurrentEmailAccount();
    if (account != null)
    {
         document.getElementById("textdivshowResult").innerHTML = "AccountId of current email account : "
            + account.accountId;
    }
else
{
 document.getElementById("textdivshowResult").innerHTML = "No default email account ";	
}
}

function getAccountName() {
   showDetail_Account();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field accountName";
    document.getElementById("textdivshowExplanation").innerHTML = "The name of the account.  ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var account = Widget.Messaging.getCurrentEmailAccount();<br> var storeName = account.accountName;"

    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice :  n/a";
    flag = "ActivegetAccountName";
}

function ActivegetAccountName() {
     var account = Widget.Messaging.getCurrentEmailAccount();
    if (account != null)
    {
         document.getElementById("textdivshowResult").innerHTML = "accountName of current email account : "
            + account.accountName;
    }
else
{
 document.getElementById("textdivshowResult").innerHTML = "No default email account ";	
}
}


/*
 * This function used to show the UI of the Widget. 
 */
function clickItbackMessagingattachment() 
{
    showMessagingtest();
}
