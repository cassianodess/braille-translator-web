const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

const menuOptions = [
    {
        label: "Braille Translator",
        submenu: [
            { role: "about" },
            { role: "quit" },
        ]
    }
];

const menu = Menu.buildFromTemplate(menuOptions);
Menu.setApplicationMenu(menu);

const createWindow = () => {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, "/dist/braille-translator-desktop/assets/images/braille-icon.png"),
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    window.webContents.openDevTools();
    window.loadFile(path.join(__dirname, "/dist/braille-translator-desktop/index.html"));
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});