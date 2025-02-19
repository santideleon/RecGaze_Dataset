# RecGaze Dataset 

This is the repository for the paper: `RecGaze: The First Eye Tracking and User Interaction Dataset for Carousel Interfaces`. 

Link to paper:

Bibtex:

The public dataset can be downloaded from the Zenodo link: 

For the non-public dataset, please reach out to the authors of the dataset. email: 


## Abstract 
Carousel interfaces are widely used in e-commerce and streaming services, but little research is devoted to them. Previous studies of interfaces for presenting search and recommendation results have focused on single ranked lists, but it appears their results cannot be extrapolated to carousels due to the added complexity. Eye tracking is a highly informative approach to understanding how users click, yet there are no eye tracking studies concerning carousels. There are very few interaction datasets on recommenders with carousel interfaces and none that contain gaze data. We introduce the RecGaze dataset: the first comprehensive feedback dataset on carousels that includes eye tracking results, clicks, cursor movements, and selection explanations. The dataset comprises of interactions from 3  movie selection tasks with $40$ different carousel interfaces per user. In total, 87 users and 3,477 interactions are logged. In addition to the dataset, its description and possible use cases, we provide results of a survey on carousel design and the first analysis of gaze data on carousels, which reveals a golden triangle or F-pattern browsing behavior. Our work seeks to advance the field of carousel interfaces by providing the first dataset with eye tracking results on carousels. In this manner, we provide and encourage an empirical understanding of interactions with carousel interfaces, for building better gaze-based recommendation systems.

