function getDoc({ id = "", url = "" } = {}) {
  // example use: // const doc = getDoc({ url: "https://docs.google.com/document/d/.../edit" }); // need that /edit part or it might not work
  if (!id && !url) return DocumentApp.getActiveDocument();
  if (id) return DocumentApp.openById(id);
  if (url) return DocumentApp.openByUrl(url);
}
