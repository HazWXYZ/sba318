// data for the quote collection application

let authors = [
  { id: 1, name: "Albert Einstein", bio: "Theoretical physicist", birthYear: 1879 },
  { id: 2, name: "Maya Angelou", bio: "American poet and civil rights activist", birthYear: 1928 },
  { id: 3, name: "Oscar Wilde", bio: "Irish poet and playwright", birthYear: 1854 },
  { id: 4, name: "Mark Twain", bio: "American writer and humorist", birthYear: 1835 },
  { id: 5, name: "Eleanor Roosevelt", bio: "American political figure and diplomat", birthYear: 1884 },
  { id: 6, name: "Steve Jobs", bio: "Co-founder of Apple Inc.", birthYear: 1955 }
];

let categories = [
  { id: 1, name: "Motivation", description: "Quotes to inspire and motivate" },
  { id: 2, name: "Wisdom", description: "Timeless wisdom and life lessons" },
  { id: 3, name: "Success", description: "Quotes about achievement and success" },
  { id: 4, name: "Life", description: "Reflections on life and living" },
  { id: 5, name: "Love", description: "Quotes about love and relationships" },
  { id: 6, name: "Humor", description: "Witty and humorous quotes" }
];

let quotes = [
  {
    id: 1,
    text: "Life is what happens when you're busy making other plans.",
    authorId: 4,
    categoryId: 4,
    year: 1957,
    likes: 142
  },
  {
    id: 2,
    text: "Imagination is more important than knowledge.",
    authorId: 1,
    categoryId: 2,
    year: 1929,
    likes: 256
  },
  {
    id: 3,
    text: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
    authorId: 2,
    categoryId: 2,
    year: 1971,
    likes: 189
  },
  {
    id: 4,
    text: "Be yourself; everyone else is already taken.",
    authorId: 3,
    categoryId: 4,
    year: 1890,
    likes: 312
  },
  {
    id: 5,
    text: "The future belongs to those who believe in the beauty of their dreams.",
    authorId: 5,
    categoryId: 1,
    year: 1960,
    likes: 201
  },
  {
    id: 6,
    text: "The only way to do great work is to love what you do.",
    authorId: 6,
    categoryId: 3,
    year: 2005,
    likes: 278
  },
  {
    id: 7,
    text: "The two most important days in your life are the day you are born and the day you find out why.",
    authorId: 4,
    categoryId: 4,
    year: 1894,
    likes: 167
  },
  {
    id: 8,
    text: "In the middle of difficulty lies opportunity.",
    authorId: 1,
    categoryId: 1,
    year: 1946,
    likes: 223
  }
];

module.exports = { authors, categories, quotes };
