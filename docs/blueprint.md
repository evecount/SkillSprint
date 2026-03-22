# **App Name**: SkillSprint

## Core Features:

- Educator/Admin Course Management: Authenticated dashboard for administrators to create, edit, and publish courses and bite-sized modules, including text content, video links, and multiple-choice quizzes, stored in Firestore.
- AI Quiz Question Assistant: A generative AI tool that assists educators by proposing initial quiz questions and answer options based on module content summaries or keywords provided.
- Learner Micro-Learning Interface: A mobile-responsive application interface for authenticated learners to access assigned courses, engage with modules, and complete quizzes with a focus on 'tap-friendly' interactions.
- Secure Gamified Progression Engine: Python Flask backend for secure quiz answer validation, calculation, and updating of learner XP scores and daily login streaks in the Firestore `progress_logs` collection.
- Compliance & Progress Reporting: An administrative dashboard for organizations to monitor aggregate learner progress, view completion rates, and identify learning engagement trends across all learners by querying Firestore `progress_logs` data.

## Style Guidelines:

- Color Anchor: 'Professional Learning & Growth'. The primary color is a strong, yet thoughtful blue (#2B58C7) that signifies reliability and engagement in a professional context. It will serve for calls to action and important elements. The background color is a very light, cool grey-blue (#EBEFF5), providing a clean, airy canvas for content. The accent color is a bright, energetic cyan (#02B8DF), used sparingly to highlight gamified elements and progress milestones.
- Headline and body font: 'Inter', a grotesque-style sans-serif, selected for its modern, objective, and neutral appearance which ensures readability and professionalism in a B2B learning environment across various content types.
- Employ a modern, clean line-art style for icons that maintain a professional aesthetic. Incorporate subtle gamified elements like badges, stars, and progress indicators within the UI to enhance learner engagement.
- Emphasize a mobile-first, responsive design with clear hierarchy and generous white space. Module content should be presented in bite-sized, digestible chunks, with easy navigation between sections to support quick learning sessions.
- Implement subtle, fluid animations for UI transitions and feedback, such as micro-interactions for button presses or module completion. Visual effects will signify XP gains, streak updates, and quiz result feedback to reinforce gamified progression.