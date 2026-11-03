import { setConfig } from "@qnx/vuetify/integrations";

// TinyMCE isn't bundled: VqTextEditor loads its script from this URL at runtime.
export const TINYMCE_BASE_URL = "https://cdnjs.cloudflare.com/ajax/libs/tinymce/7.9.1/";

setConfig({ baseUrl: TINYMCE_BASE_URL });
