// Modules to control application life and create native browser window
const {app, BrowserWindow,ipcMain,Menu,Tray} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // fullscreen: true,设置全屏
    webPreferences: {
      nodeIntegration: true
    }
  })

  //创建系统通知区菜单
  tray = new Tray('icon.ico');//这里的图标可以直接拖到打包好的目录里面
  const contextMenu = Menu.buildFromTemplate([
    {label: '退出', click: () => {mainWindow.destroy()}},//我们需要在这里有一个真正的退出（这里直接强制退出）
  ])
  tray.setToolTip('托盘测试')
  tray.setContextMenu(contextMenu)
  tray.on('click', ()=>{ //我们这里模拟桌面程序点击通知区图标实现打开关闭应用的功能
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    mainWindow.isVisible() ?mainWindow.setSkipTaskbar(false):mainWindow.setSkipTaskbar(true);
  })
  mainWindow.on('show', () => {
    tray.setHighlightMode('always')
  })
  mainWindow.on('hide', () => {
    tray.setHighlightMode('never')
  })

  // //窗口最小化
  // ipcMain.on('window-min',function(){
  //   mainWindow.hide();
  //   mainWindow.setSkipTaskbar(true);
  // })

  // 将菜单栏隐藏
  Menu.setApplicationMenu(null);
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // and load the index.html of the app.
  mainWindow.loadFile('dist/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
