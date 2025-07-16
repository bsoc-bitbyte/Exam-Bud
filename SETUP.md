# 🚀 Exam-Bud Setup Guide

### _Your Ultimate Survival Guide to Getting This Beast Running_

You're about to set up **Exam-Bud** - the open-source project that's going to revolutionize how we survive exams in enineering college. This isn't just another website; it's your digital lifeline when you're drowning in syllabus three days before finals (we've all been there, don't lie).

---

## ⚡ TL;DR - For the Impatient Souls

_Thought there would be a lot of steps, hehe?_

Just run this and pray to the tech gods:

```bash
docker compose up --build -d
```

**BUT WAIT!** Don't be that person who skips the setup and then complains in the group chat at midnight. Read the full guide below, future you will thank present you.

---

## 🛠️ Pre-Flight Checklist: The Sacred Prerequisites

Before we dive into the chaos, let's make sure you have the essentials. Think of this as your pre-exam checklist, but for code:

### ✅ Essential Tools

1. **Docker** 🐳

   - Download from [Docker's official website](https://www.docker.com/get-started)
   - Make sure the Docker daemon is running (you'll see a cute whale icon in your system tray)
   - If Docker gives you installation errors, take a deep breath. We've all been there. Check the troubleshooting section below.

2. **Node.js** 🟢

   - Get it from [nodejs.org](https://nodejs.org/)
   - We're not picky about versions, but don't use something from 2015 please

3. **Git** (You should already have this if you're reading this)
   - If not, dive in this cool [Docs](https://medium.com/@ritankar.saha786/understanding-git-and-github-b79bb84de9e8)
   - Yes, it's that simple

### 🧠 Mental Preparation

- Accept that something will probably go wrong
- Have your favorite debugging playlist ready
- Keep some coffee/chai nearby
- Remember: if it works on the first try, you're either a wizard or something's definitely wrong

---

## 🎬 The Main Event: Setup Steps

### Step 1: Enter the Project Directory

```bash
cd <project-name>
```

_Replace `<project-name>` with `Exam-bud`._

### Step 2: Backend Magic ✨

Navigate to the backend and install dependencies:

```bash
cd backend
npm install
```

**Pro Tip:** While npm install is running, this is the perfect time to:

- Question why you chose engineering
- Pray that no dependency conflicts arise

**IMPORTANT:** Rename `.env.sample` to `.env`:

- Just rename the file from `.env.sample` to `.env`
- Or if you are a terminal guy and do not wish to dabble in the methods of mere mortals,here are your commands:

  1.**Windows(Powershell)**:

  ```powershell
  Rename-Item .env.sample .env
  ```

  2.**Mac/Linux(bash/zsh)**:

  ```bash
  mv .env.sample .env
  ```

- **Why?** Because this file contains all the secret sauce (database configs, API keys, etc.). Samples of .env are meant to act as a guide to how you set p your environment variables and keys, since actually sharing details of such things might compromise sensitive informtion, it is rather a common practice to share a .env.sample for the aforementioned reasons.

#### Cloudinary credentials setup:

You might see the following in your newly renamed .env file

```
#DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"

DATABASE_URL="postgresql://prisma:prisma@db:5432/exam_bud?schema=public"
PORT=4000

CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@<product_environment_name>
CLOUDINARY_PUBLIC_ID=<product_environment_name>
```

wth placeholders such as

- <your_api_secret>
- <your_api_secret>
- <product_environment_name>.

#### 🔑 Where to find them

All of these can be found once you login to cloudinary.

- Login to your dashboard.

- You will see `Cloud Name` and a **Go to API Keys**,copy the Cloud name and place it in <product_environment_name>.

- Click on the **Go to API Keys** button.

![Cloudinary Dash](https://github.com/user-attachments/assets/e9e8d168-7e32-42e6-8222-64a405ab5029)

- The link opens a new page with your API keys and secret, now copy the `API Key` and paste it in <your_api_key>, then copy the `API Secret` and paste in place of <your_api_secret>.

![Cloudinary Creds](https://github.com/user-attachments/assets/01f8dcdd-0521-4f28-8c18-eb400d9345ad)

That's it with the .env configuration.

### Step 3: Frontend Wizardry 🎨

Exit backend and enter frontend:

```bash
cd ..          # Escape from backend
cd frontend    # Enter the realm of JavaScript chaos
npm install    # Summon the node_modules demon
```

### Step 4: Return to Base (Root Directory)

```bash
cd ..    # Back to the root, where all the magic happens
```

### Step 5: The Final Summoning Ritual 🔮

```bash
docker compose up --build -d
```

**What does this do?**

- `docker compose up`: Starts all the containers
- `--build`: Rebuilds images if needed (covers your back if you made changes)
- `-d`: Runs in detached mode (so you can use your terminal for other important things like memes)

---

## 🎉 Victory Dance Time!

If everything worked, you should see something like this in your terminal:

![Success Screenshot](https://github.com/user-attachments/assets/bc617a55-7945-421f-bb26-8c21b2295e63)

**The Moment of Truth:**

1. Open your favorite browser (we don't judge, even if it's Internet Explorer... okay, we judge a little)
2. Navigate to `localhost:3001`
3. Take a deep breath, close your eyes, and hit Enter
4. If you see the Exam-Bud interface, congratulations! You've successfully summoned the project from the digital depths! 🧙‍♂️✨

---

## 🆘 When Things Go Wrong (They Will)

### Common Issues & Solutions

#### "Docker not found" or "Docker daemon not running"

- **Windows:** Check if Docker Desktop is actually running (not just installed)
- **Mac:** Same as Windows, look for the whale icon
- **Linux:** `sudo systemctl start docker`

#### "npm install" taking forever

- This is normal. npm has a special relationship with time and space.
- If it's been more than 10 minutes, try `npm cache clean --force` and retry
- If it's still stuck, check your internet connection or blame your ISP

#### "Permission denied" errors

- **Linux/Mac:** You might need `sudo` for some operations
- **Windows:** Run terminal as Administrator
- If all else fails, Google the exact error message (we've all been there)

#### "Port 3001 already in use"

- Something else is using that port
- Kill whatever's using it: `lsof -ti:3001 | xargs kill -9` (Mac/Linux)
- Or just use a different port by modifying the docker-compose file

---

## 📚 Resources & Further Reading

- get familiar with techstacks, go through [README.md](./READMEmd)
- dont know how to contribute to the project? refer [CONTRIBUTING.md](./CONTRIBUTING.md)
- "How to survive coding at 2 AM" - A survival guide

## 🎯 Final Words of Wisdom

Remember, you're not just setting up a project - you're contributing to something that will help thousands of students survive their academic journey. Every npm install, every Docker build, every moment of frustration is building something bigger than yourself.

And if this setup guide made you chuckle even once, then it's already served its purpose. **Engineering** is hard enough without boring documentation.

Now go forth, set up this project, and may your builds be fast and your bugs be few! 🚀

---

**Pro Life Tip:** Bookmark this guide. You'll probably need it again when you inevitably forget how you set this up the first time. We've all been there, and we're all lying if we say we haven't.

_Happy coding, and may your notes always be complete!_ 📚✨

---

_Made with ❤️, ☕, and a healthy dose of procrastination by the Exam-Bud team_
