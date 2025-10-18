import { ipcMain, dialog } from 'electron';
import path from 'path';
import fsUtils from './fs-utils';

// Project handlers
iipcMain.handle('project:create', async (_e, { projectPath, projectData }) => {
  try {
    await fsUtils.ensureDir(path.dirname(projectPath));
    await fsUtils.writeJson(projectPath, projectData);
    return { ok: true, path: projectPath };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
});

ipcMain.handle('project:open', async (_e) => {
  const res = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Aplicatie Project', extensions: ['mbproj', 'json'] }]
  });
  if (res.canceled || res.filePaths.length === 0) return { ok: false };
  const file = res.filePaths[0];
  try {
    const data = await fsUtils.readJson(file);
    return { ok: true, path: file, data };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
});

ipcMain.handle('project:save', async (_e, { projectPath, projectData }) => {
  try {
    await fsUtils.writeJson(projectPath, projectData);
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
});

// Media import
ipcMain.handle('media:import', async (_e, { projectRoot, filePath }) => {
  try {
    const dest = await fsUtils.copyAssetToProject(projectRoot, filePath);
    return { ok: true, dest };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
});

// Export
ipcMain.handle('export:generate', async (_e, { projectRoot, outputDir }) => {
  try {
    const out = await fsUtils.generateExport(projectRoot, outputDir);
    return { ok: true, output: out };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
});

// Publish (basic full upload) - stub; real upload handled in separate module
ipcMain.handle('publish:upload', async (_e, { connection, localFolder }) => {
  try {
    // publish logic is implemented in main/publish module later
    return { ok: true, uploaded: 0 };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
});
