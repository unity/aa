// This is the entry point for the Ship when it's used as an HTML Import.
// It's standalone and boots when Hull exists and calls onEmbed

import App from './app';
// This is called when the ship has been embedded in the page.
// If not embedded, then the code requiring this module will
// be able to call Ship.start(...) to boot the app
Hull && Hull.onEmbed && Hull.onEmbed(document, App.start);

module.exports=App
