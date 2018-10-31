// for mini-racer
import { cards } from "discourse-markdown/card-database";

// for browser
//import { cards } from "discourse/plugins/discourse-artifact/discourse-markdown/card-database";

// https://stackoverflow.com/a/6969486
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function cardRegex() {
  return new RegExp(cards.map((c) => escapeRegExp(c.name)).join("|"));
}

export function setup(helper) {
   if(!helper.markdownIt) { return; }

   helper.registerOptions((opts,siteSettings)=>{
     opts.features.artifact = !!siteSettings.discourse_artifact_enabled;
   });

   helper.whiteList(['span.artifact-card']);

   helper.registerPlugin(md=>{
     md.core.textPostProcess.ruler.push('cardmention', {
       matcher: cardRegex(),  //regex flags are NOT supported
       onMatch: function(buffer, matches, state) {

         let cardName = cards.find((e) => e.name === matches[0]).misc.name_plainstring;
         let url = `https://articraft.io/embed/cards/view/${cardName}`;

         let tag = "span";
         let className = "artifact-card";

         let token = new state.Token("card_open", tag, 1);
         token.attrs = [["class", className], ["data-tooltip", `<iframe src="${url}" height="370" width="245">`]];

         buffer.push(token);

         token = new state.Token("text", "", 0);
         token.content = matches[0];

         buffer.push(token);

         token = new state.Token("card_close", tag, -1);
         buffer.push(token);

        }
     });
   });
}
