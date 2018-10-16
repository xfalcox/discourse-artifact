import { cards } from "artifact/card-database";

export function setup(helper) {
   if(!helper.markdownIt) { return; }

   helper.registerOptions((opts,siteSettings)=>{
     opts.features.artifact = !!siteSettings.discourse_artifact_enabled;
   });

   helper.whiteList(['span.artifact-card']);

   helper.registerPlugin(md=>{
     md.core.textPostProcess.ruler.push('cardmention', {
       matcher: /(Axe)|(axe)/,  //regex flags are NOT supported
       onMatch: function(buffer, matches, state) {

           let tag = "span";
           let className = "artifact-card";

           let token = new state.Token("card_open", tag, 1);
           token.attrs = [["class", className]];

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