## Sample Screen Recording (of study staff not included in dataset)
<img src="https://github.com/user-attachments/assets/c08dd8c3-947c-4010-9afd-773a2e206780" width="250" height="250"/>
![sample_screen_medium](https://github.com/user-attachments/assets/c08dd8c3-947c-4010-9afd-773a2e206780)


## Repository Guide
| File/Folder Name | Explanation 
| -------- | -------- | 
| carousels-study-netflix | Contains all the code for generating the carousel webpages used in the study. | 
| carousels-study-netflix\Final_Carousel_study_screen_[].html | The 40 (+1 one test screen called 00 for explaining the study to participants) html screens used in the study. | 
| carousels-study-netflix\assets\poster_images_resize | Location where to place downloaded movie poster images from Zenodo. |
| final_balanced_carousel_permutations_for_free_browsing.json | JSON with the genre ordering of the free-browsing screens from 1 to 30. |
| final_balanced_carousel_permutations_for_semi_free.json | JSON with the genre ordering of the semi-free browsing screens from 31 to 35. |
| final_balanced_carousel_permutations_for_direct_search.json | JSON with the genre ordering of the direct search screens from 36 to 40. |
| aoi_data.csv | Dataframe containing the AOI boxes for each of the webpage elements. |
| survey_responses_answers.pdf | Latex table with all the survey questions and their possible resposnes. |
| Stimuli_Background.png | Fixed stimuli background image that is a to-scale copy of the webpages of the user study extended to 3 pages to be able to show horizontal displacement from swipes.
| Direct_Search_Targets.png | Fixed stimuli background image with the direct search targets marked on the image. |


## Dataset Explanation

### Summary Feedback Dataframe (summary_feedback.csv)

Contains all the feedback (fixations, clicks, cursor movements) data gathered during the movie selection screens. All events are merged together in the same dataframe on the same timestamps. An event only happens if all columns of that event type are not NA. 

Event types:
- Fixation_AOI_[] - Rows/columns referring to fixation events using the first fixation AOI determination method: strict AOI bounds (see paper)
- Fixation_AOI_Closest_[] - Rows/columns referring to fixation events using the second fixation AOI determination method: if first method fails ('Background') then assigns to closest AOI within 60 pixels (see paper)
- Click_AOI_[] - Rows/columns referring to click events on the webpage. Note: they have no duration.
- Cursor_AOI_[] - Rows_columns referring to cursor movement events on the webpage. All cursor events in the same AOI (without exiting that AOI and entering another) are aggregated together and are included in the duration. 





| Column Name | Possible Values | Explanation |  
|------------|----------------|-------------|  
| UserID | string (KInIT_1-61 or UvA_1-26) | Institute where the data was gathered, followed by a simple ID for the participant. |  
| SubjectID | int | Identifier assigned to participants in the user study system. Can be ignored for the public dataset. |  
| TaskID | int (1-40)  | Identifier for the screen/task from which data was gathered. 1-30 are the 30 Free-browsing tasks/screens. 31-35 are the 5 Semi-free browsing tasks/screens. And 36-40 are the 5 direct search tasks/screens. |  
| StimulusID | string | The filename of the video screen recording (for use in the non-public dataset). Can be ignored for the public dataset. |  
| Timestamp | float | Timestamp of the event/row in seconds, aligned with the 0:00 start time of the video recording. Data before webpage load and after movie selection is removed. |  
| []_Duration | float | Duration in seconds of the event (e.g., Fixation, Click, Cursor). |  
| []_AOI_type | string (NA, 'Movie', 'Genre', 'Forward', 'Backward', "Background') | Type of the target Area of Interest (AOI). 'Movie' refers to a movie poster, 'Genre' is the genre/topic text, 'Forward' is the right swipe button, 'Backward' is the left swipe button, and 'Background' is background of the webpage or non-AOI. |  
| []_AOI_MovieID | int | If the event targets a movie, this shows the TMDB MovieID (same as `MovieID` in `item_features.csv`). If not, it is NA. |  
| []_AOI_Movie_position_in_carousel | int (1-15) | If targeting a movie, this indicates its position in the carousel (same as `Movie_position_in_carousel` in `item_features.csv`). If not, it is NA. Movies 1-5 are initially shown with the highest ranking (by votes). A forward swipe is required to reach 6-10, another for 11-15, and a third returns to 1-5. Backward swipes move in the opposite direction. |  
| []_AOI_Carousel_position | int (1-10) | If targeting an AOI (Movie, Genre, Forward, Backward) within one of the 10 carousels, this indicates the position of the carousel (same as `Carousel_position` in `item_features.csv`). 1 is the first (topmost) carousel, while 10 is the last. If not targeting a carousel AOI, it is NA. |  
| []_AOI_Carousel_genre | string (NA, 'Action', 'Animation', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Thriller') | If targeting an AOI within one of the 10 carousels, this indicates the genre of that carousel (same as `Carousel_genre` in `item_features.csv`). Otherwise, it is NA. |  
| []_AOI_Carousel_genre_is_top_genre | string (NA, 'Not_Top_Genre', 'Top_Genre') | If targeting an AOI within a carousel, this shows whether the carousel’s genre is the user’s top genre (`Top_genre` from `user_features.csv`). Otherwise, it is NA. |  
| []_AOI_Carousel_genre_is_preferred_genre | string (NA, 'Not_Preferred_Genre', 'Preferred_Genre') | If targeting an AOI within a carousel, this shows whether the carousel’s genre is one of the user’s preferred genres (`Preferred_genres` from `user_features.csv`). Otherwise, it is NA. |  
| []_AOI_Carousel_genre_rating | int (1-5) | If targeting an AOI within a carousel, this shows the user’s rating (1 to 5 stars) for the genre (`[]_rating` from `user_features.csv`). Otherwise, it is NA. |  


### Click Feedback Dataframe (click_feedback.csv)

Summary dataframe, primarily for click modeling and other Recommender usages, that only contains the last movie selection click per user, screen pair. For a particular screen, if a user did not select a movie then it is not included in the dataset. 

| Column Name | Possible Values | Explanation |  
|------------|----------------|-------------|  
| UserID | string (KInIT_1-61 or UvA_1-26) | Institute where the data was gathered, followed by a simple ID for the participant. |  
| SubjectID | int | Identifier assigned to participants in the user study system. Can be ignored for the public dataset. |  
| TaskID | int (1-40)  | Identifier for the screen/task from which data was gathered. 1-30 are Free-browsing tasks/screens, 31-35 are Semi-free browsing tasks/screens, and 36-40 are Direct search tasks/screens. |  
| StimulusID | string | The filename of the video screen recording (for use in the non-public dataset). Can be ignored for the public dataset. |  
| Timestamp | float | Timestamp of the event/row in seconds, aligned with the 0:00 start time of the video recording. Data before webpage load and after movie selection is removed. |  
| Click_AOI_type | string (NA, 'Movie', 'Genre', 'Forward', 'Backward') | Type of the Area of Interest (AOI) that was clicked. 'Movie' refers to a movie poster, 'Genre' is the genre/topic text, 'Forward' is the right swipe button, and 'Backward' is the left swipe button. |  
| Click_AOI_MovieID | int | If a movie was clicked, this shows the TMDB MovieID (same as `MovieID` in `item_features.csv`). If not, it is NA. |  
| Click_AOI_Movie_position_in_carousel | int (1-15) | If a movie was clicked, this indicates its position in the carousel (same as `Movie_position_in_carousel` in `item_features.csv`). If not, it is NA. |  
| Click_AOI_Carousel_position | int (1-10) | If a click occurred within a carousel (Movie, Genre, Forward, Backward), this indicates the carousel’s position (same as `Carousel_position` in `item_features.csv`). If not, it is NA. |  
| Click_AOI_Carousel_genre | string (NA, 'Action', 'Animation', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Thriller') | If a click occurred within a carousel, this indicates the genre of that carousel (same as `Carousel_genre` in `item_features.csv`). Otherwise, it is NA. |  
| Click_AOI_Carousel_genre_is_top_genre | string (NA, 'Not_Top_Genre', 'Top_Genre') | If a click occurred within a carousel, this shows whether the carousel’s genre is the user’s top genre (`Top_genre` from `user_features.csv`). Otherwise, it is NA. |  
| Click_AOI_Carousel_genre_is_preferred_genre | string (NA, 'Not_Preferred_Genre', 'Preferred_Genre') | If a click occurred within a carousel, this shows whether the carousel’s genre is one of the user’s preferred genres (`Preferred_genres` from `user_features.csv`). Otherwise, it is NA. |  
| Click_AOI_Carousel_genre_rating | int (1-5) | If a click occurred within a carousel, this shows the user’s rating (1 to 5 stars) for the genre (`[]_rating` from `user_features.csv`). Otherwise, it is NA. |  
| Movie_Familiarity | string ('I have seen the entire movie', 'I have seen part of the movie', 'I have seen a trailer/clip', 'I have seen another part of the series or version of the movie', 'I have heard of the movie', 'I have never heard of the movie', 'I did not select a movie', 'I selected a movie by accident', 'I don't remember') | The participant's self-reported familiarity with the clicked movie. They were instructed to pick the first true statement.  |  
| Why_Selected | string with all responses together ('Because of the poster', 'Because of the details', 'I already wanted to watch it', 'I want to watch it again or finish it', 'I have enjoyed another part of the series or version of the movie', 'I have been recommended this movie or heard good things about ( ratings, reviews, etc.)', 'I am not sure/ I don't know', 'I did not select a movie', 'I selected a movie by accident', 'I don't remember', Other:_____) | The participant’s self-reported reason for selecting the movie. It is a multiple response question where they can also add free-form resposne through Other:____.|  




### Item Features Dataframe (item_features.csv)

Contains all the information for the movies used to create the carousel screens along with extra data that was not used for the study. 

| Column Name | Possible Values | Explanation |  
| -------- | -------- | -------- |  
| TMDB_id | int | Unique identifier for the movie in TMDB (The Movie Database). |  
| TMDB_title | string | Title of the movie as listed in TMDB. |  
| TMDB_original_language | string | The original language in which the movie was released (e.g., "en" for English, "fr" for French). |  
| TMDB_genres | string with comma seperated Genres ('Action, Animation, Comedy') | Genres associated with the movie. |  
| TMDB_release_date | date (MM-DD-YYYY) | Official release date of the movie. |  
| TMDB_cast | list of strings | Names of the top 3 cast members. |  
| TMDB_overview | string | A brief summary of the movie’s plot. |  
| TMDB_popularity | float | Popularity score assigned by TMDB based on user interactions. |  
| TMDB_rating_avg | float (0-10) | Average user rating on TMDB  |  
| TMDB_rating_count | int | Total number of ratings submitted on TMDB. |  
| TMDB_poster_path | string (URL) | Path to the movie's poster image on TMDB. |  
| TMDB_extraction_date | date (MM-DD-YYYY) | The date when the movie data was extracted from TMDB. |  
| IMDB_id | string | Unique identifier for the movie in IMDB (Internation Movide Database). |  
| IMDB_rating_avg | float (0-10) | Average user rating on IMDB. |  
| IMDB_numVotes | int | Total number of votes for the movie on IMDB. |  
| IMDB_extraction__date | date (MM-DD-YYYY) | The date when the movie data was extracted from IMDB. |  
| TaskID |  int (1-40) | Identifier for the screen/task in which the movie was shown. |  
| Carousel_position | int | Position of the movie in the carousel. |  
| Carousel_genre | string | The genre of the carousel where the movie appears. |  
| MovieID | int | ID for movie in dataset (same as TMDB_id). |  
| Movie_position_in_carousel | int | The position of the movie within the carousel. |  

### User Features Dataframe (user_features.csv)

Contains all the information gathered from the users during the pre-survey, post-survey, and post-selection screens (selection explanations). 


| Column Name | Possible Values | Explanation |  
|------------|----------------|-------------|  
| Pre_survey_timestamp | datetime (MM-DD-YYYY HH:MM) | Timestamp when the pre-survey was completed. |  
| UserID | KInIT_1-61 or UvA_1-26 | Institute where the data was gathered, followed by a simple participant ID. |  
| SubjectIDs | int | Unique IDs assigned to participants in the user study system. |  
| Age | string ('18-19', '20-29', '30-39', '40-49', '60-69') | Participant's age in years. Not included in public dataset. |  
| Gender | string ('Man', 'Woman', 'Non-binary') | Participant's self-reported gender. Not included in public dataset.  |  
| Location | string ('Bratislava', 'Amsterdam') | Country or region of the participant. |  
| First_task | string ('Semi_free_direct_search', 'Free_browsing') | First assigned task in the study. |  
| Netflix_user | string ('Yes', 'No') | Indicates if the participant has used Netflix or a similar streaming service before. |  
| Netflix_usage | string ('Every day', '5 or more times per week', '3-4 times per week', '1-2 times per week', '1-2 times per month') | Frequency of Netflix usage. |  
| Movie_watching_frequency | string ('Every day', '5 or more times per week', '3-4 times per week', '1-2 times per week', '1-2 times per month')  | How often the participant watches movies (in any format even those outside of streaming services). |  
| Top_genre | string | Participant’s top favorite movie genre. |  
| Preferred_genres | string with comma seperated Genres ('Action, Animation, Comedy') | Genres the participant prefers. |  
| Action_rating | string ('1 star - Awful', '2 stars - Poor', '3 stars - Ok', '4 stars - Good', '5 stars - Must Watch') | Rating given by the user for the Action genre. |  
| Animation_rating | string ('1 star - Awful', '2 stars - Poor', '3 stars - Ok', '4 stars - Good', '5 stars - Must Watch') | Rating given by the user for the Animation genre. |  
| Comedy_rating | string ('1 star - Awful', '2 stars - Poor', '3 stars - Ok', '4 stars - Good', '5 stars - Must Watch') | Rating given by the user for the Comedy genre. |  
| Crime_rating | string ('1 star - Awful', '2 stars - Poor', '3 stars - Ok', '4 stars - Good', '5 stars - Must Watch') | Rating given by the user for the Crime genre. |  
| Drama_rating | string ('1 star - Awful', '2 stars - Poor', '3 stars - Ok', '4 stars - Good', '5 stars - Must Watch')' | Rating given by the user for the Drama genre. |  
| Fantasy_rating | string ('1 star - Awful', '2 stars - Poor', '3 stars - Ok', '4 stars - Good', '5 stars - Must Watch') | Rating given by the user for the Fantasy genre. |  
| Horror_rating | string ('1 star - Awful', '2 stars - Poor', '3 stars - Ok', '4 stars - Good', '5 stars - Must Watch') | Rating given by the user for the Horror genre. |  
| Romance_rating | string ('1 star - Awful', '2 stars - Poor', '3 stars - Ok', '4 stars - Good', '5 stars - Must Watch') | Rating given by the user for the Romance genre. |  
| Sci-Fi_rating | string ('1 star - Awful', '2 stars - Poor', '3 stars - Ok', '4 stars - Good', '5 stars - Must Watch')' | Rating given by the user for the Sci-Fi genre. |  
| Thriller_rating | string ('1 star - Awful', '2 stars - Poor', '3 stars - Ok', '4 stars - Good', '5 stars - Must Watch') | Rating given by the user for the Thriller genre. |  
| Topic_genre | string ('Helpful', 'Very helpful', 'Unhelpful', 'Neutral','Very unhelpful', 'I do not know') | Rating for genre-based topics. Not included in public dataset. |  
| Topic_content | string ('Helpful', 'Very helpful', 'Unhelpful', 'Neutral','Very unhelpful', 'I do not know') | Rating for content-based topics. Not included in public dataset. |  
| Topic_personalized | string ('Helpful', 'Very helpful', 'Unhelpful', 'Neutral','Very unhelpful', 'I do not know') | Rating for personalized topics. Not included in public dataset. |  
| Topic_itemBased | string ('Helpful', 'Very helpful', 'Unhelpful', 'Neutral','Very unhelpful', 'I do not know') | Rating for item-based topics. Not included in public dataset. |  
| Topic_userBased | string ('Helpful', 'Very helpful', 'Unhelpful', 'Neutral','Very unhelpful', 'I do not know') | Rating for user-based topics. Not included in public dataset. |  
| Topic_expertBased | string ('Helpful', 'Very helpful', 'Unhelpful', 'Neutral','Very unhelpful', 'I do not know') | Rating for expert-based topics. Not included in public dataset. |  
| Topic_regionalTop | string ('Helpful', 'Very helpful', 'Unhelpful', 'Neutral','Very unhelpful', 'I do not know') | Rating for regional top topics. Not included in public dataset. |  
| Topic_globalTop | string ('Helpful', 'Very helpful', 'Unhelpful', 'Neutral','Very unhelpful', 'I do not know') | Rating for global top topics. Not included in public dataset. |  
| Topic_temporal | string ('Helpful', 'Very helpful', 'Unhelpful', 'Neutral','Very unhelpful', 'I do not know') | Rating for time-based topics. Not included in public dataset. |  
| Topic_exclusive | string ('Helpful', 'Very helpful', 'Unhelpful', 'Neutral','Very unhelpful', 'I do not know') | Rating for exclusive topics. Not included in public dataset. |  
| MAX_Q1 | int (1-7) | Score for question 1 of the Brief Maximization Scale. |  
| MAX_Q2 | int (1-7) | Score for question 2 of the Brief Maximization Scale. |  
| MAX_Q3 | int (1-7) | Score for question 3 of the Brief Maximization Scale. |  
| MAX_Q4 | int (1-7) | Score for question 4 of the Brief Maximization Scale. |  
| MAX_Q5 | int (1-7) | Score for question 5 of the Brief Maximization Scale. |  
| MAX_Q6 | int (1-7) | Score for question 6 of the Brief Maximization Scale. |  
| TaskID_[]_Why_Selected | string with all responses together ('Because of the poster', 'Because of the details', 'I already wanted to watch it', 'I want to watch it again or finish it', 'I have enjoyed another part of the series or version of the movie', 'I have been recommended this movie or heard good things about ( ratings, reviews, etc.)', 'I am not sure/ I don't know', 'I did not select a movie', 'I selected a movie by accident', 'I don't remember', Other:_____) | The participant’s self-reported reason for selecting the movie for a certain TaskID. It is a multiple response question where they can also add free-form resposne through Other:____.|  
| TaskID_[]_Movie_Familiarity | string ('I have seen the entire movie', 'I have seen part of the movie', 'I have seen a trailer/clip', 'I have seen another part of the series or version of the movie', 'I have heard of the movie', 'I have never heard of the movie', 'I did not select a movie', 'I selected a movie by accident', 'I don't remember') | The participant's self-reported familiarity with the clicked movie for a certain TaskID. They were instructed to pick the first true statement.  |
| Post_survey_timestamp | datetime (MM-DD-YYYY HH:MM) | Timestamp when the post-survey was completed. |  
| Overwhelmed_by_genres | string ('Yes, I felt overwhelmed', 'No, I did not feel overwhelmed.') | Whether the participant felt overwhelmed by the number of genres. |  
| Enough_genres_to_decide | string ('Yes, the amount of genres was sufficient.', 'No, I would have liked to see an additional 1-2 genres.', 'No, I would have liked to see an additional 3-4 genres.', 'No, I would have liked to see an additional 5 or more genres.') | Whether the participant felt they had enough genres to make a decision. |  
| Overwhelmed_by_movies | string ('Yes, I felt overwhelmed', 'No, I did not feel overwhelmed.') | Whether the participant felt overwhelmed by the number of movies. |  
| Enough_movies_to_decide | string ('Yes, the amount of movies was sufficient.', 'No, I would have liked another 1-2 sets of movies in each genre (5-10 movies total).', 'No, I would have liked another 3-4 sets of movies in each genre (15-20 movies total).', 'No, I would have liked another 5 or more sets of movies in each genre (25+ movies)' | Whether the participant felt they had enough movies to decide. |  
| Other_carousel_topics | string ('No, genres were sufficient.', 'Yes, in addition to the genres carousels.', 'Yes, replacing some of the genre carousels.') | Any additional topics the participant would like in the carousel. |  
| Comments_suggestions | string | Open-ended feedback from the participant on improving the carousel interface. |  
| Customize_interface | string ("I'm not sure", 'Yes, I would customize my homepage', 'No, I would not customize my homepage') | Whether the participant wants to customize the interface. |  
| FreeBrowsing_experience_rating | int (1-10) | User rating of the free browsing experience. |  
| Tiredness_level | string ('Not exhausted at all', 'Slightly exhausted', 'Somewhat exhausted', 'Exhausted','Very exhausted') | How tired the participant felt after copmletion of the study. |  
| Distance_eyes_center_screen | float (cm) | Approximate distance from the participant’s eyes to the center of the screen. |  
| Speed_reminder | string (NA, 'Only after first 10', 'Only after 2nd 10 (20 screens)') | Whether the participant received a speed reminder and when it happened. |  


## Missing or Erroneous Data
The following UserIDs and TaskIDs are the screens where we found that the participant failed to complete the direct search tasks:

KINIT_18 {38}

KINIT_21 {38}

KINIT_28 {36, 37, 39}

KINIT_46 {36} 

KINIT_61 {38}

The following UserIDs and TaskIDs are the screens where a participant did select a movie in the free-browsing or semi-free browsing task, but the final movie selection click is missing from the data:

KINIT_21 {18}

KINIT_51 {3}

UvA_4 {20}



