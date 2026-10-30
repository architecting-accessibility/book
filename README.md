<img alt="Banner with text - Architecting web systems and applications that work for everyone, and go far beyond compliance" src="https://github.com/user-attachments/assets/1853cf5c-c215-4c2d-aebc-e0189da35cef" />

# Architecting Accessibility - Companion Code

This repository contains code examples, templates, and guides accompanying the book [*Architecting Accessibility*](https://www.manning.com/books/architecting-accessibility) by [Chris Porter](https://www.um.edu.mt/profile/chrisporter) and published by [Manning Publications Co.](https://www.manning.com/).

> Before building or acquiring technology, pause and think about the people who will use it. Every small detail can make a big difference in someone's life.

## About the repository

The repository provides code examples (organized by chapter), guides, helper scripts, and templates.

### Structure

- `code` - Example code and listings used throughout the book, organized by chapter:
  - `chapter_2/` - People, technologies and fundamental techniques
  - `chapter_3/` - Make content easy to perceive
  - `chapter_4/` - Make text easy to understand
  - `chapter_5/` - Ensure effective navigation and interaction
  - `chapter_6/` - Help people complete tasks efficiently
  - `chapter_7/` - Make the safest path the path of least resistance

- `guides` - Living manuals on various aspects, including:
  - `DevTools` - Using DevTools for accessibility checks
  - `Semantic HTML` - Semantic HTML cheat sheet

- `helpers` - Helper scripts, including:
  - `pa11y-dashboard` - Scripts to help you set up a Pa11y Dashboard instance using Docker

- `templates` - Template files, including:
  - `accessibility_issue_template` - Accessibility issue reporting: recommended fields and guidance
  - `accessibility_scope_inventory_template` - An XLSX document to help you get started with an accessibility inventory exercise

### Disclaimer

> This code is intentionally simple. The goal of this companion is not to provide working code that can be copied over in some production site. Some examples deliberately demonstrate **inaccessible patterns**. These examples are included for educational purposes, **and should not** be used as templates to deploy or copy without review.

You'll notice that:
- **Native HTML elements** are preferred over custom components
- **Unnecessary JavaScript is avoided** where possible
- **Vanilla JavaScript** is used as much as possible
- Frontend **frameworks are not used** in the examples
- **Simplified CSS** is used to improve readability 

Some examples may look basic, and that is by design. The goal is to understand *why* things work, *what* approaches work best, and typical gotchas. 

### Conventions

- Each code example is self-contained, with its existing relative asset paths.
- Repeated images and stylesheets remain local to their examples to keep the exercises independent.
- Names such as `start.html` and `end.html` indicate their teaching role and state, **not** production readiness.
- Most links in navigation areas (header and footer) are illustrative. For this reason, they commonly point to '#'.
- There is deliberately no project-wide build framework. 
- This book is designed to teach. Try out these examples using the conditions described in the book.

## Running the examples locally

The examples are standalone HTML pages that you can explore in your browser. Some may require a local web server to work as intended.

### Recommended: Visual Studio Code with Live Server

1. Install [Visual Studio Code](https://code.visualstudio.com/).
2. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
3. Open the repository folder in Visual Studio Code.
4. Navigate to the example you want to explore.
5. Right-click its HTML file and select **Open with Live Server**.

Your browser will open the example automatically. Live Server also refreshes the page when you save changes.

### Alternative: Python

If you already have Python installed, you can start a local server from the repository's root directory:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser and navigate to the example you want to explore.

To stop the server, press `Ctrl+C` in your terminal.

## Pre-requisites

This book assumes the following knowledge:
- Web Foundations
  - HTML (basic): Can write markup for common content types, including headings, text, links, lists, images, and forms.
  - CSS (basic): Can style HTML documents using selectors.
  - JavaScript (basic): Understands the role of client-side scripting and can write and read simple scripts.
- Browser and Runtime Awareness
  - DOM (basic): Understands the Document Object Model and can modify structure, attributes, and styles using JavaScript.
  - Browser developer tools (basic): Can inspect elements, view applied and computed styles, and investigate layout or styling issues.
- Team and Product Context
  - General web product literacy: Understands how web applications are planned, designed, built, and released in a team context.

## About the Book

This book is for digital product teams working in organizations where accessibility is required or expected, but access to expertise is limited. These include developers, designers, product managers, and technology leaders across public- and private-sector organizations who are familiar with modern web development and care about building the right solution – even in the face of real-world constraints. This book provides practical, sustainable guidance to help them plan, deliver, and maintain accessible web applications and content.

## Feedback

If you spot an issue or have a suggestion, feel free to open an issue. Improvements are always welcome.

