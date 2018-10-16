import { withPluginApi } from "discourse/lib/plugin-api";
import { registerTooltip } from "discourse/lib/tooltip";

function initializeDiscourseArtifact(api) {
  api.decorateCooked($elem => {
    $(".artifact-card", $elem).previewArtifactCard();
    registerTooltip($(".artifact-card", $elem));
  });
}

export default {
  name: "discourse-artifact",

  initialize(container) {
    const siteSettings = container.lookup("site-settings:main");
    if (siteSettings.discourse_artifact_enabled) {
      withPluginApi("0.8.8", initializeDiscourseArtifact);
    }
  }
};
