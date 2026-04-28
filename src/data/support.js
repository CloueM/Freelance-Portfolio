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
                "I focus on creating beautiful, user-friendly designs in Figma and Adobe XD. Cloue is the Owner and oversees the big vision, but I make sure every font and color is perfect before Giyu builds it! We specialize in everything from minimalist portfolios to complex e-commerce layouts that guide users naturally toward making a purchase.",
                "Our team makes websites that are both pretty and easy to use. I do all the UI/UX work using Photoshop and Illustrator, making sure the design is exactly what you need. Then Giyu and the team bring it to life! We don't just 'make a site'—we build a digital home for your brand that resonates with your specific audience.",
                "We can help with any design needs! I use Figma, Canva, and the Adobe suite to create custom layouts. I love making sure the visual harmony is just right for our clients. Whether you need a fresh brand identity or a complete visual overhaul of an existing platform, I focus on the 'why' behind the design."
            ],
            'tech-stack': [
                "For design, I live in Figma and Adobe Photoshop. I also use Adobe Illustrator for custom icons. For the build, Giyu uses React and JavaScript to make my designs work perfectly on your screen! This ensures that our designs aren't just pretty pictures, but interactive experiences that respond to every user action.",
                "I use Figma, Adobe XD, and Canva for my UI/UX work. I also know Illustrator very well for vector graphics! We use React and WordPress to turn my designs into real, fast websites. Using these industry-standard tools allows us to maintain high quality while keeping the project scalable for your future growth.",
                "My tools are all about beauty: Figma, Photoshop, XD, and Illustrator. I focus on the design UX/UI, while Giyu and the team use React and WordPress to handle the technical build. It's a perfect match for creating sites that look high-end but feel incredibly intuitive to use."
            ],
            'custom-design': [
                "Yes! I absolutely love making custom designs from scratch! I'll build you a unique layout in Figma that is purely yours. Since it takes more time and detail than a normal setup, the price will be a bit higher, but it will be stunning! A custom design means your business won't look like another 'template' site—it will stand out as a unique leader in your industry.",
                "Of course! Custom design is my favorite part of the job. I'll use all my Adobe tools to make sure your site has its own personality. Because I put so much detail into it, it does affect the total cost, but you'll have something unique! We focus on typography, spatial relationships, and micro-interactions that make the user feel like they are in a high-end space.",
                "We can definitely do that! I'll create a custom UI/UX plan just for you. Since I spend so much time on the details and visual harmony, it will change the project price, but I promise it will be beautiful! We analyze your competitors and your target audience to ensure the design isn't just attractive, but strategically positioned to help you win."
            ],
            'visual-harmony': [
                "I love colors so much! I pick palettes that feel warm and inviting, or clean and professional. For fonts, I focus on how easy they are to read and how they make you feel. I want your site to be a beautiful story! We use color theory and psychological triggers to make sure your customers feel trust and excitement the moment they land on your page.",
                "Choosing colors and fonts is like painting a picture. I make sure they all work together in harmony. I love using soft gradients and clean layouts to make everything look visually delightful! I prioritize accessibility as well, ensuring that the color contrast meets modern standards so everyone can enjoy your content.",
                "Visual harmony is my specialty! I carefully pick colors that match your brand and fonts that look modern. I want everyone who visits your site to feel happy and excited by what they see! We look at trends in fashion, architecture, and tech to keep your website looking fresh for years to come."
            ],
            'ux-process': [
                "I start by mapping out the journey in Figma. I think about where people look and how they feel when they click a button. My goal is to make every part of your website easy and fun to use! We call this 'User-Centric Design,' where the interface disappears and the content shines.",
                "My process is all about the user. I make wireframes first to see how the site will flow. I want to make sure no one gets lost and everyone enjoys the time they spend on your website! I look for 'friction points'—places where people might get confused—and I smooth them out until the experience is seamless.",
                "I focus on the delight of the user! I test every layout to make sure it's simple to understand. A good design isn't just pretty, it has to feel natural and work perfectly for everyone. We use modern UX patterns that people already understand, so they don't have to 'learn' how to use your site—they just know."
            ],
            'upgrading-ui': [
                "Upgrading an old design is one of the most impactful things we can do! I'll analyze your current site to see what's working and what's making people leave. Then, I'll modernize the visuals, clean up the layouts, and bring everything into 2024. A fresh look often leads to a massive boost in customer trust and higher conversion rates!",
                "If your website looks outdated, users might think your business is too. I can help you modernize your brand by applying new design standards, improving the mobile experience, and sharpening your visual identity. We focus on a 'clean' aesthetic that stays relevant and professional.",
                "Yes! We can take your existing content and give it a facelift. We'll improve the font hierarchy, balance the white space, and add those modern 'glassmorphism' or 'minimalist' touches that high-end brands use today. It's like a renovation for your digital storefront!"
            ],
            'transfer': [
                "I'd love to keep talking about fonts, but if you have technical coding questions, I should pass you to Giyu. He's our Senior Developer and handles the build once my designs are ready!",
                "Sure! I'll get Giyu for you. He's the one who turns my Figma designs into real code. He's very good at his job, even if he's a bit serious. One moment!",
                "Of course! Let me get Giyu, our Senior Full Stack Developer. He handles the heavy lifting with the code and can explain the technical side much better than I can!"
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
            { id: 'upgrading-ui', text: "Can you help modernize my old, outdated website?" },
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
                "We build custom React and WordPress sites. Mitsuri handles the design, and I make sure the code works. We focus on making things fast and reliable. My priority is ensuring the site can handle high traffic without breaking or slowing down.",
                "Our team does custom web development. We use React and WordPress mostly. Mitsuri keeps the design clean, and I handle the heavy lifting with the code. I focus on technical SEO—making sure the site structure is something Google actually likes.",
                "We turn Mitsuri's designs into real websites. Usually that means React for high-end interactivity and WordPress for content management. We build systems that are easy for you to manage after we launch."
            ],
            'support': [
                "We use Hostinger and Siteground for hosting. You'll need your own account, and then you just give Boss Cloue some access to your account like Collaborator account or FTP account to set everything up. It's easier for everyone. I'll handle the deployment so you don't have to worry about servers.",
                "Yes, we provide 30 days of free support after the site goes live. This covers any bugs or small adjustments. After that, we charge $40 per hour for any extra help or updates you might need to keep your platform running smoothly.",
                "Once the site is done, we'll give you a Manual on how to manage it. You also get 30 days of free support. If you need more help after that, our rate is $40 per hour. I'm also available for long-term maintenance if your business needs a dedicated developer."
            ],
            'tech-stack': [
                "We use React, JavaScript, and CSS for the front end. React allows us to build 'Single Page Applications' that feel as fast as a mobile app. Mitsuri also uses WordPress for a lot of projects when content editing is the main goal. It's a solid stack that handles most business needs perfectly.",
                "React and WordPress are our main tools. We also use things like Vite to keep the development fast and Framer Motion for those smooth animations you see. It's a modern, future-proof setup that won't be obsolete in two years.",
                "Our stack is straightforward: React for speed and WordPress for easy content management. I use SASS for styling and Node.js for any custom logic. I make sure every line of code is there for a reason—no bloat, just performance."
            ],
            'performance': [
                "Speed is everything. I optimize all images, shrink the code files, and use modern techniques like 'Lazy Loading' to make sure your site loads in a flash. If a site takes more than 3 seconds to load, you're losing 40% of your customers. I aim for 90+ Lighthouse scores on every build.",
                "I make sure the technical build is as light as possible. I use tools like Vite for fast loading and clean scripts. Your users won't have to wait around for your content to show up. A fast site also ranks higher on search engines—it's a massive part of SEO.",
                "A fast website is a happy website. I spend a lot of time making sure the back-end is efficient. I don't like bloated code, so I keep everything lean. I use 'code-splitting' so the browser only loads what it needs, when it needs it."
            ],
            'clean-code': [
                "I follow strict 'SOLID' principles when I write code. Clean code means fewer bugs and it's much easier to update later. I turn Mitsuri's Figma files into reusable React components, which saves you money in the long run when you want to add new features.",
                "I take pride in my code structure. I make sure everything is organized so that if we need to change something next year, it's easy to do. No messy 'spaghetti' code here. I use Git for version control so every change is tracked and safe.",
                "My job is to make Mitsuri's designs work perfectly. I use modern JavaScript standards to build a solid foundation. I write code that is easy to read, meaning any developer can pick it up later without getting a headache."
            ],
            'website-upgrade': [
                "If your current site is slow, buggy, or doesn't work on mobile, I can fix it. Usually, it's better to migrate to a modern framework like React. We can take your existing content and rebuild it on a faster, more secure foundation. It's like upgrading an old engine for a Tesla motor.",
                "Yes, we specialize in 'Digital Modernization.' We can audit your current site, find the performance bottlenecks, and rebuild the parts that are holding you back. A technical upgrade can improve your search rankings almost overnight.",
                "Upgrading is smart. I can help you move away from slow page builders (like Elementor or Divi) to custom code that is 10x faster. We focus on keeping your SEO value while making the tech better, faster, and more secure."
            ],
            'transfer': [
                "Fine. I'll get Tanjiro. He's our Project Manager and handles the business side. I'm going back to my code.",
                "I'm passing you to Tanjiro, our Project Manager. He's better at explaining the 'process' and the budget stuff than I am. One second.",
                "I'll get the Project Manager for you. He can answer the rest of your questions. I need to get back to work anyway."
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
            { id: 'website-upgrade', text: "Can you upgrade or fix my existing website?" },
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
                "Most projects take about 3 to 6 weeks. I'll make sure Giyu and Mitsuri use that time well to build everything right. I won't let Zenitsu's sleeping slow us down! We follow a strict 'Sprint' schedule to ensure we hit every milestone on time.",
                "We usually aim for 3 to 6 weeks. This gives Giyu time to do the hard coding and Mitsuri time to design. I'll check their progress every day to make sure we finish on time for you. We provide weekly updates so you are never in the dark about your project status.",
                "3 to 6 weeks is our normal time to finish. We care more about doing a good job than rushing. I make sure the team stays focused so Mitsuri's designs come to life perfectly. For smaller upgrades, we can often finish in as little as 10-14 days."
            ],
            'pricing': [
                "I want to be very honest with you, our projects usually start at $1,000 and usually don't go above $8,000. I know Giyu can be a bit blunt about costs, but I'll work with you to find a price that fits your budget. We believe in transparent pricing—no hidden fees, just honest work.",
                "A normal project starts at $1,000 and usually doesn't go above $8,000. Every project is different. Even if Mitsuri was a bit confused earlier, I'll make sure the price is fair for what you actually need to succeed. We offer flexible payment plans to help small businesses get started.",
                "We usually start at $1,000 and usually don't go above $8,000. I'm happy to talk about your goals. I'll make sure the whole team, including Giyu and Mitsuri, works hard to make it worth every cent! We focus on the ROI—making sure your website earns back its cost through new leads and sales."
            ],
            'process': [
                "To keep you updated, we use a tool called Trello. I list all the tasks for Giyu and Mitsuri there so you can see exactly what they are doing. I'll be there to answer any questions! Our process goes from Discovery to Design, then Development, and finally a rigorous Testing phase.",
                "I invite all our clients to a Trello board. You can see Giyu's code updates and Mitsuri's work there clearly. I make sure they post pictures of their progress every day! We also have a 'Final Review' session before launch to ensure you are 100% happy with every pixel.",
                "You can trust our plan because you'll see it on Trello. I manage all the tasks for the team there. I'll make sure Giyu and Mitsuri keep you informed every step of the way. We handle everything: from domain registration to the final 'Go Live' moment."
            ],
            'business-growth': [
                "Your website is your best salesperson. I focus on the strategy that helps your business grow. We look at how to capture more leads, how to sell more products, and how to build trust with your visitors. If your website isn't helping you grow, it's not doing its job!",
                "We help businesses scale by building foundations that don't break. Whether you are moving from a small Instagram shop to a full website or upgrading a corporate landing page, we focus on the metrics that matter: conversion, retention, and speed.",
                "Growth comes from a combination of great design and solid tech. I coordinate with Mitsuri to make sure the user journey is perfect, and with Giyu to ensure the tech supports your goals. We want to be your long-term partners in success!"
            ],
            'getting-started': [
                "If you are just starting out, don't worry! I'll guide you through everything. You don't need to know anything about code. I'll explain what a domain is, how hosting works, and why your brand needs a custom site. We love helping new entrepreneurs find their voice online!",
                "Starting a new venture is exciting! We offer a 'Starter Package' that gives you everything you need to launch a professional presence without the stress. I'll make sure the team builds you a site that can grow as your business grows.",
                "We work with many first-time founders. I focus on keeping things simple and clear for you. We'll start with the essentials and build a roadmap for your future features. You're in safe hands with us!"
            ],
            'team': [
                "Our team is small but very strong! We have Boss Cloue as the Owner, Mitsuri as our UI/UX Designer, and Giyu as our Full Stack Developer. Zenitsu is our back-end expert, but he's resting right now. We are a tightly-knit group that values quality over quantity.",
                "I'm very proud of this team. Mitsuri makes beautiful designs, and Giyu turns them into amazing code. I make sure everyone stays on track so we deliver the best work for you! Each team member is a specialist in their field, ensuring you get expert eyes on every part of your site.",
                "You're in good hands. Mitsuri, Giyu, and I work closely together every day. We also have Zenitsu helping with the server side when he's awake. We all care a lot about your project and treat it as if it were our own."
            ],
            'owner': [
                "Boss Cloue handles the big vision and final decisions. He's a very fair leader and cares deeply about our clients. You can reach him anytime at hello@kurowii.com. He brings a high-level technical background to every project to ensure the highest standards.",
                "The Owner, Cloue, is always looking for ways to help our clients grow. He trusts me to handle the project details, but he's always there for the important stuff. Feel free to email him! He oversees the quality control and ensures every site we launch is a masterpiece.",
                "If you want to talk about a new project idea or a big partnership, Boss Cloue is the one to talk to. He's very supportive and would love to hear from you at hello@kurowii.com. He specializes in the strategy and infrastructure that powers our most complex projects."
            ],
            'transfer': [
                "I handle most of the talking so the team can focus. If you have a very specific question for Boss Cloue, you can email him. He works very hard while I manage Giyu and the others!",
                "Feel free to email Boss Cloue if you need to talk about something big. I'm here to help him by managing Giyu, Mitsuri, and Zenitsu so they can focus on your designs and code!",
                "If you want to talk to Boss Cloue directly, you can reach him at hello@kurowii.com. He's usually very busy with the team, but he always likes hearing from nice people like you."
            ]
        },
        inactivityMsgs: [
            "Are you still there? I'm here to help with any other questions you have!",
            "I noticed you haven't said anything in a bit. I hope you're okay! Is there anything else I can explain for you?",
            "I'm here whenever you're ready! Don't be afraid to ask about our price or how we work, I want you to know everything.",
            "Still there? I'm ready to help with your project whenever you're ready to talk.",
            "Maybe you're thinking about the details? I can explain more about our hosting or tools if you like, I'm here to help!",
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
            { id: 'business-growth', text: "How can a new website help my business grow?" },
            { id: 'getting-started', text: "I'm just starting out. Where do I begin?" },
            { id: 'team', text: "Who are the people working on my website?" },
            { id: 'owner', text: "How can I contact the Owner directly?" },
            { id: 'transfer', text: "Can you pass the call to someone else?" }
        ]
    }
];

export default assistantPersonas;



export default assistantPersonas;
