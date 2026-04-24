const assistantPersonas = [
    {
        id: 'bobby',
        name: 'Bobby',
        label: 'Back-End Developer',
        title: 'Server Specialist',
        video: '/images/cat-loading-assistant.gif',
        signal: 'Connecting...',
        behavior: 'Struggling, unresponsive.',
        initialGreeting: "...",
        responses: {},
        inactivityMsgs: ["...", "...?", "....."],
        repeatGreetings: ["...", "...?", "Bobby is still trying to connect..."]
    },
    {
        id: 'kevin',
        name: 'Kevin',
        label: 'Junior Intern',
        title: 'Front-End Intern',
        video: '/images/intern-assistant.gif',
        signal: 'Stable-ish',
        behavior: 'Panicky, eager to please.',
        initialGreeting: "OH! HI! I'm Kevin! Bobby is... uh... having some server issues. I'm the new intern! How can I help you grow your business with our team and the Boss?",
        responses: {
            'services': [
                "We're a full-service agency! The Boss is a literal god at Designing—it's their forte! We handle React, WordPress, and more as a team!",
                "Our team can do anything! Design is the Boss's specialty, and we help with React, Shopify, and WordPress builds!",
                "The Boss handles the stunning designs—that's their forte! Then we all work together on React and WordPress sites to grow your brand!"
            ],
            'pricing': [
                "OH! Budgeting! I... I think the Boss has a plan for every budget? Let me check our Trello! I don't want to get in trouble!",
                "Pricing? Um, the Boss usually handles the numbers, but we're very flexible with WordPress and Shopify projects!",
                "I'm just the intern, but I know the Boss offers great value! Especially since their Design work is world-class!"
            ],
            'timeline': [
                "We take our time to make it perfect! Usually 3 to 6 weeks depending on how complex the design is!",
                "The Boss says quality takes time! We usually aim for 3-4 weeks, but bigger projects might take 6!",
                "We move as fast as we can without breaking Kody's code! Usually a 3-6 week window for the full design and build!"
            ],
            'support': [
                "We've got you! The Boss is an expert in Siteground and Hostinger for hosting, and even though we're still mastering AWS, our deployment is super stable!",
                "If anything breaks, I'll cry! But the Boss uses Hostinger and Siteground, so things almost never break! We're always here to help!",
                "We offer 24/7 peace of mind! The Boss manages everything through Git and Vite, ensuring your site stays perfect on Siteground!"
            ],
            'tech-stack': [
                "We're experts in React, JavaScript, and CSS! The Boss is also a master of WordPress. We host most of our sites on Siteground or Hostinger for maximum speed!",
                "Our stack is top-tier! React, Node.js, and WordPress. The Boss also uses Figma for those perfect designs!",
                "We use React, Vite, and GitHub for everything! The Boss is a WordPress specialist too, and we love Siteground for hosting!"
            ],
            'process': [
                "First the Boss works their design magic—since that's their forte! Then we deploy to our preferred servers like Siteground or Hostinger to ensure zero downtime!",
                "It's a team effort! The Boss designs in Figma, then Kody and I build it in React or WordPress. Then we launch on Hostinger!",
                "Design first! The Boss creates a masterpiece, then we handle the React coding and GitHub management before launching on Siteground!"
            ],
            'custom-design': [
                "ABSOLUTELY! Design is the Boss's forte! Every site is a custom masterpiece created in Figma or Photoshop. No boring stuff here!",
                "Yes! The Boss is a design specialist. We never use generic layouts unless you specifically want a WordPress template—but even then, we customize it perfectly!",
                "The Boss is a perfect designer! It's their forte. Everything we build starts as a unique Figma file tailored just for you!"
            ],
            'transfer': [
                "Oh! Yes! I can definitely try to find someone more senior! Just a second...",
                "Sure! I'll pass you over to Kody. He's a bit grumpy today because of my CSS, but he's a pro!",
                "Of course! Let me get someone from the dev team for you. One moment!"
            ]
        },
        inactivityMsgs: [
            "Oh no! Are you still there? Did the connection drop? I hope I didn't say something wrong!",
            "Hello? Did I break the internet? Please don't tell the Boss I'm already failing as an intern!",
            "Um... the screen is very quiet. Are you thinking about the Boss's designs? I do that too, they're amazing!",
            "Wait, did my video freeze? Or are you just deep in thought? Please click something so I know you're okay!",
            "I'm starting to get worried... is the server okay? Are YOU okay? Should I call Bobby? No, he's busy...",
            "If you can hear me, blink twice! Or just click a question! I'm getting stage fright over here!"
        ],
        repeatGreetings: [
            "Oh! You're back! Did you have more questions for the intern?",
            "Hey again! I'm still here, and Bobby is still... uh... busy! What's up?",
            "Welcome back! I promise I won't break anything this time! What can I help with?",
            "Hi! Glad to see you again! The Boss's portfolio is great, right? Any more questions?"
        ]
    },
    {
        id: 'kody',
        name: 'Kody',
        label: 'Front-End Developer',
        title: 'Styling Expert',
        video: '/images/cat-lazy-assistant.webp',
        signal: 'Poor (144p)',
        behavior: 'Distracted, busy fixing Kevin\'s code.',
        initialGreeting: "Yeah, what? Kevin told me you had questions. I'm right in the middle of fixing the intern's messy styles... again. Make it quick.",
        responses: {
            'services': [
                "We build custom React apps and WordPress sites. The Boss handles the design—that's their forte, so it always looks better than Kevin's stuff.",
                "Custom React, WordPress, and e-commerce. We focus on high-performance sites that match the Boss's expert designs.",
                "We specialize in turning the Boss's perfect designs into fast, responsive React and WordPress websites. Can I go back to my code now?"
            ],
            'pricing': [
                "Quality design and expert React code isn't cheap. Ask Archie if you want the actual numbers.",
                "We quote based on value. The Boss's design skills alone are worth the investment. WordPress builds are more flexible.",
                "Ask Archie for a quote. I just know that fixing Kevin's 'free' code costs me a lot of time, so we charge for quality."
            ],
            'timeline': [
                "Minimum 3-4 weeks. If it's complex, maybe 6 weeks. We don't rush the Boss's design process.",
                "A proper build takes 3 to 6 weeks. I spend at least a week just cleaning up the intern's Git commits.",
                "Expect a 3-6 week window. The Boss takes design seriously (it's their forte), and I take performance seriously."
            ],
            'support': [
                "We're experts in Git and Vite. For hosting, the Boss relies on Siteground and Hostinger. We're still scaling up on things like Azure, but the core hosting is fast.",
                "Maintenance is standard. We keep your site updated on Hostinger or Siteground. Don't worry, I won't let Kevin touch the production server.",
                "We provide ongoing support for everything we build. We prefer Siteground because it handles our React/WordPress hybrid setups perfectly."
            ],
            'tech-stack': [
                "React, JS, HTML/CSS. That's the bread and butter. The Boss is also a WordPress wizard. We use Siteground or Hostinger for most builds.",
                "Vite, React, and SASS. We use WordPress for CMS-heavy sites. All managed through GitHub and hosted on Hostinger.",
                "Our stack is clean: React for apps, WordPress for blogs. Everything is designed in Figma and deployed to Siteground."
            ],
            'process': [
                "The Boss designs something incredible—since that's their specialty. Then we deploy it to a fast Hostinger or Siteground environment.",
                "Workflow: Boss designs in Figma, I build it in React/WordPress, Kevin 'helps', and then we launch on Siteground.",
                "It's simple: Expert design (Boss's forte) -> Clean Code (Me) -> Fast Hosting (Hostinger)."
            ],
            'custom-design': [
                "Everything is custom. The Boss is a design specialist. We don't do 'basic'.",
                "Yes, we build unique Figma prototypes. We occasionally use WordPress templates for speed, but we customize every single pixel.",
                "Custom design is why people hire us. The Boss is a specialist in Figma and Photoshop. No cookie-cutter sites here."
            ],
            'transfer': [
                "Fine. Archie is our Project Manager. I'll put her on so I can actually finish this fix.",
                "I'm passing you to Archie. She's the one who actually likes talking to people.",
                "Hold on. I'll get the Project Manager. I need to re-center this div anyway."
            ]
        },
        inactivityMsgs: [
            "Hello? Earth to client? Look, I've got a mountain of messy code to fix here. Are we doing this or what?",
            "You still there? I'm literally watching my hair turn gray while I wait. Ask a question or I'm going back to GitHub.",
            "Look, I don't have all day. Either you want a website or you're just enjoying my low-res video feed.",
            "I just fixed three CSS bugs while waiting for you. Are we actually making progress or just staring at each other?",
            "If I wanted to sit in silence, I'd go to a meeting with Archie. Pick a question already.",
            "Are you waiting for the code to write itself? Because that only happens in Kevin's dreams. Wake up."
        ],
        repeatGreetings: [
            "Back again? Look, I'm still fixing this code. What do you need?",
            "Yeah? Still here? Kevin's code isn't getting any better, and neither is my mood. Question?",
            "You again. Fine. What else can I tell you about the agency?",
            "I thought you were talking to Archie. Did you miss my grumbling?"
        ]
    },
    {
        id: 'archie',
        name: 'Archie',
        label: 'Project Manager',
        title: 'Agency Lead',
        video: '/images/cat-assistant.jpg',
        signal: 'HD 1080p',
        behavior: 'Professional, expert, coordinating the team.',
        initialGreeting: "Hello, I am Archie, the Project Manager. I apologize for the previous... team dynamics. I can answer any questions you have regarding our agency's work for the Boss properly.",
        responses: {
            'services': [
                "Our agency specializes in high-end design and React development. Design is the Boss's forte, ensuring every project is visually stunning and technically sound.",
                "We provide comprehensive digital solutions: from Figma-led design to full React and WordPress development overseen by the Boss.",
                "Our core focus is premium design and robust development. We build for growth using React, Shopify, and specialized WordPress setups."
            ],
            'pricing': [
                "Budgeting depends on project scope. Our premium design and development services are quoted based on the 3-6 week delivery window.",
                "We provide custom quotes based on your specific needs. WordPress builds are typically more cost-effective than custom React applications.",
                "For a detailed quote, we'd love to discuss your requirements. The Boss ensures our pricing reflects the high quality of our design-first approach."
            ],
            'timeline': [
                "We follow a strict 3 to 6 week timeline. This ensures ample time for the Boss's specialized design phase and our team's rigorous development.",
                "Most sites go live in 3-6 weeks. This includes full design iterations in Figma and technical QA before launching on Hostinger.",
                "3 to 6 weeks is our standard. We prioritize a design-first workflow (the Boss's forte) which takes a bit longer but yields much better results."
            ],
            'support': [
                "We provide 24/7 monitoring. We primarily utilize Siteground and Hostinger for our client's hosting needs, ensuring high speed and reliability.",
                "Post-launch support is a priority. We manage your site on Siteground and handle all security updates and performance tweaks.",
                "We offer comprehensive maintenance packages. Your site remains hosted on our fast Hostinger/Siteground servers with full team support."
            ],
            'tech-stack': [
                "We are experts in the modern web: React, Vite, and WordPress. We combine this with the Boss's world-class design skills and reliable hosting on Siteground/Hostinger.",
                "Our stack includes React, Node.js, and WordPress. We use GitHub for version control and deploy to industry leaders like Siteground.",
                "We utilize the best tools available: Figma for design, React for performance, and Hostinger for reliable deployment."
            ],
            'process': [
                "Our workflow is design-first. The Boss crafts the visual identity (their forte), followed by expert development and deployment to Siteground or Hostinger.",
                "Step 1 is always Design. Once the Boss finishes the Figma prototypes, our dev team takes over to build and launch on Hostinger.",
                "We follow a systematic approach: Discovery, Design (Boss's forte), Development, and finally Launch on Siteground or Hostinger."
            ],
            'custom-design': [
                "Custom design is our core value. The Boss is a specialist in creating unique, high-fidelity interfaces that set our clients apart.",
                "We don't believe in templates for premium work. Every project is designed from scratch in Figma by the Boss to match your brand.",
                "Yes, everything is bespoke. The Boss's design forte ensures that your website won't look like anyone else's on the web."
            ],
            'transfer': [
                "I am the primary project lead. However, if you need to escalate further, you can contact the Boss directly at hello@kurowii.com.",
                "You can reach out to the Boss directly via email if you have specific high-level requirements. Otherwise, I'm here to help!",
                "If you'd like to skip the team and talk to the Boss, feel free to email hello@kurowii.com."
            ]
        },
        inactivityMsgs: [
            "Are you still with us? Please let me know if you have any other questions regarding our agency's services for the Boss.",
            "I noticed you haven't responded in a while. Is there a specific part of the Boss's process you'd like me to clarify?",
            "I'm here whenever you're ready. Our agency pride is in thorough communication—don't hesitate to ask anything.",
            "Still there? I'm ready to move forward with your project discovery whenever you are.",
            "Perhaps you're reviewing the tech stack details? I can explain more about Siteground or Hostinger if that helps.",
            "Just checking in. We value your time, and I want to ensure all your questions are answered properly."
        ],
        repeatGreetings: [
            "Welcome back! Do you have more questions for the Boss?",
            "Oh, it's you again! Still deciding on your project? I'm here to help.",
            "Back so soon? You're becoming a regular! What else can I clarify for you?",
            "I'm starting to think you just enjoy our video quality! How can I assist you this time?",
            "The Boss is going to be impressed by your thoroughness! What's on your mind now?"
        ]
    }
];

export const predefinedQuestions = [
    { id: 'services', text: "What can you do to help my business grow?" },
    { id: 'pricing', text: "How much should I budget for a project?" },
    { id: 'timeline', text: "When can I expect my website to be live?" },
    { id: 'support', text: "What happens if I need help after the launch?" },
    { id: 'tech-stack', text: "What tools and technologies do you use?" },
    { id: 'process', text: "What is the process of working with you?" },
    { id: 'custom-design', text: "Will my website have a unique, custom design?" },
    { id: 'transfer', text: "Can you pass the call to someone else?" }
];

export default assistantPersonas;
