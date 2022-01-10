# Rubik's Snake Sequencer

Making a step sequencer out of the Rubik's Snake toy from the 1980s using Three.js, Tone.js, and React Three Fiber.

## Inspiration

The original idea for this project came to me last year as I uncovered a box of cool math toys my parents had saved from my childhood in the 80's. The [Rubik's Snake](https://en.wikipedia.org/wiki/Rubik%27s_Snake) was in perfect condition and it was a wonderful way to pass the time during pandemic shutdowns with my 7-year-old. At the same time, I had just gotten an Arduino and was thinking of interesting music-related hardware projects I could make. I had the idea to create a version of the snake that played a repeating musical pattern that's determined by how you fold it. It could be used as an instrument to generate unlikely musical ideas, as an educational tool, or just a fun toy. Initially I wanted to build this thing in real space, but once I started messing around with the `Three.js` library, I realized I could make a pretty simple but usable prototype in the web browser.

## Technology

I bootstrapped the Snake Sequencer project with [Create React App](https://create-react-app.dev/). I then used [`@react-three/fiber`](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) as a declarative bridge to [`Three.js`](https://threejs.org/), along with [`drei`](https://drei.pmnd.rs/), a library of helpers for R3F, both from the open-source collective [Poimandres](https://github.com/pmndrs), and [`@react-spring/three`] for fluid and life-like animations. Finally, I used [`Tone.js`](https://tonejs.github.io/) to abstract some of the musical and time-based elements from the Web Audio toolkit.

## How To Use

Click or shift-click (tap on mobile) on a segment to rotate it by 90 degrees clockwise or counter-clockwise, respectively. Spacebar or click/tap on the **"Start/Stop"** button to start or stop the musical sequencer. Use the sliders to adjust the **bpm** (tempo in beats per minute), **autorotate** (speed and direction of the `OrbitCamera` rotation), **tonality** (the scale), and **segments** (number of unique triangular prism sections of the snake). You can use the mouse, mousewheel, and multi-touch gestures to zoom, pan, and orbit the camera around the central point in 3-D space.

Once the sequencer is started, each turn of the snake determines the following note. In its default position, you will hear the root note (Middle C) repeated *n* times (however many segments are currently in the snake). If a segment is rotated one turn clockwise, you will hear the sequencer go up one step in the selected tonality; if a segment is rotated one turn counter-clockwise, you will hear the sequencer go down one step. If a segment is rotated two turns in either direction (180 degrees), the sequencer will go up two steps. (I could have chosen two steps down here, but I opted for a rising melodic bias rather than falling)

