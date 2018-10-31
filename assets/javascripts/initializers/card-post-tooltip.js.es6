import { withPluginApi } from "discourse/lib/plugin-api";
import { hoverExtension } from "discourse/plugins/discourse-artifact/mixins/card-hover-extension";

function initializeDiscourseArtifact(api) {
  api.decorateCooked($elem => {
    hoverExtension($elem);
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
