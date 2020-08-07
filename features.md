## Group Roles
- Team Lead - Dillon Long
- Model Lead - Shan Wu
- UX Lead - Daniel Wilkins

## MVP List
- ## User can create account
  - As a new user
  - I want to be able to make an account
  - So that I can explore my interests and share my expertise
  - **Expected Timeline: 0.5 day**

- ## User can log in to account
  - As a user with an account
  - I want to be able to log in to my account
  - So that I can have some persistence to my actions and have my name linked to my actions
  - **Expected Timeline: 1 day**

- ## User can ask questions
  - As a user that has a question to ask
  - I want to be able to post the question
  - So that I can get other people to answer my question
  - **Expected Timeline: 2 days**

- ## User can answer questions that other users have asked
  - As a user that has an answer to a question asked
  - I want to be able to post my answer
  - So that that everyone can see my answer
  - **Expected Timeline: 1 day**

- ## User can comment on questions/answers from other users
  - As a person who doesn’t know everything
  - I want to be able to clarify my answers / ask others for clarification
  - So that I can confirm my understanding of an answer or correct another’s misunderstanding
  - **Expected Timeline: 2 days**

- ## User create spaces(topics) to group questions by
  - As a user that has many similar questions
  - I want to be able to create a space
  - So that all similar questions can be grouped together and shared with others
  - **Expected Timeline: 1 day**

- ## User can edit or delete spaces they have created
  - As a user that owns a specific space
  - I want to be able to control(edit,delete,etc..) that space
  - So that it stays true to my idea for the space
  - **Expected Timeline: 1 day**

## Bonus Feature List
- ## User can upvote or downvote answers/questions (stretch)
  - As a user with an opinion
  - I want to be able to upvote or downvote questions and answers
  - So that my opinion can be seen by other people and so that the most relevant or best answers can be shown
  - **Expected Timeline: 1 day**

- ## User can reply to comments made by other users (stretch)
  - As a user with an opinion about a comment
  - I want to be able to respond to that comment
  - So that I can share my opinion with the user who made the original comment.
  - **Expected Timeline: 1 day**


# Endpoints
## Front End:

- **'/'** <- home page, displays all questions you are interested in that have answers
- **'/login'** <- allows a user to enter login information or create a new account
- **'/profiles/:id/answers'** <- displays all answers made by a user
- **'/profiles/:id/questions'** <- displays all questions made by a user
- **'/questions/:id/answers'** <- displays all answers to a specific question
- **'/query'** <- answers for you <- displays all questions related to your interests that you may want to answer
- **'topics/:id'** <- shows the main topic page which features a list of answered questions
- **'topics/:id/questions'** <- populates the topic page with a list of questions that belongs to that topic to answer

## Back end:
- **'/api'** <- GET all questions from topics that the user is following (in a specific order)
- **'/api/answers'** <- GET all answers, POST a new answer, DELETE
- **'/api/answers/:id'** <-GET an answer, PUT edit answer, DELETE an answer
- **'/api/profiles'** <- GET all users, POST a new user, DELETE all users
- **'/api/profile/:id'** <- GET one profile, PUT edited profile, DELETE profile
- **'/api/topics'** <- GET all topics, POST a new topic, DELETE all topics
- **'/api/topics/:id'** <- GET one topic, PUT edited topic, DELETE topic
- **'/api/topics/:id/questions'** <- GET list of questions for specific topic
- **'/api/questions/:id'** <- GET a question, PUT edit question, DELETE a question

# Layouts/Templates
- log-in.pug
- sign-up.pug
- index.pug
- question.pug
- topic.pug
- profile.pug
