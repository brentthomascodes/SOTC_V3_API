import * as admin from "firebase-admin";
// import * as functions from "firebase-functions";

// admin.initializeApp({
//   credential: admin.credential.cert({
//     privateKey: functions.config().private.key.replace(/\\n/g, "\n"),
//     projectId: functions.config().project.id,
//     clientEmail: functions.config().client.email,
//   }),
//   databaseURL: "https://sotc-v2.firebaseio.com",
// });

admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDF0l5hF0S/El4/\nKOok+u/+i6RrM8qyvlV8U7WCx6XTLmm4TbkUE69bBbY3umwOLlmGgpBnfjGYQNj8\n7iuQ0RvoZQhZhYrV1Ypgg2sYft+zu4kNztCNe8T/EU/nzmY32YoIxKl1Z/I4iq02\nhrkb6aEbfvjwDx6pCByY200I1ddU209YSQcrQV4WzsoZupR/+SHRe27OfFGqcLts\nH+hIxtLXgCV+0KZfjYl637gkjTTA5o79hFAu48fDTwBo8hIbqEXzWJge2lwqJe27\n/U4vx6LqsO05oBW9TItmCuiRu66PYTzgs4U0sgHfeCPkBQu1ObcLcz4gNswHsooJ\nOGbOpna9AgMBAAECggEADT6BQoEGZ/NCXq2OE42LYNOxKkFshwM9Ab0wloHOvwp8\nWhicbtT5W5/QkpjHRqHHk6MmwnVz7sYbFCZowa7TIZl8cbkbno2UtwZ4nP2HKGdC\njN6b66ttxa5Y8H0xYcVAoeEMzJP55w6XYmJ3S5oC+i5jjne5ehNvDeef/jRW6mx2\njerkzz1feR9uwYJZ4Fo2WoYn/53hWUjiOh7lebvdQkbIF0fJQXdLVOPSHUg8dAqu\nVmGhqZG896wKqqOcwjhBACykh5qXXMA8ekasQ3jnHRqarn8aiQapul40PN43eRGH\n+Ch7dQr74WT5U/b9+UITbtm1TCU12DmCT2Ywupv5jwKBgQD36WOLWFF8T7ot3jJf\njQuNtaKVAK4vSWdslxtilES/dZPxLVjp1quY2+0YiDqRaLImblPlwjE+83aKADjQ\ngDHD4aozdjST/64oIbRautVwU/PH+C5MdfuPeQBkrBlZ5iytgXf4g/xsFac803om\n/VOEtKbiN0QfCQwE15CtRqgAmwKBgQDMRp48tFkKxWNfD7D3qcmaTAuUlEo/Y+M1\nQODopQhf3U7ikUrlcu4oUWAIGDQgn8HGB7POUR+hphNt8z9VQYeCM5yyaw03vgQz\nWsYIy/gwwaOJ7gSXhTJy9B9NnVF31QcnYO7rIDo2ood65BCnGmrkGNPmdWC8+qyO\nlMh9Vjg/hwKBgCZN61GGbeC1OOEJaeMVmellXR+EoWUxBEfk+Rg8LHsgoaEsDobi\n4lSV9oZJ1jLNaGlDtrbTUGSXnYMpEZ41kHrhjTiyVOFhKfmNa55xK7VVY19MW2r4\n98ttOMBVTv1y8QhF7tF5IzFYDyT4z/DiR1tDxl1BiMb60N6WqAX92sttAoGATDc8\n6uFPJ5mmDd3I5V7P/WXKHFGHskcOitv+Dk8k5L+poxcanqlW+mwCLIL7UADLR5uw\nFpZl+uX/8dIEG0crzAR9voP6loWrA44mvTl9DJPy9I993xqvS/yRgV/k+ZTd6m9c\nNRX9Ik1Zxxw4qmBM6XXp+d5pjZjpsPkKJNl6exkCgYEA0hlJ0VO++0QMZ3Zopald\no83vbmB9r4BH6c1DNYLkC5uN2kreEg+fnGobGxbGLvmWx3DHGBRHPyiSqQ7bsWU/\nMtv44SqfJZSjGtImpxRbF3yBpy9d4vdLNN1LSr4O3l+9S37w83j0EF473b8yxz6G\nW/KvVBYOx9LO9EAC4Nz4oG0=\n-----END PRIVATE KEY-----\n".replace(/\\n/g, "\n"),
    projectId: "sotc-v2",
    clientEmail: "firebase-adminsdk-289an@sotc-v2.iam.gserviceaccount.com",
  }),
  databaseURL: "https://sotc-v2.firebaseio.com",
});

const db = admin.firestore();
export {admin, db};
