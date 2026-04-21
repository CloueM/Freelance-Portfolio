export const projectsData = [
  {
    id: 1,
    title: 'Portfolio',
    image: '/images/portfolio.png',
    liveLink: 'https://kurowii.com/',
    githubLink: 'https://github.com/CloueM/Portfolio',
    stacks: ['React', 'CSS', 'Github', 'Vite', 'Figma', 'Canva'],
    description: 'This is my personal portfolio built with React and Vite, deployed on SiteGround. It showcases my projects, skills, and experience, and works across all screen sizes. The process started from a Content Inventory and Sitemap, then moved to Wireframes and a Hi-Fi Mockup, before finally building the site itself. The overall design follows a clean, minimalist, and modern style.',
    reflection: 'For this project, I put in everything I had learned so far with React, CSS, and JavaScript. But building it was a tough lesson in managing what I could actually finish. Because I was working on this at the exact same time as the Cloudy Toy Co project, time was my biggest enemy. Like I mentioned in that project\'s reflection, the heavy overtime on our team build meant my personal portfolio kept getting pushed aside. I had to make the hard choice to cut some features I originally planned just to make sure I could finish a clean, working site on time.\n\nTo hit the deadline, I had to be smart about how I worked. I reused CSS patterns and structures from previous projects like LUMIX to save time and keep things consistent. I also looked up online resources to make things easier, like finding the code to add a custom mouse cursor for desktop users. I used AI tools to speed up parts of the process too, but I made sure not to rely on them too much because I didn\'t want my own coding skills to get rusty.\n\nJuggling this alongside a busy team project was exhausting. It forced me to actually practice the time management and boundary-setting I realized I needed during the Cloudy Toy Co build. In the end, this project taught me how to make tough choices about what to focus on, proving that finishing a smaller, polished project is always better than missing a deadline for a half-finished perfect one.',
  },

  {
    id: 2,
    title: 'Cloudy Toy Co',
    image: '/images/cloudytoy.png',
    liveLink: 'https://cloudytoy.bcitwebdeveloper.ca/',
    stacks: ['Wordpress', 'WooCommerce', 'Trello', 'CSS', 'Figma'],
    description: 'Cloudy Toy Co is a fully functional toy store website built by a team of four using WordPress and WooCommerce. Customers can browse and buy toys, with a real payment system, a mailing system, and BC tax rates calculated automatically. The site is fully responsive and works across all devices. The whole process started from a Content Inventory and Sitemap, then Wireframes and a Hi-Fi Mockup for one page, before building the full site.',
    reflection: 'This was a team project of four people. We used Trello to organize tasks and Discord to communicate. One thing we did differently this time was splitting the work by components rather than by pages, which helped us completely avoid the merge conflicts we dealt with on previous projects.\n\nHowever, things did not go exactly to plan. We struggled as a team to actually develop what we originally laid out in our Content Inventory, Development Plan, and wireframes. We had to pivot, find realistic technical solutions, and update our planning documents to match what we could actually build under a tight deadline. \n\nThe biggest challenge ended up being time management and avoiding burnout. I was staying inside, sleeping late, waking up early, and constantly context-switching between WordPress, React, and multiple other assignments. We were working so much overtime on this project that nobody had time for their personal portfolios. Eventually, we had to communicate as a team and intentionally take days off from Cloudy Toy Co just to work on our portfolios and get away from the screen.\n\nThis project taught me a lot about technical decision-making, like when to use a plugin versus writing custom code. But more importantly, it taught me that work-life balance is not optional. Learning how to manage my time and set boundaries to avoid burning out in my own house was a very real preview of what a remote tech job actually looks like.',
  },

  {
    id: 3,
    title: 'LUMIX',
    image: '/images/lumix.png',
    liveLink: 'https://kurowii.com/lumix/',
    githubLink: 'https://github.com/CloueM/Lumix',
    stacks: ['React', 'CSS', 'JavaScript', 'Adobe Photoshop', 'Github', 'Vite', 'Canva'],
    description: 'LUMIX is a movie browsing website built with React that pulls live data from the TMDB API. Users can browse films by category (Now Playing, Popular, Top Rated, and Upcoming), view trailers, check movie details, and save their favorites to watch later.',
    reflection: 'This project pushed me into new territory. Working with a third-party API for the first time was exciting, and seeing real movie data show up on the screen made everything click. I still feel like I need more time with React to get fully comfortable, but this project gave me a real starting point. I also used Reddit, Stack Overflow, and some AI tools along the way to get through the parts I was stuck on, which taught me how to look for help without just copying answers.\n\nI got a bit too ambitious with my design. My Photoshop wireframe looked great, but when it came time to build it, some parts did not translate well, especially the category navigation bar on smaller screens. I had to rethink parts of the design during development and find solutions that still felt good to use. It was a good reminder that a design needs to be thought through for all screen sizes before the build starts.\n\nThe biggest thing I took away from this project is that plans always change during development, and knowing how to adapt is just as important as planning well. I also learned to spend more time in the design phase thinking through how each part will actually work before writing any code.',
  },

  {
    id: 4,
    title: 'Matcha Moji',
    image: '/images/matchamoji.png',
    liveLink: 'https://kurowii.com/matchamoji/',
    githubLink: 'https://github.com/CloueM/MatchaMoji-Memory-Game.git',
    stacks: ['HTML', 'SASS', 'JavaScript'],
    description: 'Matcha Moji is a card-matching memory game built with pure JavaScript. Players choose a difficulty level (Easy, Medium, Hard, or WTH), each with a different countdown timer, then flip cards to find matching emoji pairs before time runs out. The final score is calculated using accuracy (60%), time remaining (40%), and a difficulty multiplier ranging from 1.2x on Easy up to 3x on WTH.',
    reflection: 'Building this game was one of my harder challenges. HTML and CSS were fine, but JavaScript was where I struggled, not with understanding it, but with getting the logic right and figuring out the correct way to write things. There are many ways to build a card game, and working through that pushed me to keep doing logic-heavy projects so I can get more comfortable with JavaScript over time.\n\nOne thing I did wrong was not thinking about mobile from the start. I built the full desktop layout first, then realized later that it looked off on phones. Going backwards from desktop to mobile was a lot harder than starting with mobile first would have been. That was a lesson I will not forget for future projects.\n\nAdding the scoring system after the fact, once I learned about localStorage, was a good experience. It showed me how to go back into a finished project and add something new without breaking what was already there.',
    isFeatured: true
  }
];
