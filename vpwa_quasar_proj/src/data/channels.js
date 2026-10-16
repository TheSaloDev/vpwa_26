import { reactive } from "vue";

export const channels = reactive([
  {
    id: "general",
    name: "general",
    topic: "Common talk for everyone",
    users: [
      { nickname: "Anna", status: "online" },
      { nickname: "Peter", status: "busy" },
      { nickname: "Maria", status: "away" },
      { nickname: "John", status: "invisible" },
      { nickname: "Anna2", status: "online" },
      { nickname: "Peter2", status: "busy" },
      { nickname: "Maria2", status: "away" },
      { nickname: "John2", status: "invisible" },
    ],
    messages: [
      {
        id: 1,
        author: "Anna",
        text: "Hi everyone!",
        time: "10:02",
        own: false,
      },
      {
        id: 2,
        author: "Peter",
        text: "Hello! Ready for the meeting?",
        time: "10:03",
        own: false,
      },
      {
        id: 3,
        author: "me",
        text: "Yes, give me 5 minutes",
        time: "10:04",
        own: true,
      },
      {
        id: 4,
        author: "Anna",
        text: "Hey @TheSalo, are you there?",
        time: "10:09",
        own: false,
      },
    ],
  },
  {
    id: "random",
    name: "random",
    topic: "Everything else",
    users: [{ nickname: "Anna", status: "online" }],
    messages: [
      {
        id: 1,
        author: "Anna",
        text: "Look at this cat",
        time: "09:15",
        own: false,
      },
    ],
  },
]);
