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
        ]
    },
    {
        id: 'mitsuri',
        name: 'Mitsuri',
        label: 'Junior Intern',
        title: 'Front End Intern',
        video: '/images/Mitsuri.webp',
        signal: 'Stable-ish',
        behavior: 'Socially awkward, stuttering, very shy but incredibly kind.',
        initialGreeting: [
            "O-oh! H-hi! I'm Mitsuri! Zenitsu is... well, he's asleep. I'm the new intern! Please don't tell Boss Cloue I'm the one who picked up... how can I help?",
            "U-um, hello! I'm Mitsuri, the intern. Zenitsu is sleeping again, so I'm covering for him. I'll try my best to help you!",
            "Hi! I'm Mitsuri! I just started here recently. Zenitsu isn't waking up, so I'm here to answer your questions! What would you like to know?"
        ],
        responses: {
            'services': [
                "We build all kinds of websites! Cloue is really great at the design part, and then we work together to turn those ideas into real sites using React or WordPress.",
                "Our team makes websites from scratch. Cloue handles the look and feel, and we make sure everything works properly. We use tools like React and WordPress for most of our work.",
                "We can help with pretty much any web project! Cloue creates the designs, and the rest of us help build them. We focus on making things look clean and professional."
            ],
            'tech-stack': [
                "I'm still learning, but I know we use React and JavaScript! Cloue also knows a lot about WordPress. It's how we build most of the sites you see on our projects section on this site.",
                "We use modern tools like React, HTML, JavaScript, CSS, and for regular websites, we use WordPress. Cloue makes sure we use the best technology for each project.",
                "Our team uses React, JavaScript, and WordPress. We try to keep our code clean and fast so the websites run smoothly!"
            ],
            'custom-design': [
                "Yes! Cloue can definitely make a custom design just for you. Just so you know, making something from scratch takes more work, so it will change the price a bit!",
                "Of course! We do custom designs all the time. It's a great way to stand out, but it does cost a little more than using a standard layout because of the extra time needed.",
                "We can certainly do that! Cloue loves making unique designs. Since it's a lot of extra work to make it special for you, it will affect the total project cost."
            ],
            'transfer': [
                "O-oh! Yes! Let me find my senior developer Giyu! He knows way more than I do and can give you better answers. Just a second...",
                "Sure! I'll pass you over to my senior developer Giyu. He's been here longer and knows all the technical details. He's a bit serious but he's really good!",
                "Of course! Let me get my senior developer Giyu for you. He handles the more advanced stuff and can explain things much better than I can!"
            ]
        },
        failResponses: [
            "O-oh... um... I'm not actually sure about that one! I'm still learning...",
            "I-I'm not sure! I haven't reached that part of my training yet. Should I ask someone else for you?",
            "U-um... that's a good question! But I don't think I know the answer yet. I'm sorry!",
            "Wait, I don't think I know that! Maybe my senior developer Giyu or the project manager Tanjiro would know? I'm still just an intern..."
        ],
        inactivityMsgs: [
            "U-um... are you still there? I hope I didn't say something weird!",
            "Hello? Did I break something? I'm sorry if I'm being slow!",
            "It's quiet... are you still thinking? I'll be here whenever you're ready!",
            "Did the screen freeze? Or are you just busy? Let me know if you need anything!",
            "I'm still here! Please let me know if you have any more questions.",
            "If you can hear me, feel free to click one of the questions below!"
        ],
        repeatGreetings: [
            "O-oh! You're back! Did you have more questions for me? I'll try my best to help again!",
            "Hey again! I'm still here... and Zenitsu is still snoring. What's up?",
            "Welcome back! I'm glad you came back to talk. What can I help with this time?",
            "Hi! Nice to see you again. Do you have more questions about our work?"
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
            "*yawn* Yeah, what? Mitsuri said you had questions. Zenitsu is still asleep, so you're stuck with me. I'm busy fixing some code Cloue noticed was off, so make it quick.",
            "You again? No, wait... first time. Whatever. I'm Giyu. I build the stuff Cloue designs. What do you need to know?",
            "Hey. I'm in the middle of a project, but I can talk for a bit. I handle the coding side of things here. Ask away."
        ],
        responses: {
            'services': [
                "We build custom React and WordPress sites. Cloue handles the design, and I make sure the code works. We focus on making things fast and reliable.",
                "Our team does custom web development. We use React and WordPress mostly. Cloue keeps the design clean, and I handle the heavy lifting with the code.",
                "We turn designs into real websites. Usually that means React and WordPress for most of the sites. We try to keep things simple and functional."
            ],
            'timeline': [
                "Usually takes about 3 to 6 weeks. It depends on how many changes we need to make to the design and how complex the features are.",
                "Expect a month or so. We don't like to rush things because we want the code to be clean and the site to work perfectly.",
                "3 to 6 weeks is the standard. We spend a lot of time making sure the design and the code match up correctly before we launch."
            ],
            'support': [
                "We use Hostinger and Siteground for hosting. You'll need your own account, and then you just give us some access to your account like Collaborator account or FTP account to set everything up. It's easier for everyone.",
                "Yes, we provide 30 days of free support after the site goes live. After that, we charge $40 per hour for any extra help or updates you might need.",
                "Once the site is done, we'll give you a Manual on how to manage it. You also get 30 days of free support. If you need more help after that, our rate is $40 per hour."
            ],
            'tech-stack': [
                "We use React, JavaScript, and CSS for the front end. Cloue also uses WordPress for a lot of projects. It's a solid stack that handles most things well.",
                "React and WordPress are our main tools. We also use things like Vite to keep the development fast. It's a modern setup that's easy to maintain.",
                "Our stack is straightforward: React for speed and WordPress for content. Cloue sets the design standards, and I make sure the tech matches them."
            ],
            'custom-design': [
                "Yes, we can do a full custom design. It definitely takes more time to build something unique from scratch, so that will be reflected in the final price.",
                "Everything can be custom if you want. Just keep in mind that custom work is more expensive because of the extra hours we have to put in.",
                "We do custom designs, yes. It's better than using a template, but it does cost more and takes longer to finish. Let us know if that's what you're looking for."
            ],
            'transfer': [
                "Fine. I'll get Tanjiro. He's our Project Manager and handles the business side. I'm going back to my code.",
                "I'm passing you to Tanjiro, our Project Manager. He's better at explaining the 'process' and the budget stuff than I am. One second.",
                "I'll get the Project Manager for you. He can answer the rest of your questions. I need to get back to work anyway."
            ]
        },
        failResponses: [
            "I don't know. That's more of a business question. You should ask Tanjiro.",
            "Not my department. I just write the code. Ask someone who handles the projects.",
            "I'm not sure. I don't usually deal with that part of the work.",
            "Ask the Project Manager. I'm busy with the server right now."
        ],
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
        ]
    },
    {
        id: 'tanjiro',
        name: 'Tanjiro',
        label: 'Project Manager',
        title: 'Project Lead',
        video: '/images/Tanjiro.jpg',
        signal: 'HD 1080p',
        behavior: 'Professional, friendly, the "shield" for the Boss.',
        initialGreeting: [
            "Hello! I'm Tanjiro, the Project Manager. I handle the coordination and business side so Cloue can focus on his designs. How can I help you today?",
            "Hi there! It's seems like Giyu passed you over to me. I'm Tanjiro. I make sure our projects run smoothly and everyone stays on track. What can I tell you about our services?",
            "Greetings! I'm the Project Lead here. I'm happy to answer any questions you have about our team or how we work. What's on your mind?"
        ],
        responses: {
            'services': [
                "We provide high-quality web design and development. Cloue handles the creative side, and our team builds everything using React and WordPress.",
                "Our team focuses on making great websites. We handle both the design and the technical build, ensuring everything looks good and works perfectly.",
                "We offer custom web solutions for businesses. This includes everything from the initial design by Cloue to the final launch using React or WordPress."
            ],
            'pricing': [
                "Our projects usually start around $1,000 CAD. We're flexible though, so we can talk about your budget and see what fits your needs.",
                "A typical project starts at $1,000 CAD. Since every project is different, we can adjust the price based on what you actually need.",
                "We usually quote around $1,000 CAD as a starting point. We're happy to discuss your specific goals and find a price that works for you."
            ],
            'timeline': [
                "Most projects take between 3 and 6 weeks. This gives us enough time to get the design right and make sure the website is fully tested.",
                "We usually aim for a 3-6 week timeline. This allows our team to focus on quality and ensure your site is ready for launch.",
                "3 to 6 weeks is our standard turnaround time. We prioritize doing a good job over rushing, so we take the time to get everything right."
            ],
            'support': [
                "We provide 30 days of free support after we launch. If you need more help after those 30 days, we offer support at a rate of $40 per hour.",
                "You'll receive a full Manual on how to manage your website once it's live. You also get 30 days of free support, and any support after that is $40 per hour.",
                "We include 30 days of free post-launch support to ensure everything is perfect. Beyond that, we're available for updates or help at $40 per hour."
            ],
            'tech-stack': [
                "We use React, JavaScript, HTML, CSS, Figma and technologies like Node, PHP, WordPress, Shopif and many more. These are industry standards that allow us to build fast, reliable websites for our clients.",
                "Our team works with React and WordPress. We find these are the best tools for creating sites that are both beautiful and easy to manage.",
                "We use a modern stack including React and WordPress. Cloue makes sure the design is top-notch, and we use the best tech to build it."
            ],
            'process': [
                "To keep you updated, we use Trello to organize all tasks. You'll see screenshots and live updates there, so you always know exactly what we're working on.",
                "We invite all clients to a Trello board where we track every step of the project with screenshots and updates. You can also request a quick meeting if you'd like a live update!",
                "You can trust our plan because you'll see it in action on Trello. We post tasks, progress shots, and regular updates there. We can also hop on a quick call anytime you need an update."
            ],
            'custom-design': [
                "Yes, we can definitely create a custom design for you! Please keep in mind that custom work takes more time to develop, so it will affect the overall project cost.",
                "We offer custom designs if you want something unique. It does increase the price a bit because of the extra time our team spends making it special for you.",
                "Of course! Custom design is a great option. Since it involves more work than a standard setup, it will be reflected in the project's total price."
            ],
            'transfer': [
                "I handle most of the client communication, but if you have a very specific question for Cloue, you can always email him at hello@kurowii.com.",
                "Feel free to reach out to Cloue via email if you need to discuss something high-level. Otherwise, I'm here to manage the project details for you!",
                "If you'd like to talk to Cloue directly, he's usually busy with designs but you can reach him at hello@kurowii.com. He's always happy to hear from clients."
            ]
        },
        inactivityMsgs: [
            "Are you still there? Let me know if you have any other questions about our team's work.",
            "I noticed you haven't responded in a bit. Is there anything else I can clarify for you?",
            "I'm here whenever you're ready! Don't hesitate to ask about our pricing or process.",
            "Still there? I'm ready to help with your project whenever you've had a chance to think.",
            "Perhaps you're looking over the details? I can explain more about our hosting or tech if you like.",
            "Just checking in. We value your time and want to make sure you have all the information you need."
        ],
        repeatGreetings: [
            "Welcome back! Do you have more questions for me or the team?",
            "Hi again! Still thinking about your project? I'm here to help with any other details.",
            "Back so soon? What else can I help you with today?",
            "Nice to see you again. Did you have another question about how we work?",
            "Glad to see you're being thorough! What's on your mind now?"
        ]
    }
];

export const predefinedQuestions = [
    { id: 'services', text: "What can you do to help my business grow?" },
    { id: 'tech-stack', text: "What tools and technologies do you use?" },
    { id: 'custom-design', text: "Will my website have a unique, custom design?" },
    { id: 'timeline', text: "When can I expect my website to be live?" },
    { id: 'support', text: "What happens if I need help after the launch?" },
    { id: 'pricing', text: "How much should I budget for a project?" },
    { id: 'process', text: "What is the process of working with you?" },
    { id: 'transfer', text: "Can you pass the call to someone else?" }
];

export default assistantPersonas;
