# BudgetBuddy

BudgetBuddy is a money-tracking app that helps people keep track of what they earn and spend. Users can enter daily expenses, sort them into categories like food, transportation, and entertainment, and get a clear view of their spending habits. The goal is to make managing money less stressful and easier to understand, especially for beginners.

Built for college students, young adults, and anyone looking to build better spending habits.

## Tech Stack

- **Frontend:** Next.js, React
- **Database:** Supabase (PostgreSQL)
- **CI/CD:** GitHub Actions

## Getting Started

Make sure you have [Node.js](https://nodejs.org/) and [Git](https://git-scm.com/) installed.

**1. Clone the repo**
```bash
git clone https://github.com/Shafin-Rehman/product-proposal.git
cd product-proposal
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**

Create a `.env.local` file in the root folder and add your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL= https://vsnygrmhdrpryoehuadn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY= eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzbnlncm1oZHJwcnlvZWh1YWRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4MzQxMzAsImV4cCI6MjA4ODQxMDEzMH0.z65N4fkMAAMTqWrFWSZIJ6ZzsM4rcCmA8fgR9wbmTF0
```



**4. Start the app**
```bash
npm run dev
```


## CI/CD Pipeline

This project uses two GitHub Actions pipelines that trigger automatically on every push to main:

- **Backend CI** — installs dependencies, runs tests, and checks code coverage every time backend code changes
- **DB Migrations** — automatically pushes database schema changes to Supabase so no one has to update the database manually

## Features

- Add and categorize daily expenses
- Track monthly income
- Set monthly budgets
- View total spending and financial summary
- Budget threshold alerts when spending limit is reached
