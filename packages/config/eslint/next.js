/** @type {import("eslint").Linter.Config} */
module.exports = {
    extends: [
        "next",
    ],
    rules: {
        "@next/next/no-html-link-for-pages": "off",
    }
};
