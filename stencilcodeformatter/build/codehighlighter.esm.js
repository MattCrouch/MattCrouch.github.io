import { p as patchBrowser, g as globals, b as bootstrapLazy } from './chunk-6a8e4ebd.js';

patchBrowser().then(resourcesUrl => {
  globals();
  return bootstrapLazy([["code-highlighter",[[1,"code-highlighter",{"filename":[1],"language":[1],"collapsed":[1540],"error":[32]}]]]], { resourcesUrl });
});
