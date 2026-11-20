# Jasmin ♡ Oudom — Anniversary Website

A romantic, responsive anniversary website built with plain HTML, CSS, and JavaScript. It includes:

- A pink, white, and purple romantic design
- The headline “Happy Anniversary, My Love ❤️”
- The names “Jasmin ♡ Oudom”
- A live counter showing days, hours, minutes, and seconds together
- A 19-piece memory gallery
- A photo lightbox with zoom, next/previous, keyboard arrows, and swipe support
- An automatic slideshow with next/previous, dots, pause, and swipe controls
- Floating heart animations
- Sweet love notes with a “Another love note” button
- A live countdown to the next December 22
- A YouTube music control
- A fully responsive layout for phones, tablets, and laptops

---

## 1. What is in this project?

```text
Jasmin-Oudom-Anniversary/
├── index.html
├── style.css
├── script.js
├── README.md
└── images/
    ├── memory-01.jpg
    ├── memory-02.jpg
    ├── ...
    ├── memory-18.jpg
    └── our-keepsake.jpg
```

The `images` folder contains 18 uploaded photos plus one matching “Our Love Story” keepsake card. The original upload was missing `memory11`, so the keepsake card is the 19th gallery piece.

---

## 2. Run the website in VS Code — beginner steps

### Step 1 — Install VS Code

Download and install Visual Studio Code from:

https://code.visualstudio.com/

### Step 2 — Put the project folder on your computer

1. Download and unzip the project ZIP.
2. You should see a folder named `Jasmin-Oudom-Anniversary`.
3. Open that folder and confirm it contains `index.html`, `style.css`, `script.js`, and the `images` folder.

### Step 3 — Open the folder in VS Code

1. Open VS Code.
2. Click **File → Open Folder…**
3. Select the `Jasmin-Oudom-Anniversary` folder.
4. Click **Select Folder**.

You should now see the project files in the left-hand Explorer panel.

### Step 4 — Install the Live Server extension (recommended)

1. Click the **Extensions** icon in the left sidebar (it looks like four small squares).
2. Search for **Live Server**.
3. Install the extension by **Ritwick Dey**.
4. Wait for the install to finish.

### Step 5 — Start the website

1. In the VS Code Explorer, right-click `index.html`.
2. Click **Open with Live Server**.
3. Your browser will open a local address such as:

```text
http://127.0.0.1:5500/index.html
```

That is your website. Any time you save a file, Live Server refreshes the page automatically.

> You can also double-click `index.html` to open it directly in a browser. Live Server is better because it handles local files and the YouTube player more reliably.

---

## 3. How to create the folders and add photos yourself

If you are building this from scratch instead of using the ZIP:

1. Create a new folder called `Jasmin-Oudom-Anniversary`.
2. Inside it, create a folder called `images`.
3. Put your photos inside `images`.
4. Rename the photos in order, for example:

```text
images/memory-01.jpg
images/memory-02.jpg
images/memory-03.jpg
...
images/memory-18.jpg
images/our-keepsake.jpg
```

5. Open `index.html` and find the gallery section. Each photo looks like this:

```html
<button class="gallery__item gallery__item--portrait reveal" type="button"
        data-caption="Where our forever began"
        aria-label="View memory: Where our forever began">
  <img src="images/memory-01.jpg" alt="A favorite memory of Jasmin and Oudom" loading="lazy">
  <span class="gallery__overlay">
    <span class="gallery__number">01</span>
    <span class="gallery__caption">Where our forever began</span>
    <span class="gallery__zoom" aria-hidden="true">↗</span>
  </span>
</button>
```

6. To replace a photo, change the `src` value to your own file name.
7. To change the caption, edit `data-caption` and the text inside `gallery__caption`.
8. The slideshow automatically reads the gallery photos, so you only need to update the gallery.

### Photo tips

- Use `.jpg`, `.jpeg`, `.png`, or `.webp` files.
- Keep each photo under about 2 MB so the page loads quickly.
- Portrait photos look best in the gallery. Landscape photos also work.
- Keep the file names simple: lowercase letters, numbers, and hyphens.

---

## 4. Easy things to personalize

### Change the names

Open `index.html` and search for:

```text
Jasmin
Oudom
```

Replace the names in the hero, footer, love letter, and keepsake references.

### Change the relationship start date

Open `script.js` and find:

```js
relationshipStart: new Date(2024, 11, 22, 0, 0, 0), // 22 December 2024
```

The month is zero-based:

- `0` = January
- `11` = December

So `new Date(2024, 11, 22)` means **December 22, 2024**. Change this to the day your relationship began.

### Change the anniversary date

In `script.js`:

```js
anniversaryMonth: 11, // 11 = December
anniversaryDay: 22,
firstAnniversaryYear: 2025,
```

### Change the YouTube song

In `script.js`:

```js
songUrl: "https://youtu.be/T4dM9k7u6qs",
youtubeVideoId: "T4dM9k7u6qs",
```

Replace both values with your own YouTube link and video ID.

> **Important:** The YouTube video you provided currently reports that it is unavailable for embedded playback. The website still includes the link and a music button. If YouTube blocks the embed, the button opens the song directly on YouTube instead. To play music inside the page, use a YouTube video whose owner has enabled embedding.

### Change the love notes

Open `script.js` and edit the `loveNotes` array. Add or remove messages inside the square brackets.

### Change the colors

Open `style.css` and edit the variables at the top:

```css
:root {
  --rose: #e45c8d;
  --rose-deep: #c43d70;
  --plum: #4a1d3b;
  --lavender: #b18ad6;
  --cream: #fffaf7;
}
```

---

## 5. How the main features work

### Live counter

`script.js` calculates the difference between the current date and `relationshipStart`, then updates the days, hours, minutes, and seconds every second.

### Countdown

The countdown finds the next December 22. If today is December 22, it displays a special “Today is our day” message.

### Gallery lightbox

Click any gallery photo to open it larger. Use:

- The left and right arrow buttons
- The keyboard `←` and `→` keys
- `Esc` to close
- Swipe left or right on a phone

### Slideshow

The slideshow advances automatically every 5.5 seconds. It pauses when you hover over it, and you can pause it manually with the Pause button.

### Music

The music button uses the YouTube IFrame API. Browsers do not allow audio to autoplay without a click, so the song starts when the visitor presses the music button.

### Floating hearts

Small hearts are created with JavaScript and animated with CSS. If the visitor has “Reduce motion” enabled in their device settings, the hearts are disabled automatically.

---

## 6. Troubleshooting

### The photos do not show

- Make sure the `images` folder is in the same folder as `index.html`.
- Check that the file names match exactly, including uppercase/lowercase letters.
- Open the browser console with `F12` and look for red error messages.

### The music button says “Open on YouTube”

This means YouTube is not allowing the video to play inside another website. Click the button or the YouTube link to listen to it directly. Try a different video if you want in-page playback.

### The page looks different on a phone

That is expected. The layout changes at tablet and phone sizes. Test it in your browser’s responsive design mode:

1. Press `F12`.
2. Click the phone/tablet icon at the top of the developer tools.
3. Choose a device such as iPhone or iPad.

### Live Server does not open

- Make sure the Live Server extension is installed.
- Right-click `index.html` and choose **Open with Live Server**.
- Check that no other program is using port 5500.

---

## 7. Publishing the website (optional)

When you are ready to share it online, you can use a free static host such as:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

Upload the entire project folder, keeping `index.html`, `style.css`, `script.js`, and `images` together. The site uses only static files, so it works on any static host.

---

Made with love, for Jasmin ♡ Oudom.
