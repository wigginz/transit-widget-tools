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
 * JavaScript object File. 
 */

function showFiletest() {
    var Filetest = document.getElementById("Filetest");
    Filetest.style.display = "block";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "none";
}

function showDetail_File()
{
    var Filetest = document.getElementById("Filetest");
    Filetest.style.display = "none";
    var showDetail = document.getElementById("showDetail");
    showDetail.style.display = "block";
}

function clickItcreateDate() {
    showDetail_File();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field createDate";
    document.getElementById("textdivshowExplanation").innerHTML = " The date on which the file was first created. If the host operating system does not support this value, then the value will be the same as that of lastModifyDate. If neither createDate nor lastModifyDate is supported, then the value will be undefined. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = new Widget.Device.File(); v.createDate = new Date(2008, 9, 22, 0, 0, 0);";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "createDateAction";
}

function createDateAction() {
    var v = new Widget.Device.File();
    v.createDate = new Date(2008, 9, 22, 0, 0, 0);
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + v.createDate;
}

function clickItfileName() {
    showDetail_File();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field fileName";
    document.getElementById("textdivshowExplanation").innerHTML = " Property indicating the name of the file. This does not include path information. E.g., 'readme.txt' ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = new Widget.Device.File(); v.fileName = 'test.txt';";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "fileNameAction";
}

function fileNameAction() {
    var v = new Widget.Device.File();
    v.fileName = 'test.txt';
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + v.fileName;
}

function clickItfilePath() {
    showDetail_File();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field filePath";
    document.getElementById("textdivshowExplanation").innerHTML = " This is the full path to the file on the file system. The value does not include the file name. E.g., '/local/data/'. Note that the right slash (/) is adopted as a directory separator and will be supported by the widget runtime regardless of the underlying operating system. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = new Widget.Device.File(); v.filePath = '/sdcard/';";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "filePathAction";
}

function filePathAction() {
    var v = new Widget.Device.File();
    v.filePath = '/sdcard/';
    document.getElementById("textdivshowResult").innerHTML = "Result: "
            + v.filePath;
}

function clickItfileSize() {
    showDetail_File();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field fileSize";
    document.getElementById("textdivshowExplanation").innerHTML = " The size of the file in bytes.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = new Widget.Device.File(); v.fileSize = 1024;";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "fileSizeAction";
}

function fileSizeAction() {
    var v = new Widget.Device.File();
    v.fileSize = 1024;
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + v.fileSize;
}

function clickItisDirectory() {
    showDetail_File();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field isDirectory";
    document.getElementById("textdivshowExplanation").innerHTML = "This is a boolean indicating whether the file is a directory.";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = new Widget.Device.File(); v.isDirectory = true;";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "isDirectoryAction";
}

function isDirectoryAction() {
    var v = new Widget.Device.File();
    v.isDirectory = true;
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + v.isDirectory;
}

function clickItlastModifyDate() {
    showDetail_File();
    document.getElementById("textdivshowResult").innerHTML = "";
    document.getElementById("textdivshowName").innerHTML = "Field lastModifyDate";
    document.getElementById("textdivshowExplanation").innerHTML = " The Date at which the file was last modified. If the host operating system does not support this value, then the value will be the same as that of createDate. If neither createDate nor lastModifyDate is supported, then the value will be undefined. ";
    document.getElementById("textdivshowSampleCode").innerHTML = "E.g.: var v = new Widget.Device.File(); v.lastModifyDate = new Date(2008, 9, 22, 0, 0, 0);";
    document.getElementById("textdivshowInitialCondition").innerHTML = "Notice : n/a";
    flag = "lastModifyDateAction";
}

function lastModifyDateAction() {
    var v = new Widget.Device.File();
    v.lastModifyDate = new Date(2008, 9, 22, 0, 0, 0);
    document.getElementById("textdivshowResult").innerHTML = "Result : "
            + v.lastModifyDate;
}
