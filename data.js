// src/data.js
export const DB = {
  // --- المستخدمين ---
  users: [
    { id: 1, name: 'Admin', email: 'admin@elearn.io', password: 'admin123', role: 'admin', status: 'active', xp: 0 },
    { id: 2, name: 'Sameh', email: 'sameh@etudiant.com', password: '123456', role: 'etudiant', status: 'active', xp: 0 },
    { id: 3, name: 'Youssef', email: 'youssef@etudiant.com', password: '123456', role: 'etudiant', status: 'active', xp: 0 },
    { id: 4, name: 'Salma', email: 'salma@etudiant.com', password: '123456', role: 'etudiant', status: 'active', xp: 0 },
    { id: 5, name: 'Prof Karim', email: 'karim@prof.com', password: '123456', role: 'professeur', status: 'active', xp: 0 },
  ],

  // --- الكورسات (مع الدروس والخلفيات) ---
  courses: [
    { 
      id: 1, 
      title: 'Python pour débutants', 
      author: 'Dr. Sarah Benani', 
      description: 'Maîtrisez les fondamentaux de Python : syntaxe, structures, POO et projets pratiques.',
      category: 'Python', 
      image: 'linear-gradient(135deg, #e6d362 0%, #6c7a89 100%)', 
      hours: 18, 
      students: 342, 
      chapters: 4,
      progress: 0,
      favorite: false,
      lessons: [
        { id: 1, title: 'Introduction à Python', content: 'Python est un langage de programmation interprété, facile à apprendre...', xp: 10 },
        { id: 2, title: 'Variables et types de données', content: 'En Python, les variables sont créées lorsqu\'on leur assigne une valeur...', xp: 10 },
        { id: 3, title: 'Les boucles et conditions', content: 'Les boucles permettent d\'exécuter un bloc de code plusieurs fois...', xp: 10 },
        { id: 4, title: 'Les fonctions', content: 'Les fonctions sont des blocs de code réutilisables...', xp: 10 },
      ]
    },
    { 
      id: 2, 
      title: 'Java Enterprise avec Spring', 
      author: 'Prof. Karim El Idrissi', 
      description: 'Développez des applications robustes avec Spring Boot, JPA et microservices.',
      category: 'Java', 
      image: 'linear-gradient(135deg, #f39c12 0%, #636e72 100%)', 
      hours: 26, 
      students: 218, 
      chapters: 3,
      progress: 0,
      favorite: false,
      lessons: [
        { id: 1, title: 'Introduction à Spring Boot', content: 'Spring Boot est un framework qui facilite le développement...', xp: 10 },
        { id: 2, title: 'Injection de dépendances', content: 'L\'injection de dépendances est un pattern de conception...', xp: 10 },
        { id: 3, title: 'JPA et bases de données', content: 'JPA (Java Persistence API) permet de mapper des objets...', xp: 10 },
      ]
    },
    { 
      id: 3, 
      title: 'React & TypeScript avancé', 
      author: 'Prof. Amina Cherkaoui', 
      description: 'Créez des interfaces modernes avec React 19, TypeScript, hooks et architecture propre.',
      category: 'Développement Web', 
      image: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)', 
      hours: 22, 
      students: 512, 
      chapters: 3,
      progress: 0,
      favorite: false,
      lessons: [
        { id: 1, title: 'Introduction à React', content: 'React est une bibliothèque JavaScript pour construire des interfaces utilisateur...', xp: 10 },
        { id: 2, title: 'Les Hooks', content: 'Les Hooks sont des fonctions qui vous permettent de "brancher" des fonctionnalités de React...', xp: 10 },
        { id: 3, title: 'TypeScript avec React', content: 'TypeScript apporte un typage statique à JavaScript, ce qui rend le code plus robuste...', xp: 10 },
      ]
    },
  ],

  // --- الاختبارات (Quiz) - مع أسئلة وخيارات ---
  quizzes: [
    {
      id: 1,
      title: 'Quiz Python - Les bases',
      description: 'Testez vos connaissances sur les fondations du langage Python.',
      courseId: 1,
      xp: 50,
      questions: [
        {
          id: 1,
          question: 'Quelle est la bonne syntaxe pour afficher "Bonjour" en Python ?',
          options: ['print("Bonjour")', 'echo("Bonjour")', 'console.log("Bonjour")'],
          correctAnswer: 0 // index 0 = print("Bonjour")
        },
        {
          id: 2,
          question: 'Quel est le type de la variable x si x = 5.5 ?',
          options: ['Integer', 'Float', 'String'],
          correctAnswer: 1 // index 1 = Float
        },
        {
          id: 3,
          question: 'Laquelle de ces structures permet de répéter un bloc de code ?',
          options: ['if', 'for', 'return'],
          correctAnswer: 1 // index 1 = for
        }
      ]
    },
    {
      id: 2,
      title: 'Quiz Java - Les fondamentaux',
      description: 'Testez vos bases sur la programmation Java.',
      courseId: 2,
      xp: 50,
      questions: [
        {
          id: 1,
          question: 'Quelle est la méthode principale pour démarrer un programme Java ?',
          options: ['main()', 'start()', 'run()'],
          correctAnswer: 0 // index 0 = main()
        },
        {
          id: 2,
          question: 'Quel est le mot-clé pour définir une classe en Java ?',
          options: ['class', 'struct', 'object'],
          correctAnswer: 0 // index 0 = class
        }
      ]
    }
  ],

  // --- التمارين العملية (TP) ---
  tps: [
    {
      id: 1,
      title: 'TP Python : Calculatrice',
      description: 'Écrivez un programme Python qui demande deux nombres et une opération, puis affiche le résultat.',
      starterCode: `# Écrivez votre code ici
num1 = float(input("Entrez le premier nombre : "))
num2 = float(input("Entrez le deuxième nombre : "))
operation = input("Entrez l'opération (+, -, *, /) : ")
`,
      solution: `# Solution
if operation == '+':
    print(num1 + num2)
elif operation == '-':
    print(num1 - num2)
elif operation == '*':
    print(num1 * num2)
elif operation == '/':
    if num2 != 0:
        print(num1 / num2)
    else:
        print("Erreur : Division par zéro")
else:
    print("Opération invalide")`,
      xp: 100
    }
  ],

  // --- الاجتماعات (Réunions) ---
  reunions: [
    {
      id: 1,
      title: '📚 Réunion : Introduction à Spring Boot',
      description: 'Session en direct avec le Prof. Karim pour expliquer les bases de Spring Boot.',
      date: '2026-08-10',
      time: '15:00',
      duration: '1h 30min',
      professor: 'Prof. Karim El Idrissi',
      link: 'https://meet.google.com/abc-def-ghi',
      status: 'upcoming'
    },
    {
      id: 2,
      title: '🧪 Correction du TP Python',
      description: 'Revue des solutions du TP Python avec la Dr. Sarah.',
      date: '2026-08-12',
      time: '10:00',
      duration: '2h',
      professor: 'Dr. Sarah Benani',
      link: 'https://zoom.us/j/123456789',
      status: 'upcoming'
    },
    {
      id: 3,
      title: '🎯 Q&A React Hooks',
      description: 'Séance de questions-réponses sur les hooks avancés de React.',
      date: '2026-08-05',
      time: '18:00',
      duration: '1h',
      professor: 'Prof. Amina Cherkaoui',
      link: '#',
      status: 'finished'
    }
  ],

  // --- الرسائل (Messages) ---
  messages: [
    { id: 1, senderId: 2, receiverId: 1, content: 'Bonjour, j\'ai une question sur le cours Python.', timestamp: '2026-08-04T10:30:00' },
    { id: 2, senderId: 1, receiverId: 2, content: 'Bonjour Sameh ! Quelle est votre question ?', timestamp: '2026-08-04T10:32:00' }
  ],

  // --- الشهادات والإنجازات ---
  certificates: [],
  achievements: []
};