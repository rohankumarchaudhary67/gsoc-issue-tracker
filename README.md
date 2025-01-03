# GSoC Issue Tracker

## Overview
The **GSoC Issue Tracker** is an AI-integrated application designed to streamline issue management in open-source projects. It provides automated issue summaries, intelligent solution suggestions, and facilitates seamless discussions among contributors.

## Features
- 📝 **AI-Powered Summaries:** Automatically generates concise summaries for issues.
- 💡 **Solution Suggestions:** Offers potential solutions based on issue descriptions.
- 💬 **Discussion Facilitation:** Enhances communication with context-aware prompts.
- 📊 **Analytics Dashboard:** Visual insights into issue trends and resolutions.

## Tech Stack
- **Frontend:** React.js with Next.js
- **Backend:** Node.js with Express
- **Database:** Postgres SQL with Prisma ORM
- **AI Integration:** Google Gemini (gemini-1.5-flash)
- **Monorepo Management:** Turborepo

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/rohankumarchaudhary67/gsoc-issue-tracker.git
   ```
2. Install dependencies:
   ```bash
   cd gsoc-issue-tracker
   npm install
   ```
3. Build the project:
   ```bash
   npm build
   ```
4. Start the development server:
   ```bash
   npm dev
   ```

## Configuration
- Copy `.env.example` to `.env` and update the environment variables.
- Configure your OpenAI API key and MongoDB URI.

## Scripts
- `npm dev`: Start development server.
- `npm build`: Build the project.
- `npm lint`: Run ESLint.

## Contribution
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch.
3. Submit a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any inquiries, reach out via [GitHub Issues](https://github.com/rohankumarchaudhary67/gsoc-issue-tracker/issues).
