// NOTE: if you want to refresh and trigger recalculation (apply all pending spreadsheet changes), look at forceRefresh https://github.com/hchiam/learning-google-apps-script/blob/main/google-sheets/forceRefresh.gs

// do something

Utilities.sleep(5000);

// do something after

// (NOTE: it didn't seem to work when I tried to put into a helpful function with callback)

// but this might work:

function setTimeout(callback, ms=5000) {
  const lock = LockService.getScriptLock();
  lock.waitLock(ms);
  callback();
  lock.releaseLock();
}
