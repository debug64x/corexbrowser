const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webviewTag: true,
    },
    icon: path.join(__dirname, "assets/logo.png"),
  });

  // Hide the menu bar
  win.setMenuBarVisibility(false);

  // Or use win.removeMenu(); to completely remove the menu
  // win.removeMenu();

  // Load the main homepage (main.html)
  win.loadFile(path.join(__dirname, "index.html"));

  // Handle failed page loads and show error page
  win.webContents.on("did-fail-load", () => {
    win.loadFile(path.join(__dirname, "error.html"));
  });

  // Optionally, also handle navigation errors
  win.webContents.on("crashed", () => {
    win.loadFile(path.join(__dirname, "error.html"));
  });
}

app.whenReady().then(createWindow);
