// customTheme.js
const customTheme = {
  token: {
    colorPrimary: "#00b96b", // Your custom primary color
    colorPrimaryBg: "#e6f7ff", // Background color for primary elements
    colorText: "#333", // Text color
    colorBgContainer: "#f6ffed", // Background color for container elements
    borderRadius: 4, // Border radius
    fontSizeBase: 16, // Base font size in pixels
    lineHeightBase: 1.5, // Base line height
    spacingUnit: 8, // Base spacing unit in pixels
    shadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Shadow
    // Add more tokens as needed
  },
  button: {
    backgroundColor: "@colorPrimary", // Use primary color for button background
    borderColor: "@colorPrimary", // Use primary color for button border
    color: "#fff", // Text color for buttons
    // Add more button styles as needed
  },
  // Add customizations for other components
};

export default customTheme;
