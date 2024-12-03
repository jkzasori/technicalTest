# Project Overview

This project is built using **React**, **TypeScript**, and **Next.js**, following the principles of **MVVM** (Model-View-ViewModel) combined with **Clean Architecture**.

## Key Features

- **MVVM + Clean Architecture**: The application is structured around a clean separation of concerns, promoting testability, scalability, and maintainability. The **viewModels** handle the business logic and state, while the **views** focus solely on rendering the UI.
  
- **Folder Structure**:
  - **viewModels**: Custom hooks that manage the application's business logic and state.
  - **data**: Contains **adapters**, **interceptors**, and **repositories** that facilitate communication with external services.
  - **domain**: Includes **entities**, **repositories**, and **useCases** that represent the core of the application’s business logic.
  - **helpers**: Utility functions and hooks, such as the custom hook `usePortal`.

## Benefits of the Chosen Architecture

1. **Separation of Concerns**: By using MVVM with Clean Architecture, the application logic is clearly separated from the UI, making it easier to maintain and extend.
2. **Testability**: The structure allows for better unit testing of individual components, use cases, and hooks.
3. **Scalability**: Clean Architecture supports the growth of the application by keeping components loosely coupled and independent.
4. **Reusability**: Custom hooks and utility functions are easy to reuse, reducing code duplication across the project.

This structure enhances flexibility and maintainability, while supporting a high-quality development process.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Note: You need a environtment variable called NEXT_PUBLIC_API with the api url

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
