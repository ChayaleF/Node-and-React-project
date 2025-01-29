import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
  {
    ignores: ["node_modules/", "dist/"],  // אם יש לך קובץ .eslintignore, תשתמש בזה במקום
  },
  {
    languageOptions: {
      parser: tsParser,  // הגדרת parser בתוך languageOptions
      sourceType: "module", // אם אתה עובד עם ES modules
    },
    plugins: {
      "@typescript-eslint": tsPlugin,  // הגדרת הפלאגין של TypeScript
    },
    rules: {
        "semi": ["error", "always"],
        "no-multiple-empty-lines": ["error", { "max": 1 }],
        "no-console": ["warn"],
        "curly": ["error", "all"],
        "no-unused-vars": ["error"],
        "camelcase": ["error"],
        "max-len": ["error", { "code": 100 }],
    },
    files: ["*.ts"],  // הגדרת קבצים מסוג .ts
  },
];
