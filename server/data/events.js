const EVENTS = [
  {
    "id": 1,
    "name": "CS Club Hackathon",
    "description": "24-hour coding marathon to build innovative projects.",
    "startTime": "2024-12-01T18:00:00Z",
    "endTime": "2024-12-02T18:00:00Z",
    "capacity": 100,
    "registered": 75,
    "location": [5, 6],
    "category": [1],
    "image": [1, 2, 3],
    "club_organizer": 1
  },
  {
    "id": 2,
    "name": "Debate Tournament",
    "description": "Compete against other schools in a series of debates on current topics.",
    "startTime": "2024-12-15T10:00:00Z",
    "endTime": "2024-12-15T17:00:00Z",
    "capacity": 50,
    "registered": 40,
    "location": [1],
    "category": [1, 2, 3],
    "image": [1, 2, 3],
    "club_organizer": 2
  },
  {
    "id": 3,
    "name": "Art Exhibition",
    "description": "Showcase your artistic talents and explore the work of other artists.",
    "startTime": "2024-12-20T12:00:00Z",
    "endTime": "2024-12-22T17:00:00Z",
    "capacity": 200,
    "registered": 150,
    "location": [7, 8, 9, 10],
    "category": [5],
    "image": [1, 2, 3],
    "club_organizer": 3
  },
  {
    "id": 4,
    "name": "Music Concert",
    "description": "Enjoy live music performances by talented student musicians.",
    "startTime": "2024-12-25T19:00:00Z",
    "endTime": "2024-12-25T22:00:00Z",
    "capacity": 300,
    "registered": 250,
    "location": [4],
    "category": [2],
    "image": [1, 2, 3],
    "club_organizer": 4
  },
  {
    "id": 5,
    "name": "Film Screening",
    "description": "Watch classic and contemporary films with fellow movie enthusiasts.",
    "startTime": "2024-12-28T18:00:00Z",
    "endTime": "2024-12-28T21:00:00Z",
    "capacity": 50,
    "registered": 45,
    "location": [1, 4],
    "category": [2, 3, 5],
    "image": [1, 2, 3],
    "club_organizer": 5
  },
  {
    "id": 6,
    "name": "Gaming Tournament",
    "description": "Compete in popular video games and win exciting prizes.",
    "startTime": "2024-12-02T10:00:00Z",
    "endTime": "2024-12-02T17:00:00Z",
    "capacity": 100,
    "registered": 80,
    "location": [4],
    "category": [3, 4],
    "image": [1, 2, 3],
    "club_organizer": 6
  },
  {
    "id": 7,
    "name": "Book Discussion",
    "description": "Discuss a selected book and share your thoughts with others.",
    "startTime": "2023-12-05T19:00:00Z",
    "endTime": "2023-12-05T21:00:00Z",
    "capacity": 20,
    "registered": 15,
    "location": [8],
    "category": [1, 2],
    "image": [1, 2, 3],
    "club_organizer": 7
  },
  {
    "id": 8,
    "name": "Plant your future",
    "description": "Volunteer to take care of plants and flowerbeds in campus.",
    "startTime": "2023-12-09T10:00:00Z",
    "endTime": "2023-12-09T13:00:00Z",
    "capacity": 50,
    "registered": 30,
    "location": [1, 4, 7, 9, 10],
    "category": [3],
    "image": [1, 2, 3],
    "club_organizer": 8
  },
  {
    "id": 9,
    "name": "Dance Workshop",
    "description": "Learn new dance moves and improve your skills.",
    "startTime": "2023-12-12T18:00:00Z",
    "endTime": "2023-12-12T20:00:00Z",
    "capacity": 30,
    "registered": 30,
    "location": [9, 10],
    "category": [2, 4],
    "image": [1, 2, 3],
    "club_organizer": 9
  },
  {
    "id": 10,
    "name": "Philosophy Seminar",
    "description": "Explore complex philosophical questions and engage in thoughtful discussions.",
    "startTime": "2023-12-15T14:00:00Z",
    "endTime": "2023-12-15T16:00:00Z",
    "capacity": 20,
    "registered": 20,
    "location": [3],
    "category": [1, 2, 4],
    "image": [1, 2, 3],
    "club_organizer": 10
  },
  {
    "id": 11,
    "name": "CS Club Game Jam",
    "description": "Create a game in a short amount of time and compete with other teams.",
    "startTime": "2023-11-08T18:00:00Z",
    "endTime": "2023-11-10T18:00:00Z",
    "capacity": 50,
    "registered": 50,
    "location": [5],
    "category": [1],
    "image": [1, 2, 3],
    "club_organizer": 1
  },
  {
    "id": 12,
    "name": "Debate Practice Session",
    "description": "Practice your debating skills and prepare for upcoming tournaments.",
    "startTime": "2023-11-12T19:00:00Z",
    "endTime": "2023-11-12T21:00:00Z",
    "capacity": 30,
    "registered": 30,
    "location": [1],
    "category": [1],
    "image": [1, 2, 3],
    "club_organizer": 2
  },
  {
    "id": 13,
    "name": "Art Workshop",
    "description": "Learn new techniques and experiment with different art mediums.",
    "startTime": "2023-11-18T14:00:00Z",
    "endTime": "2023-11-18T17:00:00Z",
    "capacity": 20,
    "registered": 20,
    "location": [9, 10],
    "category": [5],
    "image": [1, 2, 3],
    "club_organizer": 3
  },
  {
    "id": 14,
    "name": "Music Jam Session",
    "description": "Get together with other musicians and create improvised music.",
    "startTime": "2023-11-23T19:00:00Z",
    "endTime": "2023-11-23T22:00:00Z",
    "capacity": 30,
    "registered": 30,
    "location": [9, 10],
    "category": [2, 5],
    "image": [1, 2, 3],
    "club_organizer": 4
  },
  {
    "id": 15,
    "name": "Film Discussion",
    "description": "Discuss a recently watched film and share your interpretations.",
    "startTime": "2023-11-26T14:00:00Z",
    "endTime": "2023-11-26T16:00:00Z",
    "capacity": 20,
    "registered": 20,
    "location": [8],
    "category": [2, 5],
    "image": [1, 2, 3],
    "club_organizer": 5
  },
  {
    "id": 16,
    "name": "Gaming Workshop",
    "description": "Learn game development and design principles.",
    "startTime": "2023-11-29T18:00:00Z",
    "endTime": "2023-11-29T21:00:00Z",
    "capacity": 30,
    "registered": 30,
    "location": [4, 5, 6],
    "category": [3, 4],
    "image": [1, 2, 3],
    "club_organizer": 6
  },
  {
    "id": 17,
    "name": "Book Swap",
    "description": "Exchange books with other book lovers and discover new reads.",
    "startTime": "2023-12-03T12:00:00Z",
    "endTime": "2023-12-03T14:00:00Z",
    "capacity": 20,
    "registered": 20,
    "location": [8],
    "category": [1],
    "image": [1, 2, 3],
    "club_organizer": 7
  },
  {
    "id": 18,
    "name": "Community Gardening",
    "description": "Plant and care for plants in a community garden.",
    "startTime": "2023-12-07T10:00:00Z",
    "endTime": "2023-12-07T13:00:00Z",
    "capacity": 20,
    "registered": 20,
    "location": [9, 10],
    "category": [3],
    "image": [1, 2, 3],
    "club_organizer": 8
  },
  {
    "id": 19,
    "name": "Retro Dance",
    "description": "Learn new dance moves and improve your skills.",
    "startTime": "2024-12-12T18:00:00Z",
    "endTime": "2024-12-12T20:00:00Z",
    "capacity": 20,
    "registered": 19,
    "location": [9, 10],
    "category": [2, 4],
    "image": [1, 2, 3],
    "club_organizer": 9
  },
  {
    "id": 20,
    "name": "New Horizontal Philosophy",
    "description": "Explore complex philosophical questions and engage in thoughtful discussions.",
    "startTime": "2025-12-15T14:00:00Z",
    "endTime": "2025-12-15T16:00:00Z",
    "capacity": 20,
    "registered": 10,
    "location": [3],
    "category": [1, 2, 4],
    "image": [1, 2, 3],
    "club_organizer": 10
  },
]

export default EVENTS