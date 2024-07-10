# Web_Dev

## HackathonHub

### Problem Statement: Online Judge Platform

- **Objective**:

  To develop a comprehensive and user-friendly online judge platform using the MERN (MongoDB, Express.js, React, Node.js) stack that allows users to practice coding problems, participate in competitive programming contests, and improve their algorithmic skills.

### Background:

Competitive programming platforms like Codeforces, CodeChef, and LeetCode have become essential tools for developers to hone their coding skills, prepare for technical interviews, and participate in coding competitions. These platforms provide a wide range of problems, from basic programming exercises to complex algorithmic challenges, allowing users to test their skills and compete with others globally.

### Features:

### Here are some key features:

- **User Authentication and Profiles**:

  - Secure user registration and login.
  - User profiles displaying solved problems, ranking, and achievements.
  - User statistics and progress tracking.

- **Problem Management**:

  - A rich library of coding problems categorized by difficulty, topic, and tags.
  - Problem description, input/output specifications, and example test cases.
  - **Admin interface to add, update, and delete problems**.

- **Code Editor and Submission**:

  - Integrated code editor supporting multiple programming languages (Atlest 3 as of now).
  - Code submission feature with real-time feedback.
  - Execution environment to run user code against predefined test cases.

- **Contests and Leaderboards**:

  - Functionality to host and manage coding contests and hackathons.
  - Real-time leaderboards displaying user rankings and scores.
  - Contest archives for users to practice past problems.

### High Level Design:

### Database Design (MongoDB):

**May add or remove new collections, fields depending upon need and ease of the implementation**.

- Collection 1: problems

  - id: ObjectId (Unique identifier for the problem)
  - title: String (Title of the problem)
  - description: String (Detailed problem description)
  - input_format: String (Description of the input format)
  - output_format: String (Description of the output format)
  - constraints: String (Problem constraints) // May or May not add
  - examples: Array of Objects (Example test cases with input, output, and optional explanation)
  - test_cases: Array of Objects (Actual test cases with input and output)
  - difficulty: String (Difficulty level, e.g., "easy", "medium", "hard")
  - tags: Array of Strings (Tags/categories for the problem)
  - author: Object (Information about the author or creator of the problem, e.g., user ID) May or May not add
  - solutions: Array of Objects or References (Optional array of solution objects or references to solutions)
  - submissions: Number (Count or reference to submissions made for this problem)
  - likes: Number (Number of likes or upvotes the problem has received) May or May not add
  - dislikes: Number (Number of dislikes or downvotes the problem has received) May or May not add

- Users Collection Schema

  - id: ObjectId (Unique identifier for the user/admin)
  - username: String (Unique username)
  - email: String (Unique email address)
  - password_hash: String (Hashed password for security)
  - role: String (Role of the user, e.g., "user" or "admin")
  - created_at: Date (Timestamp when the account was created)
  - profile: Object (Nested object containing profile information)
    - name: String (Full name of the user/admin)
    - bio: String (Short biography or description)
    - avatar_url: String (URL to the profile picture) May or May not add
  - preferences: Object (Nested object containing user preferences)
    - language: String (Preferred programming language)
    - theme: String (Preferred UI theme, e.g., "light" or "dark")
  - activity: Object (Nested object containing activity information) May or May not add
    - last_login: Date (Timestamp of the last login)
    - login_attempts: Number (Number of login attempts)
