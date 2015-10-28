# Project Updates #

Check here for all the latest details on milestone releases, what's being worked on and committed, and future plans.

<a href='Hidden comment: 
Added a status bar at the top of the emulator window to display changes in emulation state, contextual tips to improve the running widget"s code, and warnings about any common pitfalls. For example, if the widget attempts to play an MP3 file, the status will warn that the emulator only supports OGG and WAV, but actual devices may not have that limitation. SVN revision 307.

Hooked in a databsae table with the contextual status bar so a link to a wiki page can be clicked on for more information on the details of what the warning is about. Since the status message must be short, the wiki page can provide information and code recommendations about the specific warning. SVN revision 312.
'></a>


## Friday December 10, 2010 ##

This is a defect release fixing some API issues for WAC 1.0 and JIL 1.2.2 specs. No new features or profile database changes have been made. See the project page for more details on the defects and resolutions.

### Fixes ###

  * [Issue 6](https://code.google.com/p/transit-widget-tools/issues/detail?id=6): WAC 1.0 Message.addAddress call
  * [Issue 7](https://code.google.com/p/transit-widget-tools/issues/detail?id=7): Widget.Device.getAvailableApplications()
  * [Issue 9](https://code.google.com/p/transit-widget-tools/issues/detail?id=9): setPreferenceForKey throws an exception when parameter is valid
  * [Issue 10](https://code.google.com/p/transit-widget-tools/issues/detail?id=10): Widget.Multimedia.AudioPlayer.open() doesn't throw an exception
  * [Issue 11](https://code.google.com/p/transit-widget-tools/issues/detail?id=11): Widget.Multimedia.AudioPlayer.play() doesn't throw an exception
  * [Issue 12](https://code.google.com/p/transit-widget-tools/issues/detail?id=12): Widget.PIM.getAddressBookItem() doesn't throw an INVALID\_PARAMETER exception


## Thursday November 9, 2010 ##

### New Features ###

WAC 1.0 API Support. The initial draft of WAC 1.0 API has been added to the emulator. To use it, create a new device profile or edit an existing one and choose the "WAC 1.0 API" on the "Manage Profiles..." dialog general panel. See wholesaleapplicationscommunity.com for detailed information about the WAC API. WAC Packaging is based on the JIL 1.2 packaging spec and is currently supported in the emulator.

The non-debug pop-up window has been removed from the emulator as is wasn't terribly useful for development purposes, especially with smaller resolution screens.

Directly opening widget packages (.wgt files) is now possible with the new menu option in the Transit menus. To emulate a packaged widget, choose the "Emulate and Debug Widget (.wgt)" menu item and then choose the .wgt file in the file chooser dialog. The widget will be unzipped in your operatin system's temp folder and opened in the emulator window automatically. Temp directories are usually cleaned out on reboot, depending on your operating system.

Some experimental and undocumented features have been prototyped and tested with this release. If an option is marked as expiremental, we recommend not using it as it has not yet been documented.


---


For older updates, view the ArchivedUpdates page.