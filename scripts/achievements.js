use dragncode;
db.achievements.drop();
db.achievements.insertMany([
    {
        '_id': ObjectId('5c140632b6e7b316d41b47f0'),
        'title': 'Welcome',
        'description': 'The first step to start an incredible adventure.'
    },
    {
        "_id": ObjectId("5c14082136a03b55e0c7bd38"),
        "title": "Rookie",
        "description": "Complete your very first level."
    },
    {
        "_id": ObjectId("5c16825a9d5a146ec425f68a"),
        "title": "Rising Star",
        "description": "One star is nice, Two stars is better."
    },
    {
        "_id": ObjectId("5c16823c9d5a146ec425f689"),
        "title": "Shine bright like a diamond",
        "description": "3 stars performance, The sky is the limit."
    },
    {
        "_id": ObjectId("5c15074de82c2555241b9c2e"),
        "title": "Contender",
        "description": "Finish all 'Home' levels."
    },
    {
        "_id": ObjectId("5c150557e82c2555241b9c28"),
        "title": "Creator",
        "description": "Create a level and show your knowledge to the community."
    },
    {
        "_id": ObjectId("5c15058fe82c2555241b9c29"),
        "title": "Artist",
        "description": "Help your neighbour progressing by creating 5 levels."
    },
    {
        "_id": ObjectId("5c1682829d5a146ec425f68b"),
        "title": "Pocket Calculator",
        "description": "Reach 100 points."
    },
    {
        "_id": ObjectId("5c1505d3e82c2555241b9c2a"),
        "title": "Turing Machine",
        "description": "Reach 500 points."
    },
    {
        "_id": ObjectId("5c150691e82c2555241b9c2c"),
        "title": "Influencer",
        "description": "Like a level."
    },
    {
        "_id": ObjectId("5c150667e82c2555241b9c2b"),
        "title": "Teacher",
        "description": "Create a level that reaches 100 likes."
    },
    {
        "_id": ObjectId("5c15070fe82c2555241b9c2d"),
        "title": "(Not) Anonymous",
        "description": "Put a face to your name and reveal your beauty to the World."
    },
    {
        "_id": ObjectId("5c150507e82c2555241b9c27"),
        "title": "Maestro",
        "description": "I want you to be the very best, like no one ever was."
    }
]);