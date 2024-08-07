import en from './messages/en.json';
import vi from './messages/vi.json';
type English = typeof en;
type VietNamese = typeof vi;
declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends English {}
  //   interface IntlMessages extends VietNamese {}
}

// Define a type for ParagraphData
type ParagraphData = {
  text: string;
};

// Define a type for ParagraphConfig
type ParagraphConfig = {
  placeholder?: string;
  preserveBlank?: boolean;
};

// Define a type for ToolboxConfig
type ToolboxConfig = {
  icon: string;
  title: string;
};

// Define a type for ConversionConfig
type ConversionConfig = {
  export: string;
  import: string;
};

// Define a type for SanitizerConfig
type SanitizerConfig = {
  text: {
    br?: boolean;
    // Add more properties as needed
  };
};

// Define a type for PasteConfig
type PasteConfig = {
  tags: string[];
};

// The class definition remains the same
class n {
  // ...
  // Other properties and methods
}

// Export the class
export { n as default };
