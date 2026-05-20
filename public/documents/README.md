# MHA public documents

Upload PDF files here and link them in `src/lib/content.ts` under `publicDocuments`:

```ts
{
  title: "Child Safeguarding Policy",
  category: "safeguarding",
  description: "...",
  href: "/documents/child-safeguarding-policy.pdf",
  onRequest: false,
}
```

Use lowercase kebab-case filenames. After adding files, set `onRequest: false` and `href` for each document.
