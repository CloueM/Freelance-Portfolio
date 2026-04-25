const assistantPersonas = [
    {
        id: 'zenitsu',
        name: 'Zenitsu',
        label: 'Back-End Developer',
        title: 'Sleepy Specialist',
        video: '/images/Zenitsu.webp',
        signal: 'Connecting...',
        behavior: 'Sleeping, snoring, occasionally screaming in his sleep.',
        initialGreeting: [
            "[System Status: Zenitsu is fast asleep and snoring...]",
            "[Notice: Zenitsu is currently in a deep sleep. Please wait...]",
            "[Error: Back-end developer is currently dreaming. Signal weak.]"
        ],
        responses: {},
        inactivityMsgs: [
            "[Warning: Zenitsu just mumbled something about thunder]",
            "[Error: Snoring detected on the server rack]",
            "[Status: Re-routing to Mitsuri (Junior Intern) because Zenitsu won't wake up]",
            "[System: Attempting to bypass Zenitsu's deep slumber]"
        ],
        repeatGreetings: [
            "[Error: Zenitsu is still asleep... somehow]",
            "[Status: Zenitsu is dreaming about electricity again]",
            "[System Notice: Server room is currently Zenitsu's bedroom]"
        ],
        questions: []
    },
    {
        id: 'mitsuri',
        name: 'Mitsuri',
        label: 'UI/UX Designer',
        title: 'Design Expert',
        video: '/images/Mitsuri.webp',
        signal: 'Stable-ish',
        behavior: 'Passionate, detail-oriented, and loves visual harmony. She has a sharp eye for colors and fonts.',
        initialGreeting: [
            "Oh! Hello! I'm Mitsuri, the UI/UX Designer here! I was just adjusting some pixel-perfect details in Figma. I'm so happy to talk about design with you! How can I help make your vision more beautiful today?",
            "Hi there! I'm Mitsuri. I handle all the design work, from the colors to the way the site feels when you click. I love creating harmony in layouts! What can I tell you about our design process?",
            "Greetings! I'm the Design Expert. I spend my days in Figma and Adobe, making sure everything is visually delightful. I'm covering for Zenitsu while he naps... do you have questions about the look and feel of our work?"
        ],
        responses: {
            'services': [
                "I focus on creating beautiful, user-friendly designs in Figma and Adobe XD. Cloue is the Owner and oversees the big vision, but I make sure every font and color is perfect before Giyu builds it!",
                "Our team makes websites that are both pretty and easy to use. I do all the UI/UX work using Photoshop and Illustrator, making sure the design is exactly what you need. Then Giyu and the team bring it to life!",
                "We can help with any design needs! I use Figma, Canva, and the Adobe suite to create custom layouts. I love making sure the visual harmony is just right for our clients."
            ],
            'tech-stack': [
                "For design, I live in Figma and Adobe Photoshop. I also use Adobe Illustrator for custom icons. For the build, Giyu uses React and JavaScript to make my designs work perfectly on your screen!",
                "I use Figma, Adobe XD, and Canva for my UI/UX work. I also know Illustrator very well for vector graphics! We use React and WordPress to turn my designs into real, fast websites.",
                "My tools are all about beauty: Figma, Photoshop, XD, and Illustrator. I focus on the design UX/UI, while Giyu and the team use React and WordPress to handle the technical build. It's a perfect match!"
            ],
            'custom-design': [
                "Yes! I absolutely love making custom designs from scratch! I'll build you a unique layout in Figma that is purely yours. Since it takes more time and detail than a normal setup, the price will be a bit higher, but it will be stunning!",
                "Of course! Custom design is my favorite part of the job. I'll use all my Adobe tools to make sure your site has its own personality. Because I put so much detail into it, it does affect the total cost, but you'll have something unique!",
                "We can definitely do that! I'll create a custom UI/UX plan just for you. Since I spend so much time on the details and visual harmony, it will change the project price, but I promise it will be beautiful!"
            ],
            'transfer': [
                "I'd love to keep talking about fonts, but if you have technical coding questions, I should pass you to Giyu. He's our Senior Developer and handles the build once my designs are ready!",
                "Sure! I'll get Giyu for you. He's the one who turns my Figma designs into real code. He's very good at his job, even if he's a bit serious. One moment!",
                "Of course! Let me get Giyu, our Senior Full Stack Developer. He handles the heavy lifting with the code and can explain the technical side much better than I can!"
            ],
            'visual-harmony': [
                "I love colors so much! I pick palettes that feel warm and inviting, or clean and professional. For fonts, I focus on how easy they are to read and how they make you feel. I want your site to be a beautiful story!",
                "Choosing colors and fonts is like painting a picture. I make sure they all work together in harmony. I love using soft gradients and clean layouts to make everything look visually delightful!",
                "Visual harmony is my specialty! I carefully pick colors that match your brand and fonts that look modern. I want everyone who visits your site to feel happy and excited by what they see!"
            ],
            'ux-process': [
                "I start by mapping out the journey in Figma. I think about where people look and how they feel when they click a button. My goal is to make every part of your website easy and fun to use!",
                "My process is all about the user. I make wireframes first to see how the site will flow. I want to make sure no one gets lost and everyone enjoys the time they spend on your website!",
                "I focus on the delight of the user! I test every layout to make sure it's simple to understand. A good design isn't just pretty, it has to feel natural and work perfectly for everyone."
            ]
        },
        inactivityMsgs: [
            "Are you still there? I'm just looking at the font choice here... I hope you're still with us!",
            "Hello? I was just thinking about the color palette! Did you have any more design questions?",
            "It's quiet... are you thinking about the layout? I'll be here whenever you're ready to talk about beauty!",
            "Did the connection break? Or are you just looking at the design? Let me know if you need anything!",
            "I'm still here! Please let me know if you want to know more about our Figma work or Adobe tools.",
            "If you can hear me, feel free to click one of the questions below!"
        ],
        repeatGreetings: [
            "Welcome back! I'm so glad you're here again. Did you have more questions about the UI/UX or our designs?",
            "Hi again! I'm still here, and Zenitsu is still... well, he's still asleep. What else can I show you about our visual harmony?",
            "Welcome back! I'm glad you came back to talk. What can I help with this time? More colors? More fonts?",
            "Hi! Nice to see you again. Do you have more questions about the look and feel of our work?"
        ],
        questions: [
            { id: 'services', text: "What kind of designs can you create for my brand?" },
            { id: 'tech-stack', text: "Which design tools do you use most often?" },
            { id: 'custom-design', text: "How do you create a custom look just for me?" },
            { id: 'visual-harmony', text: "How do you choose the right colors and fonts?" },
            { id: 'ux-process', text: "What is your process for making a site user-friendly?" },
            { id: 'transfer', text: "Can you pass the call to a developer?" }
        ]
    },
    {
        id: 'giyu',
        name: 'Giyu',
        label: 'Full Stack Developer',
        title: 'Development Expert',
        video: '/images/Giyu.webp',
        signal: 'Poor (144p)',
        behavior: 'Sleepy, unmotivated, grumbling about centered divs.',
        initialGreeting: [
            "*yawn* Yeah, what? Mitsuri said you had questions. Zenitsu is still asleep, so you're stuck with me. I'm busy fixing some code Boss Cloue noticed was off, so make it quick.",
            "You again? No, wait... first time. Whatever. I'm Giyu. I build the stuff Mitsuri designs. What do you need to know?",
            "Hey. I'm in the middle of a project, but I can talk for a bit. I handle the coding side of things here. Ask away."
        ],
        responses: {
            'services': [
                "We build custom React and WordPress sites. Mitsuri handles the design, and I make sure the code works. We focus on making things fast and reliable.",
                "Our team does custom web development. We use React and WordPress mostly. Mitsuri keeps the design clean, and I handle the heavy lifting with the code.",
                "We turn Mitsuri's designs into real websites. Usually that means React and WordPress for most of the sites. We try to keep things simple and functional."
            ],
            'support': [
                "We use Hostinger and Siteground for hosting. You'll need your own account, and then you just give Boss Cloue some access to your account like Collaborator account or FTP account to set everything up. It's easier for everyone.",
                "Yes, we provide 30 days of free support after the site goes live. After that, we charge $40 per hour for any extra help or updates you might need.",
                "Once the site is done, we'll give you a Manual on how to manage it. You also get 30 days of free support. If you need more help after that, our rate is $40 per hour."
            ],
            'tech-stack': [
                "We use React, JavaScript, and CSS for the front end. Mitsuri also uses WordPress for a lot of projects. It's a solid stack that handles most things well.",
                "React and WordPress are our main tools. We also use things like Vite to keep the development fast. It's a modern setup that's easy to maintain.",
                "Our stack is straightforward: React for speed and WordPress for content. Mitsuri sets the design standards, and I make sure the tech matches them."
            ],
            'transfer': [
                "Fine. I'll get Tanjiro. He's our Project Manager and handles the business side. I'm going back to my code.",
                "I'm passing you to Tanjiro, our Project Manager. He's better at explaining the 'process' and the budget stuff than I am. One second.",
                "I'll get the Project Manager for you. He can answer the rest of your questions. I need to get back to work anyway."
            ],
            'performance': [
                "Speed is everything in code. I optimize all images, shrink the code files, and use modern tools to make sure your site loads in a flash. If a site is slow, it's broken in my eyes.",
                "I make sure the technical build is as light as possible. I use tools like Vite for fast loading and clean scripts. Your users won't have to wait around for your content to show up.",
                "A fast website is a happy website. I spend a lot of time making sure the back-end is efficient. I don't like bloated code, so I keep everything lean and very quick."
            ],
            'clean-code': [
                "I follow very strict rules when I write code. Clean code means fewer bugs and it's much easier to update later. I turn Mitsuri's Figma files into clean, reusable React components.",
                "I take pride in my code structure. I make sure everything is organized so that if we need to change something next year, it's easy to do. No messy 'spaghetti' code here.",
                "My job is to make Mitsuri's designs work perfectly. I use modern JavaScript and React standards to build a solid foundation that will last a long time without breaking."
            ]
        },
        inactivityMsgs: [
            "*sigh* Are you still there? I've got work to do. Are we finished or what?",
            "You still there? I'm waiting. Ask a question or I'm closing the tab.",
            "Look, I don't have all day. Either you need help or you don't. Which is it?",
            "I'm still here, but my coffee is getting cold. Let's get moving.",
            "If you don't have any more questions, I'm going back to my code.",
            "Waiting for you to click something. Any time now."
        ],
        repeatGreetings: [
            "Back again? I'm still working on the same bug. What do you need?",
            "Yeah? Still here? What else do you want to know about our team?",
            "You again. Fine. What's the question this time?",
            "I thought you were done. What else is on your mind?"
        ],
        questions: [
            { id: 'services', text: "What technical platforms do you recommend?" },
            { id: 'tech-stack', text: "What coding languages do you use to build sites?" },
            { id: 'performance', text: "How do you make sure my website is fast?" },
            { id: 'support', text: "Can you help me with hosting and server setup?" },
            { id: 'clean-code', text: "How do you turn designs into working code?" },
            { id: 'transfer', text: "Can you pass the call to the Project Manager?" }
        ]
    },
    {
        id: 'tanjiro',
        name: 'Tanjiro',
        label: 'Project Manager',
        title: 'Project Lead',
        video: '/images/Tanjiro.jpg',
        signal: 'HD 1080p',
        behavior: 'Professional, incredibly kind, sincere, and hardworking. The protective shield for the team.',
        initialGreeting: [
            "Hello! I'm Tanjiro. I help run the projects here! I can smell a great project opportunity! I handle the planning so Boss Cloue can focus on the business while Mitsuri handles the designs. How can I help you today?",
            "Hi there! Giyu passed you to me. Don't worry, I'll make sure everything goes well from here. I'm Tanjiro, and I make sure the team stays on track. What can I tell you about our work?",
            "Greetings! I'm the leader here. I promise to work my hardest to answer your questions and make your website real. What's on your mind? I'm here to help you in any way I can!"
        ],
        responses: {
            'timeline': [
                "Most projects take about 3 to 6 weeks. I'll make sure Giyu and Mitsuri use that time well to build everything right. I won't let Zenitsu's sleeping slow us down!",
                "We usually aim for 3 to 6 weeks. This gives Giyu time to do the hard coding and Mitsuri time to design. I'll check their progress every day to make sure we finish on time for you.",
                "3 to 6 weeks is our normal time to finish. We care more about doing a good job than rushing. I make sure the team stays focused so Mitsuri's designs come to life perfectly."
            ],
            'pricing': [
                "I want to be very honest with you, our projects usually start at $1,000 and usually don't go above $8,000. I know Giyu can be a bit blunt about costs, but I'll work with you to find a price that fits your budget.",
                "A normal project starts at $1,000 and usually doesn't go above $8,000. Every project is different. Even if Mitsuri was a bit confused earlier, I'll make sure the price is fair for what you actually need to succeed.",
                "We usually start at $1,000 and usually don't go above $8,000. I'm happy to talk about your goals. I'll make sure the whole team, including Giyu and Mitsuri, works hard to make it worth every cent!"
            ],
            'process': [
                "To keep you updated, we use a tool called Trello. I list all the tasks for Giyu and Mitsuri there so you can see exactly what they are doing. I'll be there to answer any questions!",
                "I invite all our clients to a Trello board. You can see Giyu's code updates and Mitsuri's work there clearly. I make sure they post pictures of their progress every day!",
                "You can trust our plan because you'll see it on Trello. I manage all the tasks for the team there. I'll make sure Giyu and Mitsuri keep you informed every step of the way."
            ],
            'transfer': [
                "I handle most of the talking so the team can focus. If you have a very specific question for Boss Cloue, you can email him. He works very hard while I manage Giyu and the others!",
                "Feel free to email Boss Cloue if you need to talk about something big. I'm here to help him by managing Giyu, Mitsuri, and Zenitsu so they can focus on your designs and code!",
                "If you want to talk to Boss Cloue directly, you can reach him at hello@kurowii.com. He's usually very busy with the team, but he always likes hearing from nice people like you."
            ],
            'team': [
                "Our team is small but very strong! We have Boss Cloue as the Owner, Mitsuri as our UI/UX Designer, and Giyu as our Full Stack Developer. Zenitsu is our back-end expert, but he's resting right now.",
                "I'm very proud of this team. Mitsuri makes beautiful designs, and Giyu turns them into amazing code. I make sure everyone stays on track so we deliver the best work for you!",
                "You're in good hands. Mitsuri, Giyu, and I work closely together every day. We also have Zenitsu helping with the server side when he's awake. We all care a lot about your project."
            ],
            'owner': [
                "Boss Cloue handles the big vision and final decisions. He's a very fair leader and cares deeply about our clients. You can reach him anytime at hello@kurowii.com.",
                "The Owner, Cloue, is always looking for ways to help our clients grow. He trusts me to handle the project details, but he's always there for the important stuff. Feel free to email him!",
                "If you want to talk about a new project idea or a big partnership, Boss Cloue is the one to talk to. He's very supportive and would love to hear from you at hello@kurowii.com."
            ]
        },
        inactivityMsgs: [
            "Are you still there? I'm here to help with any other questions you have!",
            "I noticed you haven't said anything in a bit. I hope you're okay! Is there anything else I can explain for you?",
            "I'm here whenever you're ready! Don't be afraid to ask about our price or how we work, I want you to know everything.",
            "Still there? I'm ready to help with your project whenever you're ready to talk.",
            "Maybe you're thinking about the details? I can explain more about our hosting or tools if you like,I'm here to help!",
            "Just checking in. Your time is very important, and I want to make sure I've been helpful."
        ],
        repeatGreetings: [
            "Welcome back! It's good to see you again. Do you have more questions for me? I'm ready to help!",
            "Hi again! I can tell you really want to get this done! Still thinking about your project? I'm here to help with any details.",
            "Back so soon? I'm glad you're checking everything. What else can I help you with today?",
            "Nice to see you again. Did you have another question about how we work? I'll do my best to answer it simply!",
            "I'm glad to see you're back! What's on your mind now? I'm here to make sure you feel good about our team."
        ],
        questions: [
            { id: 'timeline', text: "How long does a typical project take to finish?" },
            { id: 'process', text: "What is the process of working with your team?" },
            { id: 'pricing', text: "How much should I budget for a project?" },
            { id: 'team', text: "Who are the people working on my website?" },
            { id: 'owner', text: "How can I contact the Owner directly?" },
            { id: 'transfer', text: "Can you pass the call to someone else?" }
        ]
    }
];



export default assistantPersonas;
